import { EMail } from "src/types/mail";

interface ForgotPasswordValues {
  token: string;
}

export function forgotPasswordMail(values: ForgotPasswordValues): EMail {
  return { html: "", text: "" };
}
