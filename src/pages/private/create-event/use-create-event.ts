import { useEventsContext } from "../../../api/event-context";
import { useImageStorage } from "../../../api/hooks/use-image-storage";
import type { NewEvent, UploadEvent } from "../../../constant/types";

export function useCreateEvent() {
	const imageHook = useImageStorage();
	const { addEvent } = useEventsContext();

	const createNewEvent = async (eventData: NewEvent) => {
		const newPath = await imageHook.moveFile(eventData.image);

		const newEvent: UploadEvent = {
			title: eventData.title,
			start_at: eventData.start_at,
			duration_minutes: eventData.duration_minutes,
			image: newPath,
		};

		return await addEvent(newEvent);
	};

	return {
		createNewEvent,
	};
}
