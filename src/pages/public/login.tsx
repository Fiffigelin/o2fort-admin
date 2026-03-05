import { useCallback, useState } from "react";
import type { LoginRequest } from "../../constant/types";
import { useAuth } from "../../api/auth-context";
import AuthForm from "../../components/auth-form/auth-form";

function Login() {
	const [loginUser, setLoginUser] = useState<LoginRequest>({
		email: "",
		password: "",
	});
	const { login, loading, status, clearStatus } = useAuth();

	const handleLogin = useCallback(
		(property: keyof LoginRequest, value: string | undefined) => {
			setLoginUser((prevState) => {
				return {
					...prevState,
					[property]: value,
				};
			});
		},
		[],
	);

	const handleSubmitLogin = useCallback(async () => {
		await login(loginUser.email, loginUser.password);
	}, [login, loginUser]);

	return (
		<section className="flex justify-center min-h-screen md:pt-30">
			<AuthForm
				loginUser={loginUser}
				loading={loading}
				status={status}
				clearStatus={clearStatus}
				onLogin={handleLogin}
				onSubmitLogin={handleSubmitLogin}
			/>
		</section>
	);
}

export default Login;
