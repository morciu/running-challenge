import { Avatar, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./DashBoard.module.css";
import EmailIcon from '@mui/icons-material/Email';
import TimerIcon from '@mui/icons-material/Timer';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

const userHeaderStyle = {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    alignItems: "center",
    width: "80%",
};

const userContStyle = {
    display: "flex",
    alignItems: "center",
};

const DashBoard = (props) => {
    const {user} = useContext(UserContext);
    return(
        <div className={styles.container}>
            <div>
                <div style={userHeaderStyle}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {props.invitations == true ?
                    <IconButton component={Link} to="/invitations"><Avatar color={"red"}><EmailIcon color="red" /></Avatar></IconButton> :
                    <IconButton component={Link} to="/invitations"><Avatar><EmailIcon /></Avatar></IconButton>}
                    
                    
                        <Typography variant="h5">{props.userName}</Typography>
                    </div>

                    <div style={{display: "flex", alignItems: "center"}}>
                        <IconButton component={Link} to={`/${user.id}/medals`}><Avatar sx={{backgroundColor: "#f2af29"}}><EmojiEventsIcon /></Avatar></IconButton><Typography variant="h6">{props.medals.length}</Typography> 
                    </div>
                </div>
            </div>

            <Box className={styles.summary}>
                <div className={styles.time}>
                    <IconButton><Avatar sx={{backgroundColor: "#92140c"}}><TimerIcon /></Avatar></IconButton>
                    <>
                    {props.time.length > 8 ? 
                    <>
                            {props.time[1] == "." ?
                                <Typography variant="h6">Total Time: {props.time[0]} days {props.time.slice(-8)}</Typography>
                                : 
                                <Typography variant="h6">Total Time: {props.time.slice(0, 2)} days {props.time.slice(-8)}</Typography>}</>
                        : 
                        <Typography variant="h6">Total Time: {props.time}</Typography>}</>
                    
                </div>
                <div className={styles.distance}>
                    <IconButton><Avatar sx={{backgroundColor: "#111D4A"}}><DirectionsRunIcon /></Avatar></IconButton>
                    <Typography variant="h6">Total Distance: {props.distance} km</Typography>
                </div>
                <div className={styles.pace}>
                    <IconButton><Avatar sx={{backgroundColor: "#4B624B"}}><SpeedIcon /></Avatar></IconButton>
                    <Typography variant="h6">Avg Pace: {props.pace.slice(3)} min/km</Typography>
                </div>
            </Box>

            <div className={styles.activitiesButton}>
                <Button variant="contained" component={Link} to={`/${user.id}/activities`}>See all your runs</Button>
            </div>
        </div>
    );
};

export default DashBoard;