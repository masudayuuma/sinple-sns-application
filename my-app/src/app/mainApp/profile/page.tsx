"use client";

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms";
import useAuth from "../../../hooks/useAuth";
import useFlashMessage from "@/hooks/useFlashMessage";
import FlashMessage from "@/components/FlashMessage";
import LogoutButton from "@/app/mainApp/profile/logout";
import useEditProfile from "@/hooks/useEditIcon";
import EditProfile from "@/app/mainApp/profile/editIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../layout";

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
            src={
              userInfo.iconImageUrl || `https://robohash.org/${userInfo.name}`
            }
            alt="User Icon"
            className="rounded-full w-48 h-48 border-4 border-black"
          />
          <EditProfile
            isEditing={isEditing}
            setIsEditing={setIsEditing}
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
