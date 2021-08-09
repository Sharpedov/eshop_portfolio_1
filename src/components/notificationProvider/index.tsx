import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Notification from "./notification";
import { createPortal } from "react-dom";

interface pageProps {
	children;
}

const NotificationContext = createContext(null);

const mapState = (state) => ({
	notifications: state.notifications.notifications,
});

const NotificationProvider = ({ children }: pageProps) => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false);
	const { notifications } = useSelector(mapState);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	return (
		isBrowser &&
		createPortal(
			<>
				<Wrapper>
					{notifications.map((note, i) => (
						<Notification
							key={note.id}
							id={note.id}
							message={note.message}
							type={note.type}
						/>
					))}
				</Wrapper>
				{children}
			</>,
			document.getElementById("notifications")
		)
	);
};

interface notification {
	type?: string;
	message: string;
}

export const useNotification = () => {
	const dispatch = useContext(NotificationContext);

	return ({ type, message }: notification) =>
		dispatch({
			type: "ADD",
			payload: {
				type: type ? type.toUpperCase() : "SUCCESS",
				message,
			},
		});
};

export default NotificationProvider;

const Wrapper = styled.div`
	position: fixed;
	bottom: 65px;
	left: 5px;
	right: 5px;
	z-index: 999;
	pointer-events: none;

	@media (min-width: 330px) {
		left: 15px;
		right: auto;
		width: 265px;
	}
	@media (min-width: 480px) {
		width: 280px;
	}

	@media (min-width: 768px) {
		left: 25px;
		bottom: 45px;
		width: 300px;
	}
	@media (min-width: 1024px) {
		width: 325px;
	}
`;
