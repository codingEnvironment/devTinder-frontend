import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, profilePicture, age, bio } = user;

  const handleSendRequest = async (status) => {
    try {
      const response = await axios.post(
        API_BASE_URL + `/request/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log("Response data: ", response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="h-96 overflow-hidden">
        <img
          src={profilePicture}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {age}, {firstName} {lastName}
        </h2>
        <p>{bio}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored")}
          >
            Ignored
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
