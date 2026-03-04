import DragDrop from "../../../components/drag-drop/drag-drop";
import { useNavigate } from "react-router-dom";
import type { NewEvent, UploadedFile } from "../../../constant/types";
import { useHome } from "./use-home";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";
import { EventGrid } from "../../../components/ag-grid/event-grid";

function Home() {
	const navigate = useNavigate();
	const { upcomingEvents, loadingUpcoming } = useHome();

	function handleImageUpload(img: UploadedFile) {
		if (!img) {
			// hantera fel
			return;
		}

		const newEvent: NewEvent = {
			title: "",
			start_at: new Date(),
			duration_minutes: 0,
			image: img,
		};

		navigate("/update-event", {
			state: { event: newEvent },
		});
	}

	return (
		<section className="flex flex-col w-full max-w-7xl p-8">
			<div className="flex-col w-full h-1/2 flex mt-12">
				<h2 className="text-3xl font-bold">Skapa nytt evengemang</h2>
				<DragDrop onChange={(value) => handleImageUpload(value)} />
			</div>

			<div className="w-full flex-1 h-1/5 my-12">
				<h2 className="text-3xl font-bold">Kommande evengemang</h2>
				{loadingUpcoming ? (
					<div className="flex justify-center items-center h-full">
						<LoadingSpinner size={24} />
					</div>
				) : (
					<EventGrid data={upcomingEvents} />
				)}
			</div>
		</section>
	);
}

export default Home;
