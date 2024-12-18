import Select from "react-select";
import "./style.scss";
import { UserForBoardPermission } from "../../types/user";

interface GroupedOption {
	readonly label: string;
	readonly options: readonly SelectOptions[];
}

export interface SelectOptions {
	value: string | number;
	label: string;
	is_private: boolean;
	permissions: UserForBoardPermission[];
}
interface InputSelectProps {
	options: SelectOptions[];
	defaultValue: SelectOptions | null;
	onChange: (value: SelectOptions) => void;
}

const InputSelect = ({ defaultValue, options, onChange }: InputSelectProps) => {
	return (
		<Select<SelectOptions, false, GroupedOption>
			className="input-select"
			styles={{
				control: (styles) => {
					return { ...styles, backgroundColor: "transparent" };
				},
				option: (styles, { data, isFocused }) => {
					return {
						...styles,
						display: "flex",
						alignItems: "center",
						color: "black",
						backgroundColor: isFocused ? "#f0f0f0" : "white",
						position: "relative",
						":after": {
							content: data.is_private ? `"🔒"` : '""',
							left: "20px",
						},
					};
				},
			}}
			value={defaultValue}
			options={options}
			defaultValue={defaultValue}
			placeholder={"Select board..."}
			onChange={(value) => {
				if (value) {
					onChange(value);
				}
			}}
		/>
	);
};

export default InputSelect;
