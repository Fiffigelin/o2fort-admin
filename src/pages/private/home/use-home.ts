import { useEventsContext } from "../../../api/event-context";

export function useHome() {
	const { upcomingEvents, loadingUpcoming } = useEventsContext();

	return {
		upcomingEvents,
		loadingUpcoming,
	};
}
