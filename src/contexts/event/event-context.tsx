import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type {
	EventModel,
	UpdateEvent,
	UploadedFile,
	UploadEvent,
} from "../../constant/types";
import { useAuth } from "../auth/auth-context";
import {
	getAllEvents,
	getUpcomingEvents,
	createEvent,
	updateEvent,
} from "../../api/events";
import { useToastContext } from "../toast/toast-context";
import {
	uploadTempImage,
	moveImageFile,
	removeImage,
	fetchImage,
} from "../../api/image-storage";

interface EventContextType {
	events: EventModel[];
	upcomingEvents: EventModel[];
	loading: boolean;
	loadingUpcomingEvents: boolean;
	uploadingImage: UploadedFile | undefined;
	loadingImage: boolean;

	fetchEvents: () => Promise<void>;
	fetchUpcomingEvents: () => Promise<void>;
	addEvent: (event: UpdateEvent) => Promise<EventModel>;
	uploadEventImage: (file: File) => Promise<UploadedFile>;
	deleteTempImage: (file: UploadedFile) => Promise<boolean>;
	fetchSingleImage: (imgPath: string) => Promise<UploadedFile>;
	putEvent: (event: UpdateEvent) => Promise<EventModel>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
	const { user, isAuthenticated } = useAuth();
	const [events, setEvents] = useState<EventModel[]>([]);
	const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingUpcomingEvents, setLoadingUpcomingEvents] =
		useState<boolean>(false);
	const [uploadingImage, setUploadingImage] = useState<UploadedFile>();
	const [loadingImage, setLoadingImage] = useState<boolean>(false);

	const mapEvents = (data: any[] | any): EventModel[] => {
		const arr = Array.isArray(data) ? data : [data];
		return arr.map((d) => ({
			id: d.id,
			title: d.title,
			startAt: new Date(d.start_at_utc),
			durationMinutes: d.duration_minutes,
			imagePath: d.image_url,
			createdAt: new Date(d.created_at),
		}));
	};

	const mapEventForInsert = (
		event: UpdateEvent,
		newPath: string,
	): UploadEvent => {
		const mapEvent: UploadEvent = {
			title: event.title,
			startAt: event.startAt,
			durationMinutes: event.durationMinutes,
			image: newPath,
		};

		return mapEvent;
	};

	const mapEventForUpdate = (event: UpdateEvent): UploadEvent => {
		const mapEvent: UploadEvent = {
			id: event.id,
			title: event.title,
			startAt: event.startAt,
			durationMinutes: event.durationMinutes,
			image: event.image,
			createdAt: event.createdAt,
		};

		return mapEvent;
	};

	const fetchEvents = async () => {
		if (!user) return;
		setLoading(true);
		try {
			const data = await getAllEvents();
			if (data) setEvents(mapEvents(data));
		} catch (error) {
			console.error("Failed to fetch events:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchUpcomingEvents = async () => {
		if (!user) return;
		setLoadingUpcomingEvents(true);
		try {
			const data = await getUpcomingEvents();
			if (data) setUpcomingEvents(mapEvents(data));
		} catch (error) {
			console.error("Failed to fetch upcoming events:", error);
		} finally {
			setLoadingUpcomingEvents(false);
		}
	};

	const addEvent = async (event: UpdateEvent): Promise<EventModel> => {
		setLoading(true);

		try {
			const newImagePath = await moveImageFile(event.file);
			const insertEvent = mapEventForInsert(event, newImagePath);
			const data = await createEvent(insertEvent);
			const mapped = mapEvents(data)[0];

			if (mapped) {
				setEvents((prev) => [mapped, ...prev]);

				const now = new Date();
				if (mapped.startAt >= now) {
					setUpcomingEvents((prev) =>
						[...prev, mapped].sort(
							(a, b) => a.startAt.getTime() - b.startAt.getTime(),
						),
					);
				}
				return mapped;
			}

			return mapped;
		} catch (error) {
			console.error("Failed to fetch upcoming events:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const putEvent = async (event: UpdateEvent): Promise<EventModel> => {
		setLoading(true);

		try {
			const updatedEvent = mapEventForUpdate(event);
			const data = await updateEvent(updatedEvent);
			const mapped = mapEvents(data)[0];

			if (mapped) {
				setEvents((prev) => prev.map((e) => (e.id === mapped.id ? mapped : e)));

				const now = new Date();
				if (mapped.startAt >= now) {
					setUpcomingEvents((prev) =>
						[...prev.filter((e) => e.id !== mapped.id), mapped].sort(
							(a, b) => a.startAt.getTime() - b.startAt.getTime(),
						),
					);
				}
			}
			return mapped;
		} catch (error) {
			console.error("Failed to fetch upcoming events:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const uploadEventImage = async (file: File): Promise<UploadedFile> => {
		setLoadingImage(true);
		try {
			const data = await uploadTempImage(file);
			if (data) {
				setUploadingImage(data);
			}
			return data;
		} catch (error: unknown) {
			console.error("Failed to upload image ", error);
			throw error;
		} finally {
			setLoadingImage(false);
		}
	};

	const deleteTempImage = async (file: UploadedFile): Promise<boolean> => {
		try {
			return await removeImage(file);
		} catch (error: unknown) {
			console.error("Failed to remove image ", error);
			return false;
		} finally {
			setUploadingImage(undefined);
		}
	};

	const fetchAllEvents = async () => {
		await fetchEvents();
		await fetchUpcomingEvents();
	};

	const fetchSingleImage = async (imageUrl: string): Promise<UploadedFile> => {
		try {
			return await fetchImage(imageUrl);
		} catch (error: unknown) {
			console.error("Failed to remove image ", error);
			throw error;
		}
	};

	useEffect(() => {
		if (isAuthenticated) fetchAllEvents();
	}, [isAuthenticated]);

	return (
		<EventContext.Provider
			value={{
				events,
				upcomingEvents,
				loading,
				loadingUpcomingEvents: loadingUpcomingEvents,
				uploadingImage,
				loadingImage,
				fetchEvents,
				fetchUpcomingEvents,
				addEvent,
				uploadEventImage,
				deleteTempImage,
				fetchSingleImage,
				putEvent,
			}}
		>
			{children}
		</EventContext.Provider>
	);
};

export const useEventsContext = () => {
	const context = useContext(EventContext);
	if (!context)
		throw new Error("useEventsContext must be used within EventProvider");
	return context;
};
