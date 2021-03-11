//import juice from "juice";
import { process as declassify } from "declassify";
import { htmlToText } from "html-to-text";
import juice from "juice";
import { join as pathJoin } from "path";
import { compileFile } from "pug";
import { Email, EmailTemplate } from "src/types/mail";
import {
  FORGOT_PASSWORD_VALID_TIME_HUMAN_READABLE as RESET_TIME,
  SITE_NAME,
} from "../constants";

function compileEmailTemplate(dir: string) {
  const path = pathJoin("src", "emails", dir, "html.pug");
  return compileFile(path);
}

export const forgotPassword: EmailTemplate<{}> = {
  htmlTemplate: compileEmailTemplate("forgot-password"),
  getSubject: () => "Lireddit Password Reset",
};

export function renderEmail<T>(template: EmailTemplate<T>, locals: T): Email {
  const COPYRIGHT_YEAR = new Date().getUTCFullYear();
  const html = declassify(
    juice(
      template.htmlTemplate({
        SITE_NAME,
        COPYRIGHT_YEAR,
        RESET_TIME,
        ...locals,
      })
    )
  );
  const subject = forgotPassword.getSubject(locals);
  const text = htmlToText(html);
  return { subject, html, text };
}
