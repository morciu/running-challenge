import { Card, CardHeader, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import useCheckInvitations from "../../hooks/useCheckInvitations";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { sendData } from "../../utils/SendData";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import Login from "../Login/Login";

const Invitations = () => {
    const {user} = useContext(UserContext);
    // Request config for invitations
    const requestConfigInvitations = {
        url: `/invitation/unanswered/${localStorage.id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    }

    const acceptInvitation = (invId) => {
        if(sendData({
            url: `invitation/answer/${invId}?answer=true`,
            payload: "",
            method: "PUT",
        })){
            console.log("all good - invitation accepted")
            window.location.reload();
        } else {
            console.log("not good")
        }
    };

    const refuseInvitation = (invId) => {
        if(sendData({
            url: `invitation/answer/${invId}?answer=false`,
            payload: "",
            method: "PUT",
        })){
            console.log("all good - invitation rejected")
            window.location.reload();
        } else {
            console.log("not good")
        }
    };

    const {invData, invLoading, invError} = useCheckInvitations(requestConfigInvitations);

    if (user.auth){
        return(
            <>
            <Stack spacing={2}>
            {invData.length == 0 &&
            <Typography variant="h5">No Invitations</Typography>}
            {invData.map((item) => (
                <Card key={item.id}>
                    <CardHeader
                        title="Invitation From: "
                        subheader={item.sender.userName}
                        />
                    <IconButton aria-label="settings" onClick={() => {acceptInvitation(item.id)}}><ThumbUpIcon /></IconButton>
                    <IconButton aria-label="settings" onClick={() => {refuseInvitation(item.id)}}><ThumbDownIcon /></IconButton>
                </Card>
            ))}
            </Stack>
            </>
        )
            
    } else {
        return( <> <Login /> </>)
    }
};

export default Invitations;