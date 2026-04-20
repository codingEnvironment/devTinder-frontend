import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((state) => state.user); // Access user details from the Redux store

  return <>{user && <EditProfile user={user} />}</>;
};

export default Profile;
