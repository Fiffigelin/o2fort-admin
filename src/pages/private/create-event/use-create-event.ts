import { useEventsContext } from "../../../contexts/event/event-context";
import type {
	EventModel,
	UpdateEvent,
	UploadedFile,
} from "../../../constant/types";
import { removeImage } from "../../../api/image-storage";
import { useToastModalContext } from "../../../contexts/toast/toast-modal-context";

export function useCreateEvent() {
	const { addEvent, putEvent } = useEventsContext();
	const { showToast } = useToastModalContext();

	const createNewEvent = async (
		eventData: UpdateEvent,
	): Promise<EventModel | undefined> => {
		try {
			const result = await addEvent(eventData);
			if (result) showToast("success", "Det lyckades att spara eventet!");

			return result;
		} catch (error: unknown) {
			console.error("Failed to insert new event:", error);
			showToast("error", "Kunde inte spara. Var god försök igen.");
		}
	};

	const updateEvent = async (
		eventData: UpdateEvent,
	): Promise<EventModel | undefined> => {
		try {
			const result = await putEvent(eventData);
			if (result) showToast("success", "Det lyckades att uppdatera eventet!");

			return result;
		} catch (error: unknown) {
			console.error("Failed to insert new event:", error);
			showToast("error", "Kunde inte uppdatera. Var god försök igen.");
		}
	};

	async function deleteTempImage(image: UploadedFile) {
		if (!image) return;

		return await removeImage(image);
	}

	return {
		createNewEvent,
		deleteTempImage,
		updateEvent,
	};
}
