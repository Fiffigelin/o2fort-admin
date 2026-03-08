import { RiInformation2Fill } from "react-icons/ri";
import { BiSolidError } from "react-icons/bi";
import { BiParty } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { motion } from "motion/react";
import type { Toast } from "../../contexts/toast/toast-modal-context";

type ToastProps = {
	toast: Toast;
	onClose: (id: string) => void;
};

const styles = {
	success: {
		border: "border-green-500",
		bg: "bg-green-500",
		icon: "text-green-500",
	},
	error: {
		border: "border-red-500",
		bg: "bg-red-500",
		icon: "text-red-500",
	},
	warning: {
		border: "border-yellow-500",
		bg: "bg-yellow-500",
		icon: "text-yellow-500",
	},
	info: {
		border: "border-blue-500",
		bg: "bg-blue-500",
		icon: "text-blue-500",
	},
};

export function ToastItem({ toast, onClose }: ToastProps) {
	const icons = {
		success: <BiParty size={24} className={styles[toast.type].icon} />,
		error: <BiSolidError size={24} className={styles[toast.type].icon} />,
		warning: <BiSolidError size={24} className={styles[toast.type].icon} />,
		info: <RiInformation2Fill size={24} className={styles[toast.type].icon} />,
	};

	return (
		<motion.li
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: -10, opacity: 1 }}
			exit={{ x: 300, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className={`relative flex w-85 md:w-150 xl:w-200 items-center justify-between rounded bg-[#fff] p-4 shadow border-l-6 ${styles[toast.type].border}`}
		>
			<p className="flex flex-row gap-5 items-center">
				{icons[toast.type]}
				<span className="">{toast.message}</span>
			</p>

			<button onClick={() => onClose(toast.id)} className="cursor-pointer">
				<MdOutlineClose size={24} />
			</button>

			<motion.div
				initial={{ width: "100%" }}
				animate={{ width: "0%" }}
				transition={{ duration: 5, ease: "linear" }}
				className={`absolute bottom-0 left-0 h-0.75 ${styles[toast.type].bg}`}
			/>
		</motion.li>
	);
}
