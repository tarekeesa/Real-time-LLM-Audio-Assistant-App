# 🗣️ Real-time LLM Audio Assistant App

A **ReactJS**-based real-time audio assistant app integrated with **Firebase**, **Groq**, and **Deepgram**. This project allows users to capture and transcribe audio in real-time, making use of cutting-edge audio processing technologies.

---

## 🚀 Features

- 🔒 **User Authentication**: Managed via Firebase Authentication.
- 🎤 **Real-time Audio Processing**: Capture, process, and transcribe spoken input using Groq and Deepgram APIs.
- ☁️ **Firebase Integration**: Store and manage user data using Firebase’s real-time database and cloud services.
- 🎨 **Clean UI**: Simple, intuitive interface for an easy user experience.

---

## 🛠️ Technologies Used

- **Frontend**: ReactJS, HTML5, CSS3
- **Backend**: Firebase (Authentication, Real-time Database, Cloud Storage), expressJs for fetching APIkeys
- **APIs**: Groq API, Deepgram API
- **Hosting**: Firebase Hosting

---

## 📁 Environment Variables

To run this project, create a `.env.local` file in the root directory and include the following environment variables:

```plaintext
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_DATABASE_URL=your_firebase_database_url
REACT_APP_PROJECT_ID=your_firebase_project_id
REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_APP_ID=your_firebase_app_id
REACT_APP_GROQ_API_KEY=your_groq_api_key
REACT_APP_DEEPGRAM_API_KEY=your_deepgram_api_key
```

# 📦 Installation

## 1️⃣ Prerequisites
Ensure you have Node.js installed on your system. Follow the instructions below to install Node.js for your respective operating system.

### Windows
- **Download** Node.js from the [official Node.js website](https://nodejs.org/).
- **Install** it by running the installer.
- **Verify** the installation:
  ```bash
  node -v
  npm -v

Here's the rewritten version for the `README.md` file formatted for clarity and easier reading:

```markdown
# 📦 Installation

## 1️⃣ Prerequisites
Ensure you have Node.js installed on your system. Follow the instructions below to install Node.js for your respective operating system.

### Windows
- **Download** Node.js from the [official Node.js website](https://nodejs.org/).
- **Install** it by running the installer.
- **Verify** the installation:
  ```bash
  node -v
  npm -v
  ```

### MacOS
- **Install Homebrew** if you haven't already:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- **Install Node.js** using Homebrew:
  ```bash
  brew install node
  ```
- **Verify** the installation:
  ```bash
  node -v
  npm -v
  ```

### Linux (Ubuntu/Debian)
- **Update** the package index:
  ```bash
  sudo apt update
  ```
- **Install Node.js**:
  ```bash
  sudo apt install nodejs npm
  ```
- **Verify** the installation:
  ```bash
  node -v
  npm -v
  ```

## 2️⃣ Clone the Repository
Clone the repository and navigate into the project directory:
```bash
git clone https://github.com/your-username/realtime-audio-assistant.git
cd realtime-audio-assistant
```

## 3️⃣ Install Dependencies
Use npm to install all project dependencies:
```bash
npm install
```

## 4️⃣ Set Up Environment Variables
Create a `.env` file in the project root and include the environment variables as specified.

## 5️⃣ Run the App
Start the app in development mode using:
```bash
npm start
```
This will open the app in your default web browser at `http://localhost:3000`.

# 🏗️ Building for Production
To build the app for production:
```bash
npm run build
```
This will create an optimized production build in the `build` folder, which is ready for deployment.

# 📂 Project Structure
Below is a high-level overview of the project structure:

```
├── node_modules              # Node.js packages (not tracked by Git)
├── public                    # Static files for the frontend
├── server                    # Server-side code
│   ├── node_modules          # Server-specific Node.js packages (not tracked by Git)
│   ├── .env                  # Environment variables for the server
│   ├── package-lock.json     # Server package versions (ensure consistent installs)
│   ├── package.json          # Server dependencies and scripts
│   └── server.js             # Main server application file
├── src                       # Source files for the React application
│   ├── components            # React components
│   │   ├── ChatBox.js        # Chat box component
│   │   ├── Message.js        # Individual message component
│   │   ├── Microphone.js     # Microphone component for audio input
│   │   ├── NavBar.js         # Navigation bar component
│   │   └── SendMessage.js    # Send message component
│   ├── services              # Services for backend communication
│   │   ├── questionAnswerService.js  # Service for Q&A functionality
│   │   └── transcriptionService.js   # Audio transcription service
│   ├── utils                 # Utility files
│   │   ├── firebase.js       # Firebase configuration
│   │   └── loadDocument.js   # Document loading utilities
│   ├── App.css               # Global CSS styles for the frontend
│   ├── App.js                # Main React application file
│   ├── index.js              # Entry point for the React application
│   └── webpack.config.js     # Configuration for Webpack
├── .env.local                # Local environment variables for the frontend
├── .env.sample               # Sample environment file
├── .gitignore                # Specifies intentionally untracked files to ignore
├── cors.json                 # CORS configuration
├── LICENSE.md                # License information
├── package-lock.json         # Frontend package versions
├── package.json              # Frontend dependencies and scripts
└── README.md                 # Detailed project documentation
```

# 📄 Key Components
- `App.js`: Main entry point for the app. It handles user authentication and conditionally renders components.
- `NavBar.js`: Contains the navigation bar logic and UI.
- `Welcome.js`: Displays a welcome message and sign-in option for unauthenticated users.
- `Microphone.js`: Central component for real-time audio capture and processing.

# 🔗 Firebase Configuration
To configure Firebase services like Authentication and Database:
- Go to the Firebase Console.
- Create a new project or use an existing one.
- Add Firebase to your web app and obtain the necessary credentials.
- Update your `.env` file with the Firebase keys.

# 🎙️ Groq & Deepgram APIs
Ensure you have API keys for both Groq and Deepgram, as these handle the audio processing and transcription:
- [Groq](https://groq.com)
- [Deepgram](https://deepgram.com)

# 📝 License
This project is licensed under the MIT License. See the LICENSE file for more details.

# 🛠️ Contributing
Contributions are always welcome! Please feel free to submit a pull request or open an issue for any improvements or suggestions.

# ⭐ Show Your Support
If you found this project helpful, give it a ⭐ on GitHub!
```