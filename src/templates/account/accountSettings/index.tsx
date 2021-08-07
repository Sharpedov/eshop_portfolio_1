import React, { useMemo, useState } from "react";
import {
	Controller,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import styled, { keyframes } from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import CustomIconButton from "src/components/customIconButton";
import Modal from "src/components/modal";
import CustomButton from "src/components/customButton";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DefaultLoading from "src/components/loadingIndicators/defaultLoading";
import { useEffect } from "react";
import { useAuth } from "src/components/authProvider";
import FormInput from "src/components/input/formInput";
import AvatarEditRow from "./avatarEditRow";
import {
	changeUserData,
	changeUserEmail,
	changeUserPassword,
} from "src/store/slices/userSlice";

interface pageProps {}

interface IformInputs {
	username: string;
	email: string;
	password: string;
	newPassword: string;
	repeatPassword: string;
}

interface TypeOfModal {
	type: "data" | "email" | "password";
}

const yupSchemaChangeData = yup.object({
	username: yup.string().max(16).required("Name is a required"),
});
const yupSchemaChangeEmail = yup.object({
	email: yup.string().email().required("Email is a required"),
	password: yup.string().min(4).max(16).required("Password is a required"),
});
const yupSchemaChangePassword = yup.object({
	password: yup.string().min(4).max(16).required("Password is a required"),
	newPassword: yup
		.string()
		.min(4)
		.max(16)
		.required("New Password is a required"),
	repeatPassword: yup
		.string()
		.min(4)
		.max(16)
		.required("Repeat Password is a required"),
});

const mapState = (state) => ({
	changeLoading: state.user.loading,
});

const AccountSettings = ({}: pageProps) => {
	const { changeLoading } = useSelector(mapState);
	const [modalType, setModalType] = useState<TypeOfModal>({ type: "data" });
	const { user, loading: userLoading } = useAuth();
	const methods = useForm<IformInputs>({
		resolver: yupResolver(
			modalType.type === "email"
				? yupSchemaChangeEmail
				: modalType.type === "password"
				? yupSchemaChangePassword
				: yupSchemaChangeData
		),
	});
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = methods;
	const [showModal, setShowModal] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		reset();
	}, [showModal, reset]);

	const ModalBody = useMemo(() => {
		const closeModal = () => setShowModal(false);

		const changeDataOnSubmit: SubmitHandler<IformInputs> = (
			data: IformInputs
		) => {
			const { username } = data;
			dispatch(
				changeUserData({
					email: user.email,
					username: username.charAt(0).toUpperCase() + username.slice(1),
					closeModal,
				})
			);
		};

		const changeEmailOnSubmit: SubmitHandler<IformInputs> = (
			data: IformInputs
		) => {
			const { email: newEmail, password } = data;
			dispatch(
				changeUserEmail({ email: user.email, newEmail, password, closeModal })
			);
		};

		const changePasswordOnSubmit: SubmitHandler<IformInputs> = (
			data: IformInputs
		) => {
			const { password, newPassword } = data;

			dispatch(
				changeUserPassword({
					email: user.email,
					currentPassword: password,
					newPassword,
					closeModal,
				})
			);
		};

		switch (modalType.type) {
			case "data": {
				return (
					user && (
						<FormProvider {...methods}>
							<Form onSubmit={handleSubmit(changeDataOnSubmit)}>
								<Controller
									name="username"
									control={control}
									defaultValue={user.username}
									render={({ field }) => (
										<FormInput
											label="Username"
											field={field}
											error={errors.username && errors.username.message}
										/>
									)}
								/>
								<CustomButton
									type="submit"
									size="small"
									variant="contained"
									loading={changeLoading}
								>
									Save
								</CustomButton>
							</Form>
						</FormProvider>
					)
				);
			}
			case "email": {
				return (
					<FormProvider {...methods}>
						<Form onSubmit={handleSubmit(changeEmailOnSubmit)}>
							<FormInput
								dummy
								disabled
								label="Current Email"
								defaultValue={user.email}
							/>

							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<FormInput
										label="New Email"
										field={field}
										error={errors.email && errors.email.message}
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<FormInput
										type="password"
										label="Confirm password"
										field={field}
										error={errors.password && errors.password.message}
									/>
								)}
							/>
							<CustomButton
								type="submit"
								size="small"
								variant="contained"
								loading={changeLoading}
							>
								Save
							</CustomButton>
						</Form>
					</FormProvider>
				);
			}
			case "password": {
				return (
					<FormProvider {...methods}>
						<Form onSubmit={handleSubmit(changePasswordOnSubmit)}>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<FormInput
										type="password"
										label="Current password"
										field={field}
										error={errors.password && errors.password.message}
									/>
								)}
							/>
							<Controller
								name="newPassword"
								control={control}
								render={({ field }) => (
									<FormInput
										type="password"
										label="New password"
										field={field}
										error={errors.newPassword && errors.newPassword.message}
									/>
								)}
							/>
							<Controller
								name="repeatPassword"
								control={control}
								render={({ field }) => (
									<FormInput
										type="password"
										label="Repeat new password"
										field={field}
										error={
											errors.repeatPassword && errors.repeatPassword.message
										}
									/>
								)}
							/>
							<CustomButton
								type="submit"
								size="small"
								variant="contained"
								loading={changeLoading}
							>
								Save
							</CustomButton>
						</Form>
					</FormProvider>
				);
			}
			default:
				return null;
		}
	}, [
		modalType,
		control,
		errors,
		user,
		methods,
		handleSubmit,
		dispatch,
		changeLoading,
	]);

	return (
		<>
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				title={`Change ${modalType.type}`}
				shouldBeCloseOutside={false}
			>
				{user && ModalBody}
			</Modal>
			<Body>
				{userLoading ? (
					<DefaultLoading marginTop={50} marginBottom={60} />
				) : (
					<>
						<Row>
							<RowHeading>Avatar</RowHeading>
							<AvatarEditRow user={user} />
						</Row>
						<Row>
							<RowHeading>Your Data</RowHeading>
							<RowContent>
								<span>{user.username}</span>
								{/* <span>tel. 792 513 552</span> */}
								<EditBtn
									// position="topRight"
									onClick={() => {
										setShowModal((prev) => !prev);
										setModalType({ type: "data" });
									}}
								>
									<CustomIconButton
										ariaLabel="Edit you data"
										Icon={EditIcon}
										size="small"
									/>
								</EditBtn>
							</RowContent>
						</Row>
						<Row>
							<RowHeading>Email</RowHeading>
							<RowContent>
								<span>{user.email}</span>
								<EditBtn
									onClick={() => {
										setShowModal((prev) => !prev);
										setModalType({ type: "email" });
									}}
								>
									<CustomIconButton
										ariaLabel="Edit you data"
										Icon={EditIcon}
										size="small"
									/>
								</EditBtn>
							</RowContent>
						</Row>
						<Row>
							<RowHeading>Password</RowHeading>
							<RowContent>
								<span>••••••••</span>
								<EditBtn
									onClick={() => {
										setShowModal((prev) => !prev);
										setModalType({ type: "password" });
									}}
								>
									<CustomIconButton
										ariaLabel="Edit you data"
										Icon={EditIcon}
										size="small"
									/>
								</EditBtn>
							</RowContent>
						</Row>
					</>
				)}
			</Body>
		</>
	);
};

export default AccountSettings;

const appear = keyframes`
	from {
		opacity:0;
	}
	to{
		opacity:1;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => `${theme.surface.primary + "c0"}`};
	border-radius: 2px;
	min-height: 60vh;
	margin-top: 15px;
	gap: 15px;
	padding: 15px;
`;

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	gap: 18px;
`;

const Row = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 400px;
	animation: ${appear} 0.3s ease-in-out;
`;

const RowHeading = styled.div`
	margin-bottom: 10px;
`;

const RowContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(75, 75, 75, 0.25);
	/* rgba(48, 48, 48, 0.25); */
	padding: 16px;
	gap: 6px;
	border-radius: 8px;
	font-size: 15px;
`;

const EditBtn = styled.div`
	position: absolute;
	top: ${({ position }) => (position === "topRight" ? "4px" : "50%")};
	right: 4px;
	transform: ${({ position }) => !position && "translateY(-50%)"};
`;
