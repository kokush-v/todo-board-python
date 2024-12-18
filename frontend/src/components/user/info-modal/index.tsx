import { Input, HStack, VStack, Button, Spinner } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FormInput } from "../../../ui/Form/form-input";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { validateFormValues } from "../../../utils";
import { editUsernameSchema } from "./validation.schema";
import { setUser } from "../../../redux/slice/authSlice";
import { APP_KEYS } from "../../../consts";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
import { setBoard } from "../../../redux/slice/boardSlice";
import { useUpdateUserMutation } from "../../../redux/api/components/authApi";

const UserInfoComponent: React.FunctionComponent = () => {
	const validate = validateFormValues(editUsernameSchema);
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const [updateUserMutation, { isLoading }] = useUpdateUserMutation();

	return (
		<VStack>
			<Formik
				initialValues={{
					username: user?.username || "",
					isEditing: false,
				}}
				validate={validate}
				onSubmit={async (values) => {
					await updateUserMutation({ username: values.username }).unwrap();
				}}>
				{({ values, setValues, submitForm }) => (
					<Form>
						<HStack spacing={4}>
							<FormInput
								isDisabled={!values.isEditing}
								name="username"
								placeholder="Username"
								label="Username"
								Component={Input}
								actionButtonComponent={
									isLoading ? (
										<Spinner />
									) : values.isEditing ? (
										<CheckIcon
											className="cursor-pointer"
											onClick={() => {
												setValues({ ...values, isEditing: false });
												submitForm();
											}}
										/>
									) : (
										<EditIcon
											className="cursor-pointer"
											onClick={() => {
												setValues({ ...values, isEditing: true });
											}}
										/>
									)
								}
							/>
						</HStack>
					</Form>
				)}
			</Formik>
			<Button
				onClick={() => {
					dispatch(setUser(null));
					dispatch(setBoard(null));
					localStorage.removeItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN);
				}}
				colorScheme={"red"}
				width="fit-content"
				alignSelf={"center"}>
				Logout
			</Button>
		</VStack>
	);
};

export default UserInfoComponent;
