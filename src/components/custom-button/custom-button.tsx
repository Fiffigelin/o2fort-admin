type CustomButtonProps = {
	type?: "button" | "submit";
	variant?: "primary" | "secondary";
	title: string;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
};

export function CustomButton({
	type = "button",
	variant = "primary",
	title,
	disabled = false,
	className,
	onClick,
}: CustomButtonProps) {
	const typeClass =
		variant === "primary"
			? `text-white border ${disabled ? "bg-(--color-yellow)/60" : "bg-(--color-yellow)/80 hover:bg-(--color-yellow)"}`
			: `bg-white border ${disabled ? "border-(--color-accent)/50 text-(--color-accent)/50" : "border-(--color-accent)/80 text-(--color-accent)/80 hover:border-(--color-accent) hover:text-(--color-accent)"}`;

	return (
		<button
			key={type}
			disabled={disabled}
			className={`${className} w-full p-3 text-3xl py-4 rounded-md font-bold ${!disabled && "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"}  ${typeClass}`}
			onClick={onClick}
		>
			{title}
		</button>
	);
}
