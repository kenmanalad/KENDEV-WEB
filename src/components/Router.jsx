import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import SignIn from "./Authentication/sign-in"
import SignUp from "./Authentication/sign-up";
import StudentPage from "./Feed/Student";

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-in" Component={SignIn} />
                <Route path="/sign-up" Component={SignUp} />
                <Route path="/student-feed" Component={StudentPage}/>  
            </Routes>
        </Router>
    );
}