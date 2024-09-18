import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const Chapter = () => {


    //Params
    const { course_id } = useParams();

    //States
    const [ details, setDetails ] = useState();

    useEffect(() => {
        if (course_id) {
            setDetails({ course_id: course_id });
        }
    }, [course_id]);

    const navigate = useNavigate();

    const handleChapterDetails = async (e) => {
        e.preventDefault();

        if(!details.title){
            throw new Error("No title for chapter");
        }

        if(!details.body){
            throw new Error("No body for chapter");
        }

        if(!details.example){
            throw new Error("No example for chapter");
        }

        try{
            const response = await fetch(import.meta.env.VITE_ADD_CHAPTER_ROUTE, {
                method:'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(details)
            });
            if(response.ok){
                const data = await response.json(); 
                console.log(data);
                navigate(`/quiz-add/${course_id}/${data.id}`);
            }

        }catch(error){
            console.error(error);
        }
    }
    
    return(
        <div 
            className="w-full flex justify-center items-center bg-gray-200 p-24"
            style={{
                fontFamily: "montserrat"
            }}
        >
            <Form 
                details={details}
                setDetails={setDetails}
                handleChapterDetails={handleChapterDetails} 
            />
        </div>
    );
}

export default Chapter;