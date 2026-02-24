import type { NewEvent } from "../../../constant/types";
import { useLocation, useNavigate } from "react-router-dom";
import EventForm from "../../../components/event-form/event-form";
import { useState } from "react";
import { useEventWorkflow } from "../../../api/hooks/use-event-workflow";

export default function CreateEvent() {
	const location = useLocation();
	const navigate = useNavigate();
	const { createNewEvent } = useEventWorkflow();

	const state = location.state as { event: NewEvent };
	const [event] = useState<NewEvent>(state.event);

	async function onSubmit(event: NewEvent) {
		if (!event) return;

		try {
			const result = await createNewEvent(event); // insert + select

			if (result) {
				console.log("Nytt event:", result.data);

				navigate("/home", {
					state: { newEvent: result.data }, // om du vill skicka med datan
				});
			}
		} catch (err) {
			console.error("Något gick fel vid skapandet:", err);
		}
	}

	return (
		<div className="max-w-4xl w-full h-screen flex flex-col jusitfy-center">
			<div className="h-1/2 w-full bg-red-500 flex justify-center">
				<img
					src={event.image.url}
					alt={event.image.name}
					className="object-cover"
				/>
			</div>
			<EventForm initialEvent={event} onSubmit={onSubmit} />
		</div>
	);
}
