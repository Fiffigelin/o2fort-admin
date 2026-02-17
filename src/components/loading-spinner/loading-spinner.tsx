const sizeMap: Record<number, string> = {
	8: "w-8 h-8 border-4",
	10: "w-10 h-10 border-6",
	12: "w-12 h-12 border-8",
	16: "w-16 h-16 border-10",
	20: "w-20 h-20 border-12",
	24: "w-24 h-24 border-14",
	32: "w-32 h-32 border-16",
	40: "w-40 h-40 border-18",
};

function LoadingSpinner({ size }: { size: keyof typeof sizeMap }) {
	return (
		<div
			className={`${sizeMap[size]} rounded-full animate-spin
                 border-blue-500 border-t-transparent`}
		/>
	);
}

export default LoadingSpinner;
