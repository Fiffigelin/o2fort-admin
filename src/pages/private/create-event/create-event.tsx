import type { NewEvent } from "../../../constant/types";
import { useLocation, useNavigate } from "react-router-dom";
import EventForm from "../../../components/event-form/event-form";
import { useState } from "react";
import { useCreateEvent } from "./use-create-event";

export default function CreateEvent() {
	const location = useLocation();
	const navigate = useNavigate();
	const { createNewEvent, deleteTempImage } = useCreateEvent();

	const state = location.state as { event: NewEvent };
	const [event] = useState<NewEvent>(state.event);

	async function onSubmit(event: NewEvent) {
		if (!event) return;

		try {
			const result = await createNewEvent(event);

			if (result) RouteHome();
		} catch (err) {
			console.error("Något gick fel vid skapandet:", err);
		}
	}

	async function onAbort() {
		if (!event.image) return;

		try {
			const result = await deleteTempImage(event.image);

			if (result) RouteHome();
		} catch (err) {
			console.error("Något gick fel:", err);
		}
	}

	function RouteHome() {
		navigate("/home");
	}

	return (
		<section className="mt-24 md:mt-38 max-w-4xl w-full h-screen flex flex-col p-4 lg:mt-0 lg:p-8">
			<div className="w-full flex justify-center mb-8">
				<img
					src={event.image.url}
					alt={event.image.name}
					className="object-cover"
				/>
			</div>
			<EventForm initialEvent={event} onSubmit={onSubmit} onAbort={onAbort} />
		</section>
	);
}
