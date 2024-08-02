import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
const SignUp = () => {

    //States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async(e) => {
        e.preventDefault();
        try{
            if(password){
                const response = await fetch("http://localhost:3030/register",
                    {
                        method:'POST',
                        headers:{
                            "Content-Type": 'application/json'
                        },
                        body:JSON.stringify({
                           email: email,
                           password: password 
                        })
                    }
                )
                if(response.ok){
                    const data = await response.json();
                    if(data.success){
                        navigate("/sign-in")
                    }
                }else{
                    setErrorMessage("Email was used already!");
                }
            }else{
                setErrorMessage("Enter a password");
            }
            
        }catch(error){
            console.error("Error occured during signing up",error);
            setErrorMessage("An Unexpected Error: User creation failed");
        }
    }

    const inputClass = "bg-gray-100 w-80 h-10 rounded-sm shadow-sm shadow-gray-200 p-4";

    return (
        <div className="bg-gray-200 fixed h-screen w-screen flex items-center justify-center">
            <div className="bg-white flex-col justify-center items-center p-12 rounded-md">
                <div className="w-80 text-center text-xl">
                    Sign Up
                </div>
                {
                    errorMessage && 
                        <div 
                            className="flex items-center text-center justify-center p-2 text-red-500 rounded-sm text-sm"
                            aria-live="polite"
                        >
                            <MdError className="mr-1"/>
                            {errorMessage}
                        </div>
                }
                <div className="flex-col justify-around py-4">
                    <div className="flex items-center pb-3">
                        <input 
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            id="email" 
                            className={inputClass}
                            onChange={(e)=> 
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                    <div className="flex items-center pb-3">
                        <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password" 
                            className={inputClass}
                            onChange={(e)=> 
                                setPassword(e.target.value)
                            }
                        />
                    </div>
                    {/* <div className="flex items-center">
                        <input 
                            type="password"
                            placeholder="Confirm Password" 
                            name="confirm-password" 
                            id="" 
                            className={inputClass}
                        />
                    </div> */}
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit"
                        className="items-center w-80 h-10 bg-sky-500 text-white rounded-lg cursor-pointer"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="flex items-center justify-center pt-2">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center text-sm pr-1">
                            Already have an account? 
                        </div>
                        <div 
                            className="flex items-center justify-center text-sm text-sky-500 cursor-pointer"
                            onClick={() => {
                                navigate("/sign-in")
                            }}
                        >
                            Log in
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;