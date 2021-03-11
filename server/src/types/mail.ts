import { compileTemplate } from "pug";

export interface EmailTemplate<T> {
  htmlTemplate: compileTemplate;
  getSubject: (locals: T) => string;
}

export interface Email {
  subject: string;
  html: string;
  text: string;
}
