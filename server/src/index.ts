import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import MIKRO_CONFIG from "./mikro-orm.config";

async function main() {
  const orm = await MikroORM.init(MIKRO_CONFIG);
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: "Hello world!" });
  // await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log(posts);
}

main();
