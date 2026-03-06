import { useState } from "react";

type AuthProps = {
	value: string | undefined;
	label: string;
	type?: "text" | "email";
	placeholder?: string;
	onChange: (value: string) => void;
	valid?: boolean;
	errorMessage?: string;
};

function TextInput({
	value,
	label,
	type = "text",
	placeholder = "",
	onChange,
	valid = true,
	errorMessage = "",
}: AuthProps) {
	const [touched, setTouched] = useState(false);
	const [isValid, setIsValid] = useState(valid);
	const showError = touched && !isValid;

	function handleOnChange(value: string) {
		onChange(value);

		if (value.length === 0 || value.length > 2) {
			setTouched(false);
			setIsValid(true);
		} else if (touched) {
			setIsValid(false);
		}
	}

	return (
		<div className="min-w-64 w-full box-content relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{label}
			</label>

			<div
				className={`flex items-center bg-white h-12 border rounded border-gray-500/30 w-full ${showError && "ring-1 ring-red-300 border-red-500"} ${valid && "focus-within:ring-1 focus-within:ring-(--color-yellow)"}`}
			>
				<input
					id={type}
					value={value}
					type={type}
					className="px-2 w-full h-full text-lg outline-none text-gray-500 bg-transparent"
					placeholder={placeholder}
					onChange={(e) => handleOnChange(e.target.value)}
					onBlur={() => setTouched(true)}
					required
				/>
			</div>
			<p
				className={`ml-1 text-[8px] h-3 ${showError ? "text-red-600" : "invisible"}`}
			>
				{errorMessage || " "}
			</p>
		</div>
	);
}

export default TextInput;
