import { useState } from "react";
import type { AuthStatus } from "../../api/auth-context";
import type { LoginRequest } from "../../constant/types";
import Login from "./login/login";
import Logo from "/src/assets/logo.png";
import LoadingSpinner from "../loading-spinner/loading-spinner";

export type AuthView = "login" | "signup";
type AuthFormProps = {
	loginUser: LoginRequest | undefined;
	loading: boolean;
	status: AuthStatus | null;
	clearStatus: () => void;
	onLogin: (property: keyof LoginRequest, value: string | undefined) => void;
	onSubmitLogin: () => Promise<void>;
};

function AuthForm({
	loginUser,
	loading,
	status,
	clearStatus,
	onLogin,
	onSubmitLogin,
}: AuthFormProps) {
	const [view, setView] = useState<AuthView>("login");

	return (
		<div className="w-full md:w-2xl">
			<div className="relative w-full h-full md:h-auto bg-white md:rounded-xl shadow-xl overflow-hidden">
				<div className="flex flex-col justify-center items-center md:rounded-t-xl bg-(--color-background) py-8">
					<img src={Logo} alt="Oscar II Fort Logo" />
					<h2
						className="font-bold text-center text-(--color-text-primary) mb-2"
						style={{ fontFamily: "Capture, serif" }}
					>
						Oscar II Fort Admin
					</h2>
				</div>
				{view === "login" && (
					<Login
						user={loginUser}
						status={status}
						clearStatus={clearStatus}
						onLogin={onLogin}
						goTo={setView}
						onSubmit={onSubmitLogin}
					/>
				)}
				{view === "signup" && (
					// Ska man kunna registrera sig som användare eller ska det skötas inom systemet?
					<div className="flex flex-row h-20 p-4 items-center justify-center gap-2 text-xl">
						<button
							className="text-blue-500 font-medium cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								setView("login");
							}}
						>
							{"<Tillbaka"}
						</button>
						<p>Inget här än</p>
					</div>
				)}
				{loading && (
					<div
						className="absolute inset-0 z-50 flex items-center justify-center
                          bg-white/10 backdrop-blur-sm"
					>
						<LoadingSpinner size={24} />
					</div>
				)}
			</div>
		</div>
	);
}

export default AuthForm;
