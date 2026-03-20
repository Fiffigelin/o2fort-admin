import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { SidebarItem, type NavbarItem } from "./sidebar-item";
import { useAuth } from "../../contexts/auth/auth-context";
import { RiCloseLargeLine, RiMenuLine } from "react-icons/ri";
import { useState } from "react";
import { motion } from "motion/react";

export type NavItem = {
	sidebarItems?: NavbarItem[];
};

export default function Sidebar({ sidebarItems }: NavItem) {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const LOGOUT: NavbarItem = {
		label: "Logga ut",
		icon: <FiLogOut size={30} />,
		to: "",
	};

	const handleOnClikc = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogout = () => {
		logout();
		navigate("/", { replace: true });
	};

	return (
		<>
			{/* DESKTOP */}
			<aside className="hidden lg:flex flex-col sticky h-full w-85 bg-[var(--foreground)] shadow-lg text-2xl">
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

			{/* MOBIL */}
			<div className="flex flex-col lg:hidden w-screen inset-x-0 z-9999 bg-(--color-sidebar) text-xl">
				<div className="flex items-center justify-between py-4 px-12">
					<a href="/home" className="flex justify-center">
						<img
							className="h-18 lg:h-46.25"
							src="src/assets/logo.png"
							alt="logo"
						/>
					</a>
					<button
						className="flex cursor-pointer focus:outline-none"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						{isOpen ? (
							<RiCloseLargeLine className="w-6 h-6 text-(--color-text-secondary)" />
						) : (
							<RiMenuLine className="w-6 h-6 text-(--color-text-secondary)" />
						)}
					</button>
				</div>

				{isOpen && (
					<motion.div
						className="block overflow-hidden text-center"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						style={{ maxHeight: "100vh" }}
						transition={{ duration: 1 }}
					>
						<nav className="">
							{sidebarItems?.map((item, index) => (
								<SidebarItem
									key={item.label || index}
									item={item}
									onClick={handleOnClikc}
								/>
							))}
							<div
								onClick={handleLogout}
								className="border-t border-(--color-border) cursor-pointer"
							>
								<SidebarItem item={LOGOUT} />
							</div>
						</nav>
					</motion.div>
				)}
			</div>
		</>
	);
}
