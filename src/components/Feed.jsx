import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  const getFeed = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("Feed data:", response.data.data);
      setFeedData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      {feedData && <UserCard user={feedData} />}
      {!feedData && <p>No more users to show. Please check back later!</p>}
    </div>
  );
};

export default Feed;
