import React from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import CustomButton from "src/components/customButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "src/store/slices/authSlice";
import Image from "next/image";
import FormInput from "src/components/input/formInput";

interface pageProps {}

interface IformInputs {
	username: string;
	email: string;
	password: string;
	repeatPassword: string;
}

const yupSchema = yup.object().shape({
	username: yup.string().min(3).max(16).required(),
	email: yup.string().email().required(),
	password: yup.string().min(4).max(16).required(),
});

const mapState = (state) => ({
	signupLoading: state.auth.signup.loading,
	signupError: state.auth.signup.error,
});

const CreateAccountTemplate = ({}: pageProps) => {
	const { signupLoading, signupError } = useSelector(mapState);
	const { push, query } = useRouter();
	const methods = useForm<IformInputs>({ resolver: yupResolver(yupSchema) });
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = methods;
	const dispatch = useDispatch();

	const onSubmitHandler: SubmitHandler<IformInputs> = (data: IformInputs) => {
		const { username, email, password } = data;

		dispatch(
			signup({
				username: username.charAt(0).toUpperCase() + username.slice(1),
				email: email.toLowerCase(),
				password,
			})
		);
	};

	return (
		<Container>
			<Wrapper>
				<Panel>
					<Title>Create Account</Title>
					<FormWrapper>
						<Form onSubmit={handleSubmit(onSubmitHandler)}>
							<Controller
								render={({ field }) => (
									<FormInput
										field={field}
										label="First Name"
										error={errors.username && errors.username.message}
									/>
								)}
								name="username"
								control={control}
							/>

							<Controller
								render={({ field }) => (
									<FormInput
										field={field}
										label="Email"
										error={errors.email && errors.email.message}
									/>
								)}
								name="email"
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<FormInput
										field={field}
										label="Password"
										type="password"
										error={errors.password && errors.password.message}
									/>
								)}
								name="password"
								control={control}
							/>

							<CustomButton
								variant="outlined"
								type="submit"
								loading={signupLoading}
							>
								Create Account
							</CustomButton>
						</Form>
						<CustomButton variant="outlined" onClick={() => push("/")}>
							Cancel
						</CustomButton>
					</FormWrapper>
					<Bottom>
						<span>Already have an account?</span>
						<CustomButton
							variant="outlined"
							onClick={() =>
								push(
									`${
										query.redirect
											? `/sign-in?redirect=${query.redirect}`
											: "/sign-in"
									}`
								)
							}
						>
							Sign In
						</CustomButton>
					</Bottom>
				</Panel>
				<ImageWrapper>
					<Image
						src="/unDraw/sign_up.svg"
						alt="Sign In"
						width={700}
						height={475}
					/>
				</ImageWrapper>
			</Wrapper>
		</Container>
	);
};

export default CreateAccountTemplate;

const PanelAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-20px);
	}
	100% {
		opacity: 1;
		transform: translateY(0px);
	}
`;

const Container = styled.div`
	display: grid;
	place-items: center;
	background: ${({ theme }) => theme.surface.secondary};
	padding: 25px 0;

	@media (min-width: 768px) {
		padding: 45px 0;
	}
	@media (min-width: 1024px) {
		padding: 60px 25px;
	}
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	margin: 0 auto;
	animation: ${PanelAnimation} 0.25s linear;

	@media (min-width: 1024px) {
		grid-template-columns: 450px 1fr;
		max-width: 1000px;
		width: 100%;
		box-shadow: ${({ theme }) => theme.boxShadow.primary};
		background: rgba(0, 0, 0, 0.5);
		border-radius: 3px;
	}
`;

const Title = styled.h2`
	text-align: center;
	padding: 40px 0;
	color: ${({ theme }) => theme.color.white};
`;

const FormWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px 0;
	position: relative;
	padding: 0 25px;
	justify-content: center;
`;

const Panel = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 1024px) {
		width: 92vw;
		max-width: 450px;
		min-height: 300px;
		border-radius: 3px;
		box-shadow: ${({ theme }) => theme.boxShadow.primary};
		background: rgba(0, 0, 0, 0.5);
		border-radius: 3px;
	}
`;

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	gap: 20px 0;
	position: relative;
`;

const Bottom = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	border-top: 1px solid rgba(58, 60, 63, 0.5);
	background: rgba(17, 17, 17, 0.75);
	padding: 0 25px;
	margin-top: 24px;
	padding-bottom: 25px;
	flex: 1;

	> span {
		text-align: center;
		font-size: 13px;
		font-weight: 400;
		margin: 20px 0;
		font-family: ${({ theme }) => theme.whitney};
	}
`;

const ImageWrapper = styled.div`
	display: none;

	@media (min-width: 1024px) {
		display: grid;
		place-items: center;
		overflow: hidden;
		padding: 25px;
		border-left: 1px solid rgba(58, 60, 63, 0.5);

		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
`;
