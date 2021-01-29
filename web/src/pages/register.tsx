import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputField from "src/components/InputField";
import Wrapper from "src/components/Wrapper";

export interface RegisterProps {}

export const Register: FC<RegisterProps> = ({}: RegisterProps) => {
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
                type="password"
              />
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
