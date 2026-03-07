import type { UpdateEvent } from "../../../constant/types";
import { useLocation, useNavigate } from "react-router-dom";
import EventForm from "../../../components/event-form/event-form";
import { useState } from "react";
import { useCreateEvent } from "./use-create-event";

export default function CreateEvent() {
	const location = useLocation();
	const navigate = useNavigate();
	const { createNewEvent, deleteTempImage, updateEvent } = useCreateEvent();

	const state = location.state as { event: UpdateEvent };
	const [event] = useState<UpdateEvent>(state.event);

	async function onSubmit(event: UpdateEvent) {
		if (!event) return;

		if (event.id && event.id?.length > 0) {
			console.log("event id: ", event.id);
			const result = await updateEvent(event);
			if (result) RouteHome();
		} else {
			const result = await createNewEvent(event);
			if (result) RouteHome();
		}
	}

	async function onAbort(event: UpdateEvent) {
		if (event.id && event.id?.length > 0) {
			RouteHome();
			return;
		}

		try {
			const result = await deleteTempImage(event.file);

			if (result) RouteHome();
		} catch (err) {
			console.error("Något gick fel:", err);
		}
	}

	function RouteHome() {
		navigate("/home");
	}

	return (
		<section className="mt-24 md:mt-38 w-full max-w-4xl h-screen flex flex-col self-center p-4 lg:mt-0 lg:p-8">
			<div className="w-full flex justify-center mb-8">
				<img
					src={event.file.url}
					alt={event.file.name}
					className="object-cover"
				/>
			</div>
			<EventForm
				initialEvent={event}
				onSubmit={onSubmit}
				onAbort={(value) => onAbort(value)}
			/>
		</section>
	);
}
