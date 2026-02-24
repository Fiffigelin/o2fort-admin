import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { supabase } from "./supabase-client";
import type { EventModel, UploadEvent } from "../constant/types";
import { useAuth } from "./auth-context";

interface EventContextType {
	events: EventModel[];
	upcomingEvents: EventModel[];
	loading: boolean;
	loadingUpcoming: boolean;

	fetchEvents: () => Promise<void>;
	fetchUpcomingEvents: () => Promise<void>;
	addEvent: (event: UploadEvent) => Promise<EventModel | undefined>;
	fetchDataAfterLogin: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
	const { user, isAuthenticated } = useAuth();
	const [events, setEvents] = useState<EventModel[]>([]);
	const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingUpcoming, setLoadingUpcoming] = useState(false);

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

	const fetchEvents = async () => {
		if (!user) return;
		setLoading(true);
		try {
			const { data, error } = await supabase
				.from("events")
				.select("*")
				.order("start_at_utc", { ascending: false });
			if (error) throw error;
			if (data) setEvents(mapEvents(data));
		} finally {
			setLoading(false);
		}
	};

	const fetchUpcomingEvents = async () => {
		if (!user) return;
		setLoadingUpcoming(true);
		try {
			const now = new Date().toISOString();
			const { data, error } = await supabase
				.from("events")
				.select("*")
				.gte("start_at_utc", now)
				.order("start_at_utc", { ascending: true });
			if (error) throw error;
			if (data) setUpcomingEvents(mapEvents(data));
		} finally {
			setLoadingUpcoming(false);
		}
	};

	const addEvent = async (event: UploadEvent) => {
		if (!user) return;
		setLoading(true);
		try {
			const { data, error } = await supabase
				.from("events")
				.insert({
					title: event.title,
					image_url: event.image,
					duration_minutes: event.duration_minutes,
					start_at_utc: event.start_at.toISOString(),
				})
				.select();
			if (error) throw error;
			const mapped = mapEvents(data)[0];
			setEvents((prev) => [mapped, ...prev]);
			return mapped;
		} finally {
			setLoading(false);
		}
	};

	const fetchDataAfterLogin = async () => {
		await fetchEvents();
		await fetchUpcomingEvents();
	};

	useEffect(() => {
		if (isAuthenticated) fetchDataAfterLogin();
	}, [isAuthenticated]);

	return (
		<EventContext.Provider
			value={{
				events,
				upcomingEvents,
				loading,
				loadingUpcoming,
				fetchEvents,
				fetchUpcomingEvents,
				addEvent,
				fetchDataAfterLogin,
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
