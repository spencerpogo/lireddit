import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export interface WrapperProps {
  small?: boolean;
}

export const Wrapper: FC<WrapperProps> = ({
  children,
  small = false,
}: PropsWithChildren<WrapperProps>) => {
  return (
    <Box maxW={small ? "400px" : "800px"} w="100%" mt="8" mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
