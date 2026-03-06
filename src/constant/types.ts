export type UploadedFile = {
	name: string;
	url: string;
	size: number;
	type: string;
	path: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type NewEvent = {
	title: string;
	start_at: Date;
	duration_minutes: number;
	image: UploadedFile;
};

export interface UpdateEvent extends UploadEvent {
	file: UploadedFile;
	time: EventTime;
}

export type UploadEvent = {
	id?: string;
	title: string;
	startAt: Date;
	durationMinutes: number;
	image: string;
	createdAt?: Date;
};

export type EventModel = {
	id: string;
	title: string;
	startAt: Date;
	durationMinutes: number;
	imagePath: string;
	createdAt: Date;
};

export type EventImage = {
	url: string;
	name: string;
};

export type Time = {
	hour: number;
	minute: number;
};

export type EventTime = {
	start: Time;
	end: Time;
};
