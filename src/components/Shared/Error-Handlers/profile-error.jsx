
export const FetchProfileErrorAPI = (setErrorMessage, response) => {
    switch(response.status){
        case 401:
            setErrorMessage("Unable to load profile details. Please sign in again.");
            throw new Error("Authentication token is missing or invalid");

        case 403:
            setErrorMessage("Access denied. You don't have permission to view this profile.");
            throw new Error("User doesn't have permission to access this resource");

        case 404:
            setErrorMessage("Profile not found. Please verify the user or contact support.");
            throw new Error("Requested profile could not be found");

        case 500:
            setErrorMessage("Internal server error. Please try again later.");
            throw new Error("The server encountered an issue processing the request");

        case 503:
            setErrorMessage("Service temporarily unavailable. Please try again later.");
            throw new Error("The server is currently unavailable");

        default:
            setErrorMessage("An unexpected error occurred while fetching profile details. Please contact support.");
            throw new Error(`Unexpected response: ${response.status}`);

    }
} 