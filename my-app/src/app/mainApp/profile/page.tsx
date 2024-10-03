"use client";

import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../lib/recoil/atoms";
import useAuth from "../../../lib/hooks/useAuth";
import LogoutButton from "@/app/mainApp/profile/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../layout";
import EditIcon from "./EditIcon";
import { DEFAULT_ICON_URL } from "@/lib/config";

const Profile = () => {
  const { logout } = useAuth();
  const userInfo = useRecoilValue(userState);

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
            src={userInfo.iconImageUrl || DEFAULT_ICON_URL}
            alt="User Icon"
            className="rounded-full w-48 h-48 border-2 border-black"
          />
          <EditIcon />
        </div>
      </div>
      <div className="text-center mb-4">
        <p className="text-3xl font-bold p-3">{userInfo.name}</p>
        <p className="text-lg font-bold p-3 flex items-center justify-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          {userInfo.email}
        </p>
      </div>

      <LogoutButton onLogout={handleLogout} />
    </MainLayout>
  );
};

export default Profile;
