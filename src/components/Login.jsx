import {useRef} from 'react';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" style={{margin: '100px auto'}}>
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" ref={emailRef} />

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" ref={passwordRef} />

      <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
        Login
      </button>
    </fieldset>
  )
}

export default Login