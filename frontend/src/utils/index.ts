import { animate, MotionValue, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { APP_KEYS } from "../consts";
import { BoardWithPermissions } from "../types/board";
import { showErrorToast, showErrorToastWithText } from "../components/forms/form.toast";
import { CreateToastFnReturn } from "@chakra-ui/react";
import { setIn } from "formik";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";
import { isHttpError } from "../types/error";

export function useRaisedShadow(value: MotionValue<number>) {
	const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";
	const boxShadow = useMotionValue(inactiveShadow);

	useEffect(() => {
		let isActive = false;
		value.onChange((latest) => {
			const wasActive = isActive;
			if (latest !== 0) {
				isActive = true;
				if (isActive !== wasActive) {
					animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
				}
			} else {
				isActive = false;
				if (isActive !== wasActive) {
					animate(boxShadow, inactiveShadow);
				}
			}
		});
	}, [value, boxShadow]);

	return boxShadow;
}

export const getBoardData = (): BoardWithPermissions | null => {
	const data = localStorage.getItem(APP_KEYS.STORAGE_KEYS.BOARD_DATA);
	return data ? JSON.parse(data) : null;
};

export const validateFormValues =
	<T extends Maybe<AnyObject>>(schema: ObjectSchema<T> | (() => ObjectSchema<T>)) =>
	(values: T): Partial<Record<keyof T, string>> => {
		if (typeof schema === "function") {
			schema = schema();
		}
		try {
			schema.validateSync(values, { abortEarly: false });
			return {};
		} catch (err) {
			if (err instanceof ValidationError) {
				const errors = err.inner.reduce(
					(formError: Partial<Record<keyof T, string>>, innerError: ValidationError) => {
						return setIn(formError, innerError.path as keyof T as string, innerError.message);
					},
					{}
				);
				return errors;
			}
			throw err;
		}
	};

export const tryCatch = async (fn: () => unknown, toast: CreateToastFnReturn): Promise<void> => {
	try {
		await fn();
	} catch (error) {
		if (isHttpError(error)) {
			showErrorToastWithText(toast, error.data.error);
		} else {
			showErrorToast(toast);
		}
	}
};
