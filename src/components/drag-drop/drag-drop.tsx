import { useRef, useState } from "react";
import { RiImageAiLine } from "react-icons/ri";
import type { UploadedFile } from "../../constant/types";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import { useEventsContext } from "../../contexts/event/event-context";
import { useToastContext } from "../../contexts/toast/toast-context";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export type DragDropProps = {
	onChange: (file: UploadedFile) => void;
};

export default function DragDrop({ onChange }: DragDropProps) {
	const { loadingImage, uploadEventImage } = useEventsContext();
	const { showToast } = useToastContext();
	const [dragging, setDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (files: FileList | File[]) => {
		if (!files || files.length === 0) return;

		const file = files[0];
		if (!file) return;

		if (file.size > MAX_FILE_SIZE) {
			showToast("error", "Filen är för stor! Max 2MB tillåtet.");
			return;
		}

		try {
			const result = await uploadEventImage(file);
			if (result) {
				onChange(result);
			}
		} catch (error: unknown) {
			console.error("Kunde inte ladda upp bild: ", error);
			showToast("error", "Något fel hände! Kunde inte ladda upp bilden");
		} finally {
			if (inputRef.current) inputRef.current.value = "";
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		handleUpload(e.target.files);
	};

	const handleClick = () => {
		if (inputRef.current) inputRef.current.value = "";
		inputRef.current?.click();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
		handleUpload(e.dataTransfer.files);
	};

	return (
		<div
			onClick={handleClick}
			onDragOver={(e) => {
				e.preventDefault();
				setDragging(true);
			}}
			onDragLeave={() => setDragging(false)}
			onDrop={handleDrop}
			className="bg-[#ffffff] border border-[#181d1f]/15 rounded-md h-11/12 p-4 lg:p-8 flex flex-col items-center justify-center cursor-pointer"
		>
			{loadingImage ? (
				<div className="flex flex-col items-center justify-center z-20">
					<LoadingSpinner size={16} />
					<p className="mt-3 text-blue-500">Laddar upp...</p>
				</div>
			) : (
				<div className="w-full h-full">
					<div
						className={`flex items-center justify-center w-full h-full text-center border-2 rounded-sm ${
							dragging
								? "border-dashed border-blue-500 bg-blue-50"
								: "border-dashed border-gray-300"
						}`}
					>
						<div className="flex flex-col items-center">
							<RiImageAiLine
								className={`${dragging ? "text-blue-500" : "text-gray-500"} mb-2 text-3xl xl:text-5xl`}
							/>

							<p className="hidden lg:block text-gray-500">
								<span className="text-blue-500">
									Tryck för att ladda upp nytt evenemang
								</span>{" "}
								eller dra och släpp
							</p>

							<p className="lg:hidden text-blue-500 flex flex-col">
								Tryck för att ladda upp
								<span>nytt evenemang</span>
							</p>
							<p className=" text-gray-400 mt-1">PNG, JPG och JPEG</p>
						</div>
					</div>

					<input
						ref={inputRef}
						type="file"
						accept="image/png, image/jpeg"
						className="hidden"
						onChange={handleInputChange}
					/>
				</div>
			)}
		</div>
	);
}
