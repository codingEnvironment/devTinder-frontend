import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  console.log("Feed from Redux store:", feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const response = await axios.get(API_BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("Feed data from API:", response.data.data);
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect fetching feed...");
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center">
        No more users to show. Please check back later!
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
