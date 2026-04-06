import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      // { withCredentials: true } is required so that cookies will get saved in browser and sent with subsequent requests
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true },
      );
      console.log("Login successful:", response.data);
      // dispatch the user data to the store
      dispatch(addUser(response.data));
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <fieldset
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      style={{ margin: "100px auto" }}
    >
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        ref={emailRef}
        defaultValue="mahesh@gmail.com"
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        ref={passwordRef}
        defaultValue="m1234"
      />

      <button className="btn btn-neutral mt-4" onClick={handleClick}>
        Login
      </button>
    </fieldset>
  );
};

export default Login;
