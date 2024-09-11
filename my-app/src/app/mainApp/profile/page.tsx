"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../lib/recoil/atoms";
import useAuth from "../../../lib/hooks/useAuth";
import useFlashMessage from "@/lib/hooks/useFlashMessage";
import FlashMessage from "@/lib/components/flashMessage";
import LogoutButton from "@/app/mainApp/profile/logout";
import useEditProfile from "@/app/mainApp/profile/useEditIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../layout";
import EditIcon from "./editIcon";
import { defaultIcon } from "@/lib/config";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();
  const userInfo = useRecoilValue(userState);
  const { flashMessage, type, showFlashMessage, isVisible } = useFlashMessage();
  const { changeIcon } = useEditProfile(showFlashMessage);

  const handleLogout = () => {
    alert("ログアウトします");
    logout();
  };

  if (!userInfo) return <div>Loading</div>;
  return (
    <MainLayout title="プロフィール">
      <div className="flex justify-center mb-6">
        <div className="relative group">
          <img
            src={userInfo.iconImageUrl || defaultIcon}
            alt="User Icon"
            className="rounded-full w-48 h-48 border-2 border-black"
          />
          <EditIcon
            isEditing={isEditing}
            toggleEditing={() => setIsEditing(!isEditing)}
            changeIcon={changeIcon}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <p className="text-3xl font-bold p-3">{userInfo.name}</p>
        <p className="text-lg font-bold p-3 flex items-center justify-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          {userInfo.email}
        </p>
      </div>

      <LogoutButton onLogout={handleLogout} isEditing={isEditing} />
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </MainLayout>
  );
};

export default Profile;
