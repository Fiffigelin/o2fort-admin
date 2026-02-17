import { useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { SidebarItem } from "./sidebar-item";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/auth-context";
import Logo from "/src/assets/logo.png";

export type SidebarItem = {
	label: string;
	icon: React.ReactNode;
	goTo: string;
};

export type NavItem = {
	sidebarItems?: SidebarItem[];
};

export default function Sidebar({ sidebarItems }: NavItem) {
	const { logout } = useAuth();
	const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 768);
	const navigate = useNavigate();

	const LOGOUT: SidebarItem = {
		label: "Log Out",
		icon: <FiLogOut size={24} />,
		goTo: "",
	};

	const handleToggle = () => {
		setCollapsed((prev) => !prev);
	};

	const handleLogout = () => {
		logout();
		navigate("/", { replace: true });
	};

	return (
		<aside
			className={`flex flex-col bg-(--color-sidebar) text-(--color-text-primary) h-screen transition-[width] duration-500 ease-in-out ${
				collapsed ? "w-20" : "w-sm"
			}`}
		>
			{/* Logo + Toggle */}
			<div
				className={`flex border-b border-(--color-yellow) p-4 
          ${collapsed ? "justify-center" : "justify-between"}`}
			>
				{!collapsed && (
					<div className="flex w-18 items-center gap-2 font-bold transition-opacity duration-500 ease-in-out">
						<img src={Logo} alt="Oscar II Fort Logo" />
					</div>
				)}
				<button
					onClick={handleToggle}
					aria-label="Toggle menu"
					className="text-(--color-text-primary) hover:text-white text-2xl p-1 focus:outline-none transition-colors duration-200 cursor-pointer"
				>
					<FiMenu size={26} />
				</button>
			</div>

			{/* Sidebar Items */}
			<div className="flex flex-col flex-1 overflow-hidden">
				<ul className="flex-1 flex flex-col gap-1 overflow-hidden">
					{sidebarItems?.map((item, index) => (
						<SidebarItem key={index} item={item} collapsed={collapsed} />
					))}
				</ul>

				<div
					onClick={handleLogout}
					className="border-t border-neutral-400 cursor-pointer"
				>
					<SidebarItem item={LOGOUT} collapsed={collapsed} />
				</div>
			</div>
		</aside>
	);
}
