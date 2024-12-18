import Select from "react-select";

interface SelectMultiOptions {
	value: string | number;
	label: string;
	role: string;
}
interface InputSelectMultiProps {
	options: SelectMultiOptions[];
	defaultValue: SelectMultiOptions[] | null;
	onChange: (value: SelectMultiOptions[]) => void;
}

const InputSelectMulti = ({ defaultValue, options, onChange }: InputSelectMultiProps) => {
	return (
		<Select
			isMulti
			className="basic-multi-select my-2 w-full p-0"
			classNamePrefix="select"
			styles={{
				option: (styles, { data, isFocused }) => {
					return {
						...styles,
						display: "flex",
						alignItems: "center",
						color: "black",
						backgroundColor: isFocused ? "#f0f0f0" : "white",
						position: "relative",
						":after": {
							content: data.role === "owner" ? `"⭐"` : '""',
							left: "20px",
						},
					};
				},
				clearIndicator: () => ({
					display: "none",
				}),
				multiValueRemove: (styles, { data }) => ({
					...styles,
					display: data.role === "owner" ? "none" : "flex",
				}),
			}}
			options={options}
			defaultValue={defaultValue}
			placeholder={"Add user..."}
			onChange={(value) => {
				if (value) {
					onChange(value as SelectMultiOptions[]);
				}
			}}
		/>
	);
};

export default InputSelectMulti;
