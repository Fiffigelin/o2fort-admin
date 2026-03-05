import { useState } from "react";

type AuthProps = {
	value: string | undefined;
	label: string;
	type?: "text" | "email";
	placeholder?: string;
	onChange: (value: string) => void;
	valid?: boolean;
};

function TextInput({
	value,
	label,
	type = "text",
	placeholder = "",
	onChange,
	valid = true,
}: AuthProps) {
	const [touched, setTouched] = useState(false);

	function handleOnChange(value: string) {
		onChange(value);

		if (value.length < 1) {
			setTouched(false);
		}
	}

	return (
		<div className="mb-4 min-w-64 w-full box-content relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{label}
			</label>

			<div
				className={`flex items-center bg-white h-12 border rounded border-gray-500/30 w-full ${touched && !valid && "ring-1 ring-red-300 border-red-500"} ${valid && "focus-within:ring-1 focus-within:ring-(--color-yellow)"}`}
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
			<div className={`${valid && "mb-8"}`}>
				{touched && !valid && type === "email" && (
					<p className="text-red-600 ml-1">{"Fyll i en giltlig epost"}</p>
				)}
			</div>
		</div>
	);
}

export default TextInput;
