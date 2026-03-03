import { Outlet } from "react-router-dom";
import { MdOutlineEventAvailable, MdOutlineHome } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";
import { useAuth } from "../api/auth-context";
import Sidebar from "../components/sidebar/sidebar";
import type { NavbarItem } from "../components/sidebar/sidebar-item";

export default function PrivateLayout() {
	const { user } = useAuth();

	if (!user) {
		return <p>Loading...</p>;
	}

	const navItems: NavbarItem[] = [
		{ label: "Start", icon: <MdOutlineHome />, to: "/" },
		{
			label: "Evenemang",
			icon: <MdOutlineEventAvailable />,
			to: "/event",
		},
		{ label: "Wiki", icon: <TbVocabulary />, to: "/wiki" },
	];

	return (
		<div className="w-screen h-screen flex flex-col md:flex-row">
			<Sidebar sidebarItems={navItems} />
			{/* <div className="flex justify-center w-full mt-30 container mx-auto max-w-7xl lg:mt-10"> */}
			<main className="flex justify-center h-screen overflow-auto w-full">
				<Outlet />
			</main>
		</div>
	);
}
