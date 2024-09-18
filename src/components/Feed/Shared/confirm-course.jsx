import { useState } from "react";
import { courseDivNameStyle, courseDivStyle, confirmDivStyle } from "../Student/student-feed-style";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const ConfirmCourse = ({
    course,
    token,
    setClickedCourse, 
    screenWidth,
}) => {
    



    return(
        <div
            className="w-full h-screen fixed bg-gray-200 bg-opacity-50 flex justify-center items-center top-0"
        >

            <div
                className="flex flex-col justify-items items-center p-6 shadow-md bg-white w-96 rounded-md m-2"
            >
                <div 
                    className="text-gray-500 flex justify-end w-full m-4"
                    onClick={(e) => setClickedCourse(false)}    
                >
                    <IoMdClose />
                </div>
                <div 
                    className= "w-full flex justify-center"
                >
                    <img 
                        src={import.meta.env.VITE_SERVER_SIDE_URL + course.coursePic} 
                        alt="No course picture found" 
                        className="h-48" 
                    />
                </div>

                {/* "w-full flex justify-center items-center text-2xl" */}
                <div
                    className={courseDivNameStyle(screenWidth,"w-full flex justify-center items-center")}
                >
                    {course.name}
                </div>
                <div
                    className="w-full flex justify-center items-center text-md"
                >
                    {course.description}
                </div>
                <div
                    className="w-full flex justify-center items-center text-xs pt-2"
                >
                    <div
                        className="p-1 flex justify-center items-center outline outline-1 outline-blue-500 text-blue-500 rounded-lg"
                    >
                        {
                            course.level
                        }
                    </div>
                </div>
                <div
                    className="w-full flex justify-center items-center text-xs pt-2"
                >
                    <div
                        className="p-1 flex justify-center items-center bg-black text-white rounded-lg"
                    >
                            {course.tech_stack}
                    </div>
                </div>

                <div
                    className="w-full flex justify-center items-center text-xs pt-2"
                >
                    <button
                        className="p-4 bg-blue-500 text-white text-lg rounded flex justify-center items-center space-x-1 cursor-pointer"
                    >
                        <div>
                            <FaPlay />
                        </div> 
                        <div>
                            Click to start studying
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmCourse;