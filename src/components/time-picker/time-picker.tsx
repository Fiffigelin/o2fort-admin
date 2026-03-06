import { useState, useEffect, useRef } from "react";
import { IoMdTime } from "react-icons/io";
import type { Time } from "../../constant/types";

type TimePickerProps = {
	title: string;
	type: "start" | "end";
	onChange: (time: Time) => void;
	initiatedHour?: number;
	initiatedMinutes?: number;
	className?: string;
};
export default function TimePicker({
	title,
	onChange,
	initiatedHour,
	initiatedMinutes,
	className = "",
}: TimePickerProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const [open, setOpen] = useState<"hour" | "minute" | null>(null);
	const [hour, setHour] = useState<number>(initiatedHour || 10);
	const [minute, setMinute] = useState<number>(initiatedMinutes || 0);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!wrapperRef.current?.contains(e.target as Node)) {
				setOpen(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const format = (n: number | null) =>
		n === null ? "--" : String(n).padStart(2, "0");

	const selectHour = (h: number) => {
		setHour(h);
		setOpen("minute");
		onChange({ hour: h, minute: minute });
	};

	const selectMinute = (m: number) => {
		setMinute(m);
		setOpen(null);
		onChange({ hour: hour, minute: m });
	};

	return (
		<div ref={wrapperRef} className={`mb-5 w-full relative ${className}`}>
			<label className="block mb-2 text-xl font-medium text-gray-700">
				{title}
			</label>

			<div
				className={`flex items-center bg-white h-12 border border-gray-500/30 rounded px-4 w-full ${open && "ring-1 ring-(--color-yellow)"}`}
			>
				<IoMdTime className=" text-gray-700/90" size={32} />

				{/* HOURS */}
				<div className="relative w-1/2">
					<input
						readOnly
						value={format(hour)}
						placeholder="HH"
						onClick={() => setOpen("hour")}
						className="w-full px-2 text-xl h-full outline-none cursor-pointer bg-transparent text-center"
					/>
					{open === "hour" && (
						<div className="absolute mt-2.75 left-0 w-full bg-white shadow rounded z-20 max-h-60 overflow-y-scroll no-scrollbar">
							{Array.from({ length: 24 }).map((_, i) => (
								<div
									key={i}
									onClick={() => selectHour(i)}
									className="p-2 text-lg hover:bg-gray-100 cursor-pointer text-center"
								>
									{String(i).padStart(2, "0")}
								</div>
							))}
						</div>
					)}
				</div>
				<p className="m-0">:</p>
				{/* MINUTES */}
				<div className="relative w-1/2">
					<input
						readOnly
						value={format(minute)}
						placeholder="MM"
						onClick={() => setOpen("minute")}
						className="w-full px-2 text-lg h-full outline-none cursor-pointer bg-transparent text-center"
					/>

					{open === "minute" && (
						<div className="absolute top-full left-0 w-full bg-white shadow rounded z-20 text-center">
							{[0, 15, 30, 45].map((m) => (
								<div
									key={m}
									onClick={() => selectMinute(m)}
									className="p-2 text-lg hover:bg-gray-100 cursor-pointer"
								>
									{String(m).padStart(2, "0")}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
