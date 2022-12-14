import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import useFetchData from "../../hooks/useFetchData";
import { sendData } from "../../utils/SendData";
import PersonIcon from '@mui/icons-material/Person';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };

// Request config for user marathons
const requestConfig = {
    url: `/users/${localStorage.id}`,
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.token}`,
    },
};

const invitationPostConfig = {
    url: "/invitation/create-invitation",
    method: "POST",
    payload: "",
    headers: {
        Authorization: `Bearer ${localStorage.token}`,
    },
};


const sendInvitation = (invitation) => {
    invitationPostConfig.payload = invitation;
    console.log(invitation)
    if(sendData(invitationPostConfig)){
        console.log("all good - invitation accepted")
    } else {
        console.log("not good")
    }
};

const MarathonListInvitationModal = (props) => {
    const {user} = useContext(UserContext);
    const {data, loading, error} = useFetchData(requestConfig);
    const marathons = data.data?.marathons;
    return(
        <Modal open={props.open}
                onClose={props.handleCloseModal}
                aria-labelledby={props.parent.id}>
            <Box sx={style}>
            <Stack spacing={2}>
                {marathons && marathons.map((item) => (
                    <div key={item.id} style={{display: "flex", justifyContent: "space-between"}}>
                    {item.memberIdList.includes(props.parent.id) ? 
                        <Button disabled={true} variant="contained" 
                            onClick={() => {sendInvitation({receiverId: props.parent.id, senderId: user.id, marathonId: item.id})}}>
                                Started: {(new Date(item.startDate)).toDateString()}
                        </Button>
                         : <Button variant="contained" 
                         onClick={() => {sendInvitation({receiverId: props.parent.id, senderId: user.id, marathonId: item.id})}}>
                             Started: {(new Date(item.startDate)).toDateString()}
                     </Button>
                    }
                    <Typography variant="p">{item.memberCount}X<PersonIcon /></Typography>
                    </div>
                    
                ))}
            </Stack>
            </Box>
        </Modal>
    );
};

export default MarathonListInvitationModal;