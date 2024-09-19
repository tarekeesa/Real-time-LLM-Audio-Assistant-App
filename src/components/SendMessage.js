import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { answerQuestionsWithLargeLLM, identifyQuestionsWithSmallLLM, filterIrrelevantQuestions } from '../services/questionAnswerService';  // Import filtering function
import { loadDocumentText } from '../utils/loadDocument';  // Import the helper function

const SendMessage = ({ initialMessage, isRecording, startRecording, stopRecording, onSend }) => {
    const [message, setMessage] = useState(initialMessage || '');
    // eslint-disable-next-line no-unused-vars
    const [lastMessages, setLastMessages] = useState([]); // Store last 20 messages

    useEffect(() => {
        setMessage(initialMessage);
    }, [initialMessage]);

    const fetchLastMessages = async () => {
        try {
            // Fetch the last 20 messages from Firebase
            const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(20));
            const querySnapshot = await getDocs(messagesQuery);

            // Extract the message text and reverse the order so the newest message is at the end
            const messages = querySnapshot.docs.map(doc => doc.data().text).reverse();
            setLastMessages(messages);
            return messages;
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Prevent sending empty messages
    
        // Add user's message to the database
        await addDoc(collection(db, "messages"), {
            text: message,
            createdAt: serverTimestamp(),
            uid: "user"
        });
    
        // Clear input after sending message
        setMessage('');
    
        // Call the parent function to clear the `caption` in `Microphone`
        if (typeof onSend === 'function') {
            onSend();  // This ensures the caption in Microphone is cleared
        }
    
        // Fetch last 20 messages to filter relevant historical questions
        const lastMessagesPromise = fetchLastMessages();
    
        // Extract the new question from the user's message
        const extractedQuestions = await identifyQuestionsWithSmallLLM(message);
    
        if (extractedQuestions !== "No questions identified.") {
            const currentQuestions = extractedQuestions.split('\n');
            // Load the company document from the public folder
            const documentPath = process.env.PUBLIC_URL + "/EduTech_LMS_Document.docx";  // Path to the document in public folder
            const documentText = await loadDocumentText(documentPath);
            // console.log('documents',documentText)
            // Get last messages and pass them to the filtering LLM once they are fetched
            const lastMessages = await lastMessagesPromise;
    
            // Filter the historical questions based on their relevance to the document
            const relevantPastQuestions = await filterIrrelevantQuestions(lastMessages, documentText);
    
            if (relevantPastQuestions.length > 0) {
                // Use the relevant past questions and the document as context for the LLM answer
                const answers = await answerQuestionsWithLargeLLM(currentQuestions.join("\n"), relevantPastQuestions, documentText);
    
                // Add assistant's answers to the database
                await addDoc(collection(db, "messages"), {
                    text: answers,
                    createdAt: serverTimestamp(),
                    uid: "assistant"
                });
            } else {
                console.log("No relevant historical questions to include.");
            }
        }
    };
    

    return (
        <form onSubmit={sendMessage} className="send-message" style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={isRecording} // Disable input during recording
                style={{ flexGrow: 1, marginRight: '10px' }} // Added marginRight for spacing
            />
            <button onClick={startRecording} disabled={isRecording} type="button">Start</button>
            <button onClick={stopRecording} disabled={!isRecording} type="button">Stop</button>
            <button type="submit" disabled={isRecording || !message.trim()}>Send</button>
        </form>
    );
};

export default SendMessage;
