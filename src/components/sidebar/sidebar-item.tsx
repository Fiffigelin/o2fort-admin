// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import type { SidebarItem as SidebarItemType } from "./sidebar";

// export type SidebarItemProps = {
// 	item: SidebarItemType;
// 	collapsed: boolean;
// };

// export function SidebarItem({ item, collapsed }: SidebarItemProps) {
// 	const [expanded, setExpanded] = useState(true); // parent open by default

// 	const hasChildren = item.children && item.children.length > 0;

// 	return (
// 		<li className="w-full text-xl">
// 			<div
// 				className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-(--color-border)
//         ${collapsed && "justify-center"}`}
// 				onClick={() => hasChildren && setExpanded((prev) => !prev)}
// 			>
// 				{item.icon && <span className="text-xl shrink-0">{item.icon}</span>}
// 				{!collapsed && (
// 					<span className="flex-1 truncate font-medium">{item.label}</span>
// 				)}
// 			</div>

// 			{hasChildren && expanded && !collapsed && (
// 				<ul className="pl-8 flex flex-col gap-1">
// 					{item.children!.map((child, idx) => (
// 						<li key={idx}>
// 							<NavLink
// 								to={child.goTo || "#"}
// 								className={({ isActive }) =>
// 									`block p-2 text-gray-600 hover:text-black hover:bg-(--color-border)
//                   ${isActive ? "font-semibold text-black" : ""}`
// 								}
// 							>
// 								{child.label}
// 							</NavLink>
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</li>
// 	);
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type NavbarItem = {
	label: string;
	icon?: React.ReactNode;
	to: string;
	subItems?: NavbarItem[];
};

type NavbarItemProps = {
	item: NavbarItem;
	onClick?: () => void;
};

export function SidebarItem({ item, onClick }: NavbarItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const hasSubItems = !!item.subItems?.length;

	return (
		<div onClick={onClick}>
			<div
				className="
          flex items-center gap-6 p-5
          text-(--color-text-secondary) hover:bg-(--color-border) hover:text-white
          transition-colors duration-300
        "
			>
				{item.to.length > 0 ? (
					<Link to={item.to} className="flex items-center gap-6 flex-1">
						{item.icon}
						<span>{item.label}</span>
					</Link>
				) : (
					<div
						className="flex items-center gap-6 flex-1 cursor-pointer"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						{item.icon}
						<span>{item.label}</span>
					</div>
				)}

				{hasSubItems && (
					<button
						type="button"
						className={`
              transition-transform duration-300
              ${isOpen ? "-rotate-180" : ""}
            `}
						aria-expanded={isOpen}
					>
						<MdOutlineKeyboardArrowDown />
					</button>
				)}
			</div>

			{hasSubItems && (
				<div
					className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
				>
					{item.subItems!.map((sub) => (
						<Link
							key={sub.label}
							to={sub.to}
							className="
                flex items-center gap-4 pl-14 pr-5 py-3
                text-(--color-text-secondary) hover:bg-(--color-yellow)/85 hover:text-stone-900
                transition-colors
              "
						>
							{sub.icon}
							<span>{sub.label}</span>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
