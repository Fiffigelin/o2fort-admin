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

ModuleRegistry.registerModules([AllCommunityModule]);

type EventGridProps = {
	data: EventModel[];
};

export function EventGrid({ data }: EventGridProps) {
	const colDefs: ColDef<EventModel>[] = [
		{ field: "id", headerName: "ID" },
		{ field: "title", headerName: "Titel" },
		{
			headerName: "Datum",
			field: "start_at",
			valueFormatter: (params) => formatDateSE(params.value),
		},
		{
			headerName: "Starttid",
			field: "start_at",
			valueFormatter: (params) => formatTimeSE(params.value),
		},
		{
			headerName: "Sluttid",
			valueGetter: (params) =>
				calculateEndTimeSE(
					params.data!.start_at,
					params.data!.duration_minutes,
				),
			valueFormatter: (params) => formatTimeSE(params.value),
		},
		{
			field: "duration_minutes",
			headerName: "Varaktighet (min)",
		},
	];

	return (
		<div className="ag-theme-quartz w-full h-full min-h-100">
			<AgGridReact rowData={data} columnDefs={colDefs} />
		</div>
	);
}
