import React from "react";
import { Typography } from "@mui/material";
import FriendAvatar from "../FriendAvatar/FriendAvatar";
import { FRIENDS } from "../../utils/constants";
import "./styles.scss";

const FriendsStatus = () => (
  <div className="container">
    <Typography variant="h5">Friends Status:</Typography>
    <div className="friendsContainer">
      {FRIENDS.map((friend) => (
        <FriendAvatar key={friend.id} friend={friend} />
      ))}
    </div>
  </div>
);

export default FriendsStatus;
