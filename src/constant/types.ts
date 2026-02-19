export interface LoginRequest {
	email: string;
	password: string;
}

export interface CreateNewEvent {
	title: string;
	date: Date;
	imageUrl: string;
}
