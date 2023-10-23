import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import service from "../appwrite/service";
import auth from "../appwrite/authentication";
import { login as storeLogin } from '../store/authSlice'
import { useForm } from "react-hook-form";
import { Input } from "./index";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { register, handleSubmit } = useForm();
    let [error, setError] = useState(null);
    const login = async (data) => {
        try {
            setError("");
            const session = await auth.login(data);
            if (session) {
                const userData = await auth.getAccount();
                if (userData) {
                    dispatch(storeLogin({ userData }));
                    navigate('/');
                }
            }
        }
        catch (err) {
            setError(err.message);
        }

    }
    return (
        <>
            <div
                className='flex items-center justify-center w-full'>
                <div className={`mx-auto w-full max-w-lg bg-cyan-200 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            {/*<Logo width="100%" /> */}
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-violet-900">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-violet-900">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div>
                            <Input className="text-violet-900  outline-violet-900 bg-cyan-100 m-4 rounded-xl  px-2" type="email" placeholder="Enter your Email" label="Email :" {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })} />
                        </div>
                        <div>
                            <Input className="text-violet-900 bg-cyan-100 m-4 rounded-xl  px-2" type="password" label="Password: " placeholder="password" {...register("password", {
                                required: true
                            })} />
                        </div>
                        <Button type="submit" variant="outlined">Sign in</Button>



                    </form>
                </div>
            </div>
        </>
    )
}
export default Login