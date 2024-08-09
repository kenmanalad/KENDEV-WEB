import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const StudentPage = () => {

    //jwt tokens
    const token = localStorage.getItem("token");
    const oauthToken = Cookies.get("token");
    const id = Cookies.get("id");
    const authType = localStorage.getItem("authType");

    //States
    const [message,setMessage] = useState("");

    const navigate = useNavigate();

    //Check tokens
    useEffect(() =>{
        
        if(!token && !oauthToken){
            navigate("/sign-in");
        }

        else if(!token && oauthToken){
            localStorage.setItem("token",oauthToken);
            localStorage.setItem("id",id)
        }
    },[token]);

    const handleFetch = async() => {
        try{
            // console.log(token);
            // console.log(oauthToken);
            console.log(authType);
            const response = await fetch("http://localhost:3030/hello", {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${authType === "google" ?  oauthToken : token}`
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