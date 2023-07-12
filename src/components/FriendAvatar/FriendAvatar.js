import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useFriendStatus } from "../../hooks/useFriendStatus";
import "./styles.scss";
import { COLORS } from "../../utils/constants";

const FriendAvatar = ({ friend }) => {
  const { name, id, time } = friend;
  const initials = getInitials(name);
  const isOnline = useFriendStatus(id, time);

  return isOnline === null ? (
    <Typography variant="body1">{name} status is loading...</Typography>
  ) : (
    <div className={`friendContainer ${isOnline ? "online" : "offline"}`}>
      <p>{isOnline ? "Online" : "Offline"}</p>
      <Avatar
        sx={{
          width: 60,
          height: 60,
          borderRadius: "8px",
          color: isOnline ? COLORS.GRAY : COLORS.WHITE,
          backgroundColor: isOnline ? COLORS.LIGHT_GREEN : COLORS.LIGHT_RED,
          boxShadow: `0 0 0.3rem ${isOnline ? COLORS.GREEN : COLORS.RED}`,
        }}
      >
        {initials}
      </Avatar>
      <p>{name}</p>
    </div>
  );
};

function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((n) => n[0].toUpperCase()).join("");
  return initials;
}

export default FriendAvatar;
