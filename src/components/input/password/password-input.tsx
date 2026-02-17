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
		<div className="mb-4 relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{label}
			</label>

			<div className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
				<input
					value={value}
					type={showPassword ? "text" : "password"}
					className="w-full p-3 text-lg rounded-l-lg focus:outline-none"
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
