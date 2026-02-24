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

export type UploadEvent = {
	title: string;
	start_at: Date;
	duration_minutes: number;
	image: string;
};

export type EventModel = {
	id: string;
	title: string;
	start_at: Date;
	duration_minutes: number;
	image_path: string;
	created_at: Date;
};

export type EventImage = {
	url: string;
	name: string;
};

export type Time = {
	hour: number;
	minute: number;
};
