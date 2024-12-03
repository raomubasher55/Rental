
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();  // Use navigate for redirect

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your form submission logic here

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential)
      });

      const data = await response.json();
      // Handle response here
      

      if (data.success) {
        toast.success(data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/login');  // Redirect to login after successful signup
      } else {
        if(data?.msg == 'Errors'){
          toast.error(data?.errors[0].msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }else{
          toast.error(data.msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background pt-3">
        <div className="bg-card dark:bg-card p-8 rounded-lg shadow-l bg-slate-100 w-full max-w-md flex flex-col items-center">
          <div className="flex">
            <h2 className="text-3xl font-bold mb-2">Welcome to the</h2>
            <img className="w-[40%] px-4" src="https://panto.elliptical.website/website/assets/images/logo.png" alt="Logo" />
          </div>
          <p className="text-2xl font-bold mb-6">Create your account</p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={onChange}
                value={credential.name}
                className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4"></div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                value={credential.email}
                className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone"
                name="mobile"
                onChange={onChange}
                value={credential.mobile}
                className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4 relative">
              <input
                onChange={onChange}
                value={credential.password}
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>
          <div className="text-center mt-4 text-sm">
            Already have an account? <Link to="/auth/login" className="underline">Login</Link>.
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;