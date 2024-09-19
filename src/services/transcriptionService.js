// src/services/transcriptionService.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

export const uploadAudio = async (audioBlob) => {
  const fileRef = ref(storage, `audios/${Date.now()}`);
  await uploadBytes(fileRef, audioBlob);
  return getDownloadURL(fileRef);
};

export const sendAudioForTranscription = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', new File([audioBlob], 'audio.m4a', { type: 'audio/m4a' }));
  formData.append('model', 'whisper-large-v3');
  formData.append('response_format', 'json');
  formData.append('temperature', '0');
  formData.append('prompt', 'Specify context or spelling');

  try {
    const response = await fetch('https://api.groq.com/openai/v1/audio/translations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
      },
      body: formData
    });

    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    console.log('result of transecriptions: ',result)
    return result.text;
  } catch (error) {
    console.error('Error during transcription:', error);
    return 'Transcription failed';
  }
};
