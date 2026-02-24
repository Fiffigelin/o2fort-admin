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
