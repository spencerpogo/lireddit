import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { createClient, Provider } from "urql";

// TODO: Make this configurable for prod
const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
});

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Refactor to not use provider here
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
