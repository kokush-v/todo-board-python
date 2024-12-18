import { CreateToastFnReturn } from "@chakra-ui/react";

export const showErrorToast = (toast: CreateToastFnReturn) => {
	toast({
		title: "Error",
		description: "Unexpected error from server",
		status: "error",
		duration: 5000,
		isClosable: true,
		position: "top",
	});
};

export const showErrorToastWithText = (toast: CreateToastFnReturn, text: string) => {
	toast({
		title: "Error",
		description: text,
		status: "error",
		duration: 5000,
		isClosable: true,
		position: "top",
	});
};

export const showInfoToast = (toast: CreateToastFnReturn, text: string) => {
	toast({
		title: text,
		status: "info",
		duration: 5000,
		isClosable: true,
		position: "top",
	});
};

export const showSuccesToast = (toast: CreateToastFnReturn, text: string) => {
	toast({
		title: text,
		status: "success",
		duration: 5000,
		isClosable: true,
		position: "top",
	});
};
