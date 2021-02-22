import { MikroORM } from "@mikro-orm/core";
import getenv from "getenv";
import path from "path";
import { __PROD__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export const MIKRO_CONFIG: Parameters<typeof MikroORM.init>[0] = {
  type: "postgresql",
  dbName: getenv("LIREDDIT_DB_DATABASE"),
  user: getenv("LIREDDIT_DB_USER"),
  password: getenv("LIREDDIT_DB_PWD"),
  entities: [Post, User],
  debug: !__PROD__,
  migrations: {
    path: path.join(__dirname, "migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
};
export default MIKRO_CONFIG;
