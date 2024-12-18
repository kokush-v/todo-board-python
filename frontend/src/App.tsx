import { Heading, Link, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "./components/board/board-container";
import BoardFormComponent from "./components/forms/board";
import Header from "./components/header";
import { FormType } from "./enums";
import { useLazyGetBoardQuery, useLazyGetBoardsQuery } from "./redux/api/components/boardApi";
import { boardSelector } from "./redux/selectors";
import { getBoardData } from "./utils";
import { useLazyGetUserQuery, useLazyGetUsersQuery } from "./redux/api/components/authApi";

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [refetch, { isFetching, isLoading, isError, error }] = useLazyGetBoardQuery();
	const board = useSelector(boardSelector) || getBoardData();
	const [formType, setFormType] = useState<FormType>(FormType.NEW);
	const [refetchGetBoards] = useLazyGetBoardsQuery();
	const [refetchGetUser] = useLazyGetUserQuery();
	const [refetchGetUsers] = useLazyGetUsersQuery();

	useEffect(() => {
		refetchGetUser(null);
		refetchGetUsers(null);
		refetchGetBoards(null);
		if (board?.id) {
			refetch(board.id.toString());
		}
	}, [board?.id, refetch, refetchGetBoards, refetchGetUser, refetchGetUsers]);

	return (
		<div className="app h-[100vh] bg-transparent">
			<Header setFormType={setFormType} refetch={refetch} modalOpen={onOpen} />
			{isFetching || isLoading ? (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner size={"xl"} />
				</div>
			) : isError ? (
				<div className="mt-[10%]">
					{error && "status" in error && error.status == "FETCH_ERROR" ? (
						<Heading textAlign={"center"}>Server error, try one more lately</Heading>
					) : (
						<>
							<Heading textAlign={"center"}>Board does not exist.</Heading>
							<Heading textAlign={"center"}>
								You can{" "}
								<Link onClick={onOpen} color={"teal.700"}>
									crate one!
								</Link>
							</Heading>
						</>
					)}
				</div>
			) : (
				board && <Board />
			)}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<BoardFormComponent formType={formType} onClose={onClose} />
				</ModalContent>
			</Modal>
		</div>
	);
}

export default App;
