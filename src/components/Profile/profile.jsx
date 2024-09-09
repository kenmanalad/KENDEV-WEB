import { useEffect, useState , useCallback} from "react";

const Profile = () => {


    // Credentials
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    //States
    const [profile, setProfile] = useState();
    const [errorMessage, setErrorMessage] = useState();

    
    //Error handling for fetching profile details
    const handleError = (error) => {
        setErrorMessage(error.message);
        console.error("API failed to fetch profile details.", error.message);
    } 

    const handleResponse = (data) => {
        if(data.success){
            setProfile(data.profile);
        }
        else{
            handleError(data);
        }

    }

    const fetchProfileDetails = useCallback(
        async () => {
            try{
                const response = await fetchProfileAPI();
                handleResponse(response);
            }catch(error){
                handleError(error);
            }
        }
    );

    const fetchProfileAPI = async () => {
       try{
            const response = await fetch("http://localhost:3030/profile",{
                method:"POST",
                body: JSON.stringify({
                    user_id: user_id
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            if(response.ok){
                console.log(data);
                return data;     
            }else{
                handleError(data);
            }

        
            
       }catch(error){
            setErrorMessage(error.message);
            console.error("API error while fetching profile details");
       }

    }
    
    useEffect(
        () => 
            {
                fetchProfileDetails();

            }
        ,
        []
    );

    return(
        <div className="flex justify-content items-center w-full h-full p-12">
            {
                profile && 
                    <div className="p-12 rounded shadow w-full">
                        <div className="w-24 h-24 shadow">
                            <img 
                                src={`http://localhost:3030${profile.imgUrl}`} 
                                alt="No profile picture found" 
                                className="w-24 h-24 rounded-lg"    
                            />
                        </div>
                        <div className="">
                            {
                                `${profile.firstName} ${profile.lastName}`
                            }
                        </div>
                    </div>
            }
        </div>
    );

}

export default Profile;