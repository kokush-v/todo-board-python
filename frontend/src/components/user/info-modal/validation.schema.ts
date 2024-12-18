import * as Yup from "yup";

export const editUsernameSchema = Yup.object().shape({
	username: Yup.string().required("Required"),
});
