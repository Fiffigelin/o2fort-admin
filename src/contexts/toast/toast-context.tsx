import { createContext, useContext, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
	id: string;
	type: ToastType;
	message: string;
};

type ToastContextType = {
	showToast: (type: ToastType, message: string) => void;
	remove: (id: string) => void;
	toasts: Toast[];
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = (type: ToastType, message: string) => {
		const id = crypto.randomUUID();

		setToasts((prev) => [...prev, { id, type, message }]);

		setTimeout(() => {
			remove(id);
		}, 5000);
	};

	const remove = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<ToastContext.Provider value={{ showToast, remove, toasts }}>
			{children}
		</ToastContext.Provider>
	);
}

export function useToastContext() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used inside provider");
	return ctx;
}
