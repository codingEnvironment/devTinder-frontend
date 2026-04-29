import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      if (connections) return;
      const response = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("Connections data from API:", response.data.data);
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect fetching connections...");
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <h1 className="flex justify-center mt-10 text-white">
        No connections yet. Start connecting!
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 mt-10 px-4">
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="w-full max-w-2xl bg-base-200 border border-base-300 rounded-box p-6 flex gap-6 items-start"
        >
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={connection.profilePicture}
              alt={connection.firstName}
              className="w-32 h-32 rounded-full object-cover border-2 border-base-300"
            />
          </div>

          {/* Connection Info */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Name and Age */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-lg text-white">{connection.age} years old</p>
            </div>

            {/* Bio */}
            <div>
              <p className="text-base text-white">{connection.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
