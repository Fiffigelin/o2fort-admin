import { useState } from "react";
import { supabase } from "../supabase-client";
import type { UploadedFile } from "../../constant/types";

const BUCKET = "images";
const TEMP = "events/temp/";
const SAVED = "events/saved/";

export function useImageStorage() {
	const [file, setFile] = useState<UploadedFile | null>(null);
	const [uploading, setUploading] = useState(false);

	const uploadTempImage = async (file: File) => {
		if (file && !file.type.startsWith("image/")) {
			throw new Error("Endast bilder tillåtna");
		}

		setUploading(true);
		const sanitizedName = sanitizeFileName(file.name);
		const path = `${TEMP}${Date.now()}-${sanitizedName}`;

		const { error } = await supabase.storage.from(BUCKET).upload(path, file);

		if (error) {
			setUploading(false);
			throw error;
		}

		const { data } = await supabase.storage
			.from(BUCKET)
			.createSignedUrl(path, 60 * 60);

		if (!data) throw new Error("Kunde inte skapa URL");

		const uploaded: UploadedFile = {
			name: file.name,
			url: data.signedUrl,
			size: file.size,
			type: file.type,
			path,
		};

		setFile(uploaded);
		setUploading(false);

		return uploaded;
	};

	const removeImage = async () => {
		if (!file) return;

		await supabase.storage.from(BUCKET).remove([file.path]);
		setFile(null);
	};

	const moveImageFile = async (img: UploadedFile) => {
		if (!img.path) throw new Error("No path provided");

		const fileName = img.path.split("/").pop();
		if (!fileName) throw new Error("Invalid file path");

		const newPath = `${SAVED}${fileName}`;

		const { error } = await supabase.storage
			.from(BUCKET)
			.move(img.path, newPath);
		if (error) throw error;

		const { data } = await supabase.storage
			.from(BUCKET)
			.createSignedUrl(newPath, 60 * 60);
		if (!data) throw new Error("Could not create signed URL");

		setFile((prev) =>
			prev ? { ...prev, path: newPath, url: data.signedUrl } : prev,
		);

		return newPath;
	};

	function sanitizeFileName(name: string) {
		return name
			.trim()
			.replace(/\s+/g, "_")
			.replace(/[^a-zA-Z0-9_\-\.]/g, "");
	}

	return {
		file,
		uploading,
		upload: uploadTempImage,
		remove: removeImage,
		moveFile: moveImageFile,
	};
}
