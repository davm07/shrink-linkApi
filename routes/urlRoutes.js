import express from 'express';
import {
  getUrlsByUser,
  createShortenedUrl,
  redirectToOriginalUrl,
  deleteUserUrls
} from '../controllers/urlController.js';

const router = express.Router();

router.get('/api/urls/:userId', getUrlsByUser);
router.post('/api/shortenUrl', createShortenedUrl);
router.get('/:shortenedUrl', redirectToOriginalUrl);
router.delete('/api/urlsDelete/:userId', deleteUserUrls);
export default router;
