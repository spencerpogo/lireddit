import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, InputRightElement } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import InputField from "src/components/InputField";
import Wrapper from "src/components/Wrapper";
import { useLoginMutation } from "src/generated/graphql";
import { toErrorMap } from "src/utils/toErrorMap";

export interface LoginProps {}

export const Login: FC<LoginProps> = ({}: LoginProps) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  return (
    <Wrapper small={true}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          } else {
            setErrors({ username: "Unexpected response from server" });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt="4">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type={passwordShown ? "text" : "password"}
                chakraProps={{ pr: "1.5rem" }}
              >
                <InputRightElement width="1.5rem">
                  <IconButton
                    aria-label={
                      passwordShown ? "Hide password" : "Show password"
                    }
                    icon={passwordShown ? <ViewOffIcon /> : <ViewIcon />}
                    h="1.75rem"
                    size="xs"
                    onClick={() => setPasswordShown((v) => !v)}
                  />
                </InputRightElement>
              </InputField>
            </Box>
            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              mt="4"
              width="100%"
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
