import { Avatar, useDisclosure } from "@chakra-ui/react";
import ModalComponent from "../../../ui/Modal";
import UserInfoComponent from "../info-modal";

const AvatarComponent: React.FunctionComponent = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Avatar
				color="red"
				className="cursor-pointer"
				onClick={() => {
					onOpen();
				}}
			/>
			<ModalComponent left={"75%"} top={"25px"} isOpen={isOpen} onClose={onClose} useOverlay={false}>
				<UserInfoComponent />
			</ModalComponent>
		</>
	);
};

export default AvatarComponent;
