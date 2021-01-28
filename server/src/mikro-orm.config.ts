import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __PROD__ } from "./constants";
import { Post } from "./entities/Post";

export const MIKRO_CONFIG: Parameters<typeof MikroORM.init>[0] = {
  entities: [Post],
  type: "postgresql",
  debug: !__PROD__,
  migrations: {
    path: path.join(__dirname, "migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
  dbName: process.env.LIREDDIT_DB_DATABASE,
  user: process.env.LIREDDIT_DB_USER,
  password: process.env.LIREDDIT_DB_PWD,
};
export default MIKRO_CONFIG;
