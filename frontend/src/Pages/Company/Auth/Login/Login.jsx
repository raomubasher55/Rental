import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [password, setPassword] = useState(true);
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/company/login-company`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credential.email,
                    password: credential.password,
                }),
            });

            const data = await response.json();
            console.log(data)

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


                if (localStorage.getItem('token')) {
                    localStorage.clear();
                }
                localStorage.setItem('company', JSON.stringify(data.company));
                localStorage.setItem('companyToken', data.token);
                navigate('/company-dashboard');
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-background pt-3">
                <div className="bg-card dark:bg-card p-8 rounded-lg shadow-l bg-slate-100 w-full max-w-md flex flex-col items-">

                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-xl font-bold mb-6">Login your account as Company</p>
                        <img className='w-[70%] ' src="https://panto.elliptical.website/website/assets/images/logo.png" alt="" />
                    </div>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <input type="email" placeholder="Email" name='email' onChange={onChange} value={credential.email} className="w-full p-3   border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                onChange={onChange} value={credential.password} type={password ? 'password' : 'text'} name="password" placeholder="Password"
                                className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10"
                            />
                            <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 dark:text-zinc-500" >
                                <span onClick={() => setPassword(!password)} className='pr-4 inline-block' >{password ? <FaRegEye /> : <FaRegEyeSlash />}  </span>
                            </button>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 dark:bg-blue-500 text-white dark:text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600">Login</button>
                        <p className="text-center mt-4 text-sm text-blue-500 dark:text-blue-400 hover:underline">Forgot your password?</p>
                    </form>
                    <div className="text-center mt-4 text-sm text-primary dark:text-primary-foreground">
                        By continuing, you agree to Shark's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                        <hr className="my-4 border-t border-gray-400" />
                        <Link to="/auth/company/signup" className="text-blue-500 block"> New on CoveCart? signup </Link>
                    </div>
                    <ToastContainer />
                    <Link to={'/auth/login'} className='py-2 px-2 bg-slate-300 rounded-lg font-bold text-center'>Login as User</Link>
                </div>
            </div>
        </>
    )
}

export default Login
