import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../utils/firebase"; // Firebase utils
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMessages(fetchedMessages.reverse()); // Ensure messages are in correct order
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
    </main>
  );
};

export default ChatBox;
