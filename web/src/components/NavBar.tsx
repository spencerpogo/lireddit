import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { useLogoutMutation, useMeQuery } from "src/generated/graphql";

export interface NavBarProps {}

export const NavBar: FC<NavBarProps> = ({}: NavBarProps) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
    // Fetching
  } else if (data?.me) {
    // User is logged in
    body = (
      <Flex>
        <Box mr="2">{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  } else {
    // User not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr="2">Login</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex bg="tan" p="4">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
