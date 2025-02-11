import urlSchema from '../models/urlSchema.js';

export const getUrlsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const urlInfo = await urlSchema.find({ userId });

    if (!urlInfo || urlInfo.length === 0) {
      return res.status(404).send('No URLs found for this user');
    }

    res.status(200).send(urlInfo);
  } catch (err) {
    console.error('Error fetching URLs:', err);
    res.status(500).send('Error fetching URLs');
  }
};

export const createShortenedUrl = async (req, res) => {
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
};

export const redirectToOriginalUrl = async (req, res) => {
  const { shortenedUrl } = req.params;

  try {
    const { originalUrl } = await urlSchema.findOne({ shortenedUrl });

    if (!originalUrl) {
      return res.status(404).send('URL not found');
    }

    res.redirect(originalUrl);
  } catch (err) {
    console.error('Error fetching URL:', err);
    res.status(500).send('Error fetching URL');
  }
};

export const deleteUserUrls = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUrls = await urlSchema.deleteMany({ userId });
    if (!deletedUrls) {
      return res.status(404).send('No URLs found for this user');
    }
    res.status(200).send('URLs deleted successfully');
  } catch (err) {
    console.error('Error deleting URLs:', err);
    res.status(500).send('Error deleting URLs');
  }
};
