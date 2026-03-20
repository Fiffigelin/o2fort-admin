import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { EventModel } from "../../constant/types";
import { formatDateSE, setTime } from "../../utils/time-handler";

type ReventEventProps = {
	events: EventModel[];
	onUpdate: (data: EventModel) => void;
	onDelete: (data: EventModel) => void;
};

export default function UpcomingEventsChart({
	events,
	onUpdate,
	onDelete,
}: ReventEventProps) {
	return (
		<div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-10 bg-[#ffffff] rounded-lg shadow">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-(--font-header)">
					Kommande Evenemang
				</h3>
				<button className="text-muted-foreground hover:text-foreground transition-colors">
					<span className="w-5 h-5" />
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-(--border)">
							<th className="text-left text-sm font-medium text-gray-600 uppercase tracking-wider pb-3">
								Titel
							</th>
							<th className="text-left text-sm font-medium text-gray-600 uppercase tracking-wider pb-3">
								Datum
							</th>
							<th className="text-left text-sm font-medium text-gray-600 uppercase tracking-wider pb-3">
								Tid
							</th>
							<th className="text-center text-sm font-medium text-gray-600 uppercase tracking-wider pb-3">
								Status
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-(--border)">
						{events.map((data) => (
							<tr
								key={data.id}
								className="hover:bg-(--muted-chart) transition-colors"
							>
								<td className="py-2 font-medium text-(--muted-text) text-sm">
									{data.title}
								</td>
								<td className="py-2 font-medium text-(--muted-text) text-sm">
									{formatDateSE(data.startAt)}
								</td>
								<td className="py-2 font-medium text-(--muted-text) text-sm">
									{setTime(data.startAt, data.durationMinutes)}
								</td>
								<td className="py-2 font-medium text-sm">
									<div className="flex items-center justify-center gap-4 h-full text-[1em] lg:text-[1.3em]">
										<button
											className="text-(--muted-text) hover:bg-(--color-yellow) hover:text-black p-1.5 rounded-full cursor-pointer z-10"
											onClick={() => onUpdate(data)}
										>
											<MdOutlineModeEditOutline size={20} />
										</button>
										<button
											className="text-(--muted-text) hover:bg-(--color-yellow) hover:text-black p-1.5 rounded-full cursor-pointer z-10"
											onClick={() => onDelete(data)}
										>
											<RiDeleteBin6Line size={20} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
