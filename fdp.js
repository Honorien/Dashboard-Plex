const axios = require('axios');

const email = 'VOTRE EMAIL PLEX (APP.PLEX.TV)';
const password = 'VOTRE MOT DE PASSE PLEX (APP.PLEX.TV)';

async function getPlexToken() {
  try {
    const res = await axios.post(
      'https://plex.tv/users/sign_in.json',
      {},
      {
        auth: {
          username: email,
          password: password
        },
        headers: {
          'X-Plex-Client-Identifier': 'random-client-id',
          'X-Plex-Product': 'Plex Token Getter',
          'X-Plex-Version': '1.0',
          'X-Plex-Device': 'Node.js',
          'X-Plex-Platform': 'Node.js',
          'X-Plex-Device-Name': 'Token Fetcher'
        }
      }
    );
    console.log('✅ Token trouvé :', res.data.user.authToken);
  } catch (err) {
    console.error('❌ Erreur :', err.response?.data || err.message);
  }
}

getPlexToken();
