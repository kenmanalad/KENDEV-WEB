import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Courses from "../Shared/courses";
import Pagination from "../Shared/pagination";

const StudentPage = () => {

    //jwt tokens
    const token = localStorage.getItem("token");
    const oauthToken = Cookies.get("token");
    const id = Cookies.get("id");


    //States
    const [screenWidth, setScreenWidth] = useState();
    const [details, setDetails] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
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


    const handlePreviousPage = () => {
        setPage( page > 1 ? page - 1 : 1 );
    }

    const handleNextPage = () => {
        setPage(page < totalPage ? page + 1 : totalPage );
    }

    const fetchCourseDetails = useCallback( 
        async() => {
            try{

                const courses = await fetchCourseAPI();
                console.log(courses);
                setDetails(courses.courses);
                setTotalPage(courses.totalPage)

            }catch(error){
                APIErrors(error,setErrorMessage);
            }
        },[page]);


    const fetchCourseAPI = async (limit = 8) => {
            //FetchCourseDetails will catch the errors
            const response = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/fetch-course?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }

            });
            
            return await response.json();

        
    }

    console.log(page);

    useEffect(() => {
        fetchCourseDetails();
    },[fetchCourseDetails]);

    return(
        <div 
            className={`bg-gray-100 w-full flex flex-col justify-center items-center`}
            style={{
                fontFamily: "montserrat"
            }}    
        >
            <div className="w-full text-sm italic text-gray-400 m-2 p-8 px-20">
                Free Courses<hr/>
            </div>
            <Courses
                screenWidth={screenWidth}
                details={details}
                errorMessage={errorMessage}
            />
            <Pagination
                page={page}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                totalPage={totalPage}
            />
        </div>
    )
}

export default StudentPage;