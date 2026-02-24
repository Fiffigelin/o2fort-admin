import type { NewEvent, Time } from "../../constant/types";
import TextInput from "../input/text/text-input";
import Datepicker from "../date-picker/date-picker";
import TimePicker from "../time-picker/time-picker";
import { useState } from "react";
import { createDuration, createStartDate } from "../../utils/time-handler";

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
		console.log(end);
		console.log(start);
	}

	function handleSubmit() {
		console.log(start?.hour, start?.minute);
		console.log(end?.hour, end?.minute);
		console.log(date);
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

	return (
		<div className="grid grid-cols-4 w-full gap-6">
			<div className="col-span-4">
				<TextInput
					key="title"
					value={title}
					label={"Titel"}
					onChange={(value) => setTitle(value)}
				/>
			</div>
			<div className="col-span-2">
				<Datepicker initialDate={date ?? new Date()} onChange={setDate} />
			</div>
			<TimePicker
				title="Starttid"
				type={"start"}
				initiatedHour={start?.hour}
				initiatedMinutes={start?.minute}
				onChange={handleTimeChange}
			/>
			<TimePicker
				title="Sluttid"
				type={"end"}
				initiatedHour={end?.hour}
				initiatedMinutes={end?.minute}
				onChange={handleTimeChange}
			/>
			<button
				className="col-span-1 col-end-4 w-full p-3 text-3xl py-4 bg-(--color-yellow)/80 text-white rounded-md font-bold cursor-pointer transition-all duration-300 hover:bg-(--color-yellow) hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
				onClick={onAbort}
			>
				Avbryt
			</button>
			<button
				className="col-span-1 col-end-5 w-full p-3 text-3xl py-4 bg-(--color-yellow)/80 text-white rounded-md font-bold cursor-pointer transition-all duration-300 hover:bg-(--color-yellow) hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
				onClick={handleSubmit}
			>
				Spara
			</button>
		</div>
	);
}
