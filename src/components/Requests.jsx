import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      if (requests) return;
      const response = await axios.get(
        API_BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        },
      );
      console.log("Requests data from API:", response.data.data);
      dispatch(addRequests(response?.data?.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect fetching requests...");
    getRequests();
  }, []);

  const handleAccept = async (requestId, status) => {
    try {
      await axios.post(
        `${API_BASE_URL}/request/review/${status}/${requestId}`,
        { status: "accepted" },
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId, status) => {
    try {
      await axios.post(
        `${API_BASE_URL}/request/review/${status}/${requestId}`,
        { status: "rejected" },
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <h1 className="flex justify-center mt-10 text-white">No requests yet!</h1>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 mt-10 px-4">
      {requests.map((request) => {
        const { firstName, lastName, age, bio, profilePicture } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="w-full max-w-2xl bg-base-200 border border-base-300 rounded-box p-6 flex gap-6 items-start"
          >
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src={profilePicture}
                alt={firstName}
                className="w-32 h-32 rounded-full object-cover border-2 border-base-300"
              />
            </div>

            {/* Request Info */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Name and Age */}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {firstName} {lastName}
                </h2>
                <p className="text-lg text-white">{age} years old</p>
              </div>

              {/* Bio */}
              <div>
                <p className="text-base text-white">{bio}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAccept(request._id, "accepted")}
                  className="btn btn-success btn-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id, "rejected")}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
