import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { MdError } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import { 
    Input, 
    divInputSytle, 
    divSelectInputStyle, 
    selectStyle, 
    SelectInput 
} from "../Shared/input";

import FormProfile from "./form-profile";

const Profile = () => {

    //local storage
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");


    //States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [fileLocation, setFileLocation] = useState("");
    const [userType,setUserType] = useState();
    const [school,setSchool] = useState();
    const [nonITJob, setNonITJob] = useState();
    const [ITJob, setITJob] = useState();
    const [schoolYear,setSchoolYear] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate("/sign-in");
        }
    },[]);
    //Profile Registration
    const handleProfileRegistration = async(e) => {
        e.preventDefault();
        try{

            if(!firstName && !lastName){
                setErrorMessage("Please enter your first name and last name to proceed");
                return;
            }
            if(!firstName){
                setErrorMessage("Please enter your first name to proceed");
                return;
            }
            if(!lastName){
                setErrorMessage("Please enter your last name to proceed");
                return;
            }

            if(!userType){
                setErrorMessage("Please choose a user type");
                return;
            }


            const formData = new FormData();
            console.log(userType);

            //These inputs can't be null
            formData.append("firstName",firstName);
            formData.append("lastName", lastName);
            formData.append("user_id", user_id);
            formData.append("userType",userType);

            //These inputs can be null
            formData.append("profilePic",file);
            formData.append("nonITCareer",nonITJob);
            formData.append("ITCareer",ITJob);
            formData.append("school",school);
            formData.append("schoolYear",schoolYear)

            const response = await fetch("http://localhost:3030/profile-registration",
                {
                    method:'POST',
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    body:formData
                }
            );

            const data = await response.json();

            if(response.ok){
                if(data.success){
                    navigate("/profile")
                }
            }else{
                setErrorMessage(data.message);
            }
            
        }catch(error){
            console.error("Error occured during Profile Registration",error);
            setErrorMessage("An Unexpected Error: User creation failed");
        }
    }

    //Handle Profile Pic
    const handleFileChange = (e) => {
        const selectedFiles = e.target.files[0];
        setFile(selectedFiles);
    }

    let userTypeOptions = 
        [
            {
                value:"",
                name: "UserType....."
            },
            {
                value:"student",
                name:"Student"
            },
            {
                value:"college-graduate",
                name:"College Graduate"
            },
            {
                value:"non-it-professional",
                name:"Non IT Professional"
            },
            {
                value:"it-professional",
                name:"IT Professional"
            }
        ];
    return (
        <div className="bg-gray-200 fixed h-screen w-screen flex items-center justify-center">
            <div className="bg-white flex-col justify-center items-center p-12 rounded-md">
                <div className="w-full flex justify-center items-center">
                    <div className="w-80 text-center text-xl">
                        Profile Registration
                    </div>
                </div>
                {
                    errorMessage && 
                        <div 
                            className="flex items-center text-center justify-center p-2 text-red-500 rounded-sm text-sm"
                            aria-live="polite"
                        >
                            <div className="flex justify-center items-center">
                                <MdError className="mr-1"/>
                            </div>
                            <div className=" flex justify-center items-center">
                                {errorMessage}
                            </div>
                        </div>
                }
                <div className="w-full flex-col justify-around py-4">

                    <Input
                        placeholder="First Name....."
                        name="firstName"
                        id="firstName"
                        setValue={setFirstName}
                    />

                    <Input
                        placeholder="Last Name....."
                        name="lastName"
                        id="lastName"
                        setValue={setLastName}
                    />

                    <div className={divInputSytle}>
                        <label htmlFor="profilePic" className="bg-gray-400 text-white w-72 rounded-sm shadow-sm shadow-gray-200 p-4 flex items-center justify-center cursor-pointer">
                            
                            <div className="flex justify-around items-center ">
                            <   ImFilePicture /> {file ? file.name : 'Click to Choose Profile Picture'}
                            </div>

                            <input
                                type="file"
                                name="profilePic"
                                id="profilePic"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div className={divInputSytle}>
                        <div className={divSelectInputStyle}>
                            <select 
                                name="countryCode" 
                                id="countryCode"
                                className={selectStyle}
                            >
                                <option value="+63">
                                    +63  
                                </option>
                                <option value="+41">
                                    +41  
                                </option>
                            </select>
                            <input 
                                type="number"
                                placeholder="Cellphone Number....."
                                name="cpNumber"
                                id="cpNumber" 
                                className="bg-gray-100 w-48  rounded-sm shadow-sm shadow-gray-200 p-1"
                            />
                        </div>
                    </div>

                    <SelectInput
                        id="userType"
                        name="userType"
                        setValue={setUserType}
                        options={userTypeOptions}
                    />

                    {
                        userType && 
                            <div>
                                <Input 
                                    placeholder="College/University....."
                                    name="school"
                                    id="school"
                                    setValue={setSchool}
                                />
                                <FormProfile
                                    userType={userType}
                                    setITJob={setITJob}
                                    setNonITJob={setNonITJob}
                                    setSchoolYear={setSchoolYear}
                                />
                            </div>

                    }

                    
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit"
                        className="items-center w-80 h-10 bg-sky-500 text-white rounded-lg cursor-pointer"
                        onClick={handleProfileRegistration}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;