import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

export interface NavBarProps {}

export const NavBar: FC<NavBarProps> = ({}: NavBarProps) => {
  return (
    <Flex bg="tomato" p="4">
      <Box ml="auto">
        <NextLink href="/login">
          <Link mr="2">Login</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default NavBar;
