import { useEffect, useState , useCallback} from "react";
import { MdVerified } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { FaMessage } from "react-icons/fa6";
import { profileDivStyle,profilePicStyle, profileNameStyle } from "./profile-styles";

const Profile = () => {


    // Credentials
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    //States
    const [profile, setProfile] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    
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


    console.log(screenWidth);

    // const profileDivStyle = "flex justify-evenly p-4 rounded shadow w-2/5 bg-white";

    const profileName = "text-2xl flex justify-center items-center"

    // const profilePicStyle = "w-3/4 h-48 rounded-lg shadow"

    return(
        <div 
            className="flex flex-col justify-center items-center w-full h-full p-12 bg-gray-50"
            style={{
                fontFamily: "montserrat"
            }}
        >
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
                                    {/* <div className="">

                                    </div> */}
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