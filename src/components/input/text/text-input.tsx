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
	return (
		<div className="mb-4 relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{label}
			</label>

			<div className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
				<input
					value={value}
					type={type}
					className="w-full text-lg p-3 rounded-lg focus:outline-none"
					placeholder={placeholder}
					onChange={(e) => onChange(e.target.value)}
					required
				/>
			</div>
			{!valid && type === "email" && (
				<p className="text-red-600 text-sm ml-1">{"Fyll i en giltlig epost"}</p>
			)}
		</div>
	);
}

export default TextInput;
