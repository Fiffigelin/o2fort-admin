import { Outlet } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { TbVocabulary } from "react-icons/tb";
import { useAuth } from "../api/auth-context";
import type { SidebarItem } from "../components/sidebar/sidebar";
import Sidebar from "../components/sidebar/sidebar";
import Header from "../components/header/header";

export default function PrivateLayout() {
	const { user } = useAuth();

	if (!user) {
		return <p>Loading...</p>;
	}

	const navItems: SidebarItem[] = [
		{ label: "Dashboard", icon: <IoGridOutline size={24} />, goTo: "/home" },
		{ label: "Page 2", icon: <TbVocabulary size={24} />, goTo: "/page-2" },
	];

	return (
		<div className="min-h-screen min-w-screen overflow-y-hidden flex">
			<Sidebar sidebarItems={navItems} />
			<section className="w-full flex flex-col bg-neutral-50">
				<Header name={user.email} />
				<Outlet context={{ user: user }} />
			</section>
		</div>
	);
}
