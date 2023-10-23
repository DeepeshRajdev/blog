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
            <div className='flex items-center justify-center w-full'>
                <div className={`mx-auto w-full max-w-lg bg-cyan-200 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            {/*<Logo width="100%" /> */}
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-violet-900">Sign up to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60 text-violet-900">
                        Already have any account?&nbsp;
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
                            <Input type="text" placeholder="Enter Your Name" label="Name: " className="text-violet-900  outline-violet-900 bg-cyan-100 m-4 rounded-xl  px-2"{...register("name", {
                                required: true
                            })} />
                        </div>
                        <Input className="text-violet-900  outline-violet-900 bg-cyan-100 m-4 rounded-xl  px-2" type="email" placeholder="Enter your Email" label="Email :" {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })} />
                        <div>
                            <Input className=" text-violet-900 outline-violet-900 bg-cyan-100 m-4 rounded-xl px-2" type="password" label="Password: " placeholder="password" {...register("password", {
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