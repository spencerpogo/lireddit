import { FieldError } from "src/resolvers/user";
import { UsernamePasswordInput } from "../types/UsernamePasswordInput";
import { validateEmail } from "./validateEmail";

export function validateRegistration({
  email,
  username,
  password,
}: UsernamePasswordInput): FieldError[] {
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
  if (username.includes("@")) {
    errors.push({
      field: "username",
      message: "Username cannot include an @ sign",
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

  return errors;
}
