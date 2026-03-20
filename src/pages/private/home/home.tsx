import DragDrop from "../../../components/drag-drop/drag-drop";
import { useNavigate } from "react-router-dom";
import type {
	EventModel,
	UpdateEvent,
	UploadedFile,
} from "../../../constant/types";
import { useHome } from "./use-home";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";
import { EventGrid } from "../../../components/ag-grid/event-grid";
import { useCallback } from "react";
import { useToastModalContext } from "../../../contexts/toast/toast-modal-context";

function Home() {
	const navigate = useNavigate();
	const { showToast, showModal } = useToastModalContext();
	const { upcomingEvents, loadingUpcoming, updateEvent, deleteEvent } =
		useHome();

	function handleImageUpload(img: UploadedFile) {
		if (!img) return;

		const newEvent: UpdateEvent = {
			title: "",
			startAt: new Date(),
			durationMinutes: 0,
			image: img.path,
			file: img,
			time: { start: { hour: 11, minute: 0 }, end: { hour: 17, minute: 0 } },
		};

		navigate("/update-event", {
			state: { event: newEvent },
		});
	}

	const handleUpdate = useCallback(
		async (event: EventModel) => {
			if (!event) {
				showToast("error", "Kan inte ändra evenemang");
				return;
			}

			const fetchedFileEvent = await updateEvent(event);
			navigate("/update-event", { state: { event: fetchedFileEvent } });
		},
		[updateEvent],
	);

	const handleDelete = useCallback((event: EventModel) => {
		showModal({
			title: "Ta bort evenemang?",
			text: "Är du säker på att du vill ta bort detta evenemang? Denna åtgärd kan inte ångras.",
			onConfirm: () => confirmDelete(event),
		});
	}, []);

	const confirmDelete = async (event: EventModel) => {
		if (!event) return;

		await deleteEvent(event);
	};

	return (
		<section className="flex flex-col w-full h-full">
			<div className="flex-col w-full h-1/3 flex lg:h-1/2">
				<h2 className="font-bold">Skapa nytt evengemang</h2>
				<DragDrop onChange={(value) => handleImageUpload(value)} />
			</div>

			<div className="w-full h-1/3 mt-4 lg:mt-12">
				<h2 className="font-bold">Kommande evengemang</h2>
				{loadingUpcoming ? (
					<div className="flex justify-center items-center h-full">
						<LoadingSpinner size={24} />
					</div>
				) : (
					<EventGrid
						data={upcomingEvents}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				)}
			</div>
		</section>
	);
}

export default Home;
