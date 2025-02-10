import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
import urlSchema from './models/urlSchema.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 7000;

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
