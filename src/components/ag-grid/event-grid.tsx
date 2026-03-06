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
	onUpdate: (event: EventModel) => void;
	onDelete: (event: EventModel) => void;
};

export function EventGrid({ data, onUpdate, onDelete }: EventGridProps) {
	const colDefs: ColDef<EventModel>[] = [
		{
			headerName: "Datum",
			suppressMovable: true,
			valueGetter: (params) => formatDateSE(params.data!.startAt),
		},
		{
			field: "title",
			headerName: "Titel",
			flex: 1,
			suppressMovable: true,
		},
		{
			headerName: "Tid",
			suppressMovable: true,
			valueGetter: (params) => {
				const start = params.data!.startAt;
				const end = calculateEndTimeSE(
					params.data!.startAt,
					params.data!.durationMinutes,
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
			suppressMovable: true,
			maxWidth: 100,
			cellRenderer: ActionCellRenderer,
			cellClass: "no-active-color",
			cellRendererParams: {
				onEdit: onUpdate,
				onDelete: onDelete,
				suppressMouseEventHandling: () => true,
			},
		},
	];

	const mobileColDefs: ColDef<EventModel>[] = [
		{
			headerName: "Datum",
			valueGetter: (params) => formatDateSE(params.data!.startAt),
			suppressMovable: true,
		},
		{
			field: "title",
			headerName: "Titel",
			flex: 1,
			suppressMovable: true,
		},
		{
			headerName: "",
			maxWidth: 100,
			suppressMovable: true,
			cellRenderer: ActionCellRenderer,
			cellClass: "no-active-color",
			cellRendererParams: {
				onEdit: onUpdate,
				onDelete: onDelete,
				suppressMouseEventHandling: () => true,
			},
		},
	];

	return (
		<div className="ag-theme-quartz h-full min-h-100 overflow-y-scroll no-scrollbar">
			<AgGridReact
				rowData={data}
				columnDefs={mobileColDefs}
				className="block xl:hidden"
			/>
			<AgGridReact
				rowData={data}
				columnDefs={colDefs}
				className="hidden xl:block"
			/>
		</div>
	);
}
