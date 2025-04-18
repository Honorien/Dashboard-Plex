const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const PLEX_URL = process.env.PLEX_URL;
const PLEX_TOKEN = process.env.PLEX_TOKEN;

router.get('/status', async (req, res) => {
  try {
    const response = await axios.get(`${PLEX_URL}/status/sessions?X-Plex-Token=${PLEX_TOKEN}`, {
      headers: { Accept: 'application/xml' }
    });
    res.send(response.data);
  } catch (error) {
    console.error('Erreur de récupération des sessions :', error);
    res.status(500).send('Erreur Plex');
  }
});

router.get('/library', async (req, res) => {
  try {
    const response = await axios.get(`${PLEX_URL}/library/sections?X-Plex-Token=${PLEX_TOKEN}`);
    const libraries = response.data.MediaContainer.Directory;
    const allItems = [];

    for (let lib of libraries) {
      const section = await axios.get(`${PLEX_URL}/library/sections/${lib.key}/all?X-Plex-Token=${PLEX_TOKEN}`);
      const items = section.data.MediaContainer.Metadata || [];
      for (let item of items) {
        allItems.push({
          title: item.title,
          thumb: `${PLEX_URL}${item.thumb}`,
          art: item.art ? `${PLEX_URL}${item.art}` : null
        });
      }
    }

    res.json(allItems);
  } catch (error) {
    console.error('Erreur de récupération de la bibliothèque :', error);
    res.status(500).send('Erreur Plex');
  }
});

module.exports = router;
