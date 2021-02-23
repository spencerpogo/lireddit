import { MikroORM } from "@mikro-orm/core";
import path from "path";
import CONFIG from "./config";
import { __PROD__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export const MIKRO_CONFIG: Parameters<typeof MikroORM.init>[0] = {
  type: "postgresql",
  host: CONFIG.db.host,
  port: CONFIG.db.port,
  dbName: CONFIG.db.dbName,
  user: CONFIG.db.user,
  password: CONFIG.db.password,
  entities: [Post, User],
  debug: !__PROD__,
  migrations: {
    path: path.join(__dirname, "migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
};
export default MIKRO_CONFIG;
