import { Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BoardColumnId } from "../../../enums";
import TaskFormComponent from "../../forms/task";
import BoardColumn from "../board-column";

const Board: React.FunctionComponent = () => {
	const refs = {
		todoColumn: useRef(null),
		inProgressColumn: useRef(null),
		doneColumn: useRef(null),
	};
	const [columnId, setColumnId] = useState<string>("todoColumn");
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div className="p-3 flex justify-around relative">
			<BoardColumn
				modalOpen={onOpen}
				setColumnId={setColumnId}
				title="To do"
				columnId={BoardColumnId.TODO}
				constraintsRef={refs[BoardColumnId.TODO]}
			/>
			<BoardColumn
				modalOpen={onOpen}
				setColumnId={setColumnId}
				title="In progress"
				columnId={BoardColumnId.IN_PROGRESS}
				constraintsRef={refs[BoardColumnId.IN_PROGRESS]}
			/>
			<BoardColumn
				modalOpen={onOpen}
				setColumnId={setColumnId}
				title="Done"
				columnId={BoardColumnId.DONE}
				constraintsRef={refs[BoardColumnId.DONE]}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<TaskFormComponent columnId={columnId} onClose={onClose} />
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Board;
