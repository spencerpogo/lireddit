//import juice from "juice";
import { process as declassify } from "declassify";
import juice from "juice";
import { join as pathJoin } from "path";
import { compileFile, compileTemplate, LocalsObject } from "pug";
import {
  FORGOT_PASSWORD_VALID_TIME_HUMAN_READABLE as RESET_TIME,
  SITE_NAME,
} from "../constants";

function compileEmailTemplate(dir: string) {
  const path = pathJoin("src", "emails", dir, "html.pug");
  return compileFile(path);
}

export const forgotPassword: compileTemplate = compileEmailTemplate(
  "forgot-password"
);

export function renderEmail(template: compileTemplate, locals: LocalsObject) {
  const COPYRIGHT_YEAR = new Date().getUTCFullYear();
  return declassify(
    juice(template({ SITE_NAME, COPYRIGHT_YEAR, RESET_TIME, ...locals }))
  );
}
