import { useCallback } from "react";
import { EventGrid } from "../../../components/ag-grid/event-grid";
import { useNavigate } from "react-router-dom";
import { useToastModalContext } from "../../../contexts/toast/toast-modal-context";
import type { EventModel } from "../../../constant/types";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";
import { useEvents } from "./use-events";

export default function Events() {
	const navigate = useNavigate();
	const { showToast, showModal } = useToastModalContext();
	const { events, loading, updateEvent, deleteEvent } = useEvents();

	const handleUpdate = useCallback(
		async (event: EventModel) => {
			if (!event) {
				showToast("error", "Kan inte ändra evenemang");
				return;
			}

			const fetchedFileEvent = await updateEvent(event);
			navigate("/update-event", {
				state: { event: fetchedFileEvent },
			});
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
			<div className="w-full h-1/3 mt-4 lg:mt-12">
				<h2 className="font-bold">Alla evenemang</h2>
				{loading ? (
					<div className="flex justify-center items-center h-full">
						<LoadingSpinner size={24} />
					</div>
				) : (
					<EventGrid
						data={events}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				)}
			</div>
		</section>
	);
}
