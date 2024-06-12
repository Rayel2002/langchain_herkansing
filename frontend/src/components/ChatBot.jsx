import { useEffect, useState } from 'react';
import { Box, Button, Grid, Input, CircularProgress, Text, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useChatService } from '../services/ChatService.jsx';
import '../../src/App.css';

export default function Chatbot() {
  const {
    chatWithLLM,
    ingestFile,
    userInput,
    setUserInput,
    fileInput,
    setFileInput,
    response,
    loading
  } = useChatService();

  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setError('');
    setUserInput(event.target.value);
  };

  const handleSendUserInput = async (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    try {
      await chatWithLLM();
      setAnswer(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (event) => {
    setFileInput(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (fileInput) {
      try {
        await ingestFile();
        setAnswer('Successfully ingested. Ask me anything.');
      } catch (err) {
        setFileInput(null);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (userInput.trim() === '') {
      setAnswer('');
    }
  }, [userInput]);

  return (
    <Grid container spacing={2} className="grid">
      <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column' }}>
        <Box display="flex">
          <Input
            className="input"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleSendUserInput}
            disabled={loading}
          />
          <IconButton
            aria-label="Send"
            icon={<ArrowForwardIcon />}
            style={{ marginLeft: '5px', marginTop: '5px' }}
            onClick={() => handleSendUserInput({ key: 'Enter' })}
          />
        </Box>

        <Box mt="2rem" display="flex" flexDirection="column" alignItems="center">
          <Input accept=".pdf,.txt,.csv" id="file-input" type="file" onChange={handleFileChange} />
          {fileInput && (
            <Button className="button" onClick={handleFileUpload} mt={2}>
              Upload
            </Button>
          )}
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box>
          {loading && <CircularProgress isIndeterminate color="green.300" />}
          {answer && <Text>{answer}</Text>}
          {error && <Text color="red.500">{error}</Text>}
        </Box>
      </Grid>
    </Grid>
  );
}
