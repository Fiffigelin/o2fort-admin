import { useEventsContext } from "../../../contexts/event/event-context";
import type {
	EventModel,
	NewEvent,
	UploadedFile,
} from "../../../constant/types";
import { removeImage } from "../../../api/image-storage";
import { useToastContext } from "../../../contexts/toast/toast-context";

export function useCreateEvent() {
	const { addEvent } = useEventsContext();
	const { showToast } = useToastContext();

	const createNewEvent = async (
		eventData: NewEvent,
	): Promise<EventModel | undefined> => {
		try {
			const result = await addEvent(eventData);
			if (result) showToast("success", "Det lyckades att spara eventet!");

			return result;
		} catch (error: unknown) {
			console.error("Failed to insert new event:", error);
			showToast("success", "Kunde inte spara. Var god försök igen.");
		}
	};

	async function deleteTempImage(image: UploadedFile) {
		if (!image) return;

		return await removeImage(image);
	}

	return {
		createNewEvent,
		deleteTempImage,
	};
}
