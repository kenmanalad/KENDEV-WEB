import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import SignIn from "./Authentication/sign-in"
import SignUp from "./Authentication/sign-up";
import StudentPage from "./Feed/Student";
import LandingPage from "./Landing";
import ProfileRegistration from "./Profile/profile-registration";
import Profile from "./Profile/profile"

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-in" Component={SignIn} />
                <Route path="/sign-up" Component={SignUp} />
                <Route path="/profile-registration" Component={ProfileRegistration}/>
                <Route path="/profile" Component={Profile}/>
                <Route path="/student-feed" Component={StudentPage}/> 
                <Route path="/" Component={LandingPage}/>  
            </Routes>
        </Router>
    );
}