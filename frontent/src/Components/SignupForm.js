import React, { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Paper, Box, Grid, TextField, Typography, Button } from "@material-ui/core";

const SignupForm = ({ first_name, last_name, username, email, title, method, url, id, navigateTo }) => {
     const navigate = useNavigate();

     if (!id) {
          var validationSchema = Yup.object().shape({
               first_name: Yup.string().required("First_name is required").matches(/^\S*$/, "This field should not be blank"),
               last_name: Yup.string().required("Last_name is required").matches(/^\S*$/, "This field should not be blank"),
               username: Yup.string().required("Username is required").matches(/^\S*$/, "This field should not be blank"),
               email: Yup.string()
                    .required("Email is required")
                    .email("Email is invalid")
                    .matches(/^\S*$/, "This field should not be blank"),
               password: Yup.string()
                    .required("password is required")
                    .min(6, "password must be at least 6 characters")
                    .max(40, "password must not exceed 40 characters")
                    .matches(/^\S*$/, "This field should not be blank"),
               password2: Yup.string()
                    .required("Confirm password is required")
                    .oneOf([Yup.ref("password"), null], "Confirm password does not match")
                    .matches(/^\S*$/, "This field should not be blank"),
          });
     } else {
          var validationSchema = Yup.object().shape({
               first_name: Yup.string().required("first_name is required").matches(/^\S*$/, "This field should not be blank"),
               last_name: Yup.string().required(" last_name is required").matches(/^\S*$/, "This field should not be blank"),
               username: Yup.string().required("username is required").matches(/^\S*$/, "This field should not be blank"),
               email: Yup.string()
                    .required("Email is required")
                    .email("Email is invalid")
                    .matches(/^\S*$/, "This field should not be blank"),
          });
     }

     const {
          register,
          control,
          handleSubmit,
          formState: { errors },
          setError,
          setValue,
     } = useForm({
          resolver: yupResolver(validationSchema),
     });

     const onSubmit = (data) => {

          if (navigateTo == "/admin_home") {
               let temp = { id: id };
               let d = { ...data, ...temp };
               console.log(d);
          }

          axios({ method: method, url: url, data: data })
               .then((response) => {
                    navigate(navigateTo);
               })
               .catch((error) => {
                    console.log(error.response.data);
                    if (error.response.data.username) {
                         setError("username", { type: "server", message: error.response.data.username });
                    }
                    if (error.response.data.email) {
                         setError("email", { type: "server", message: error.response.data.email });
                    }
                    if (error.response.data.password) {
                         setError("password", { type: "server", message: error.response.data.password[0] });
                    }
                    if (error.response.data.password2) {
                         setError("password2", { type: "server", message: error.response.data.password2[0] });
                    }
               });
     };

     useEffect(() => {
          if (id) {
               axios({
                    method: "get",
                    url: `http://localhost:8000/admin_home/${id}/`,
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
               }).then((response) => {
                    console.log(response.data);
                    setValue("first_name", response.data.first_name);
                    setValue("last_name", response.data.last_name);
                    setValue("username", response.data.username);
                    setValue("email", response.data.email);
               }).catch(error => {
                    localStorage.removeItem("access_token")
               });

          }
     }, []);

     return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
               <div style={{ maxWidth: "600px" }}>
                    
                              <Box px={3} py={2} >
                                   <Typography variant="h4" align="center" margin="dense">
                                        {title}
                                   </Typography>

                                   <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                             <TextField
                                                  required
                                                  id="first_name"
                                                  name="first_name"
                                                  placeholder="First name"
                                                  fullWidth
                                                  margin="dense"
                                                  {...register("first_name")}
                                                  error={errors.first_name ? true : false}
                                             />
                                             <Typography variant="inherit" color="textSecondary">
                                                  {errors.first_name?.message}
                                             </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                             <TextField
                                                  required
                                                  id="last_name"
                                                  name="last_name"
                                                  // label="Last Name"
                                                  placeholder="Last name"
                                                  value={last_name}
                                                  fullWidth
                                                  margin="dense"
                                                  {...register("last_name")}
                                                  error={errors.last_name ? true : false}
                                             />
                                             <Typography variant="inherit" color="textSecondary">
                                                  {errors.last_name?.message}
                                             </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                             <TextField
                                                  required
                                                  id="username"
                                                  name="username"
                                                  // label="Username"
                                                  value={username}
                                                  fullWidth
                                                  placeholder="Username"
                                                  margin="dense"
                                                  {...register("username")}
                                                  error={errors.username ? true : false}
                                             />
                                             <Typography variant="inherit" color="textSecondary">
                                                  {errors.username?.message}
                                             </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                             <TextField
                                                  required
                                                  id="email"
                                                  name="email"
                                                  // label="Email"
                                                  placeholder="Email"
                                                  fullWidth
                                                  value={email}
                                                  margin="dense"
                                                  {...register("email")}
                                                  error={errors.email ? true : false}
                                             />
                                             <Typography variant="inherit" color="textSecondary">
                                                  {errors.email?.message}
                                             </Typography>
                                        </Grid>

                                        {!id && (
                                             <>
                                                  {" "}
                                                  <Grid item xs={12} sm={6}>
                                                       <TextField
                                                            required
                                                            id="password"
                                                            name="password"
                                                            // label="Password"
                                                            placeholder="Password"
                                                            type="password"
                                                            fullWidth
                                                            margin="dense"
                                                            {...register("password")}
                                                            error={errors.password ? true : false}
                                                       />
                                                       <Typography variant="inherit" color="textSecondary">
                                                            {errors.password?.message}
                                                       </Typography>
                                                  </Grid>
                                                  <Grid item xs={12} sm={6}>
                                                       <TextField
                                                            required
                                                            id="password2"
                                                            name="password2"
                                                            // label="Confirm Password"
                                                            placeholder="Confirm Password"
                                                            type="password"
                                                            fullWidth
                                                            margin="dense"
                                                            {...register("password2")}
                                                            error={errors.password2 ? true : false}
                                                       />
                                                       <Typography variant="inherit" color="textSecondary">
                                                            {errors.password2?.message}
                                                       </Typography>
                                                  </Grid>{" "}
                                             </>
                                        )}
                                   </Grid>
                                   <Box mt={3}>
                                        <Button  variant="contained" fullWidth  onClick={handleSubmit(onSubmit)}>
                                             Submit
                                        </Button>
                                   </Box>
                              </Box>
                        
               </div>
          </div>
     );
};

export default SignupForm;
