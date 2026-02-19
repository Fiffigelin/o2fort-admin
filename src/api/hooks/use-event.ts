import { useState } from "react";
import { supabase } from "../supabase-client";

export type UploadedFile = {
	name: string;
	url: string;
	size: number;
	type: string;
	path: string;
};

const BUCKET = "images";
const TEMP = "events/temp/";
const SAVED = "events/saved/";

export function useEvent() {
	const [file, setFile] = useState<UploadedFile | null>(null);
	const [uploading, setUploading] = useState(false);

	const upload = async (file: File) => {
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

	const remove = async () => {
		if (!file) return;

		await supabase.storage.from(BUCKET).remove([file.path]);
		setFile(null);
	};

	const moveFile = async () => {
		const { error } = await supabase.storage.from(BUCKET).move(TEMP, SAVED);
		if (error) throw error;
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
		upload,
		remove,
		moveFile,
	};
}
