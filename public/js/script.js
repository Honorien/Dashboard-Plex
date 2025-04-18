async function fetchSessions() {
  const res = await fetch('/api/plex/status');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");
  const videos = xml.getElementsByTagName('Video');
  const container = document.getElementById('sessions');
  container.innerHTML = '';

  if (videos.length === 0) {
    container.innerHTML = '<p>Aucune lecture en cours.</p>';
    return;
  }

  for (let video of videos) {
    const title = video.getAttribute('title');
    const thumb = video.getAttribute('thumb');
    const user = video.getElementsByTagName('User')[0]?.getAttribute('title') || 'Inconnu';
    const player = video.getElementsByTagName('Player')[0]?.getAttribute('title') || 'Appareil inconnu';

    const card = document.createElement('div');
    card.className = 'col-md-3 mb-3';
    card.innerHTML = `
      <div class="card">
        <img src="${thumb}?X-Plex-Token=${getToken()}" class="card-img-top" alt="cover">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">Utilisateur: ${user}</p>
          <p class="card-text">Appareil: ${player}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
}

async function fetchLibrary() {
  const res = await fetch('/api/plex/library');
  const items = await res.json();
  const container = document.getElementById('library');
  container.innerHTML = '';

  for (let item of items) {
    const title = item.title;
    const thumb = item.thumb || item.art;

    const card = document.createElement('div');
    card.className = 'col-md-2 mb-3';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${thumb}?X-Plex-Token=${getToken()}" class="card-img-top" alt="cover">
        <div class="card-body">
          <p class="card-text text-center">${title}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
}

function getToken() {
 
  return 'VOTRE TOKEN PLEX';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('a[href="#visionnage"]').addEventListener('click', fetchSessions);
  document.querySelector('a[href="#bibliotheque"]').addEventListener('click', fetchLibrary);
});
