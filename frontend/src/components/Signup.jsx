// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
// import toast from "react-hot-toast"

// const Signup = () => {
//   const [user, setUser] = useState({
//     fullName: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//   });
// //we put hooks on the top of components and navigate is a hook
// const navigate = useNavigate();
//   // Handle input change for form fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   // Handle form submission (this can be further expanded)
//   const handleSubmit =async (e) => {
//     e.preventDefault();
//    //console.log(user);
//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/v1/user/register`,
//         user,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );
//       if(res.data.success){
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     console.log(user);
//     setUser({
//       fullName: "",
//       username: "",
//       password: "",
//       confirmPassword: "",
//       gender: "",
//     });
//     // Add form validation and API call logic here
//   };

//   return (
//     <div className="min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
//         <h1 className="text-3xl font-bold text-center text-red-600"> Signup</h1>

//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Full Name</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10"
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={user.fullName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10"
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={user.username}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10"
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={user.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10"
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={user.confirmPassword}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="flex items-center my-4">
//             <div className="flex items-center mr-4">
//               <p>Male</p>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={user.gender === "Male"}
//                 onChange={handleInputChange}
//                 className="radio mx-2"
//               />
//             </div>
//             <div className="flex items-center">
//               <p>Female</p>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={user.gender === "Female"}
//                 onChange={handleInputChange}
//                 className="radio mx-2"
//               />
//             </div>
//           </div>

//           <p className="text-center my-2">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>

//           <div>
//             <button
//               type="submit"
//               className="btn btn-info btn-sm mt-2 border border-slate-700 w-full"
//             >
//               Signup
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";



const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    console.log(user);
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-red-600'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Full Name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked={false}
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2" />
            </div>
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700 '>Singup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup