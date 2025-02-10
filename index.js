import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
import urlSchema from './models/urlSchema.js';
import cors from 'cors';

dotenv.config();
const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/urls/:userId', async (req, res) => {
  const { userId } = req.params;

  const urlInfo = await urlSchema.find({ userId });
  res.send(urlInfo);
});

app.post('/api/shortenUrl', async (req, res) => {
  const { originalUrl, userId } = req.body;

  try {
    const shortenedUrl = await urlSchema.create({
      originalUrl: originalUrl,
      userId: userId
    });
    res.status(201).send(shortenedUrl);
  } catch (err) {
    console.error('Error creating URL:', err);
    res.status(500).send('Error creating URL');
  }
});
