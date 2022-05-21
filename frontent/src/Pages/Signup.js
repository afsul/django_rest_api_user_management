import React from "react";
import SignupForm from "../Components/SignupForm";
import { useParams } from "react-router-dom";

function Signup() {
     
     const { value } = useParams();

     console.log(value)
    

     return (
          <div>
               <SignupForm title={"SignUp"} method={"post"} url={"http://localhost:8000/api/register/"} navigateTo={!value == "createuser" ? "/login" : '/admin_home'}/>
          </div>
     );
}

export default Signup;
