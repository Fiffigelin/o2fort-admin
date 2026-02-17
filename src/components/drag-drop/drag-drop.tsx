import { useRef, useEffect, useState } from "react";
import { FaRegFileImage, FaRegFile } from "react-icons/fa";
import { RiImageAiLine } from "react-icons/ri";
import { BsX } from "react-icons/bs";
import { supabase } from "../../api/supabase-client";

type UploadedFile = {
	name: string;
	url: string;
	size: number;
	type: string;
	path: string;
};

export default function DragDrop() {
	const bucket = "event-images";
	const dropRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [dragging, setDragging] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [files, setFiles] = useState<UploadedFile[]>([]);

	// ---------------- UPLOAD ----------------

	const uploadFiles = async (list: FileList | File[]) => {
		setUploading(true);

		for (const file of list) {
			const path = `private/${Date.now()}-${file.name}`;

			const { error } = await supabase.storage.from(bucket).upload(path, file);

			if (error) {
				console.error(error);
				continue;
			}

			const { data } = await supabase.storage
				.from(bucket)
				.createSignedUrl(path, 60 * 60);

			if (!data) continue;

			setFiles((prev) => [
				...prev,
				{
					name: file.name,
					url: data.signedUrl,
					size: file.size,
					type: file.type,
					path,
				},
			]);
		}

		setUploading(false);
	};

	// ---------------- DELETE ----------------

	const removeFile = async (index: number) => {
		const file = files[index];

		await supabase.storage.from(bucket).remove([file.path]);

		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	// ---------------- DRAG EVENTS ----------------

	useEffect(() => {
		const el = dropRef.current;
		if (!el) return;

		const over = (e: DragEvent) => {
			e.preventDefault();
			setDragging(true);
		};

		const leave = (e: DragEvent) => {
			e.preventDefault();
			setDragging(false);
		};

		const drop = (e: DragEvent) => {
			e.preventDefault();
			setDragging(false);
			if (e.dataTransfer?.files) uploadFiles(e.dataTransfer.files);
		};

		el.addEventListener("dragover", over);
		el.addEventListener("dragleave", leave);
		el.addEventListener("drop", drop);

		return () => {
			el.removeEventListener("dragover", over);
			el.removeEventListener("dragleave", leave);
			el.removeEventListener("drop", drop);
		};
	}, []);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		uploadFiles(e.target.files);
	};

	return (
		<div className="bg-gray-50 rounded-sm p-12">
			<div
				ref={dropRef}
				onClick={() => inputRef.current?.click()}
				className={`${
					dragging
						? "border-dashed border-blue-500 bg-blue-50"
						: "border-dashed border-gray-300"
				} flex items-center justify-center text-center border-2 rounded-sm p-18 cursor-pointer`}
			>
				<div className="flex flex-col items-center">
					<RiImageAiLine
						className={`${dragging ? "text-blue-500" : "text-gray-500"} mb-2`}
						size={32}
					/>

					<p className="text-gray-500 text-xl">
						<span className="text-blue-500">Click to upload</span> or drag &
						drop
					</p>

					<p className="text-base text-gray-400 mt-1">PNG, JPG or JPEG</p>

					{uploading && (
						<p className="text-sm mt-3 text-blue-500">Uploading...</p>
					)}
				</div>
			</div>

			<input
				ref={inputRef}
				type="file"
				multiple
				className="hidden"
				accept="image/*"
				onChange={handleInput}
			/>

			{/* Snygga till detta */}
			{files.length > 0 && (
				<div className="mt-6 grid grid-cols-2 gap-4">
					{files.map((file, i) => (
						<div
							key={file.path}
							className="bg-gray-100 rounded-md p-3 flex justify-between items-center"
						>
							<div className="flex gap-3 items-center">
								<div className="text-blue-500 text-3xl">
									{file.type.includes("image") ? (
										<FaRegFileImage />
									) : (
										<FaRegFile />
									)}
								</div>

								<div>
									<p className="text-sm font-medium">{file.name}</p>
									<p className="text-xs text-gray-500">
										{(file.size / 1024).toFixed(0)} KB
									</p>
								</div>
							</div>

							<button
								onClick={() => removeFile(i)}
								className="text-gray-500 hover:text-red-500"
							>
								<BsX size={22} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
