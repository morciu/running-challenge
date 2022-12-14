import React from "react";

import styles from "./GlobalUserCard.module.css"

import { Avatar, Card, CardHeader, Icon, LinearProgress, Typography } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { Box } from "@mui/system";

const cardStyle = {
    fontFamily: "Roboto",
    display: "flex",
    alignItems: "center",
    padding: "2px",
    minWidth: "298px",
    height: "68px",
    borderRadius: "18px",
    boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
};

const headingStyle = {
    fontSize: "26px",
    marginBottom: "0",
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
};

const leftContent = {
    maxWidth: "75%"
};

const GlobalUserCard = (props) => {
    
    return(
        <Card sx={cardStyle} key={props.item.id} onClick={() => { props.action(props.item) }}>
            <div className={styles.avatarContainer}>
                {
                (props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4) == 1 ?
                    <Avatar aria-label="recipe" className={styles.avatarGold}>
                        {props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4}
                    </Avatar> :
                    (props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4) == 2 ?
                        <Avatar aria-label="recipe" className={styles.avatarSilver}>
                            {props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4}
                        </Avatar> : 
                        (props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4) == 3 ?
                            <Avatar aria-label="recipe" className={styles.avatarBronze}>
                                {props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4}
                            </Avatar> : 
                    <Avatar aria-label="recipe" className={styles.avatar}>
                        {props.list.indexOf(props.item) + (props.pageNumber * props.pageSize) - 4}
                    </Avatar>
                }
            </div>
            <Box className={styles.cardInnerContainer}>
                <Box className={styles.content}>
                    <Box sx={leftContent}>
                        <div className={styles.heading}>
                            <Typography noWrap align="center" variant="h5" sx={headingStyle}>{props.item.userName}</Typography>
                        </div>
                        
                        <div className={styles.subHeader}>
                            <Typography variant="p" >{props.item.totalDistance} km</Typography>
                        </div>
                    </Box>
                    <Box className={styles.rightContent}>
                        <Typography variant="h6">{props.item.medals.length}X</Typography><Icon><EmojiEvents /> </Icon>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default GlobalUserCard;