import { tryCatch, validateFormValues } from "../../../utils";
import { Box, Button, Flex, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FormInput } from "../../../ui/Form/form-input";
import { AuthFormType } from "../../../enums";
import { loginSchema, registerSchema } from "./validation.schema";
import { useCreateUserMutation, useLoginUserMutation } from "../../../redux/api/components/authApi";
import { showSuccesToast } from "../form.toast";
import { UserCreateForm, UserLoginForm } from "../../../types/user";

export interface AuthFormProps {
	type: AuthFormType;
	onClose: () => void;
}

export interface AuthFormValues {
	username: string;
	password: string;
	confirm_password?: string;
}

export const AuthForm: React.FunctionComponent<AuthFormProps> = ({ type, onClose }) => {
	const validate = validateFormValues(type === AuthFormType.LOGIN ? loginSchema : registerSchema);
	const [createUserMutation] = useCreateUserMutation();
	const [loginUserMutation] = useLoginUserMutation();
	const toast = useToast();

	const onSubmit = async ({ username, password, confirm_password }: AuthFormValues): Promise<void> => {
		await tryCatch(async () => {
			if (type === AuthFormType.REGISTER) {
				await createUserMutation({ username, password, confirm_password } as UserCreateForm).unwrap();
				showSuccesToast(toast, "User created successfully");
			} else {
				await loginUserMutation({ username, password } as UserLoginForm).unwrap();
				showSuccesToast(toast, "User logined successfully");
			}
			onClose();
		}, toast);
	};

	return (
		<Flex align="center" justify="center">
			<Box bg="white" p={6} rounded="md">
				<Formik
					initialValues={{
						username: "",
						password: "",
						confirm_password: type === AuthFormType.REGISTER ? "" : undefined,
					}}
					validate={validate}
					onSubmit={onSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<VStack spacing={4} align="flex-start">
								<Heading size={"md"} color={"purple"} textTransform={"uppercase"}>
									{type === AuthFormType.LOGIN ? "login" : "sign up"}
								</Heading>
								<FormInput name="username" placeholder="Username" Component={Input} label="Username" />
								<FormInput
									name="password"
									placeholder="Password"
									Component={Input}
									label="Password"
									type="password"
								/>
								{type === AuthFormType.REGISTER && (
									<FormInput
										name="confirm_password"
										placeholder="Repeat password"
										Component={Input}
										label="Repeat password"
										type="password"
									/>
								)}
								<Button
									type="submit"
									colorScheme={"purple"}
									width="fit-content"
									alignSelf={"center"}
									isLoading={isSubmitting}>
									{type === AuthFormType.LOGIN ? "Login" : "Sign Up"}
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};
