import { useEventsContext } from "../../../api/event-context";

export function useHome() {
	const { events, upcomingEvents, loading, loadingUpcoming } =
		useEventsContext();

	return {
		events,
		upcomingEvents,
		loading,
		loadingUpcoming,
	};
}
