import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EventProvider } from "../api/event-context";
import { useAuth } from "../api/auth-context";
import PublicLayout from "../layout/public-layout";
import ProtectedRoute from "./protected-routes";
import PrivateLayout from "../layout/private-layout";
import Login from "../pages/public/login";
import Home from "../pages/private/home/home";
import Wiki from "../pages/private/wiki/wiki";
import CreateEvent from "../pages/private/create-event/create-event";
import Event from "../pages/private/event/Event";

export default function AppRoutes() {
	const { isAuthenticated } = useAuth();

	return (
		<EventProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<PublicLayout />}>
						<Route
							path="/"
							element={
								isAuthenticated ? <Navigate to="/home" replace /> : <Login />
							}
						/>
					</Route>

					<Route
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<PrivateLayout />
							</ProtectedRoute>
						}
					>
						<Route path="/home" element={<Home />} />
						<Route path="/wiki" element={<Wiki />} />
						<Route path="/update-event" element={<CreateEvent />} />
						<Route path="/event" element={<Event />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</EventProvider>
	);
}
