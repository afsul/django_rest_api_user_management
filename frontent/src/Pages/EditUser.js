import React, { useEffect, useState } from "react";
import SignupForm from "../Components/SignupForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditUser() {
     const [user, setUser] = useState([]);
     const { id } = useParams();
     
     return (
          <div>
               <SignupForm
                    id={id}
                    method={"put"}
                    url={`http://localhost:8000/admin_home/${id}/`}
                    title={"Edit User"}
                    navigateTo="/admin_home"
               />
          </div>
     );
}

export default EditUser;
