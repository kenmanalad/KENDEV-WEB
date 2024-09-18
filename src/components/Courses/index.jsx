import { useState } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";

const Course = () => {

    //States
    const [ details, setDetails ] = useState();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files[0];
        setFile(selectedFiles);
        console.log(selectedFiles);
    }

    const handleCourseDetails = async (e) => {
        e.preventDefault();

        if(!details.name){
            throw new Error("No name for course");
        }

        if(!details.description){
            throw new Error("No name for course");
        }
        if(!details.level){
            throw new Error("No name for course");
        }
        if(!details.tech_stack){
            throw new Error("No name for course");
        }
        if(!file){
            throw new Error("No name for course");
        }

        try{
            const formData = new FormData();
            formData.append("name",details.name);
            formData.append("description", details.description);
            formData.append("level", details.level);
            formData.append("tech_stack",details.tech_stack);
            formData.append("coursePic",file);

            console.log(formData);
            const response = await fetch(import.meta.env.VITE_ADD_COURSE_ROUTE, {
                method:'POST',
                body: formData
            });

            if(response.ok){
                const data = await response.json();
                navigate(`/chapter-add/${data.course_id}`)
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
                handleCourseDetails={handleCourseDetails}
                handleFileChange={handleFileChange}
            />
        </div>
    );
}

export default Course;