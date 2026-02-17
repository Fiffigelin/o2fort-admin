import DragDrop from "../../components/drag-drop/drag-drop";

function Home() {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<h1 className="text-3xl font-stretch-90% text-gray-800">LOGGED IN</h1>
			<DragDrop />
		</div>
	);
}

export default Home;
