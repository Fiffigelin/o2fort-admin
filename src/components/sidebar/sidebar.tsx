// import { useState } from "react";
// import { FiLogOut, FiMenu } from "react-icons/fi";
// import { SidebarItem } from "./sidebar-item";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../api/auth-context";
// import Logo from "/src/assets/logo.png";

// export type SidebarItem = {
// 	label: string;
// 	icon?: React.ReactNode;
// 	goTo?: string;
// 	children?: SidebarItem[];
// };

// export type NavItem = {
// 	sidebarItems?: SidebarItem[];
// };

// export default function Sidebar({ sidebarItems }: NavItem) {
// 	const { logout } = useAuth();
// 	const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 768);
// 	const navigate = useNavigate();

// 	const LOGOUT: SidebarItem = {
// 		label: "Logga ut",
// 		icon: <FiLogOut size={24} />,
// 		goTo: "",
// 	};

// 	const handleToggle = () => {
// 		setCollapsed((prev) => !prev);
// 	};

// 	const handleLogout = () => {
// 		logout();
// 		navigate("/", { replace: true });
// 	};

// 	return (
// 		<aside
// 			className={`flex flex-col text-2xl bg-gray-50 shadow-lg text-(--color-text-primary) h-screen transition-[width] duration-500 ease-in-out ${
// 				collapsed ? "w-20" : "w-sm"
// 			}`}
// 		>
// 			{/* Logo + Toggle */}
// 			<div
// 				className={`flex p-4
//           ${collapsed ? "justify-center" : "justify-between"}`}
// 			>
// 				{!collapsed && (
// 					<div className="flex w-18 items-center gap-2 font-bold transition-opacity duration-500 ease-in-out">
// 						<img src={Logo} alt="Oscar II Fort Logo" />
// 					</div>
// 				)}
// 				<button
// 					onClick={handleToggle}
// 					aria-label="Toggle menu"
// 					className="text-(--color-text-primary) hover:text-white text-2xl p-1 focus:outline-none transition-colors duration-200 cursor-pointer"
// 				>
// 					<FiMenu size={26} />
// 				</button>
// 			</div>

// 			{/* Sidebar Items */}
// 			<div className="flex flex-col flex-1 overflow-hidden">
// 				<ul className="flex-1 flex flex-col gap-1 overflow-hidden">
// 					{sidebarItems?.map((item, index) => (
// 						<SidebarItem key={index} item={item} collapsed={collapsed} />
// 					))}
// 				</ul>

// 				<div
// 					onClick={handleLogout}
// 					className="border-t border-neutral-400 cursor-pointer"
// 				>
// 					<SidebarItem item={LOGOUT} collapsed={collapsed} />
// 				</div>
// 			</div>
// 		</aside>
// 	);
// }

import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { SidebarItem, type NavbarItem } from "./sidebar-item";
import { useAuth } from "../../api/auth-context";

export type NavItem = {
	sidebarItems?: NavbarItem[];
};

export default function Sidebar({ sidebarItems }: NavItem) {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const LOGOUT: NavbarItem = {
		label: "Logga ut",
		icon: <FiLogOut size={24} />,
		to: "",
	};

	const handleLogout = () => {
		logout();
		navigate("/", { replace: true });
	};

	return (
		<aside className="flex flex-col text-2xl w-105 bg-(--color-sidebar) shadow-lg">
			<a href="/" className="flex justify-center py-8">
				<img className="" src="src/assets/logo.png" alt="logo" />
			</a>

			<div className="h-full flex flex-col justify-between pt-4">
				<nav>
					{sidebarItems?.map((item, index) => (
						<SidebarItem key={item.label || index} item={item} />
					))}
				</nav>
				<div
					onClick={handleLogout}
					className="border-t border-(--color-border) cursor-pointer"
				>
					<SidebarItem item={LOGOUT} />
				</div>
			</div>
		</aside>
	);
}
