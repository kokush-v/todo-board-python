/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
	ComponentWithAs,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	InputProps,
	TextareaProps,
} from "@chakra-ui/react";
import { Field } from "formik";

interface FormInputProps extends InputProps {
	name: string;
	placeholder?: string;
	Component: ComponentWithAs<"input", InputProps> | ComponentWithAs<"textarea", TextareaProps>;
	label?: string;
	actionButtonComponent?: React.ReactNode;
}

export const FormInput: React.FunctionComponent<FormInputProps> = ({
	name,
	placeholder,
	Component,
	actionButtonComponent,
	label,
	type = "text",
	defaultChecked,
	...rest
}) => {
	return (
		<Field name={name}>
			{({ field, meta }: any) => (
				<FormControl isInvalid={meta.touched && !!meta.error}>
					{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
					<HStack>
						<Component
							{...field}
							id={name}
							type={type}
							variant="filled"
							placeholder={placeholder}
							defaultChecked={defaultChecked}
							{...rest}
						/>
						{actionButtonComponent}
					</HStack>
					{meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
				</FormControl>
			)}
		</Field>
	);
};
