import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

/**
 * 1. install 2 packages (redux toolkit and react-redux)
 * 2. create a store using configureStore method from redux toolkit
 * 3. create a slice using createSlice method from redux toolkit
 * 4. create actions & reducers in the slice & add the reducer to the store
 * 5. wrap your app with Provider and pass the store as a prop
 * 6. in the react component, use useSelector to get the state and useDispatch to dispatch actions
 */
