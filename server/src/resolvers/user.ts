import argon2 from "argon2";
import normalizeEmail from "normalize-email";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { validateEmail } from "../utils/validateEmail";

// Benchmark time for 1 hash:
// ~1050ms on my 12 thread system
// ~1830ms on repl.it hacker plan
// ~3133ms on repl.it regular plan
// not sure where this will be hosted but seems pretty reasonable to me.
const argon2Config: argon2.Options & { raw: false } = {
  type: argon2.argon2id,
  memoryCost: 4096,
  parallelism: 1,
  timeCost: 512,
  raw: false,
};

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      // Not logged in
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options")
    { email, username, password }: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = [];

    if (username.length <= 2) {
      errors.push({
        field: "username",
        message: "Username must be at least 3 characters",
      });
    }
    if (username.length >= 50) {
      errors.push({
        field: "username",
        message: "Username must be shorter than 50 characters",
      });
    }

    if (password.length <= 3) {
      errors.push({
        field: "password",
        message: "Password must be at least 4 characters",
      });
    }

    // TODO: Check for gmail-style plus sign duplication
    // https://www.npmjs.com/package/normalize-email
    if (!validateEmail(email)) {
      errors.push({ field: "email", message: "Invalid email" });
    }

    if (errors.length) return { errors };

    // Don't allow people with gmail addresses to make infinite accounts
    const normalizedEmail = normalizeEmail(email);

    const hashedPassword = await argon2.hash(password, argon2Config);
    const user = await em.create(User, {
      email: normalizedEmail,
      username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (e) {
      // Check for "unique_violation" error
      if (e && e.code === "23505") {
        // Username is the only unique field
        return {
          errors: [
            {
              field: "username",
              message: "Username is already taken",
            },
          ],
        };
      }
      // Don't swallow real errors
      throw e;
    }

    req.session.userId = user.id;

    return { user };
  }

  // TODO: Allow login with email instead of username?
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") { username, password }: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username });
    if (!user) {
      // This allows enumeration of usernames, but profiles are public anyway so it's
      //  not a security problem
      return {
        errors: [
          {
            field: "username",
            message: "That username doesn't exist",
          },
        ],
      };
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
        }
        resolve(true);
      })
    );
  }
}
