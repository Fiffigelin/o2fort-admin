import { useRef, useState } from "react";
import { RiImageAiLine } from "react-icons/ri";
import { useImageStorage } from "../../api/hooks/use-image-storage";
import type { UploadedFile } from "../../constant/types";
import LoadingSpinner from "../loading-spinner/loading-spinner";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export type DragDropProps = {
	onChange: (file: UploadedFile) => void;
};

export default function DragDrop({ onChange }: DragDropProps) {
	const { uploading, upload } = useImageStorage();
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);

	const handleUpload = async (files: FileList | File[]) => {
		if (!files || files.length === 0) return;

		const file = files[0];
		if (!file) return;

		if (file.size > MAX_FILE_SIZE) {
			alert("Filen är för stor! Max 2MB tillåtet.");
			return;
		}

		try {
			const uploaded = await upload(file);
			onChange(uploaded);
		} catch (err) {
			console.error(err);
			alert("Upload misslyckades");
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
			className="bg-gray-50 rounded-sm w-11/12 h-11/12 p-8 flex flex-col items-center justify-center cursor-pointer"
		>
			{uploading ? (
				<div className="bg-white/70 flex flex-col items-center justify-center z-20">
					<LoadingSpinner size={16} />
					<p className="text-sm mt-3 text-blue-500">Laddar upp...</p>
				</div>
			) : (
				<div className="w-full h-full">
					<div
						className={`flex items-center justify-center w-full h-full text-center border-2 rounded-sm p-18 ${
							dragging
								? "border-dashed border-blue-500 bg-blue-50"
								: "border-dashed border-gray-300"
						}`}
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
