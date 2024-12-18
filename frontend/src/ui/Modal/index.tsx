import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalProps } from "@chakra-ui/react";

interface ModalComponentProps extends ModalProps {
	useOverlay?: boolean;
	top?: string | number;
	left?: string | number;
}

const ModalComponent: React.FunctionComponent<ModalComponentProps> = ({
	isOpen,
	onClose,
	children,
	useOverlay = true,
	top,
	left,
	...props
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} {...props}>
			{useOverlay && <ModalOverlay />}
			<ModalContent position="absolute" top={top} left={left}>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ModalComponent;
