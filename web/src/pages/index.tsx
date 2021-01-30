import { FC } from "react";
import NavBar from "src/components/NavBar";

export interface IndexProps {}

export const Index: FC<IndexProps> = ({}: IndexProps) => {
  return (
    <>
      <NavBar />
      <div>Hello world</div>
    </>
  );
};

export default Index;
