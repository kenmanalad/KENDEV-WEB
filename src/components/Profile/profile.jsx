import { useEffect, useState , useCallback} from "react";
import { MdVerified } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { FaMessage } from "react-icons/fa6";
import { FetchProfileErrorAPI } from "../Shared/Error-Handlers/profile-error";
import { FetchError } from "../Shared/Error-Handlers/error";
import { profileDivStyle,profilePicStyle, profileNameStyle } from "./profile-styles";

const Profile = () => {


    // Credentials
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    //States
    const [profile, setProfile] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    const handleResponse = (data) => {
        if(data.success){
            setProfile(data.profile);
        }
        else{
            FetchError(data, setErrorMessage);
        }

    }

    const fetchProfileDetails = useCallback(
        async () => {
            try{
                const response = await fetchProfileAPI();
                handleResponse(response);
            }catch(error){
                handleResponse(error);
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

            if(!response.ok){

                //Sets error message for specific types of errors
                //Then throws an error
                FetchProfileErrorAPI(setErrorMessage,response);    
            }

            return await response.json();

        
            
       }catch(error){
            FetchError(error, setErrorMessage);
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

  //Dynamically changes the screenwidth
  useEffect(() => 
    {

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, 
    []
    );


    return(
        <div 
            className="flex flex-col justify-center items-center w-full h-full p-12 bg-gray-50"
            style={{
                fontFamily: "montserrat"
            }}
        >
            {
                errorMessage && 
                    <div 
                        className="w-full p-2 bg-red-500 text-white flex justify-center items-center"
                    >
                        {
                            errorMessage
                        }
                    </div>
            }
            {
                profile && 
                    <div 
                        className={profileDivStyle(screenWidth)}
                    >
                        <div 
                            className={`${screenWidth < 885 ? "w-full": "w-1/2"} flex justify-center`}
                        >
                            <img 
                                src={`http://localhost:3030${profile.imgUrl}`} 
                                alt="No profile picture found" 
                                className={profilePicStyle(screenWidth)}    
                            />
                        </div>
                        <div 
                            className={`${screenWidth < 885 ? "w-full": "w-1/2" } p-2`}
                        >
                            <div
                                className={profileNameStyle(screenWidth)}
                            >
                                {
                                    `${profile.firstName} ${profile.lastName}`
                                }
                                <div className={profile.isVerified ? "text-blue-600":"text-gray-400"}>
                                    <MdVerified size={15}/>
                                </div>
                            </div>
                            <div
                                className="text-sm italic flex justify-center items-center cursor-pointer"
                            >
                                {
                                    profile.level
                                }
                            </div>
                            {
                                !profile.isVerified &&
                                    <div
                                        className="text-xs flex justify-center items-center text-blue-400 cursor-pointer"
                                    >
                                        Verify your account
                                    </div>
                            }


                            <div
                                className="text-sm"
                            >
                                {
                                    profile.userType
                                }
                            </div>
                            <div
                                className="text-sm"
                            >
                                {
                                    profile.school
                                }
                            </div>
                            <div
                                className="text-xs"
                            >
                               {
                                    profile.collegeProgram
                               }
                            </div>
                            <div
                                className="text-sm flex pt-1 mt-1 space-x-2"
                            >
                               <div className="flex p-2 justify-evenly items-center text-white bg-blue-400 rounded-lg ">
                                    <TiUserAdd />
                                    Connect
                               </div>
                               <div className="flex p-2 justify-evenly items-center text-blue-400 bg-white rounded-lg shadow">
                                    <FaMessage />
                                    Message
                               </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );

}

export default Profile;