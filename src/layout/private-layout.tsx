import { Outlet } from "react-router-dom";
import { MdOutlineEventAvailable, MdOutlineHome } from "react-icons/md";
import { TbVocabulary } from "react-icons/tb";
import type { NavbarItem } from "../components/sidebar/sidebar-item";
import { Toast } from "../components/toast/toast";
import { useToastModalContext } from "../contexts/toast/toast-modal-context";
import Sidebar from "../components/sidebar/sidebar";
import Modal from "../components/modal/modal";

export default function PrivateLayout() {
	const { toasts, removeToast, isModalVisible, modal, closeModal } =
		useToastModalContext();

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
		<div className="w-screen h-screen flex flex-col overflow-hidden lg:flex-row">
			<Sidebar sidebarItems={navItems} />
			<main className="flex-1 overflow-y-auto no-scrollbar">
				<Toast toasts={toasts} onClose={removeToast} />;
				<Modal isVisible={isModalVisible} modalItem={modal} />
				<div className="max-w-7xl mx-auto h-screen flex flex-col justify-center p-4 md:p-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
