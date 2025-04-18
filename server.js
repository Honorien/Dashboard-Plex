const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const plexRoutes = require('./routes/plex');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/plex', plexRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
