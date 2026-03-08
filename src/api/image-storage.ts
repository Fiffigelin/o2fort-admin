import { supabase } from "./supabase-client";
import type { UploadedFile } from "../constant/types";

const BUCKET = "images";
const TEMP = "events/temp/";
const SAVED = "events/saved/";

export async function uploadTempImage(file: File): Promise<UploadedFile> {
	if (!file.type.startsWith("image/")) {
		throw new Error("Endast bilder tillåtna");
	}

	const sanitizedName = sanitizeFileName(file.name);
	const path = `${TEMP}${Date.now()}-${sanitizedName}`;

	const { error } = await supabase.storage.from(BUCKET).upload(path, file);
	if (error) throw error;

	const { data } = await supabase.storage
		.from(BUCKET)
		.createSignedUrl(path, 60 * 60);
	if (!data) throw new Error("Kunde inte skapa URL");

	return {
		name: file.name,
		url: data.signedUrl,
		size: file.size,
		type: file.type,
		path,
	};
}

export async function removeImage(image: UploadedFile): Promise<boolean> {
	try {
		const { data } = await supabase.storage.from(BUCKET).remove([image.path]);
		return data ? true : false;
	} catch (error: unknown) {
		console.error("Something went wrong: ", error);
		return false;
	}
}

export async function removeImageFromString(
	imageUrl: string,
): Promise<boolean> {
	try {
		const { data } = await supabase.storage.from(BUCKET).remove([imageUrl]);
		return data ? true : false;
	} catch (error: unknown) {
		console.log("Something went wrong when deleting eventimage: ", error);
		return false;
	}
}

export async function moveImageFile(img: UploadedFile): Promise<string> {
	if (!img.path) throw new Error("No path provided");

	const fileName = img.path.split("/").pop();
	if (!fileName) throw new Error("Invalid file path");

	const newPath = `${SAVED}${fileName}`;

	const { error } = await supabase.storage.from(BUCKET).move(img.path, newPath);
	if (error) throw error;

	const { data } = await supabase.storage
		.from(BUCKET)
		.createSignedUrl(newPath, 60 * 60);
	if (!data) throw new Error("Could not create signed URL");

	return newPath;
}

export async function fetchImage(imgPath: string): Promise<UploadedFile> {
	const { data, error } = await supabase.storage
		.from(BUCKET)
		.createSignedUrl(imgPath, 60 * 60);

	if (error) throw error;
	if (!data) throw new Error("Could not fetch image");

	console.log("fetchimage: ", data.signedUrl);
	return {
		name: imgPath.split("/").pop() ?? "",
		url: data.signedUrl,
		path: imgPath,
		size: 0,
		type: "image",
	};
}

function sanitizeFileName(name: string) {
	return name
		.trim()
		.replace(/\s+/g, "_")
		.replace(/[^a-zA-Z0-9_\-\.]/g, "");
}
