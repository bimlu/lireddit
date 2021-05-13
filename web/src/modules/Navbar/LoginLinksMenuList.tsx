import { Box, Link, Button, MenuList, MenuItem } from "@chakra-ui/react";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

export const LoginLinksMenuList = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let body = null;

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <MenuList>
        <NextLink href="/login">
          <MenuItem as={Link}>login</MenuItem>
        </NextLink>
        <NextLink href="/register">
          <MenuItem as={Link}>register</MenuItem>
        </NextLink>
      </MenuList>
    );
    // user is logged in
  } else {
    body = (
      <MenuList>
        <MenuItem>
          <Box mr={2}>{data.me.username}</Box>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            logout
          </Button>
        </MenuItem>
      </MenuList>
    );
  }

  return <div>{body}</div>;
};
