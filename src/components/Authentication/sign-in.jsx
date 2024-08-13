import { useState, useEffect ,useRef} from "react";
import { FaGoogle, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    //States
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const authType = localStorage.getItem("authType");

    const navigate = useNavigate();

    // Shared functions
    const socialAuthRequest = (e, auth, req_url) => {
        e.preventDefault();

        localStorage.setItem("authType",auth);

        window.location.assign(req_url);    
    }

    const redirectToDestination = (data, destination) => {

        if(!data){
            setErrorMessage("Unable to process request: Please try again later.");
            throw new Error("Failed to receive enough data from API Request.");
        }

        localStorage.setItem("token",data.token);

        localStorage.setItem("user_id", data.id);

        navigate(destination);

    }
    // End of shared functions

    //Email and Password Authentication
    const handleSignIn = async(e) => {
        e.preventDefault();

        if(!email && !password){
            setErrorMessage("Please enter your email address and password to proceed");
            return;
        }

        if(!email){
            setErrorMessage("Please enter your email address to proceed");
            return;
        }

        if(!password){
            setErrorMessage("Please enter your email address to proceed");
            return;
        }

        try{
            const response = await fetch(
                import.meta.env.VITE_SIGN_IN_URL,
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

            const data = await response.json();

            console.log(data.profile);
            if(response.ok){
                localStorage.setItem("authType","manual");
                if(data.profile){
                    redirectToDestination(data,"/student-feed");
                }
                else{
                    redirectToDestination(data,"/profile");
                }

            }else{
                setErrorMessage(data.message);
            }
        }catch(error){
            console.error("An error occured during signing in process",error);
            setErrorMessage("Umable to process authentication request: Please try again later.");
        }
    }

    //Google Authentication
    const googleAuthRequest = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(
                import.meta.env.VITE_GOOGLE_AUTH_REQUEST_URL,
                {
                    method:"POST"
                }
            );
    
            if(response.ok){
                const data = await response.json();
                localStorage.setItem("authType","google");
                window.location.href = data.url;    
            }
        }catch(error){
            console.error("Error occured while requesting auth url");
            setErrorMessage("Google Authentication invalid: Try another account");
        }
    }


    //Github Authentication Request
    const handleGithubUserData = async(code) => {
        try{
            const response = await fetch(import.meta.env.VITE_GITHUB_GET_USER_DATA_URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ code })
            });


            const data = await response.json();

            if(response.ok){

                redirectToDestination(data,"/student-feed");

            }
            else{
                setErrorMessage(data.errMessage);
            }

        }catch(error){
            console.error("Error occured during Github user data fetch" + error);
            setErrorMessage("Unable to complete request. Please try again later");
        }
    }


    //LinkedIn Authentication Request
    const handleLinkedInUserData = async(code) => {
        try{
            const response = await fetch(import.meta.env.VITE_LINKEDIN_GET_USER_DATA_URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ code : code })
            });

            const data = await response.json();

            if(response.ok){


                redirectToDestination(data,"/student-feed");


            }
            else{

                const url = new URL(window.location);

                url.search = '';
                
                window.history.replaceState({}, document.title, url);

                setErrorMessage(data.message);
                
            }


        }catch(error){
            console.error("Error occured during LinkedIn user data fetch" + error);
            setErrorMessage("Unable to complete request. Please try again later");
        }
    }


    
    useEffect(
        () => 
            {

                const urlParams = new URLSearchParams(window.location.search);

                const codeFromUrl = urlParams.get('code');


                console.log("processing social network auth");
                if(codeFromUrl && authType){
                    console.log("Finding right auth type");
                    switch(authType){
                        case "github":
                            handleGithubUserData(codeFromUrl);
                            break;
                        case "linkedin":
                            handleLinkedInUserData(codeFromUrl)
                            break;
                    }
                }

            }
            , []
    );



    const inputClass = "bg-gray-100 w-80 h-10 rounded-sm shadow-sm shadow-gray-200 p-4";
    const socialIconClass = "bg-gray-500 p-2 rounded-xl cursor-pointer"

    return (
        <div className="bg-gray-200 fixed h-screen w-screen flex items-center justify-center">
            <div className="bg-white flex-col justify-center items-center p-12 rounded-md">
                <div className="w-full flex justify-center items-center">
                    <div className="w-80 text-center text-xl">
                        Login
                    </div>
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
                    <div className="flex items-center justify-center pb-2">
                        <input 
                            type="email"
                            placeholder="Email Address" 
                            name="email" 
                            id="email" 
                            className={inputClass}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center ">
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
                        onClick={handleSignIn}
                    >
                        Login
                    </button>
                </div>
                <div className="flex items-center justify-center py-4 text-sm">
                    or use a social network
                </div>
                {/* End of User Input/Credentials */}



                {/* Social Networks */}
                <div className="w-full flex justify-center items-center">
                    <div className="w-60 flex justify-evenly items-center">

                        <div 
                            className={socialIconClass}
                            onClick={googleAuthRequest}
                        >
                            <FaGoogle className="text-white" size={25}/>
                        </div>

                        <div 
                            className={socialIconClass}
                            onClick={(e) => socialAuthRequest(e,"github",import.meta.env.VITE_GITHUB_AUTH_REQUEST_URL)}
                        >
                            <FaGithub className="text-white" size={25} />
                        </div>


                        <div 
                            className={socialIconClass}
                            onClick={(e) => socialAuthRequest(e,"linkedin",import.meta.env.VITE_LINKEDIN_AUTH_REQUEST_URL)}
                        >
                            <FaLinkedin className="text-white" size={25}/>
                        </div>

                    </div>
                </div>
                {/* End of Social Networks */}

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