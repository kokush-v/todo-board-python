import { AddIcon } from "@chakra-ui/icons";
import { Heading, IconButton } from "@chakra-ui/react";
import { Reorder } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { BoardColumnId, FormType } from "../../../enums";
import { taskSelector } from "../../../redux/selectors";
import { setData } from "../../../redux/slice/taskFormSlice";
import { reorderItems } from "../../../redux/slice/taskSlice";
import { Task, UpdateTaskForm } from "../../../types/task";
import Card from "../../card";

interface BoardColumnProps {
	title: string;
	columnId: BoardColumnId;
	constraintsRef: React.RefObject<HTMLDivElement>;
	modalOpen: () => void;
	setColumnId: (id: string) => void;
}

const BoardColumn: React.FunctionComponent<BoardColumnProps> = ({
	title,
	constraintsRef,
	columnId,
	modalOpen,
	setColumnId,
}) => {
	const dispatch = useDispatch();

	const handleReorder = (column: string, newOrder: Task[]) => {
		dispatch(reorderItems({ column, data: newOrder }));
	};

	const tasks = useSelector(taskSelector)[columnId];

	return (
		<div className="board-column-container min-h-[100px] w-[400px] h-fit rounded-md">
			<div className="flex items-center justify-between px-4 pt-3">
				<Heading size={"lg"}>{title}</Heading>
				<IconButton
					aria-label=""
					variant={""}
					id={columnId}
					icon={<AddIcon />}
					onClick={() => {
						setColumnId(columnId);
						dispatch(setData({ type: FormType.NEW, form: {} as UpdateTaskForm }));
						modalOpen();
					}}
				/>
			</div>
			<Reorder.Group
				id={columnId}
				axis="y"
				onReorder={(newOrder) => {
					handleReorder(columnId, newOrder);
				}}
				ref={constraintsRef}
				className="p-4 flex flex-col gap-5 board-column"
				values={tasks}>
				{tasks.map((item) => (
					<Card modalOpen={modalOpen} key={item.id} constraintsRef={constraintsRef} task={item} />
				))}
			</Reorder.Group>
		</div>
	);
};

export default BoardColumn;
