import type { EventModel, UpdateEvent } from "../../../constant/types";
import { useEventsContext } from "../../../contexts/event/event-context";
import { useToastContext } from "../../../contexts/toast/toast-context";
import { endTime, toTime } from "../../../utils/time-handler";

export function useHome() {
	const {
		upcomingEvents,
		loadingUpcomingEvents: loadingUpcoming,
		fetchSingleImage,
	} = useEventsContext();
	const { showToast } = useToastContext();

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

	return {
		upcomingEvents,
		loadingUpcoming,
		updateEvent,
	};
}
