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
			to: "/evenemang",
		},
		{ label: "Wiki", icon: <TbVocabulary />, to: "/wiki" },
	];

	return (
		<div className="w-full h-screen overflow-hidden flex flex-row">
			<Sidebar sidebarItems={navItems} />
			<section className="w-full p-10">
				<Outlet />
			</section>
		</div>
	);
}
