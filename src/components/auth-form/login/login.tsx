import { useCallback, useState } from "react";
import { isEmail } from "../../../utils/validation";
import type { LoginRequest } from "../../../constant/types";
import type { AuthView } from "../auth-form";
import type { AuthStatus } from "../../../api/auth-context";
import FormInfo from "../form-info";
import TextInput from "../../input/text/text-input";
import PasswordInput from "../../input/password/password-input";

type LoginProps = {
	user: LoginRequest | undefined;
	status: AuthStatus | null;
	clearStatus: () => void;
	onLogin: (property: keyof LoginRequest, value: string | undefined) => void;
	goTo: (view: AuthView) => void;
	onSubmit: () => Promise<void>;
};

function Login({
	user,
	status,
	clearStatus,
	onLogin,
	goTo,
	onSubmit,
}: LoginProps) {
	const [validLoginEmail, setLoginEmailValid] = useState<boolean>(true);

	const handleEmail = useCallback(
		(value: string) => {
			onLogin("email", value);
			setLoginEmailValid(isEmail(value));
		},
		[onLogin],
	);

	const handlePassword = useCallback(
		(value: string) => {
			onLogin("password", value);
		},
		[onLogin],
	);
	return (
		<form
			id={"auth"}
			className="p-8 growDown relative"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
		>
			{status && status.id === "login" && status.type === "error" && (
				<FormInfo
					message={status.message}
					onClose={clearStatus}
					status={status.type}
				/>
			)}

			<div className="mb-4">
				<TextInput
					value={user?.email}
					onChange={(value) => {
						handleEmail(value);
					}}
					valid={validLoginEmail}
					label={"Email"}
					type={"email"}
					placeholder="Skriv din email"
				/>
				<PasswordInput
					value={user?.password}
					onChange={(value) => {
						handlePassword(value);
					}}
					label={"Lösenord"}
				/>
			</div>

			<a className="flex justify-end items-center mb-3" href="#">
				<p className="text-xl text-gray-600 cursor-pointer hover:-translate-y-0.5">
					Glömt lösenord?
				</p>
			</a>
			<button className="w-full p-3 text-3xl py-4 bg-(--color-yellow) text-white rounded-md font-bold cursor-pointer transition-all duration-300 hover:bg-(--color-yellow) hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none">
				LOGGA IN
			</button>

			<p className="text-center text-gray-600 text-xl mt-6">
				Inget konto?{" "}
				<button
					className="text-xl cursor-pointer hover:-translate-y-0.5"
					onClick={(e) => {
						e.preventDefault();
						goTo("signup");
					}}
				>
					Skapa nytt konto
				</button>
			</p>
		</form>
	);
}

export default Login;
