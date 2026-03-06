import type { NewEvent, Time } from "../../constant/types";
import TextInput from "../input/text/text-input";
import Datepicker from "../date-picker/date-picker";
import TimePicker from "../time-picker/time-picker";
import { useState } from "react";
import {
	createDuration,
	createStartDate,
	isEndTimeAfterStartTime,
} from "../../utils/time-handler";
import { CustomButton } from "../custom-button/custom-button";
import FormInfo from "../auth-form/form-info";

type EventFormProps = {
	initialEvent: NewEvent;
	onSubmit: (event: NewEvent) => void;
	onAbort: () => void;
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
	const [title, setTitle] = useState<string>(initialEvent.title);
	const [date, setDate] = useState<Date>();
	const [start, setStartTime] = useState<Time | null>({ hour: 11, minute: 0 });
	const [end, setEndTime] = useState<Time | null>({ hour: 17, minute: 0 });
	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [isTypeValid, setIsTypeValid] = useState<ValidType>({
		title: false,
		date: false,
	});

	function handleCloseInfo() {
		setShowInfo(false);
	}

	function handleTitleChange(value: string) {
		setTitle(value);

		if (value.length === 0 || value.trim().length > 2) {
			setIsTypeValid((prev) => ({ ...prev, title: true }));
		} else {
			setIsTypeValid((prev) => ({ ...prev, title: false }));
		}
	}

	function handleDateChange(value: Date) {
		setDate(value);

		setIsTypeValid((prev) => ({ ...prev, date: value ? true : false }));
	}

	function handleTimeChange(type: string, time: Time) {
		if (time.hour === null || time.minute === null) {
			type === "start" ? setStartTime(null) : setEndTime(null);
			return;
		}

		type === "start" ? setStartTime(time) : setEndTime(time);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (date && start) {
			initialEvent.start_at = createStartDate(date, start);

			if (end) {
				initialEvent.duration_minutes = createDuration(
					initialEvent.start_at,
					date,
					end,
				);
			}
		}

		initialEvent.title = title;

		if (isValid) {
			onSubmit(initialEvent);
		} else {
			setShowInfo(true);
		}
	}

	const isTimeValid =
		start && end ? isEndTimeAfterStartTime(start, end) : false;

	const isValid =
		isTypeValid.title &&
		isTypeValid.date &&
		!!date &&
		!!start &&
		!!end &&
		isTimeValid &&
		!!initialEvent.image;

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="grid grid-cols-4 w-full gap-3 pb-10 lg:gap-6"
		>
			{showInfo && (
				<FormInfo
					message="Evenemang behöver titel, datum och tid"
					onClose={handleCloseInfo}
					status={"error"}
					className="col-span-4"
				/>
			)}
			<div className="col-span-4">
				<TextInput
					key="title"
					value={title}
					label={"Titel"}
					onChange={(value) => handleTitleChange(value)}
					valid={isTypeValid.title}
					errorMessage="Behöver en titel på 3 tecken eller mer"
				/>
			</div>
			<div className="col-span-4 md:col-span-2">
				<Datepicker
					initialDate={date ?? new Date()}
					onChange={(value) => handleDateChange(value)}
				/>
			</div>
			<TimePicker
				title="Starttid"
				type={"start"}
				initiatedHour={start?.hour}
				initiatedMinutes={start?.minute}
				onChange={handleTimeChange}
				className="col-span-2 md:col-span-1"
			/>
			<TimePicker
				title="Sluttid"
				type={"end"}
				initiatedHour={end?.hour}
				initiatedMinutes={end?.minute}
				onChange={handleTimeChange}
				className="col-span-2 md:col-span-1"
			/>
			{!isTimeValid && (
				<p className="col-span-2 text-red-500">
					Sluttiden måste vara efter starttiden
				</p>
			)}
			<CustomButton
				className="col-span-2 md:col-end-4 md:col-span-1"
				onClick={onAbort}
				title={"Avbryt"}
				variant="secondary"
			/>
			<CustomButton
				className="col-span-2 md:col-end-5 md:col-span-1"
				variant="primary"
				type="submit"
				title={"Spara"}
			/>
		</form>
	);
}
