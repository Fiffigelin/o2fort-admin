import { supabase } from "./supabase-client";
import type { UploadEvent } from "../constant/types";

export interface EventRow {
	id: string;
	title: string;
	start_at_utc: string;
	duration_minutes: number;
	image_url: string;
	created_at: string;
}

export type EventInsert = Omit<EventRow, "id" | "created_at">;

export const getAllEvents = async (): Promise<EventRow[]> => {
	const { data, error } = await supabase
		.from("events")
		.select("*")
		.order("start_at_utc", { ascending: false });

	if (error) throw error;
	return data ?? [];
};

export const getUpcomingEvents = async (): Promise<EventRow[]> => {
	const now = new Date().toISOString();
	const { data, error } = await supabase
		.from("events")
		.select("*")
		.gte("start_at_utc", now)
		.order("start_at_utc", { ascending: true });

	if (error) throw error;
	return data ?? [];
};

export const createEvent = async (event: UploadEvent): Promise<EventRow> => {
	const { data, error } = await supabase
		.from("events")
		.insert({
			title: event.title,
			image_url: event.image,
			duration_minutes: event.duration_minutes,
			start_at_utc: event.start_at.toISOString(),
		})
		.select()
		.single();

	if (error) throw error;
	if (!data) throw new Error("Could not create event");
	return data;
};
