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
		<div className="mb-4 min-w-64 w-full max-w-120 box-content relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{label}
			</label>

			<div className="flex items-center text-sm bg-white h-12 border rounded border-gray-500/30 w-full focus-within:ring-1 focus-within:ring-(--color-yellow)">
				<input
					value={value}
					type={type}
					className="px-2 w-full h-full outline-none text-gray-500 bg-transparent"
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
