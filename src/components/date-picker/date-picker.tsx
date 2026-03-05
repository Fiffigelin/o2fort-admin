import { useState, useEffect, useRef } from "react";
import { BsCalendar3 } from "react-icons/bs";

const MONTH_NAMES = [
	"Januari",
	"Februari",
	"Mars",
	"April",
	"Maj",
	"Juni",
	"Juli",
	"Augusti",
	"September",
	"Oktober",
	"November",
	"December",
];
const MONTH_SHORT_NAMES = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Maj",
	"Juni",
	"July",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dec",
];
const DAYS = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];

interface DatepickerProps {
	dateFormat?: "DD-MM-YYYY" | "YYYY-MM-DD" | "D d M, Y";
	initialDate?: Date;
	onChange: (date: Date) => void;
}

export default function Datepicker({
	dateFormat = "DD-MM-YYYY",
	initialDate = new Date(),
	onChange,
}: DatepickerProps) {
	const [showDatepicker, setShowDatepicker] = useState(false);
	const [datepickerValue, setDatepickerValue] = useState("");
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		initialDate ? new Date(initialDate) : null,
	);
	const [month, setMonth] = useState(0);
	const [year, setYear] = useState(0);
	const [noOfDays, setNoOfDays] = useState<number[]>([]);
	const [blankDays, setBlankDays] = useState<number[]>([]);
	const dateInputRef = useRef<HTMLInputElement | null>(null);
	const datepickerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const today = initialDate ? new Date(initialDate) : new Date();
		setMonth(today.getMonth());
		setYear(today.getFullYear());
		setDatepickerValue(formatDateForDisplay(today));
		setSelectedDate(today);
	}, [initialDate]);

	useEffect(() => {
		calculateNoOfDays(month, year);
	}, [month, year]);

	// Hantera mustryck utanför kalendern == den ska stängas
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				datepickerRef.current &&
				!datepickerRef.current.contains(event.target as Node)
			) {
				setShowDatepicker(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const formatDateForDisplay = (date: Date) => {
		const formattedDay = DAYS[date.getDay()];
		const formattedDate = ("0" + date.getDate()).slice(-2);
		const formattedMonthShort = MONTH_SHORT_NAMES[date.getMonth()];
		const formattedMonthNum = ("0" + (date.getMonth() + 1)).slice(-2);
		const formattedYear = date.getFullYear();

		if (dateFormat === "DD-MM-YYYY")
			return `${formattedDate}-${formattedMonthNum}-${formattedYear}`;
		if (dateFormat === "YYYY-MM-DD")
			return `${formattedYear}-${formattedMonthNum}-${formattedDate}`;
		if (dateFormat === "D d M, Y")
			return `${formattedDay} ${formattedDate} ${formattedMonthShort} ${formattedYear}`;
		return `${formattedDay} ${formattedDate} ${formattedMonthShort} ${formattedYear}`;
	};

	const isSelectedDate = (date: number) => {
		if (!selectedDate) return false;
		return (
			selectedDate.getFullYear() === year &&
			selectedDate.getMonth() === month &&
			selectedDate.getDate() === date
		);
	};

	const isToday = (date: number) => {
		const today = new Date();
		return (
			today.getFullYear() === year &&
			today.getMonth() === month &&
			today.getDate() === date
		);
	};

	const getDateValue = (date: number) => {
		const selected = new Date(year, month, date);
		setSelectedDate(selected);
		const formatted = formatDateForDisplay(selected);
		setDatepickerValue(formatted);
		setShowDatepicker(false);

		onChange(selected);
	};

	const calculateNoOfDays = (month: number, year: number) => {
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const dayOfWeek = new Date(year, month).getDay();

		const blanks = Array.from({ length: dayOfWeek }, (_, i) => i);
		const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

		setBlankDays(blanks);
		setNoOfDays(days);
	};

	const prevMonth = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
		} else setMonth(month - 1);
	};

	const nextMonth = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
		} else setMonth(month + 1);
	};

	const handleDatePicker = () => {
		const d = selectedDate ?? new Date();
		setMonth(d.getMonth());
		setYear(d.getFullYear());
		setShowDatepicker(!showDatepicker);
	};

	return (
		<div
			ref={datepickerRef}
			className="mb-5 min-w-64 w-full lg:max-w-120 box-content relative cursor-pointer group"
		>
			<label
				htmlFor="datepicker"
				className="block mb-2 text-xl font-medium text-gray-700"
			>
				Välj datum
			</label>

			<div
				className={`flex items-center text-sm bg-white h-12 border border-gray-500/30 rounded px-4 gap-5 w-full ${showDatepicker && "focus-within:ring-1 focus-within:ring-(--color-yellow)"}`}
				onClick={handleDatePicker}
			>
				<BsCalendar3 className=" text-gray-700/90" size={24} />
				<input
					ref={dateInputRef}
					type="text"
					value={datepickerValue}
					readOnly
					placeholder="Välj eventets datum"
					className="text-xl h-full outline-none text-gray-500 bg-transparent cursor-pointer"
					onKeyDown={(e) => e.key === "Escape" && setShowDatepicker(false)}
				/>
			</div>

			{showDatepicker && (
				<div className="bg-white rounded shadow p-4 absolute top-full left-0 w-full z-10">
					<div className="flex justify-between items-center mb-2">
						<div className="flex gap-3">
							<p className="font-bold text-gray-800">{MONTH_NAMES[month]}</p>
							<p className="ml-1 text-gray-600 font-normal">{year}</p>
						</div>
						<div className="flex gap-2">
							<button
								onClick={prevMonth}
								className="p-1 rounded-full hover:bg-gray-100"
							>
								<svg
									className="h-6 w-6 text-gray-400 cursor-pointer"
									fill="none"
									viewBox="0 0 28 28"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								onClick={nextMonth}
								className="p-1 rounded-full hover:bg-gray-100"
							>
								<svg
									className="h-6 w-6 text-gray-400 cursor-pointer"
									fill="none"
									viewBox="0 0 28 28"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
					</div>

					<div className="flex flex-wrap mb-3 -mx-1">
						{DAYS.map((day, i) => (
							<div key={i} style={{ width: "14.26%" }} className="px-0.5">
								<div className="text-gray-800 font-medium text-center text-lg">
									{day}
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-wrap -mx-1">
						{blankDays.map((_, i) => (
							<div
								key={i}
								style={{ width: "14.28%" }}
								className="text-center border p-1 border-transparent text-sm"
							></div>
						))}
						{noOfDays.map((date, i) => (
							<div key={i} style={{ width: "14.28%" }} className="px-1 mb-1">
								<div
									onClick={() => getDateValue(date)}
									className={`cursor-pointer mx-auto flex items-center justify-center w-8 h-8 rounded-full text-lg transition ease-in-out duration-100 ${
										isToday(date)
											? "bg-indigo-200"
											: isSelectedDate(date)
												? "bg-indigo-500 text-white hover:bg-opacity-75"
												: "text-gray-600 hover:bg-indigo-200"
									}`}
								>
									{date}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
