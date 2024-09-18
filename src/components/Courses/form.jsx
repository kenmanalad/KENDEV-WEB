import { ImFilePicture } from "react-icons/im";
const Form = ({
    details,
    setDetails,
    handleCourseDetails,
    handleFileChange,
    file
}) => {
    return(
        <div 
            className="w-1/3 flex flex-col justify-center items-center p-2 rounded bg-white p-4 space-x-1.5"
        >
            <div
                className="w-full flex justify-center items-center text-2xl"
            >
                Course Details
            </div>

            <div
                className="p-2"
            >
                <select 
                    name="level" 
                    id="level"
                    className="w-72 rounded-sm shadow p-4"
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    level: e.target.value
                                }
                            )
                    }
                >
                    <option value="">Choose level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermidiate">Intermidiate</option>
                    <option value="Advance">Advance</option>
                </select>
            </div>

            <div
                className="p-2"
            >
                <input 
                    type="text" 
                    className="w-72 rounded-sm shadow p-4"
                    placeholder="Tech Stack....."
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    tech_stack: e.target.value
                                }
                            )
                    }
                />
                
            </div>

            <div
                className="p-2"
            >
                <input 
                    type="text" 
                    className="w-96 rounded-sm shadow p-4"
                    placeholder="Course Name....."
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    name: e.target.value
                                }
                            )
                    }
                />
            </div>
            <div
                className="p-2"
            >
                <textarea
                    className="w-96 h-96 rounded-sm shadow p-4"
                    placeholder="Course Description....."
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    description: e.target.value
                                }
                            )
                    }
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <button
                    className="bg-blue-600 p-3 flex justify-center items-center text-white rounded"
                    onClick={handleCourseDetails}
                >
                    Submit
                </button>
            </div>
            <div className="w-full flex justify-center items-center pt-2">
                <label htmlFor="profilePic" className="bg-gray-400 text-white w-72 rounded-sm shadow-sm shadow-gray-200 p-4 flex items-center justify-center cursor-pointer">
                    
                    <div className="flex justify-around items-center text-sm">
                    <   ImFilePicture /> {file ? file.name : 'Click to Choose Course Picture'}
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
        </div>
    );
}

export default Form;