import DragDrop from "../../../components/drag-drop/drag-drop";
import { useNavigate } from "react-router-dom";
import type { NewEvent, UploadedFile } from "../../../constant/types";
import { useHome } from "./use-home";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";

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
		<div className="flex flex-col items-center h-full w-full">
			<div className="flex flex-col justify-center md:flex-row md:justify-between w-full">
				<div className="flex-col w-1/2 h-150 bg-blue-200 flex justify-center items-center">
					<p>Senaste uppladdade bilden här med datum och bild</p>
					<p>ELLER</p>
					<p>En kortare introduktion vad hur och varför :)</p>
				</div>
				<div className="w-1/2 bg-blue-300 flex justify-center items-center">
					<DragDrop onChange={(value) => handleImageUpload(value)} />
				</div>
			</div>
			<div className="w-full h-150 overflow-y-scroll no-scrollbar bg-blue-400">
				{loadingUpcoming ? (
					<div className="flex justify-center items-center h-full">
						<LoadingSpinner size={24} />
					</div>
				) : (
					<ul className="w-full flex flex-col p-12">
						{upcomingEvents.map((event, index) => (
							<li key={index} className="flex gap-4">
								<p>{event.title}</p>
								<p>{event.start_at.toString()}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Home;
