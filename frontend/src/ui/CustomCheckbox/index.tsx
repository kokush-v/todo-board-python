import "./style.scss";

interface CustomCheckboxProps {
	checked: boolean;
	valueForTrue: string;
	valueForFalse: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FunctionComponent<CustomCheckboxProps> = ({
	valueForFalse,
	valueForTrue,
	onChange,
	checked,
}) => {
	return (
		<>
			<label htmlFor="filter" className="switch rounded" aria-label="Toggle Filter">
				<input type="checkbox" id="filter" defaultChecked={checked} onChange={onChange} />
				<span>{valueForFalse}</span>
				<span>{valueForTrue}</span>
			</label>
		</>
	);
};

export default CustomCheckbox;
