import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const StudentPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [message,setMessage] = useState("");
    useEffect(() =>{
        if(!token){
            navigate("/sign-in");
        }
    },[token]);

    const handleFetch = async() => {
        try{
            const response = await fetch("http://localhost:3030/hello", {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.ok){
                const data = await response.json();
                setMessage(data.message);
            }
        }catch(error){

        }
    }
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