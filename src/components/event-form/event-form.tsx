import type { Time, UpdateEvent } from "../../constant/types";
import TextInput from "../input/text/text-input";
import Datepicker from "../date-picker/date-picker";
import TimePicker from "../time-picker/time-picker";
import { useState, useMemo } from "react";
import {
	createDuration,
	createStartDate,
	isEndTimeAfterStartTime,
} from "../../utils/time-handler";
import { CustomButton } from "../custom-button/custom-button";
import FormInfo from "../auth-form/form-info";

type EventFormProps = {
	initialEvent: UpdateEvent;
	onSubmit: (event: UpdateEvent) => void;
	onAbort: (event: UpdateEvent) => void;
};

type ValidType = {
	title: boolean;
	date: boolean;
};

export default function EventForm({
	initialEvent,
	onSubmit,
	onAbort,
}: EventFormProps) {
	// --- State ---
	const [title, setTitle] = useState(initialEvent.title);
	const [date, setDate] = useState<Date>(initialEvent.startAt);
	const [start, setStartTime] = useState<Time | null>(initialEvent.time.start);
	const [end, setEndTime] = useState<Time | null>(initialEvent.time.end);

	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	const [isTypeValid, setIsTypeValid] = useState<ValidType>({
		title: initialEvent.title.trim().length > 2,
		date: !!initialEvent.startAt,
	});

	// --- Computed values ---
	const isTimeValid = useMemo(
		() => (start && end ? isEndTimeAfterStartTime(start, end) : false),
		[start, end],
	);

	const isValid = useMemo(
		() =>
			isTypeValid.title &&
			isTypeValid.date &&
			!!date &&
			!!start &&
			!!end &&
			isTimeValid &&
			!!initialEvent.image,
		[isTypeValid, date, start, end, isTimeValid, initialEvent.image],
	);

	// --- Handlers ---
	const handleCloseInfo = () => setShowInfo(false);

	const handleTitleChange = (value: string) => {
		setTitle(value);
		setIsTypeValid((prev) => ({
			...prev,
			title: value.trim().length > 2,
		}));
	};

	const handleDateChange = (value: Date) => {
		setDate(value);
		setIsTypeValid((prev) => ({ ...prev, date: !!value }));
	};

	const handleTimeChange = (type: "start" | "end", time: Time) => {
		if (time.hour === null || time.minute === null) {
			type === "start" ? setStartTime(null) : setEndTime(null);
			return;
		}
		type === "start" ? setStartTime(time) : setEndTime(time);
	};

	const handleSubmit = () => {
		setHasSubmitted(true);

		if (!date || !start) return;

		const updatedEvent: UpdateEvent = {
			...initialEvent,
			title,
			startAt: createStartDate(date, start),
			durationMinutes: end
				? createDuration(createStartDate(date, start), date, end)
				: 0,
		};

		if (isValid) {
			onSubmit(updatedEvent);
		} else {
			setShowInfo(true);
		}
	};

	return (
		<div className="grid grid-cols-4 w-full gap-3 pb-10 lg:gap-6">
			{/* Felmeddelande */}
			{hasSubmitted && !isValid && showInfo && (
				<FormInfo
					message="Evenemang behöver titel, datum och tid"
					onClose={handleCloseInfo}
					status="error"
					className="col-span-4"
				/>
			)}

			{/* Titel */}
			<div className="col-span-4">
				<TextInput
					key="title"
					value={title}
					label="Titel"
					onChange={handleTitleChange}
					valid={isTypeValid.title}
					errorMessage="Behöver en titel på minst 3 tecken"
				/>
			</div>

			{/* Datum */}
			<div className="col-span-4 md:col-span-2">
				<Datepicker
					initialDate={date ?? new Date()}
					onChange={handleDateChange}
				/>
			</div>

			{/* Start- och sluttid */}
			<TimePicker
				title="Starttid"
				type="start"
				initiatedHour={start?.hour}
				initiatedMinutes={start?.minute}
				onChange={(time) => handleTimeChange("start", time)}
				className="col-span-2 md:col-span-1"
			/>
			<TimePicker
				title="Sluttid"
				type="end"
				initiatedHour={end?.hour}
				initiatedMinutes={end?.minute}
				onChange={(time) => handleTimeChange("end", time)}
				className="col-span-2 md:col-span-1"
			/>

			{/* Felmeddelande om tider */}
			{!isTimeValid && (
				<p className="col-span-2 text-red-500">
					Sluttiden måste vara efter starttiden
				</p>
			)}

			{/* Knappar */}
			<CustomButton
				type="button"
				className="col-span-2 md:col-end-4 md:col-span-1"
				onClick={() => onAbort(initialEvent)}
				title="Avbryt"
				variant="secondary"
			/>
			<CustomButton
				type="button"
				className="col-span-2 md:col-end-5 md:col-span-1"
				onClick={handleSubmit}
				title="Spara"
				variant="primary"
			/>
		</div>
	);
}
