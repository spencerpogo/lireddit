import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, InputRightElement } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import InputField from "src/components/InputField";
import Wrapper from "src/components/Wrapper";
import { useMutation } from "urql";

export interface RegisterProps {}

const REGISTER_MUTATION = `mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    user {
      username
      id
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
`;

export const Register: FC<RegisterProps> = ({}: RegisterProps) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  return (
    <Wrapper small={true}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          return register(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
