import type { EventModel, UpdateEvent } from "../../../constant/types";
import { useEventsContext } from "../../../contexts/event/event-context";
import { useToastModalContext } from "../../../contexts/toast/toast-modal-context";
import { endTime, toTime } from "../../../utils/time-handler";

export function useHome() {
	const {
		events,
		upcomingEvents,
		loadingUpcomingEvents: loadingUpcoming,
		fetchSingleImage,
		deleteEventAndFile,
	} = useEventsContext();
	const { showToast } = useToastModalContext();

	async function updateEvent(event: EventModel): Promise<UpdateEvent> {
		try {
			const file = await fetchSingleImage(event.imagePath);

			const timeStart = toTime(event.startAt);
			const timeEnd = endTime(event.startAt, event.durationMinutes);

			const mapEvent: UpdateEvent = {
				id: event.id,
				title: event.title,
				startAt: event.startAt,
				durationMinutes: event.durationMinutes,
				image: event.imagePath,
				createdAt: event.createdAt,
				file: file,
				time: {
					start: timeStart,
					end: timeEnd,
				},
			};
			return mapEvent;
		} catch (error: unknown) {
			showToast("error", "Kunde inte hitta eventet för att uppdatera");
			throw error;
		}
	}

	async function deleteEvent(event: EventModel) {
		try {
			const result = await deleteEventAndFile(event);
			if (result) showToast("success", "Lyckades radera eventet");
		} catch (error: unknown) {
			showToast("error", "Kunde inte radera eventet");
			throw error;
		}
	}

	return {
		events,
		upcomingEvents,
		loadingUpcoming,
		updateEvent,
		deleteEvent,
	};
}
