import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@material-ui/core";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useState, useEffect } from "react";

import AlertBox from "../Components/AlertBox";
// import AlertBox from '../Components/AlertBox'
import LogoutPopup from "../Components/LogoutPopup";

import { useNavigate } from "react-router-dom";
import IsLoggedIn from "../IsLoggedIn";
import axios from "axios";
import Navbar from "../Components/Navbar";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
       backgroundColor: theme.palette.common.black,
       color: theme.palette.common.white,
     },
     [`&.${tableCellClasses.body}`]: {
       fontSize: 14,
     },
   }));
   
   const StyledTableRow = styled(TableRow)(({ theme }) => ({
     '&:nth-of-type(odd)': {
       backgroundColor: theme.palette.action.hover,
     },
     // hide last border
     '&:last-child td, &:last-child th': {
       border: 0,
     },
   }));

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

export default function AdminHome() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  console.log(userData);

  //search bar start
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
//     result = allData.filter((data) => {
//       return data.title.search(value) != -1;
//     });
//     setFilteredData(result);

    axios(`http://127.0.0.1:8000/api/search/?search=${value}`)
      .then((response) => {
           console.log("----------------------");
           setUserData(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });

  };

  //search bar End

  useEffect(() => {
    axios({
      method: "get",
      url: "/admin_home",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        localStorage.removeItem("access_token");
        navigate("/login");
      });

    IsLoggedIn.find((value) => navigate(value));
  }, []);

  console.log(userData);

  return (<>
     <Navbar title="Admin Panel" />
       <Container>
            
   
    
      <div style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            <div key={value.id}>
              <div>{value.title}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "76px" , display: "flex", justifyContent: "end"}}>
        <div>
          <label>Search:</label>
          <input    
            type="text"
            onChange={(event) => handleSearch(event)}
            placeholder="Search"
          />
        </div>
      </div>
     
     
      

      <TableContainer component={Paper} style={{marginTop:"10px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No:</StyledTableCell>
            <StyledTableCell align="right">First name</StyledTableCell>
            <StyledTableCell align="right">Last name</StyledTableCell>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((data, index) => (
            <StyledTableRow key={data.id}>
             
              <StyledTableCell align="right">{index + 1}</StyledTableCell>
              <StyledTableCell align="right">{data.first_name}</StyledTableCell>
              <StyledTableCell align="right">{data.last_name}</StyledTableCell>
              <StyledTableCell align="right">{data.username}</StyledTableCell>
              <StyledTableCell align="right">{data.email}</StyledTableCell>
              <StyledTableCell align="right"><Button
                    variant="outlined"
                    onClick={() => navigate(`/edit_user/${data.id}`)}
                  >
                    Update
                  </Button></StyledTableCell>
              <StyledTableCell align="right"> <AlertBox
                    userId={data.id}
                    userData={userData}
                    setUserData={setUserData}
                  /></StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </Container>
    </>
  );
}
