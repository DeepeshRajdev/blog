import { useDispatch } from "react-redux";
import auth from "../appwrite/authentication"
import { useNavigate } from "react-router-dom";
import { login } from '../store/authSlice'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "./index";
import Button from '@mui/material/Button';

const Signup = () => {
    let { register, handleSubmit } = useForm();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [error, setError] = useState('');
    const signup = async (data) => {
        try {
            setError('');
            const session = await auth.createAccount(data);
            if (session) {
                const userData = await auth.getAccount();
                if (userData) {
                    dispatch(login({ userData }));
                    navigate('/');
                }
            }
        }
        catch (err) {
            setError(err.message)
        }
    }
    return (
        <>  
            <div class="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
        <svg
          class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fill-opacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          ></path>
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9089FC"></stop>
              <stop offset="1" stop-color="#FF80B5"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
            <div className='flex items-center justify-center w-full h-min'>
                <div className={`mx-auto w-full max-w-lg  bg-white rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            {/*<Logo width="100%" /> */}
                        </span>
                    </div>
                    
                    <h2 className="text-center text-2xl font-bold leading-tight text-violet-900">Sign up to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60 text-violet-900">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(signup)} className="mt-8">
                        <div>
                            <Input type="text" placeholder="Enter Your Name" label="Name: " className="text-violet-900  outline-violet-900 bg-violet-100 m-4 rounded-xl  px-2"{...register("name", {
                                required: true
                            })} />
                        </div>
                        <Input className="text-violet-900  outline-violet-900 bg-violet-100 m-4 rounded-xl  px-2" type="email" placeholder="Enter your Email" label="Email :" {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })} />
                        <div>
                            <Input className=" text-violet-900 outline-violet-900 bg-violet-100 m-4 rounded-xl px-2" type="password" label="Password: " placeholder="password" {...register("password", {
                                required: true
                            })} />
                        </div>
                        <Button color="primary" type="submit" variant="outlined">Create Account</Button>
                    </form>
                </div>
            </div>
            
        </>

    )
}
export default Signup