import { useCallback, useState } from "react";
import { isEmail } from "../../../utils/validation";
import type { LoginRequest } from "../../../constant/types";
import type { AuthView } from "../auth-form";
import type { AuthStatus } from "../../../api/auth-context";
import FormInfo from "../form-info";
import TextInput from "../../input/text/text-input";
import PasswordInput from "../../input/password/password-input";
import { CustomButton } from "../../custom-button/custom-button";

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
			className=" h-full p-8 growDown relative"
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
		>
			{status && status.id === "login" && status.type === "error" && (
				<FormInfo
					key={"info"}
					message={status.message}
					onClose={clearStatus}
					status={status.type}
				/>
			)}

			<div className="mb-8">
				<TextInput
					value={user?.email}
					onChange={(value) => {
						handleEmail(value);
					}}
					valid={validLoginEmail}
					label={"Email"}
					type={"email"}
					placeholder="Skriv din email"
					errorMessage="Fyll i en korrekt email"
				/>
				<PasswordInput
					value={user?.password}
					onChange={(value) => {
						handlePassword(value);
					}}
					label={"Lösenord"}
				/>
				<a className="flex justify-end items-center mb-3" href="#">
					<p className=" text-gray-600 cursor-pointer hover:-translate-y-0.5">
						Glömt lösenord?
					</p>
				</a>
			</div>

			<CustomButton title="LOGGA IN" type="submit" />

			<p className="text-center text-gray-600 text-xl mt-6">
				Inget konto?{" "}
				<button
					className="cursor-pointer hover:-translate-y-0.5"
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
