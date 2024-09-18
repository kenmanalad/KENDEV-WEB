import { useState } from "react";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = () => {


    //Params
    const { course_id, chapter_id} = useParams();

    //States
    const [ details, setDetails ] = useState({
        chapter_id: chapter_id
    });
    const navigate = useNavigate();


    const handleQuizRegistration = async (e) => {
        e.preventDefault();

        if(!details.question){
            throw new Error("No name for course");
        }

        try{
            const response = await fetch(import.meta.env.VITE_ADD_QUIZ_ROUTE, {
                method:'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(details)
            });

            if(response.ok){
                const data = await response.json();
                navigate(`/chapter-add/${course_id}`)
            }

        }catch(error){

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
                handleQuizRegistration={handleQuizRegistration}
            />
        </div>
    );
}

export default Quiz;