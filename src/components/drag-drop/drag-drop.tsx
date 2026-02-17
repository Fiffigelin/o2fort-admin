import { useRef, useState } from "react";
import { supabase } from "../../api/supabase-client";

export default function DragDrop() {
	const inputRef = useRef<HTMLInputElement>(null);
	const bucket = "event-images";
	const [uploading, setUploading] = useState(false);
	const [files, setFiles] = useState<string[]>([]);

	const uploadFiles = async (fileList: FileList | File[]) => {
		setUploading(true);

		for (const file of fileList) {
			const path = `private/${Date.now()}-${file.name}`;

			const { error } = await supabase.storage.from(bucket).upload(path, file);

			if (error) {
				console.error(error);
				continue;
			}

			const { data } = await supabase.storage
				.from(bucket)
				.createSignedUrl(path, 60 * 60);
			console.log(data);
			if (data) {
				setFiles((prev) => [...prev, data.signedUrl]);
			}
		}

		setUploading(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		uploadFiles(e.dataTransfer.files);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		uploadFiles(e.target.files);
	};

	return (
		<div className="w-full">
			<div
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}
				className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50"
				onClick={() => inputRef.current?.click()}
			>
				{uploading ? "Uploading..." : "Click or drag files here"}
			</div>

			<input
				ref={inputRef}
				type="file"
				multiple
				className="hidden"
				onChange={handleInput}
			/>

			<div className="grid grid-cols-3 gap-4 mt-6">
				{files.map((url) => (
					<img key={url} src={url} className="rounded-lg h-32 object-cover" />
				))}
			</div>
		</div>
	);
}
