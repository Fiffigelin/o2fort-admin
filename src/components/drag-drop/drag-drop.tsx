import { useRef, useState } from "react";
import { RiImageAiLine } from "react-icons/ri";
import { useEvent } from "../../api/hooks/use-event";
import type { UploadedFile } from "../../api/hooks/use-event";

export type DragDropProps = {
	value: UploadedFile | null;
	onChange: (file: UploadedFile | null) => void;
};

export default function DragDrop({ value, onChange }: DragDropProps) {
	const { uploading, upload } = useEvent();

	const dropRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [dragging, setDragging] = useState(false);

	const handleUpload = async (list: FileList | File[]) => {
		if (value) {
			alert("Du kan bara ladda upp en bild per event");
			return;
		}

		const file = list[0];
		if (!file) return;

		try {
			const uploaded = await upload(file);
			console.log("Uploaded ", uploaded);
			onChange(uploaded);
		} catch (err) {
			console.error(err);
			alert("Upload misslyckades");
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		handleUpload(e.target.files);
	};

	return (
		<div
			onClick={() => inputRef.current?.click()}
			onDragOver={(e) => {
				e.preventDefault();
				setDragging(true);
			}}
			onDragLeave={() => setDragging(false)}
			onDrop={(e) => {
				e.preventDefault();
				setDragging(false);
				handleUpload(e.dataTransfer.files);
			}}
			className="bg-gray-50 rounded-sm w-11/12 h-11/12 p-8 flex flex-col items-center justify-center"
		>
			{!value && (
				<>
					<div
						ref={dropRef}
						onClick={() => inputRef.current?.click()}
						className={`${
							dragging
								? "border-dashed border-blue-500 bg-blue-50"
								: "border-dashed border-gray-300"
						} flex items-center justify-center w-full h-full text-center border-2 rounded-sm p-18 cursor-pointer`}
					>
						<div className="flex flex-col items-center">
							<RiImageAiLine
								className={`${dragging ? "text-blue-500" : "text-gray-500"} mb-2`}
								size={32}
							/>

							<p className="text-gray-500 text-xl">
								<span className="text-blue-500">Tryck för att ladda upp</span>{" "}
								eller dra och släpp
							</p>

							<p className="text-base text-gray-400 mt-1">PNG, JPG och JPEG</p>

							{uploading && (
								<p className="text-sm mt-3 text-blue-500">Laddar upp...</p>
							)}
						</div>
					</div>

					<input
						ref={inputRef}
						type="file"
						className="hidden"
						accept="image/png, image/jpeg"
						onChange={handleInput}
					/>
				</>
			)}
		</div>
	);
}
