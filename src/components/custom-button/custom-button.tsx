type CustomButtonProps = {
	type?: "button" | "submit";
	variant?: "primary" | "secondary" | "warning";
	title: string;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
};

const styles = {
	primary: {
		default:
			"text-white border bg-(--color-yellow)/80 hover:bg-(--color-yellow)",
		disabled: "text-white border bg-(--color-yellow)/60",
	},
	secondary: {
		default:
			"border border-(--color-accent)/80 text-(--color-accent)/80 hover:border-(--color-accent) hover:text-(--color-accent)",
		disabled:
			"bg-white border border-(--color-accent)/50 text-(--color-accent)/50",
	},
	warning: {
		default: "text-white border bg-red-500/80 hover:bg-red-500",
		disabled: "text-white border bg-red-500/60",
	},
};

export function CustomButton({
	type = "button",
	variant = "primary",
	title,
	disabled = false,
	className,
	onClick,
}: CustomButtonProps) {
	return (
		<button
			key={type}
			disabled={disabled}
			className={`${className} w-full p-3 text-3xl py-4 rounded-md font-bold ${!disabled && "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"} ${disabled ? styles[variant].disabled : styles[variant].default}`}
			onClick={onClick}
		>
			{title}
		</button>
	);
}
