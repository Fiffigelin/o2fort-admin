import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { supabase } from "./supabase-client";
import type { User } from "@supabase/supabase-js";

export type AuthStatus = {
	type: "success" | "error";
	message?: string;
	id: "login" | "register";
};

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;

	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;

	loading: boolean;
	error: string | null;

	status: AuthStatus | null;
	clearStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [status, setStatus] = useState<AuthStatus | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setUser(data?.session?.user ?? null);
		});

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
			},
		);

		return () => listener.subscription.unsubscribe();
	}, []);

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				setError(error.message);
				setStatus({
					type: "error",
					message: "Felaktiga loginuppgifter. Var god försök igen.",
					id: "login",
				});
				throw error;
			}
			setStatus({ type: "success", message: "Inloggad!", id: "login" });
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await supabase.auth.signOut();
			setUser(null);
			setStatus({ type: "success", message: "Utloggad!", id: "login" });
		} catch (err: any) {
			setError(err.message);
			setStatus({ type: "error", message: err.message, id: "login" });
		} finally {
			setLoading(false);
		}
	};

	const clearStatus = () => setStatus(null);

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
				loading,
				error,
				status,
				clearStatus,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
