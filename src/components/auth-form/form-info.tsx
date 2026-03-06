import { BiSolidError } from "react-icons/bi";
import { LuPartyPopper } from "react-icons/lu";
import { MdClose } from "react-icons/md";

type FormInfoProps = {
	message: string | undefined;
	status: "error" | "success";
	onClose: () => void;
	className?: string;
};

function FormInfo({ message, status, onClose, className = "" }: FormInfoProps) {
	const text = status === "success" ? "text-green-950" : "text-red-950";
	const background =
		status === "success"
			? "bg-green-300 border-green-800"
			: "bg-red-300 border-red-800";
	return (
		<div
			className={`flex ${background} border-l-4 mb-6 p-2 gap-3 items-center ${className}`}
		>
			{status === "success" ? (
				<LuPartyPopper size={24} className="text-green-800" />
			) : (
				<BiSolidError size={24} className="text-red-800" />
			)}
			<p className={`font-semibold grow ${text}`}>{message}</p>
			<MdClose
				size={22}
				className="cursor-pointer r-0 mr-1"
				onClick={onClose}
			/>
		</div>
	);
}

export default FormInfo;
