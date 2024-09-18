//Handler of errors for catch
//Errors for GET methods
export const FetchError = (error, setErrorMessage) => {

    setErrorMessage(error.message);
    console.error("Unable to complete request", error.message);

}