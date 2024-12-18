/* eslint-disable react-hooks/exhaustive-deps */
import { AddIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, HStack, Heading, IconButton, InputGroup, useDisclosure, useToast } from "@chakra-ui/react";
import { AuthFormType, FormType } from "../../enums";
import { getBoardData } from "../../utils";
import { allBoardsSelector, boardSelector, userSelector } from "../../redux/selectors";
import { showErrorToastWithText } from "../forms/form.toast";
import { useDispatch, useSelector } from "react-redux";
import InputSelect, { SelectOptions } from "../../ui/InputSelect";
import { setBoard } from "../../redux/slice/boardSlice";
import AvatarComponent from "../user/avatar";
import ModalComponent from "../../ui/Modal";
import { AuthForm } from "../forms/auth";
import { useState } from "react";

interface HeaderProps {
	modalOpen: () => void;
	refetch: (boardName: string) => void;
	setFormType: (formType: FormType) => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({ modalOpen, setFormType }) => {
	const board = useSelector(boardSelector) || getBoardData();
	const toast = useToast();
	const boardSelectOptions = useSelector(allBoardsSelector);
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [formType, setAuthFormType] = useState<AuthFormType>(AuthFormType.LOGIN);
	const user = useSelector(userSelector);

	const handleSelectChange = ({ label, value, is_private, permissions }: SelectOptions) => {
		if (!is_private) {
			dispatch(setBoard({ id: parseInt(value.toString()), name: label, is_private, permissions }));
		} else {
			showErrorToastWithText(toast, "You don't have permission to view this board");
		}
	};

	return (
		<header className="header flex items-center gap-6 py-3 px-[5em] top-0 sticky z-30">
			<Heading textAlign={"center"}>Board</Heading>
			<InputGroup border={"1px solid #a3a3a3"} className="p-1 rounded-lg">
				<IconButton className="cursor-default" aria-label="" variant={""} icon={<Search2Icon color="#a3a3a3" />} />
				<InputSelect
					defaultValue={
						board && {
							label: board.name,
							value: board.id,
							is_private: board.is_private,
							permissions: board.permissions,
						}
					}
					options={boardSelectOptions.map((board) => {
						return {
							label: board.name,
							value: board.id,
							is_private: board.is_private
								? user
									? !board.permissions.find((elem) => elem.id === user.id)
									: true
								: false,
							permissions: board.permissions,
						};
					})}
					onChange={handleSelectChange}
				/>
			</InputGroup>
			<HStack>
				<IconButton
					aria-label=""
					variant={""}
					icon={<AddIcon />}
					onClick={() => {
						if (!user) {
							showErrorToastWithText(toast, "Please login to create a board");
						} else {
							modalOpen();
							setFormType(FormType.NEW);
						}
					}}
				/>
				<IconButton
					aria-label=""
					variant={""}
					icon={<EditIcon />}
					onClick={() => {
						if (!user) {
							showErrorToastWithText(toast, "Please login to edit the board");
						} else if (!board) {
							showErrorToastWithText(toast, "No board selected, create or select one");
						} else {
							modalOpen();
							setFormType(FormType.EDIT);
						}
					}}
				/>
			</HStack>
			{user ? (
				<AvatarComponent />
			) : (
				<HStack>
					<Button
						colorScheme="pink"
						color="white"
						onClick={() => {
							setAuthFormType(AuthFormType.REGISTER);
							onOpen();
						}}>
						Sign Up
					</Button>
					<Button
						colorScheme="white"
						color="purple"
						onClick={() => {
							setAuthFormType(AuthFormType.LOGIN);
							onOpen();
						}}>
						Login
					</Button>
				</HStack>
			)}
			<ModalComponent isOpen={isOpen} onClose={onClose}>
				<AuthForm type={formType} onClose={onClose} />
			</ModalComponent>
		</header>
	);
};

export default Header;
