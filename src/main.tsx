import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./api/auth-context.tsx";
import AppRoutes from "./routes/app-routes.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	</StrictMode>,
);
