import { React, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

import { Stack, Card, CardContent, Link, Typography, makeStyles, CardHeader, Avatar, IconButton, Modal } from "@mui/material";
import axios from "axios";
import { Favorite } from "@mui/icons-material";
import { Box } from "@mui/system";
import UserModal from "../../components/UserModal/UserModal";

const Marathon = () => {
    const {user} = useContext(UserContext);
    const params = useParams();


    // Request config for axios
    const requestConfig = {
        url: `/marathon/members-by-distance?marathonId=${params.marathonId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage["auth-token"]}`,
        },
    };

    const {data, loading, error} = useFetchData(requestConfig);

    const fetchProgress = async () => {
        const response = await axios({
            url: `/marathon/${params.marathonId}/check-progress/${user.id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage["auth-token"]}`,
            },
        });
        return response.data;
    };
      
    const [modalObject, setmodalObject] = useState({
        id: null,
        userName: null,
        totalDistance: null,
        totalTime: null,
        averagePace: null
    });

    const[openModal, setOpenModal] = useState(false);
    const handleOpenModal = (item) => {
    setmodalObject(item);
    setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

    // Display Results
    return(
        <>
        <Typography variant="h5">Personal Progress: {}% </Typography>
        
        <UserModal open={openModal}
            modalObject={modalObject}
            handleCloseModal={handleCloseModal} />

        <Stack spacing={2}>
                {loading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}
                {data && data.map((item) => (
                    <Card key={item.id} onClick={() => { handleOpenModal(item) }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" >
                                    {item.userName != null && item.userName.substring(0,1)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings"><Favorite /></IconButton>
                            }
                            title={item.userName}
                            subheader={item.totalDistance+" km"}
                            />
                    </Card>
                ))}
        </Stack>
        </>
    );
};

export default Marathon;