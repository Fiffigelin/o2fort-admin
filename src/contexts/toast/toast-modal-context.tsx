import { createContext, useContext, useState } from "react";
import type { EventModel } from "../../constant/types";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
	id: string;
	type: ToastType;
	message: string;
};

export type Modal = {
	id: string;
	title: string;
	text: string;
	onConfirm: () => void;
};

type ToastModalContextType = {
	// Toast
	showToast: (type: ToastType, message: string) => void;
	removeToast: (id: string) => void;
	toasts: Toast[];

	// Modal
	showModal: (modal: Omit<Modal, "id">) => void;
	closeModal: () => void;
	isModalVisible: boolean;
	modal?: Modal;
};

const ToastModalContext = createContext<ToastModalContextType | null>(null);

export function ToastModalProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [modal, setModal] = useState<Modal | undefined>(undefined);
	const [isModalVisible, setIsModalVisible] = useState(false);

	// -------- Toast --------
	const showToast = (type: ToastType, message: string) => {
		const id = crypto.randomUUID();
		setToasts((prev) => [...prev, { id, type, message }]);

		setTimeout(() => removeToast(id), 5000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	// -------- Modal --------
	const showModal = (modalData: Omit<Modal, "id">) => {
		const id = crypto.randomUUID();
		setModal({ ...modalData, id });
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setModal(undefined);
	};

	return (
		<ToastModalContext.Provider
			value={{
				toasts,
				showToast,
				removeToast,
				modal,
				showModal,
				closeModal,
				isModalVisible,
			}}
		>
			{children}
		</ToastModalContext.Provider>
	);
}

export function useToastModalContext() {
	const ctx = useContext(ToastModalContext);
	if (!ctx)
		throw new Error(
			"useToastModalContext must be used inside ToastModalProvider",
		);
	return ctx;
}
