import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../api/auth-context";
import PublicLayout from "../layout/public-layout";
import ProtectedRoute from "./protected-routes";
import PrivateLayout from "../layout/private-layout";
import Login from "../pages/public/login";
import Home from "../pages/private/home";
import Evenemang from "../pages/private/evenemang";
import Wiki from "../pages/private/wiki";

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
					<Route path="/evenemang" element={<Evenemang />} />
					<Route path="/wiki" element={<Wiki />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
