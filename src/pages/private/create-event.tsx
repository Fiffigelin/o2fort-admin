import { useLocation, useNavigate } from "react-router-dom";
import type { UploadedFile } from "../../api/hooks/use-event";
import TextInput from "../../components/input/text/text-input";
import { useCallback, useState } from "react";
import type { CreateNewEvent } from "../../constant/types";
import TextNewInput from "../../components/text-input/text-input";
import Datepicker from "../../components/date-picker/date-picker";

export default function CreateEvent() {
	const navigate = useNavigate();
	const location = useLocation();
	const [event, setEvent] = useState<CreateNewEvent>({
		title: "",
		imageUrl: "",
		date: new Date(),
	});

	const image = location.state?.image as UploadedFile | undefined;

	if (!image) {
		navigate("/home");
		return null;
	}

	const handleEvent = useCallback(
		(property: keyof CreateNewEvent, value: string | undefined) => {
			setEvent((prevState) => {
				let newValue: any = value;

				if (property === "date" && value) {
					newValue = new Date(value);
				}

				return {
					...prevState,
					[property]: newValue,
				};
			});
		},
		[],
	);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1>Skapa Event</h1>
			<TextInput
				key="title"
				value={event.title}
				label={"Titel"}
				onChange={(value) => {
					handleEvent("title", value);
				}}
			/>
			<TextNewInput
				placeholder={""}
				label={""}
				value={""}
				onChange={function (value: string): void {
					throw new Error("Function not implemented.");
				}}
			/>
			<Datepicker />
			<img src={image.url} alt={image.name} />
		</div>
	);
}
