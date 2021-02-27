export const SITE_NAME = "Lireddit";
export const __PROD__ = process.env.NODE_ENV === "production";
export const ENV_PREFIX = "LIREDDIT_";
export const COOKIE_NAME = "qid";
export const FORGOT_PASSWORD_FRONTEND_ROUTE = "/reset-password/";
export const FORGOT_PASSWORD_REDIS_PREFIX = "forgot-password:";
export const FORGOT_PASSWORD_VALID_TIME_MS = 1000 * 60 * 60 * 3; // 3 hours
export const FORGOT_PASSWORD_VALID_TIME_HUMAN_READABLE = "3 hours";
