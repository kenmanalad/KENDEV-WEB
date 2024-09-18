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
import Profile from "./Profile/profile";
import Course from "./Courses";
import Chapter from "./Chapters"
import Quiz from "./Quizzes";

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

                {/* This route will be moved in the admin route once deployed */}
                <Route path="/course-add" Component={Course}/>
                <Route path="/chapter-add/:course_id" Component={Chapter}/> 
                <Route path="/quiz-add/:course_id/:chapter_id" Component={Quiz}/> 
 
            </Routes>
        </Router>
    );
}