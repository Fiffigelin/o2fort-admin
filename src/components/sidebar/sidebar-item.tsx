import { NavLink } from "react-router-dom";
import { type SidebarItem } from "./sidebar";

export type SidebarItemProps = {
	item: SidebarItem;
	collapsed: boolean;
};

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
	return (
		<li
			className={`${collapsed && "min-w-20"} w-full text-(--color-text-primary) text-xl h-14 hover:bg-(--color-border)`}
		>
			<NavLink
				to={item.goTo}
				className={({ isActive }) =>
					`flex items-center gap-3 p-4 transition-colors duration-200
          ${isActive && "bg-(--color-yellow) font-semibold text-black"}
          ${collapsed && "justify-center"}`
				}
			>
				<span className="text-xl shrink-0">{item.icon}</span>
				{!collapsed && (
					<span className="flex-1 transition-opacity duration-400 truncate">
						{item.label}
					</span>
				)}
			</NavLink>
		</li>
	);
}
