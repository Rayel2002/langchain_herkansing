import express from 'express';
import { askGPT } from '../controller/promptcall.js';

const router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.post('/', async (req, res) => {
    if (!req.body.message) {
        res.status(400).send('Message is required');
    } else {
        console.log(req.body.message);
        res.send(await askGPT(req.body.message)).status(200);
    }
});

export { router };