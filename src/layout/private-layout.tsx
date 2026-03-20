import { Outlet, useLocation } from "react-router-dom";
import { MdOutlineEventAvailable, MdOutlineHome } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";
import type { NavbarItem } from "../components/sidebar/sidebar-item";
import { Toast } from "../components/toast/toast";
import { useToastModalContext } from "../contexts/toast/toast-modal-context";
import Sidebar from "../components/sidebar/sidebar";
import Modal from "../components/modal/modal";
import Header from "../components/header/header";

export default function PrivateLayout() {
	const { toasts, removeToast, isModalVisible, modal, closeModal } =
		useToastModalContext();
	const location = useLocation();
	const pathname = location.pathname;

	const getTitle = () => {
		if (pathname === "/home") return "Dashboard";
		if (pathname.startsWith("/event")) return "Evenemang";
		if (pathname.startsWith("/wiki")) return "Wiki";
		return "";
	};

	const navItems: NavbarItem[] = [
		{ label: "Start", icon: <MdOutlineHome size={30} />, to: "/" },
		{
			label: "Evenemang",
			icon: <MdOutlineEventAvailable size={30} />,
			to: "/event",
		},
		{ label: "Wiki", icon: <TbVocabulary size={30} />, to: "/wiki" },
	];

	return (
		<div className="w-screen h-screen flex flex-col overflow-hidden lg:flex-row">
			<Sidebar sidebarItems={navItems} />
			<main className="flex-1 overflow-y-auto no-scrollbar">
				<Header title={getTitle()} />
				<Toast toasts={toasts} onClose={removeToast} />
				<Modal isVisible={isModalVisible} modalItem={modal} />
				<div className="mx-auto h-screen flex flex-col justify-center p-4 md:p-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
