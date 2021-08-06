import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import CustomButton from "src/components/customButton";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { Avatar, ButtonBase } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addNotification } from "src/store/slices/notificationSlice";
import { getLoggedUser } from "src/store/slices/authSlice";

interface pageProps {
	user;
}

const AvatarEditRow = ({ user }: pageProps) => {
	const avatarPickerRef = useRef(null);
	const [editedAvatar, setEditedAvatar] = useState(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>(null);
	const dispatch = useDispatch();

	const addImageToPost = useCallback(
		(e) => {
			const reader = new FileReader();

			if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

			reader.onload = (readerEvent) => {
				setEditedAvatar(readerEvent.target.result);
			};
		},
		[avatarPickerRef, editedAvatar]
	);

	const editAvatarHandler = async () => {
		setLoading(true);
		try {
			const res = await axios
				.patch(`/api/users/changeAvatar`, {
					email: user.email,
					avatar: editedAvatar,
				})
				.then((res) => res.data);

			dispatch(getLoggedUser());
			dispatch(addNotification({ message: res.message }));

			setEditedAvatar(null);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setEditedAvatar(null);

			dispatch(
				addNotification({
					type: "error",
					message: error.response.data.message || error,
				})
			);
			setError(error.response.data.message || error.message);
		}
	};

	return (
		<EditAvatarRow>
			<UserAvatarWrapper
				onClick={() =>
					editedAvatar ? setEditedAvatar(null) : avatarPickerRef.current.click()
				}
			>
				<UserAvatar src={editedAvatar ?? user.avatar} />
				<EditBadge>
					{editedAvatar ? "Clear" : "Edit"}
					<EditIcon className="editAvatar__icon" />
				</EditBadge>
			</UserAvatarWrapper>
			<input
				ref={avatarPickerRef}
				onChange={addImageToPost}
				type="file"
				hidden={true}
				accept="image/jpeg, image/png"
			/>
			<CustomButton
				disabled={!editedAvatar}
				loading={loading}
				onClick={editAvatarHandler}
				variant="contained"
				size="small"
			>
				Save Avatar
			</CustomButton>
		</EditAvatarRow>
	);
};

export default AvatarEditRow;

const EditAvatarRow = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

const UserAvatarWrapper = styled(ButtonBase)`
	position: relative;
	border-radius: 50%;
	overflow: hidden;

	> span {
		color: #000;
		transition: 0.2s ease-in-out;
	}

	&:hover {
		> span {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;
const EditBadge = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	font-size: 14px;
	background-color: rgba(0, 0, 0, 0.6);
	padding: 5px 5px 7px;

	.editAvatar__icon {
		font-size: 14px;
	}
`;

const UserAvatar = styled(Avatar)`
	height: 85px;
	width: 85px;
`;
