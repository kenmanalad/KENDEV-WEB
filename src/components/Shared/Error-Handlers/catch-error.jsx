export const APIErrors = (error, setErrorMessage) => {
    if(error instanceof ReferenceError){
        setErrorMessage("Unable to complete request: Please try again later.");
        throw new Error("API Error: Undefined Variable/s");
    }else if(error instanceof SyntaxError){
        setErrorMessage("Unable to complete request: Please contact an agent for this issue.");
        throw new Error("API Error: Invalid response type");
    }else if(error instanceof TypeError){
        setErrorMessage("Unable to complete request: Kindly make sure your connection is okay.");
        throw new Error("API Error: Network error or failed request");
    }else{
        setErrorMessage("Unable to complete request: Currently fixing this issue");
        throw new Error("API Error: Undertermined issue in the API");
    }
}