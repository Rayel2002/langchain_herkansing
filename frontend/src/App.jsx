import './App.css';
import ChatBot from './components/ChatBot.jsx';

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-text p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to the LLM React App</h1>
      <p className="text-lg text-text-light mb-8 text-center max-w-prose">
        This app is connected to a large language model and ready to go. Ask it anything below.
      </p>
      <ChatBot />
    </div>
  );
}

export default App;