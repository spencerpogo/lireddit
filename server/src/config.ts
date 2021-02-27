import { ENV_PREFIX } from "./constants";

function getenv(key: string): string {
  const val = process.env[ENV_PREFIX + key];
  if (!val) {
    throw new Error(
      `Missing required environment variable: ${ENV_PREFIX + key}`
    );
  }
  return val;
}

function expectNum(val: string): number {
  const n = Number(val);
  if (isNaN(n)) {
    throw new Error(`Environment variable ${n} should be a number`);
  }
  return n;
}

export const CONFIG = {
  port: expectNum(getenv("PORT")),
  iface: getenv("IFACE"),
  frontendUrl: getenv("FRONTEND_URL"),
  sessionSecret: getenv("SESSION_SECRET"),
  db: {
    host: getenv("DB_HOST"),
    port: expectNum(getenv("DB_PORT")),
    dbName: getenv("DB_DBNAME"),
    user: getenv("DB_USER"),
    password: getenv("DB_PWD"),
  },
};

export default CONFIG;
