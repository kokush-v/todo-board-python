import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
	username: Yup.string().required("Required"),
	password: Yup.string().min(4, "Too Short!").max(20, "Too Long!").required("Required"),
	confirm_password: Yup.string()
		.oneOf([Yup.ref("password"), undefined], "Passwords must match")
		.required("Required"),
});

export const loginSchema = Yup.object().shape({
	username: Yup.string().required("Required"),
	password: Yup.string().min(4, "Too Short!").max(20, "Too Long!").required("Required"),
});
