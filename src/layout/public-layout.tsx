import { Outlet } from "react-router-dom";

export default function PublicLayout() {
	return (
		<div className="container mx-auto max-w-7xl">
			<Outlet />
		</div>
	);
}
