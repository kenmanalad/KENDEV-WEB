const Form = ({
    details,
    setDetails,
    handleChapterDetails
}) => {
    return(
        <div 
            className="w-1/2 flex flex-col justify-center items-center p-2 rounded bg-white p-4 space-x-1.5"
        >
            <div
                className="w-full flex justify-center items-center text-2xl"
            >
                Chapter Details
            </div>

            <div
                className="p-2"
            >
                <input 
                    type="text" 
                    className="w-96 rounded-sm shadow p-4"
                    placeholder="Chapter Title....."
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    title: e.target.value
                                }
                            )
                    }
                />
                
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
                                    body: e.target.value
                                }
                            )
                    }
                />
            </div>

            <div
                className="p-2 w-4/5"
            >
                <textarea
                    className="w-full h-96 rounded-sm shadow p-4"
                    placeholder="Chapter Example....."
                    onChange={
                        (e) => 
                            setDetails(
                                {
                                    ...details,
                                    example: e.target.value
                                }
                            )
                    }
                />
            </div>

            <div className="w-full flex justify-center items-center">
                <button
                    className="bg-blue-600 p-3 flex justify-center items-center text-white rounded"
                    onClick={handleChapterDetails}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Form;