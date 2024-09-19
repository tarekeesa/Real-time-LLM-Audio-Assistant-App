import React from "react";
import { auth } from "../utils/firebase"; // Firebase utils
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const isAssistant = message.uid === "assistant";
  const assistantIconURL = "/production-assistant.gif";

  // Adjusting CSS classes based on user or assistant to position bubbles correctly
  return (
    <div className={`chat-bubble ${isAssistant ? "elft" : "right"}`}>
      <img 
        className="chat-bubble__left"
        src={isAssistant ? assistantIconURL : message.avatar} // Use assistant GIF if it's from the assistant
        alt="user avatar"
        style={{ width: "35px", height: "35px", borderRadius: isAssistant ? "0%" : "50%" }} // Customize for assistant avatar
      />
      <div className="chat-bubble__content">
        <p className="chat-bubble__name">{message.name}</p>
        <p className="chat-bubble__message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
