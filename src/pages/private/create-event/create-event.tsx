import type { UpdateEvent, UploadedFile } from "../../../constant/types";
import { useLocation, useNavigate } from "react-router-dom";
import EventForm from "../../../components/event-form/event-form";
import { useState } from "react";
import { useCreateEvent } from "./use-create-event";
import { CustomButton } from "../../../components/custom-button/custom-button";
import DragDrop from "../../../components/drag-drop/drag-drop";

export default function CreateEvent() {
	const location = useLocation();
	const navigate = useNavigate();
	const { createNewEvent, deleteTempImage, updateEvent } = useCreateEvent();

	const state = location.state as { event: UpdateEvent };

	const [event, setEvent] = useState<UpdateEvent>(() => state.event);
	const [isChangingImage, setIsChangingImage] = useState(false);
	const [originalFile, setOriginalFile] = useState<UploadedFile | null>(null);

	const isEditing = Boolean(event.id);

	function routeHome() {
		navigate("/home");
	}

	// -------- SUBMIT --------
	async function onSubmit(updatedEvent: UpdateEvent) {
		if (!updatedEvent) return;

		try {
			if (isEditing) {
				const result = await updateEvent(updatedEvent);
				if (result) routeHome();
			} else {
				const result = await createNewEvent(updatedEvent);
				if (result) routeHome();
			}
		} catch (error) {
			console.error(error);
		}
	}

	// -------- ABORT --------
	async function onAbort(updatedEvent: UpdateEvent) {
		try {
			if (!isEditing) {
				await deleteTempImage(updatedEvent.file);
				return routeHome();
			}

			if (updatedEvent.file.url !== updatedEvent.image) {
				await deleteTempImage(updatedEvent.file);
			}

			routeHome();
		} catch (error) {
			console.error(error);
		}
	}

	// -------- CHANGE IMAGE --------
	function handleChangeImage() {
		setIsChangingImage(true);
	}

	// -------- CANCEL IMAGE CHANGE --------
	async function handleCancelImageChange() {
		try {
			if (event.file.url !== event.image) {
				await deleteTempImage(event.file);
			}

			if (originalFile) {
				setEvent((prev) => ({
					...prev,
					file: originalFile,
				}));
			}

			setIsChangingImage(false);
		} catch (error) {
			console.error(error);
		}
	}

	// -------- NEW IMAGE --------
	function handleImportFile(file: UploadedFile) {
		if (!file) return;

		setOriginalFile(event.file);

		setEvent((prev) => ({
			...prev,
			file,
		}));

		setIsChangingImage(false);
	}

	return (
		<section className="mt-24 md:mt-38 w-full flex max-w-4xl h-screen flex-1 flex-col self-center justify-center p-4 lg:mt-0 lg:p-8">
			<div className="w-full h-1/2 relative flex justify-center mb-8">
				{isChangingImage ? (
					<DragDrop onChange={handleImportFile} />
				) : (
					<img
						src={event.file.url}
						alt={event.title}
						className="object-cover"
					/>
				)}

				{isEditing && (
					<div className="absolute top-0 right-0">
						{isChangingImage ? (
							<CustomButton
								title="Avbryt"
								type="button"
								className="px-8"
								onClick={handleCancelImageChange}
							/>
						) : (
							<CustomButton
								title="Byt bild"
								type="button"
								className="px-8"
								onClick={handleChangeImage}
							/>
						)}
					</div>
				)}
			</div>

			<EventForm initialEvent={event} onSubmit={onSubmit} onAbort={onAbort} />
		</section>
	);
}
