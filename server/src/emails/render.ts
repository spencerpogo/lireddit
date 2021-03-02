//import juice from "juice";
import { join as pathJoin } from "path";
import { compileFile } from "pug";

function compileEmailTemplate(dir: string) {
  const path = pathJoin("src", "emails", dir, "html.pug");
  return compileFile(path);
}

const forgotPassword = compileEmailTemplate("forgot-password");

export function renderEmail() {
  console.log(forgotPassword);
  //juice({});
}
