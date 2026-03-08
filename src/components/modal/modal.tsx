import { motion, AnimatePresence } from "motion/react";
import {
	useToastModalContext,
	type Modal,
} from "../../contexts/toast/toast-modal-context";
import { CustomButton } from "../custom-button/custom-button";

type ModalProps = {
	modalItem: Modal | undefined;
	isVisible: boolean;
};

export default function Modal({ modalItem, isVisible }: ModalProps) {
	const { closeModal } = useToastModalContext();

	const handleConfirm = () => {
		modalItem?.onConfirm();
		closeModal();
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="absolute inset-0 h-screen w-full bg-black/50 z-50 flex items-center justify-center"
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="bg-[#ffffff] shadow-xl/30 rounded p-8 w-full max-w-xl"
					>
						<h3 className="text-lg font-bold mb-2">{modalItem?.title}</h3>
						<p className="mb-4">{modalItem?.text}</p>
						<div className="flex justify-end gap-4">
							<CustomButton
								title="Avbryt"
								variant="secondary"
								onClick={closeModal}
							/>
							<CustomButton
								title="Ta bort"
								variant="warning"
								onClick={handleConfirm}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
