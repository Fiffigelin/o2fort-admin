import React, { useState } from "react";

interface BarChartProps {
	chartData?: number[];
	numTicks?: number;
}

const MONTH_NAMES = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Maj",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dec",
];

export default function ActivityChart({
	chartData = [50, 10, 2, 20, 45, 36, 0],
	numTicks = 5,
}: BarChartProps) {
	const [tooltip, setTooltip] = useState<{
		open: boolean;
		value: number;
		x: number;
		y: number;
	}>({
		open: false,
		value: 0,
		x: 0,
		y: 0,
	});
	const today = new Date();
	const currentMonthIndex = today.getMonth();

	const labels = Array.from({ length: 8 }, (_, i) => {
		const monthIndex = (currentMonthIndex - 6 + 1 + i + 12) % 12;
		return MONTH_NAMES[monthIndex];
	});

	const maxValue = Math.max(...chartData);
	const rawStep = maxValue / numTicks;
	const step = niceStep(rawStep);
	const yAxisMax = step * numTicks;
	const tickValues = Array.from(
		{ length: numTicks + 1 },
		(_, i) => i * step,
	).reverse();

	const showTooltip = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		value: number,
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setTooltip({
			open: true,
			value,
			x: rect.left + rect.width / 2,
			y: rect.top - 32,
		});
	};

	function niceStep(value: number) {
		const magnitude = Math.pow(10, Math.floor(Math.log10(value))); // t.ex. 45 → 10
		const residual = value / magnitude;
		if (residual <= 1) return 1 * magnitude;
		if (residual <= 2) return 2 * magnitude;
		if (residual <= 5) return 5 * magnitude;
		return 10 * magnitude;
	}

	const hideTooltip = () => {
		setTooltip({ open: false, value: 0, x: 0, y: 0 });
	};

	return (
		<div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-10 bg-[#ffffff] rounded-lg shadow">
			{/* Header */}
			<div className="mb-4 flex justify-between">
				<h3 className="text-lg font-semibold text-gray-800">Antal Events</h3>
				<div className="flex gap-4 items-center">
					<p className="text-sm text-gray-600">Månadsvis aktivitet</p>
					<p className="bg-(--color-yellow) h-2 w-2 rounded-full"></p>
				</div>
			</div>

			{/* Chart */}
			<div className="flex">
				{/* Y-axis */}
				<div className="flex flex-col justify-between mr-4 h-[200px] text-sm text-gray-600">
					{tickValues.map((tick, idx) => (
						<div
							key={idx}
							className="relative flex items-center h-[calc(100%/(numTicks))]"
						>
							<span className="-left-12 w-full text-right">{tick}</span>
						</div>
					))}
				</div>

				{/* Bars + background lines */}
				<div
					className="relative flex-1 flex items-end h-[200px] w-full"
					style={{
						background: `repeating-linear-gradient(to bottom, #eee, #eee 1px, #fff 1px, #fff ${100 / numTicks}%)`,
					}}
				>
					{chartData.map((value, idx) => {
						const barHeight = (value / yAxisMax) * 200;
						return (
							<div key={idx} className="flex-1 px-2 relative cursor-pointer">
								<div
									className="bg-(--color-yellow) hover:bg-(--yellow-accent) w-full rounded-md transition-all relative z-10"
									style={{ height: `${barHeight}px` }}
									onMouseEnter={(e) => showTooltip(e, value)}
									onMouseLeave={hideTooltip}
								/>
								{/* Labels */}
								<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-gray-700 text-sm text-center">
									{labels[idx]}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Tooltip */}
			{tooltip.open && (
				<div
					className="absolute bg-[#ffffff] text-sm shadow-md px-2 py-1 rounded z-20"
					style={{ left: tooltip.x, top: tooltip.y }}
				>
					{tooltip.value}
				</div>
			)}
		</div>
	);
}
