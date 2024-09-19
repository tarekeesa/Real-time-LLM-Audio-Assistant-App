import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import './App.css';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import Microphone from './components/microphone';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <Microphone />}
    </div>
  );
}

export default App;
