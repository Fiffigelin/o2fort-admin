import type { ICellRendererParams } from "ag-grid-community";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import type { EventModel } from "../../constant/types";

type ActionCellRendererParams = ICellRendererParams<EventModel> & {
	data: EventModel;
	onEdit: (data: EventModel) => EventModel;
	onDelete: (data: EventModel) => EventModel;
};

export function ActionCellRenderer(params: ActionCellRendererParams) {
	const { data, onEdit, onDelete } = params;
	return (
		<div className="flex justify-between items-center h-full text-[1em] lg:text-[1.3em]">
			<button
				className="hover:bg-[#2196f3] hover:text-white p-1.5 rounded-full cursor-pointer"
				onClick={() => onEdit(data)}
			>
				<MdOutlineModeEditOutline />
			</button>
			<button
				className="hover:bg-[#2196f3] hover:text-white p-1.5 rounded-full cursor-pointer"
				onClick={() => onDelete(data)}
			>
				<RiDeleteBin6Line />
			</button>
		</div>
	);
}
