declare module "declassify" {
  export interface Options {
    ignore: (string | RegExp)[];
    attrs: string[];
  }

  export function process(html: string, options?: Options): string;
}
