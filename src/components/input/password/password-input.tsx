import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type AuthProps = {
	value: string | undefined;
	label: string;
	onChange: (value: string) => void;
};

function PasswordInput({ value, label, onChange }: AuthProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	return (
		<div className="mb-4 min-w-64 w-full box-content relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{label}
			</label>

			<div className="flex items-center bg-white h-12 border rounded border-gray-500/30 w-full focus-within:ring-1 focus-within:ring-(--color-yellow)">
				<input
					value={value}
					type={showPassword ? "text" : "password"}
					className="px-2 w-full h-full text-lg outline-none text-gray-500 bg-transparent"
					placeholder="Skriv ditt lösenord"
					onChange={(e) => onChange(e.target.value)}
					required
				/>
				<span
					className="cursor-pointer text-black p-3 flex items-center"
					onClick={handleShowPassword}
				>
					{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
				</span>
			</div>
		</div>
	);
}

export default PasswordInput;
