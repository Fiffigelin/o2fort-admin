import type { Time } from "../constant/types";

export function createStartDate(date: Date, start: Time): Date {
	const startDateTime = new Date(date);
	startDateTime.setHours(start.hour, start.minute, 0, 0);
	console.log(
		`Date: ${date} | start: ${start.hour} : ${start.minute} | startDateTime: ${startDateTime}`,
	);
	return startDateTime;
}

export function createDuration(
	startDateTime: Date,
	date: Date,
	end: Time,
): number {
	const endDateTime = new Date(date);

	endDateTime.setHours(end.hour, end.minute, 0, 0);

	if (endDateTime < startDateTime) {
		endDateTime.setDate(endDateTime.getDate() + 1);
	}

	const durationMinutes = Math.floor(
		(endDateTime.getTime() - startDateTime.getTime()) / 60000,
	);

	return durationMinutes;
}

export function formatTimeSE(date: Date | null | undefined): string {
	if (!date) return "";

	return new Intl.DateTimeFormat("sv-SE", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: "Europe/Stockholm",
	}).format(date);
}

export function formatDateSE(date: Date | null | undefined): string {
	if (!date) return "";
	return new Intl.DateTimeFormat("sv-SE", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone: "Europe/Stockholm",
	}).format(date);
}

export function calculateEndTimeSE(
	start: Date | null | undefined,
	durationMinutes?: number,
): Date | null {
	if (!start || !durationMinutes) return null;

	return new Date(start.getTime() + durationMinutes * 60000);
}
