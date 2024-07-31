import { useState } from "react";
import { FaGoogle, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    //States
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const handleSignIn = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(
                "http://localhost:3030/login",
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }

            );

            if(response.ok){
                const data = await response.json();
                if(data.message == "ok"){
                    localStorage.setItem("token",data.token);
                    navigate("/student-feed");
                }
            }else{
                setErrorMessage("Your email address/password is incorrect");
            }
        }catch(error){
            console.error("An error occured during signing in process",error);
            setErrorMessage("Bad Credentials");
        }
    }
    
    const navigate = useNavigate();

    const inputClass = "bg-gray-100 w-80 h-10 rounded-sm shadow-sm shadow-gray-200 p-4";
    const socialIconClass = "bg-gray-500 p-2 rounded-xl"

    return (
        <div className="bg-gray-200 fixed h-screen w-screen flex items-center justify-center">
            <div className="bg-white flex-col justify-center items-center p-12 rounded-md">
                <div className="w-80 text-center text-xl">
                    Login
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



                {/* User Input/Credentials */}
                <div className="flex-col justify-around py-4">
                    <div className="flex items-center pb-2">
                        <input 
                            type="email"
                            placeholder="Email Address" 
                            name="email" 
                            id="email" 
                            className={inputClass}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="password"
                            placeholder="Password" 
                            name="password" 
                            id="password" 
                            className={inputClass}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit"
                        className="items-center w-80 h-10 bg-sky-500 text-white rounded-lg cursor-pointer"
                        onClick={(e) => handleSignIn(e)}
                    >
                        Login
                    </button>
                </div>
                <div className="flex items-center justify-center py-4 text-sm">
                    or use a social network
                </div>
                {/* End of User Input/Credentials */}



                {/* Social Networks */}
                <div className="w-80 flex justify-evenly items-center">
                   <div className={socialIconClass}>
                        <FaGoogle className="text-white" size={25}/>
                   </div>
                   <div className={socialIconClass}>
                        <FaGithub className="text-white" size={25} />
                   </div>
                   <div className={socialIconClass}>
                        <FaFacebook className="text-white" size={25}/>
                   </div>
                   <div className={socialIconClass}>
                        <FaLinkedin className="text-white" size={25}/>
                   </div>
                </div>
                <br />



                <div>
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center text-sm pr-1">
                            Don't have an account? 
                        </div>
                        <div 
                            className="flex items-center justify-center text-sm text-sky-500 cursor-pointer"
                            onClick={() => {
                                navigate("/sign-up")
                            }}
                        >
                            Sign up
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;