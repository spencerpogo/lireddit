import { withUrqlClient } from "next-urql";
import { FC } from "react";
import NavBar from "src/components/NavBar";
import { createUrqlClient } from "src/utils/createUrqlClient";

export interface IndexProps {}

export const Index: FC<IndexProps> = ({}: IndexProps) => {
  return (
    <>
      <NavBar />
      <div>Hello world</div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
