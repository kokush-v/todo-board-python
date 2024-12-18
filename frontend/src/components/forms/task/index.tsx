/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Textarea,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { FormType } from "../../../enums";
import { useAddTaskMutation, useUpdateTaskMutation } from "../../../redux/api/components/taskApi";
import { boardSelector, taskFormSelector } from "../../../redux/selectors";
import { Board } from "../../../types/board";
import { CreateTaskForm, UpdateTaskForm } from "../../../types/task";
import { showErrorToastWithText, showSuccesToast } from "../form.toast";

interface TaskFormProps {
	columnId: string;
	onClose: () => void;
}

const TaskFormComponent: React.FunctionComponent<TaskFormProps> = ({ columnId, onClose }) => {
	const toast = useToast();
	const board = useSelector(boardSelector) as Board;
	const [addTaskMutation] = useAddTaskMutation();
	const [updateTaskMutation] = useUpdateTaskMutation();
	const { form: initData, type: formType } = useSelector(taskFormSelector);

	const sumbitFuncs = {
		[FormType.NEW]: async (value: CreateTaskForm) => {
			try {
				await addTaskMutation(value).unwrap();
				showSuccesToast(toast, "Card created");
				onClose();
			} catch (error) {
				showErrorToastWithText(toast, "Error while creating");
			}
		},
		[FormType.EDIT]: async (value: UpdateTaskForm) => {
			try {
				await updateTaskMutation(value).unwrap();
				showSuccesToast(toast, "Card updated");
				onClose();
			} catch (error) {
				showErrorToastWithText(toast, "Error while updating");
			}
		},
	};

	const formik = useFormik<UpdateTaskForm>({
		initialValues: (formType === FormType.EDIT
			? initData
			: {
					id: "",
					description: "",
					title: "",
					type: columnId,
					board_id: board.id,
			  }) as UpdateTaskForm,
		onSubmit: (values) => {
			sumbitFuncs[formType](values);
		},
	});

	return (
		<Flex align="center" justify="center">
			<Box bg="white" p={3} rounded="md">
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={4} align="center">
						<Heading size={"md"} color="purple" textTransform={"uppercase"}>
							{formType === FormType.NEW ? "Add" : "Update"} task
						</Heading>
						<FormControl isInvalid={!!formik.errors.title && formik.touched.title}>
							<FormLabel htmlFor="title">Title</FormLabel>
							<Input
								id="title"
								name="title"
								type="text"
								variant="filled"
								onChange={formik.handleChange}
								value={formik.values.title}
							/>
							<FormErrorMessage>{formik.errors.title}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!formik.errors.description && formik.touched.description}>
							<FormLabel htmlFor="description">Description</FormLabel>
							<Textarea
								id="description"
								name="description"
								variant="filled"
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
							<FormErrorMessage>{formik.errors.description}</FormErrorMessage>
						</FormControl>
						<Button type="submit" colorScheme="purple" width="fit-content" alignSelf={"center"}>
							{formType === FormType.NEW ? "Add" : "Update"}
						</Button>
					</VStack>
				</form>
			</Box>
		</Flex>
	);
};

export default TaskFormComponent;
