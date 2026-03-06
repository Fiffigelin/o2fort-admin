import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type {
	EventModel,
	NewEvent,
	UploadedFile,
	UploadEvent,
} from "../../constant/types";
import { useAuth } from "../auth/auth-context";
import { getAllEvents, getUpcomingEvents, createEvent } from "../../api/events";
import { useToastContext } from "../toast/toast-context";
import {
	uploadTempImage,
	moveImageFile,
	removeImage,
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
	addEvent: (event: NewEvent) => Promise<EventModel | undefined>;
	uploadEventImage: (file: File) => Promise<UploadedFile | undefined>;
	deleteTempImage: (file: UploadedFile) => Promise<boolean>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
	const { user, isAuthenticated } = useAuth();
	const { showToast } = useToastContext();
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
			start_at: new Date(d.start_at_utc),
			duration_minutes: d.duration_minutes,
			image_path: d.image_url,
			created_at: new Date(d.created_at),
		}));
	};

	const mapEventForInsert = (event: NewEvent, newPath: string): UploadEvent => {
		const newEvent: UploadEvent = {
			title: event.title,
			start_at: event.start_at,
			duration_minutes: event.duration_minutes,
			image: newPath,
		};

		return newEvent;
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

	const addEvent = async (event: NewEvent): Promise<EventModel | undefined> => {
		if (!user) return;
		setLoading(true);

		try {
			const newImagePath = await moveImageFile(event.image);
			const insertEvent = mapEventForInsert(event, newImagePath);
			const data = await createEvent(insertEvent);
			const mapped = mapEvents(data)[0];

			if (mapped) {
				setEvents((prev) => [mapped, ...prev]);

				const now = new Date();
				if (mapped.start_at >= now) {
					setUpcomingEvents((prev) =>
						[...prev, mapped].sort(
							(a, b) => a.start_at.getTime() - b.start_at.getTime(),
						),
					);
				}
				return mapped;
			}

			showToast("success", "Lyckades skapa nytt evenemang!");
			return mapped;
		} catch (error) {
			console.error("Failed to fetch upcoming events:", error);
		} finally {
			setLoading(false);
		}
	};

	const uploadEventImage = async (
		file: File,
	): Promise<UploadedFile | undefined> => {
		setLoadingImage(true);
		try {
			const data = await uploadTempImage(file);
			if (data) {
				setUploadingImage(data);
			}
			return data;
		} catch (error: unknown) {
			console.error("Failed to upload image ", error);
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
