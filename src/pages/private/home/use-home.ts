import { useEventsContext } from "../../../contexts/event/event-context";

export function useHome() {
	const { upcomingEvents, loadingUpcomingEvents: loadingUpcoming } =
		useEventsContext();

	return {
		upcomingEvents,
		loadingUpcoming,
	};
}
