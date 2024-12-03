import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });
  
      const data = await response.json();
      console.log(data);

      
  
      if (!data.success) {
            toast.error(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
    } else {
        toast.success(data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
             closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        if(localStorage.getItem('company')){
          localStorage.clear();
        }
        localStorage.setItem('token',data.accessToken);
        localStorage.setItem('user',JSON.stringify(data.user));
        navigate('/');
    }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-background pt-3">
      <div className="bg-card dark:bg-card p-8 rounded-lg shadow-l bg-slate-100 w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl font-bold mb-6">Login to your account</p>
          <img className="w-[70%]" src="https://panto.elliptical.website/website/assets/images/logo.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
              value={credential.email}
              className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
              className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 dark:text-zinc-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-500 text-white dark:text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600"
          >
            Login
          </button>
          <p className="text-center mt-4 text-sm text-blue-500 dark:text-blue-400 hover:underline">Forgot your password?</p>
        </form>
        <div className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/auth/signup" className="underline">Create one</Link>.
        </div>
        <Link to={'/auth/company/login'} className='py-2 px-2 bg-slate-300 rounded-lg font-bold'>Login as Company</Link>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
