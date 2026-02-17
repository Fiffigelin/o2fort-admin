import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../api/auth-context";
import PublicLayout from "../layout/public-layout";
import ProtectedRoute from "./protected-routes";
import PrivateLayout from "../layout/private-layout";
import Home from "../pages/private/Home";
import Login from "../pages/public/login";

export default function AppRoutes() {
	const { isAuthenticated } = useAuth();

	return (
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
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
