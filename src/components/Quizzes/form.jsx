const Form = ({
    details,
    setDetails,
    handleQuizRegistration
}) => {
    return(
        <div 
            className="w-1/2 flex flex-col justify-center items-center p-2 rounded bg-white p-4 space-x-1.5"
        >
            <div
                className="w-full flex justify-center items-center text-2xl"
            >
                Question
            </div>

            <div
                className="p-2 w-4/5"
            >
                <textarea
                    className="w-full h-96 rounded-sm shadow p-4"
                    placeholder="Chapter Body....."
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    question: e.target.value
                                }
                            )
                    }
                />
            </div>


            <div className="w-full flex justify-evenly items-center">
                <button
                    className="bg-blue-600 p-3 flex justify-center items-center text-white rounded"
                    onClick={handleQuizRegistration}
                >
                    Add Another Chapter
                </button>
                <button
                    className="bg-green-600 p-3 flex justify-center items-center text-white rounded"
                >
                    Go back to course registration
                </button>
            </div>
        </div>
    );
}

export default Form;