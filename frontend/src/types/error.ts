export interface HttpError {
	status: number;
	data: {
		error: string;
	};
}

export function isHttpError(error: unknown): error is HttpError {
	return (
		typeof error === "object" &&
		error !== null &&
		"status" in error &&
		typeof (error as HttpError).status === "number" &&
		"data" in error &&
		typeof (error as HttpError).data === "object" &&
		"error" in (error as HttpError).data &&
		typeof (error as HttpError).data.error === "string"
	);
}
