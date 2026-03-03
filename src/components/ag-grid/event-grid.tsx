import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { EventModel } from "../../constant/types";
import {
	formatDateSE,
	formatTimeSE,
	calculateEndTimeSE,
} from "../../utils/time-handler";
import { ActionCellRenderer } from "./action-cellrenderer";

import "./event-grid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

type EventGridProps = {
	data: EventModel[];
};

export function EventGrid({ data }: EventGridProps) {
	const handleEdit = (data: EventModel) => {
		console.log("Ändra data: ", data);
	};

	const handleDelete = (data: EventModel) => {
		console.log("Ta bort data: ", data);
	};

	const colDefs: ColDef<EventModel>[] = [
		{
			headerName: "Datum",
			valueGetter: (params) => formatDateSE(params.data!.start_at),
		},
		{
			field: "title",
			headerName: "Titel",
			flex: 1,
		},
		{
			headerName: "Tid",
			valueGetter: (params) => {
				const start = params.data!.start_at;
				const end = calculateEndTimeSE(
					params.data!.start_at,
					params.data!.duration_minutes,
				);

				return { start, end };
			},
			valueFormatter: (params) => {
				const { start, end } = params.value;
				return `${formatTimeSE(start)}–${formatTimeSE(end)}`;
			},
		},
		{
			headerName: "",
			cellRenderer: ActionCellRenderer,
			cellClass: "no-active-color",
			cellRendererParams: {
				onEdit: handleEdit,
				onDelete: handleDelete,
				suppressMouseEventHandling: () => true,
			},
		},
	];

	return (
		<div className="ag-theme-quartz h-full min-h-100 overflow-y-scroll no-scrollbar">
			<AgGridReact rowData={data} columnDefs={colDefs} />
		</div>
	);
}
