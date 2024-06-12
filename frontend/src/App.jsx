import './App.css';
import Chatbot from '../src/components/ChatBot.jsx';

function App() {
  return (
    <>
      <div>
        <h1>Welcome to the LLM React App</h1>
        <p>This app is connected to a large language model and ready to go. Ask it anything below.</p>
        <Chatbot />
      </div>
    </>
  );
}

export default App;
