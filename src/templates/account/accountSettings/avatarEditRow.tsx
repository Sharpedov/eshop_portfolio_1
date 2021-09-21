import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomButton from "src/components/customButton";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { Avatar, ButtonBase } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { changeUserAvatar } from "src/store/slices/userSlice";
import { uploadFile } from "src/utils/uploadFile";

interface pageProps {
	user;
}

const mapState = (state) => ({
	changeLoading: state.user.changeAvatar.loading,
});

const AvatarEditRow = ({ user }: pageProps) => {
	const { changeLoading } = useSelector(mapState);
	const avatarPickerRef = useRef(null);
	const dispatch = useDispatch();
	const [progress, setProgress] = useState<number>(0);
	const [uploadedAvatar, setUploadedAvatar] = useState<string>(null);
	const [uploadedAvatarError, setUploadedAvatarError] = useState<string>(null);

	const handleUpload = async (e) => {
		const file = e.target.files[0] as File;
		const [data, error] = await uploadFile(file, setProgress);
		setUploadedAvatar(data);
		error && setUploadedAvatarError(error);
	};

	const editAvatarHandler = useCallback(() => {
		dispatch(
			changeUserAvatar({ email: user.email, newAvatar: uploadedAvatar })
		);
	}, [dispatch, uploadedAvatar, user.email]);

	useEffect(() => {
		progress === 100 && setProgress(0);
	}, [progress]);

	const handleResetAvatar = useCallback(() => {
		setUploadedAvatarError(null);
		setUploadedAvatar(null);
	}, []);

	return (
		<>
			<EditAvatarRow>
				<UserAvatarWrapper
					onClick={() => {
						uploadedAvatar
							? handleResetAvatar()
							: avatarPickerRef.current.click();
					}}
				>
					<UserAvatar alt="User avatar" src={uploadedAvatar ?? user.avatar} />
					<EditBadge>
						{uploadedAvatar ? "Clear" : "Edit"}
						<EditIcon className="editAvatar__icon" />
					</EditBadge>
				</UserAvatarWrapper>
				<input
					ref={avatarPickerRef}
					onChange={handleUpload}
					type="file"
					hidden={true}
					accept="image/jpeg, image/png"
				/>
				<CustomButton
					disabled={!uploadedAvatar}
					loading={changeLoading || !!progress}
					onClick={editAvatarHandler}
					variant="contained"
					size="small"
				>
					Save Avatar
				</CustomButton>
			</EditAvatarRow>
			{uploadedAvatarError && <ErrorMsg>{uploadedAvatarError}</ErrorMsg>}
		</>
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

const ErrorMsg = styled.div`
	color: rgba(255, 0, 0, 0.75);
	font-size: 1.4rem;
	margin-top: 5px;
`;
