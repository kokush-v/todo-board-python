import { DeleteIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Divider, Heading, IconButton } from "@chakra-ui/react";
import { Reorder, motion, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormType } from "../../enums";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../redux/api/components/taskApi";
import { boardSelector } from "../../redux/selectors";
import { setData } from "../../redux/slice/taskFormSlice";
import { moveItem } from "../../redux/slice/taskSlice";
import { Task } from "../../types/task";
import { useRaisedShadow } from "../../utils";

interface CardProps {
	constraintsRef: React.RefObject<HTMLDivElement>;
	task: Task;
	modalOpen: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ constraintsRef, task, modalOpen }) => {
	const [column, setColumn] = useState(constraintsRef);
	const [lastColumn, setLastColumn] = useState(constraintsRef);
	const [drag, setDrag] = useState(false);
	const [captured, setCaptured] = useState(false);

	const controls = useDragControls();
	const y = useMotionValue(0);
	const dispatch = useDispatch();
	const boxShadow = useRaisedShadow(y);
	const boardId = useSelector(boardSelector)?.id as number;
	const [updateItem] = useUpdateTaskMutation();
	const [deleteItem] = useDeleteTaskMutation();

	const moveCard = (task: Task) => {
		dispatch(moveItem({ data: task }));
		if (boardId) {
			updateItem({ ...task, boardId });
		}
	};

	return (
		<Reorder.Item
			value={task}
			id={task.id.toString()}
			dragListener={false}
			style={{ y, boxShadow }}
			dragControls={controls}>
			<motion.div
				dragSnapToOrigin={column.current?.id === lastColumn.current?.id}
				drag={drag}
				style={{ zIndex: drag ? 100 : 10, position: "relative" }}
				className="h-auto cursor-grab"
				dragConstraints={column}
				dragElastic={1}
				dragMomentum={false}
				onMouseDownCapture={() => {
					setCaptured(true);
				}}
				onMouseUpCapture={() => {
					setCaptured(false);
				}}
				onMouseEnter={() => {
					setDrag(true);
				}}
				onMouseLeave={() => {
					if (!captured) {
						setDrag(false);
					}
				}}
				onDrag={(_event, info) => {
					const parentBlocks = document.querySelectorAll(".board-column");

					parentBlocks.forEach((block) => {
						const rect = block.getBoundingClientRect();
						if (
							info.point.x >= rect.left &&
							info.point.x <= rect.right &&
							info.point.y >= rect.top &&
							info.point.y <= rect.bottom &&
							column.current !== block
						) {
							parentBlocks.forEach((div) => {
								(div as HTMLDivElement).style.height = "fit-content";
							});
							if (lastColumn.current?.id !== block.id)
								(block as HTMLDivElement).style.height = rect.height + 150 + "px";
							setColumn({ current: block as HTMLDivElement });
						}
					});
				}}
				onDragEnd={(_event, info) => {
					const parentBlocks = document.querySelectorAll(".board-column");

					parentBlocks.forEach((block) => {
						const rect = block.getBoundingClientRect();
						if (
							info.point.x >= rect.left &&
							info.point.x <= rect.right &&
							info.point.y >= rect.top &&
							info.point.y <= rect.bottom
						) {
							setLastColumn(column);
						}
						(block as HTMLDivElement).style.height = "fit-content";
					});

					if (!column?.current?.id || lastColumn.current?.id === column.current?.id) return;

					moveCard({ ...task, type: column.current?.id });
				}}
				onMouseDown={(event) => {
					event.currentTarget.style.cursor = "grabbing";
				}}
				onMouseUp={(event) => {
					event.currentTarget.style.cursor = "grab";
				}}
				dragTransition={{ bounceStiffness: 1000, bounceDamping: 100 }}>
				<div className="p-4 bg-[#fff] drop-shadow-xl h-[200px] text-black text-center text-2xl leading-[100px] rounded-md flex justify-between items-start ">
					<div className="w-full h-full flex flex-col">
						<div className="flex flex-col items-start w-full h-full">
							<Heading fontFamily={"sans-serif"} fontSize={"1.2rem"}>
								{task.title}
							</Heading>
							<Divider className="w-full my-2" borderColor={"#000000cc"} />
							<Heading className="text-zinc-400" textAlign={"left"} size={"sm"}>
								{task.description}
							</Heading>
						</div>
						<div className="flex h-min w-min">
							<IconButton
								className="text-zinc-400"
								onClick={() => {
									modalOpen();
									dispatch(setData({ type: FormType.EDIT, form: { boardId, ...task } }));
								}}
								variant={""}
								aria-label=""
								icon={<EditIcon />}
							/>
							<IconButton
								onClick={() => {
									deleteItem(task.id);
								}}
								color={"red.400"}
								variant={""}
								aria-label=""
								icon={<DeleteIcon />}
							/>
						</div>
					</div>
					<IconButton
						onMouseDown={(event) => {
							event.currentTarget.style.cursor = "grabbing";
						}}
						onMouseUp={(event) => {
							event.currentTarget.style.cursor = "grab";
						}}
						className="cursor-grab border-none self-center "
						aria-label=""
						variant={""}
						icon={<DragHandleIcon />}
						onMouseEnter={() => {
							setDrag(false);
						}}
						onMouseLeave={() => {
							setDrag(true);
						}}
						onPointerDown={(e) => {
							controls.start(e);
						}}
					/>
				</div>
			</motion.div>
		</Reorder.Item>
	);
};

export default Card;
