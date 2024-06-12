import { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (message.trim() !== '' && !sending) {
      setSending(true);
      addMessage();
      try {
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const smessage = await response.text();
        console.log(smessage);
        setMessage('');
        setMessages((prevMessages) => [...prevMessages, ['Server', smessage]]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setSending(false);
      }
    }
  };

  const addMessage = () => {
    setMessages((prevMessages) => [...prevMessages, ['You', message]]);
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 bg-card border-2 border-primary rounded-lg p-6 shadow-custom-dark">
      <div className="h-64 overflow-y-auto bg-background p-4 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <span className="font-bold text-primary">{msg[0]}:</span>
            <p className="text-text-light">{msg[1]}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          id="messageField"
          className="w-full border border-primary rounded-full px-4 py-2 bg-background text-text focus:outline-none focus:ring focus:ring-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          type="text"
          placeholder="Type your message here..."
        />
        <button
          className={`ml-2 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full ${
            sending && 'opacity-50 cursor-not-allowed'
          }`}
          onClick={sendMessage}
          type="button"
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
