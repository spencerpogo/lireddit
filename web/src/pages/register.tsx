import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, InputRightElement } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import InputField from "src/components/InputField";
import Wrapper from "src/components/Wrapper";

export interface RegisterProps {}

export const Register: FC<RegisterProps> = ({}: RegisterProps) => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  return (
    <Wrapper small={true}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(data) => console.log(data)}
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
                pr="1.5rem"
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
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
