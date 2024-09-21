import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({
    
      username: "",
      password: "",
     
    });
    // Add login logic here (e.g., API call)
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-red-600'>Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type="text"
              name="username"
              placeholder='Username'
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type="password"
              name="password"
              placeholder='Password'
              value={user.password}
              onChange={handleInputChange}
            />
          </div>

          <p className='text-center my-2'>
            Don't have an account? <Link to="/register">Signup</Link>
          </p>

          <div>
            <button type="submit" className="btn btn-info btn-sm mt-2 border border-slate-700 w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
