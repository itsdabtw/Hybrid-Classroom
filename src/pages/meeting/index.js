import React from "react";
import { JitsiMeeting, JaaSMeeting, JitsiMeetJS } from "@jitsi/react-sdk";
import { useLocation, useNavigate } from "react-router-dom";

const JitsiMeetPage = ({ className }) => {
  const widthScreen = window.innerHeight;
  const navigate = useNavigate();
  const handleMeetingEnded = () => {
    navigate("/classhome");
  };
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : {};

  return (
    <div>
      <JaaSMeeting
        domain="meet.jit.si"
        roomName={className}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: user?.fullname,
        }}
        getIFrameRef={(node) => {
          node.style.height = `${widthScreen - 200}px`;
        }}
      />
    </div>
  );
};

export default JitsiMeetPage;
