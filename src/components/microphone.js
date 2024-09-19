import React, { useState, useEffect, useRef, useReducer } from 'react';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import axios from 'axios';
import ChatBox from './ChatBox';
import SendMessage from './SendMessage';
import { useQueue } from '@uidotdev/usehooks';

function reducer(state, action) {
    switch (action.type) {
        case 'setApiKey':
            console.log('API Key set:', action.payload);
            return { ...state, apiKey: action.payload };
        case 'setConnection':
            console.log('Connection set:', action.payload ? 'Connected' : 'Disconnected');
            return { ...state, connection: action.payload };
        case 'setListening':
            console.log('Listening state changed:', action.payload);
            return { ...state, isListening: action.payload };
        case 'appendCaption':  // Change from 'setCaption' to 'appendCaption'
            console.log('Caption updated:', state.caption + ' ' + action.payload);
            return { ...state, caption: state.caption + ' ' + action.payload };
        case 'clearCaption':  // New action to clear caption
            return { ...state, caption: '' };
        case 'setError':
            console.log('Error:', action.payload);
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

const Microphone = () => {
    const { add, remove, first } = useQueue();
    const [state, dispatch] = useReducer(reducer, {
        apiKey: '',
        connection: null,
        isListening: false,
        caption: '',
        error: null
    });
    const recorderRef = useRef(null);
    const streamRef = useRef(null);

    const initializeDeepgram = async () => {
        try {
            console.log('Fetching API key...');
            const response = await axios.get('http://localhost:5050/api/deepgram-key');
            dispatch({ type: 'setApiKey', payload: response.data.apiKey });

            console.log('Initializing Deepgram client...');
            const dgClient = createClient(response.data.apiKey);
            const dgConnection = dgClient.listen.live({ model: "nova", punctuate: true });
            dispatch({ type: 'setConnection', payload: dgConnection });


            // Modify the transcript event handler to append instead of setting
            dgConnection.on(LiveTranscriptionEvents.Transcript, (data) => {
                const newTranscript = data.channel.alternatives[0]?.transcript || '';
                dispatch({ type: 'appendCaption', payload: newTranscript });
            });


            dgConnection.on(LiveTranscriptionEvents.Close, () => {
                console.log('Deepgram connection closed');
            });
        } catch (err) {
            console.error('Error during initialization:', err);
            dispatch({ type: 'setError', payload: 'Error fetching API key: ' + err.message });
        }
    };

    useEffect(() => {
        console.log('Component mounted, initializing...');
        initializeDeepgram();
        return () => {
            console.log('Component unmounting, closing connection...');
            state.connection?.close();
        };
    }, []);

    const startRecording = async () => {
        if (state.isListening) {
            console.log('Attempt to start recording aborted: already listening.');
            return;
        }
        try {
            console.log('Starting recording...');
            if (!streamRef.current) {
                streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log('Microphone access granted');
            }
            const recorder = new MediaRecorder(streamRef.current);
            recorder.ondataavailable = event => {
                console.log('Audio data available:', event.data.size);
                add(event.data);
            };
            recorder.start(1000);
            recorderRef.current = recorder;
            dispatch({ type: 'setListening', payload: true });
        } catch (err) {
            console.error('Failed to start recording:', err);
            dispatch({ type: 'setError', payload: 'Failed to access microphone: ' + err.message });
        }
    };

    const stopRecording = () => {
        if (recorderRef.current && recorderRef.current.state === 'recording') {
            console.log('Stopping recording...');
            recorderRef.current.stop();
            dispatch({ type: 'setListening', payload: false });
        }
    };

    useEffect(() => {
        const processData = async () => {
            if (!state.connection || !first) {
                console.log('No connection or no audio data to send');
                return;
            }
            console.log('Sending audio data to Deepgram...');
            state.connection.send(first);
            remove();
        };
        processData();
    }, [first, state.connection]);

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    const handleSend = () => {
        console.log("Message sent");
        dispatch({ type: 'clearCaption' });  // Clear the caption after sending
    };

    return (
        <div className="microphone-container">
            <ChatBox caption={state.caption} />
            <SendMessage
                initialMessage={state.caption}
                isListening={state.isListening}
                startRecording={startRecording}
                stopRecording={stopRecording}
                onSend={handleSend}
            />

        </div>
    );
};

export default Microphone;
