import { Input } from "../Shared/input";
import { SelectInput } from "../Shared/input";
const FormProfile = ({
    userType,
    setNonITJob,
    setITJob,
    setSchoolYear,
}) => {

    let itOptions = 
        [
            {
                value:"",
                name: "IT Field....."
            },
            {
                value:"software-development",
                name:"Software Development"
            },
            {
                value:"qa-testing",
                name:"QA Testing"
            },
            {
                value:"cyber-security",
                name:"Cyber Security"
            },
            {
                value:"software-architecture",
                name:"Software Architecure"
            }
        ];


    switch(userType){
        case "student":
            return(
                <Input
                    placeholder="1st Year/Freshman....."
                    name="schoolYear"
                    id="schoolYear"
                    setValue={setSchoolYear}
                />
            );
        case "it-professional":
            return(
                <SelectInput
                    name="ITField"
                    id="ITField"
                    setValue={setITJob}
                    options={
                        itOptions
                    }
                />
            );
        case "non-it-professional":
            return(
                <Input 
                    placeholder="Career....."
                    id="career"
                    name="career"
                    setValue={setNonITJob}
                />
            );
        default:
            return(null);
    }
}

export default FormProfile;