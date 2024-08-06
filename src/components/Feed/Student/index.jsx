import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const StudentPage = () => {

    //jwt tokens
    const token = localStorage.getItem("token");
    const oauthToken = Cookies.get("token");

    //States
    const [message,setMessage] = useState("");

    const navigate = useNavigate();

    const githubAuthRequest = () => {
        window.location.assign(process.env.GITHUB_AUTH_REQUEST_URL);
    }

    //Check tokens
    useEffect(() =>{
        
        if(!token && !oauthToken){
            navigate("/sign-in");
        }
        else if(!token && oauthToken){
            localStorage.setItem("token",oauthToken);
        }
    },[token,oauthToken]);

    const handleFetch = async() => {
        try{
            console.log(token);
            console.log(oauthToken);
            const response = await fetch("http://localhost:3030/hello", {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${token ?? oauthToken}`
                },
            });

            if(response.ok){
                const data = await response.json();
                
                setMessage(data.message);
            }
        }catch(error){
            navigate("/sign-in");
        }
    }

    //Fetch Data
    useEffect(() => {
        if(message === ""){
            handleFetch();
        }
    },[message]);
    

    return(
        <div className="text-xl text-red-500">
            {message}
        </div>
    )
}

export default StudentPage;