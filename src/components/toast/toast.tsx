import { AnimatePresence } from "framer-motion";
import { ToastItem } from "./toast-item";
import type { Toast } from "../../contexts/toast/toast-modal-context";

type Props = {
	toasts: Toast[];
	onClose: (id: string) => void;
};

export function Toast({ toasts, onClose }: Props) {
	return (
		<ul className="fixed right-1 top-32 lg:top-5 flex flex-col gap-3 z-50">
			<AnimatePresence>
				{toasts.map((toast) => (
					<ToastItem key={toast.id} toast={toast} onClose={onClose} />
				))}
			</AnimatePresence>
		</ul>
	);
}
