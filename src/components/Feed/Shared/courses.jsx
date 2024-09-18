import { useState, useEffect , useCallback } from "react";
import { APIErrors } from "../../Shared/Error-Handlers/catch-error";
import { courseDivNameStyle, courseDivStyle } from "../Student/student-feed-style";
import ConfirmCourse from "./confirm-course";

const Courses = ({
    screenWidth,
    details,
    errorMessage
}) => {

    const [clickedCourse, setClickedCourse] = useState(false);
    const [courseDetails, setCourseDetails] = useState();

    const handleClickCourse = (e,id) => {
        e.preventDefault();
        setClickedCourse(true);
        const data = details.filter((detail) => detail.id === id);
        console.log(data);
        setCourseDetails(data[0]);
    }

    return(
        <div 
            className="flex flex-wrap justify-center items-center p-12 w-full"
        >

            {
                errorMessage && 
                    <div
                        className="w-full bg-red-600 text-white text-sm flex justify-center items-center"
                    >
                        {errorMessage}
                    </div>
            }

            {
                details && details.length !== 0 ?
                    
                (
                    details.map((course, index) => {
                    
                        // "flex flex-col justify-items items-center p-6 bg-white w-96 h-96 rounded-md m-2"
                        return(
                            <div
                                key={index}
                                className={courseDivStyle(screenWidth,"flex flex-col justify-items items-center p-6 shadow-md bg-white w-96 rounded-md m-2 cursor-pointer")}
                                onClick={(e) => handleClickCourse(e,course.id)}
                            >
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


                            </div>
                        )
                    })
                ) : (
                    <div className="w-screen h-screen bg-gray-300 text-white flex justify-center items-center">
                        No course Available
                    </div>
                )
            }

            {
                clickedCourse &&  
                    <ConfirmCourse
                        course={courseDetails}
                        setClickedCourse={setClickedCourse}
                        screenWidth={screenWidth}
                    />
            }

        </div>
    );
}

export default Courses;