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

interface EventFormProps {
	initialEvent: NewEvent;
	onSubmit: (event: NewEvent) => void;
	onAbort: () => void;
}

export default function EventForm({
	initialEvent,
	onSubmit,
	onAbort,
}: EventFormProps) {
	const [title, setTitle] = useState<string>(initialEvent.title);
	const [date, setDate] = useState<Date>();
	const [start, setStartTime] = useState<Time | null>({ hour: 11, minute: 0 });
	const [end, setEndTime] = useState<Time | null>({ hour: 17, minute: 0 });

	function handleTimeChange(type: string, time: Time) {
		if (time.hour === null || time.minute === null) {
			type === "start" ? setStartTime(null) : setEndTime(null);
			return;
		}

		type === "start" ? setStartTime(time) : setEndTime(time);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!isValid) return;

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
		onSubmit(initialEvent);
	}

	const isTimeValid =
		start && end ? isEndTimeAfterStartTime(start, end) : false;

	const isValid =
		title.trim().length > 3 &&
		!!date &&
		!!start &&
		!!end &&
		isTimeValid &&
		!!initialEvent.image;

	return (
		<form
			onSubmit={handleSubmit}
			className="grid grid-cols-4 w-full gap-3 pb-10 lg:gap-6"
		>
			<div className="col-span-4">
				<TextInput
					key="title"
					value={title}
					label={"Titel"}
					onChange={(value) => setTitle(value)}
				/>
			</div>
			<div className="col-span-4 md:col-span-2">
				<Datepicker initialDate={date ?? new Date()} onChange={setDate} />
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
				<p className="col-span-2">Sluttiden måste vara efter starttiden</p>
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
				disabled={!isValid}
			/>
		</form>
	);
}
