import { useState, useEffect, useRef } from "react";
import { IoMdTime } from "react-icons/io";

export default function Timepicker() {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const [open, setOpen] = useState<"hour" | "minute" | null>(null);
	const [hour, setHour] = useState<number | null>(null);
	const [minute, setMinute] = useState<number | null>(null);

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
	};

	const selectMinute = (m: number) => {
		setMinute(m);
		setOpen(null);
	};

	return (
		<div ref={wrapperRef} className="mb-5 min-w-40 w-full max-w-30 relative">
			<label className="block mb-2 text-xl font-medium text-gray-700">
				Välj starttid
			</label>

			<div className="flex items-center bg-white h-12 border border-gray-500/30 rounded pl-2 w-full">
				<IoMdTime className="p-2 text-gray-700/90" size={38} />

				{/* HOURS */}
				<div className="relative w-1/2">
					<input
						readOnly
						value={format(hour)}
						placeholder="HH"
						onClick={() => setOpen("hour")}
						className="w-full px-2 text-lg h-full outline-none cursor-pointer bg-transparent text-center"
					/>
					{open === "hour" && (
						<div className="absolute left-0 w-full bg-white shadow rounded z-20 max-h-60 overflow-y-scroll no-scrollbar">
							{Array.from({ length: 24 }).map((_, i) => (
								<div
									key={i}
									onClick={() => selectHour(i)}
									className="p-2 hover:bg-gray-100 cursor-pointer text-center"
								>
									{String(i).padStart(2, "0")}
								</div>
							))}
						</div>
					)}
				</div>
				<p>:</p>
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
							{[0, 30].map((m) => (
								<div
									key={m}
									onClick={() => selectMinute(m)}
									className="p-2 hover:bg-gray-100 cursor-pointer"
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
