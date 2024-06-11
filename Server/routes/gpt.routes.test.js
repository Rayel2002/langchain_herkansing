import request from 'supertest';
import express from 'express';
import chatLLMRouter from './gpt.routes';

const app = express();
app.use(express.json());
app.use('/api', chatLLMRouter);

describe('POST /api/chat', () => {
  test('should return 400 if message is missing', async () => {
    const response = await request(app).post('/api/chat').send({});
    expect(response.status).toBe(400);
    expect(response.text).toBe('Message is required');
  });

  test('should return 200 and response from askGPT if message is provided', async () => {
    const message = 'Hello, world!';
    const response = await request(app).post('/api/chat').send({ message });
    expect(response.status).toBe(200);
    // Add more assertions here to validate the response from askGPT
  });
});