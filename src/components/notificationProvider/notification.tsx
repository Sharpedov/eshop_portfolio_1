import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import styled from "styled-components";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeNotification } from "src/store/slices/notificationSlice";

interface pageProps {
	id;
	message: string;
	type: string;
}

const Notification = ({ message, type, id }: pageProps) => {
	const dispatch = useDispatch();
	const [width, setWidth] = useState<number>(100);
	const [intervalID, setIntervalID] = useState(null);
	const [exit, setExit] = useState(false);
	const notificationRef = useRef(null);

	const handleStartTimer = () => {
		const id = setInterval(() => {
			setWidth((prev) => {
				if (prev > 0) {
					return prev - 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, 10);

		setIntervalID(id);
	};

	const handlePauseTimer = () => {
		clearInterval(intervalID);
	};

	const closeNotificationHandler = useCallback(() => {
		if (notificationRef && notificationRef.current) {
			setExit(true);
			setTimeout(() => {
				dispatch(removeNotification({ id }));
			}, 400);
		}
	}, [dispatch, id]);

	useEffect(() => {
		width === 0 && closeNotificationHandler();
	}, [width, closeNotificationHandler]);

	useEffect(() => {
		handleStartTimer();
	}, []);

	const colorTypePalette = useMemo(
		() =>
			type === "SUCCESS"
				? "#4caf50"
				: type === "ERROR"
				? "#f44336"
				: type === "DELETE"
				? "#d86464"
				: type === "WARNING"
				? "#ff9800"
				: type === "INFO"
				? "#17a2b8"
				: null,
		[type]
	);

	return (
		<Container
			ref={notificationRef}
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			whileExit={exit}
			colorPalette={colorTypePalette}
		>
			<StyledIconButton
				aria-label="Proceed to checkout"
				onClick={closeNotificationHandler}
			>
				<CloseRoundedIcon />
			</StyledIconButton>
			<Content>
				{type === "SUCCESS" ? (
					<CheckCircleRoundedIcon className="notification__icon" />
				) : type === "DELETE" ? (
					<DeleteIcon className="notification__icon" />
				) : type === "ERROR" ? (
					<CancelIcon className="notification__icon" />
				) : type === "WARNING" ? (
					<WarningRoundedIcon className="notification__icon" />
				) : type === "INFO" ? (
					<InfoRoundedIcon className="notification__icon" />
				) : null}

				<p>{message}</p>
			</Content>

			<Bar colorPalette={colorTypePalette}>
				<div style={{ width: `${width}%` }} />
			</Bar>
		</Container>
	);
};

export default Notification;

const Container = styled.div`
	position: relative;
	border-radius: 2px;
	width: 100%;
	background: ${({ colorPalette }) => colorPalette};
	overflow-x: hidden;
	margin-bottom: 12px;
	animation: ${({ whileExit }) =>
		whileExit
			? `exit 0.3s cubic-bezier(0.5, 1, 0.89, 1)`
			: `open 0.3s cubic-bezier(0.5, 1, 0.89, 1)`};
	animation-fill-mode: forwards;
	pointer-events: ${({ whileExit }) => !whileExit && "all"};
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

	:last-of-type {
		margin-bottom: 0px;
	}

	@keyframes open {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}

		100% {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes exit {
		0% {
			opacity: 1;
			transform: none;
		}

		100% {
			opacity: 0;
			transform: scale(0.93);
		}
	}
`;

const StyledIconButton = styled(IconButton)`
	position: absolute;
	padding: 5px;
	top: 3px;
	right: 3px;
	transition: 0.15s ease-in-out;
	color: ${({ theme }) => theme.color.white};

	:hover {
		background-color: rgba(255, 255, 255, 0.15);
	}
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	gap: 0 10px;
	padding: 7px 27px 7px 8px;

	.notification__icon {
		font-size: ${({ theme }) => theme.font.xs};
		color: ${({ theme }) => theme.color.white};
	}

	> p {
		font-size: 14px;
	}

	@media (min-width: 768px) {
		padding: 10px 30px 10px 10px;
		> p {
			font-size: 15px;
		}
	}
`;

const Bar = styled.div`
	position: relative;
	height: 5px;

	> div {
		height: inherit;
		background: ${({ colorPalette }) => colorPalette};
		filter: brightness(0.7);
	}
`;
