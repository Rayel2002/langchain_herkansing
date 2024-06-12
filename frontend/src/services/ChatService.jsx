import { useState } from 'react';
import { requestClient } from './RequestClient';

export function useChatService() {
  const [userInput, setUserInput] = useState('');
  const [fileInput, setFileInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatWithLLM = async () => {
    try {
      setLoading(true);
      const { data } = await requestClient.post('/chat', { userInput }, { timeout: 120000 });
      setResponse(data);
    } catch (error) {
      console.error('Error chatting with LLM:', error);
    } finally {
      setLoading(false);
    }
  };

  const ingestFile = async () => {
    const formData = new FormData();
    formData.append('file', fileInput);

    try {
      setLoading(true);
      const { data } = await requestClient.post('/chat/ingest', formData, { 
        timeout: 120000, 
        headers: { 
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      });
      setResponse(data);
    } catch (error) {
      console.error('Error ingesting file:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    chatWithLLM,
    ingestFile,
    userInput,
    setUserInput,
    fileInput,
    setFileInput,
    response,
    loading
  };
}
