import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { API_BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [editedUser, setEditedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    interests: user?.interests || "",
    age: user?.age || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    // e.preventDefault();

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile/edit`,
        editedUser,
        { withCredentials: true },
      );
      const savedUser = response?.data?.data;
      dispatch(addUser(savedUser));
      console.log("Profile saved succesfully", savedUser);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 mx-auto flex gap-8 items-start justify-center flex-wrap w-full max-w-6xl">
      <div className="flex-[1.5] min-w-0">
        <legend className="fieldset-legend text-center">Edit Profile</legend>
        <div className="w-full flex flex-col gap-2">
          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="input w-full"
            placeholder="First Name"
            value={editedUser.firstName}
            onChange={handleInputChange}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="input w-full"
            placeholder="Last Name"
            value={editedUser.lastName}
            onChange={handleInputChange}
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="Email"
            value={editedUser.email}
            onChange={handleInputChange}
          />

          {/* <label className="label">Interests</label>
          <input
            type="text"
            name="interests"
            className="input w-full"
            placeholder="Interests"
            value={editedUser.interests}
            onChange={handleInputChange}
          /> */}

          <label className="label">Age</label>
          <input
            type="number"
            name="age"
            className="input w-full"
            placeholder="Age"
            value={editedUser.age}
            onChange={handleInputChange}
          />

          <label className="label">Bio</label>
          <textarea
            name="bio"
            className="textarea w-full"
            placeholder="Bio"
            value={editedUser.bio}
            onChange={handleInputChange}
          />

          <label className="label">Profile Picture URL</label>
          <input
            type="url"
            name="profilePicture"
            className="input w-full"
            placeholder="Profile Picture URL"
            value={editedUser.profilePicture}
            onChange={handleInputChange}
          />

          <button className="btn btn-neutral mt-4" onClick={handleSaveProfile}>
            Save Profile
          </button>
        </div>
      </div>
      <UserCard user={editedUser} />
    </fieldset>
  );
};

export default EditProfile;
