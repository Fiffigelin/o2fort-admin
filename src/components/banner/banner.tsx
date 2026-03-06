import { RiInformation2Fill } from "react-icons/ri";
import { BiSolidError } from "react-icons/bi";
import { BiParty } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import type { IconType } from "react-icons";
import type { ReactElement } from "react";
import { motion } from "motion/react";

type BannerProps = {
	type: "success" | "error" | "info";
	title: string;
	onClose: () => void;
	showBanner: boolean;
	className?: string;
};

export function Banner({
	type,
	title,
	onClose,
	showBanner,
	className,
}: BannerProps) {
	function bgColor(value: string): string {
		switch (value) {
			case "success":
				return "bg-green-500";
			case "error":
				return "bg-red-500";
			case "info":
				return "bg-blue-400";
			default:
				return "bg-blue-400";
		}
	}

	function typeIcon(value: string): ReactElement<IconType> {
		switch (value) {
			case "success":
				return <BiParty className="icon-size" />;
			case "error":
				return <BiSolidError className="icon-size" />;
			case "info":
				return <RiInformation2Fill className="icon-size" />;
			default:
				return <RiInformation2Fill className="icon-size" />;
		}
	}

	// TODO
	// skapa state i en context som hanterar banner vid requests

	return (
		<motion.div
			className="relative w-full"
			initial={false}
			animate={{
				x: showBanner ? 0 : 400,
				opacity: showBanner ? 1 : 0,
			}}
			transition={{
				x: {
					type: "spring",
					stiffness: 320,
					damping: 28,
				},
				opacity: {
					duration: 0.2,
					delay: showBanner ? 0 : 0.2,
				},
			}}
		>
			<div
				className={`flex absolute right-0 top-2 lg:top-4 w-full md:max-w-9/12 2xl:max-w-2/4 2xl:min-w-2/5 p-6 md:rounded-l-lg shadow-lg items-center justify-between ${className} ${bgColor(type)}`}
			>
				<div className="flex items-center jusitfy-between gap-3 2xl:gap-6">
					{typeIcon(type)}
					<h3>{title}</h3>
				</div>
				<MdOutlineClose
					className="icon-size hover:-translate-y-0.5 cursor-pointer"
					onClick={onClose}
				/>
			</div>
		</motion.div>
	);
}
