document.getElementById('pw-btn').addEventListener('click', checkPassword);
document.getElementById('lock-btn') && document.getElementById('lock-btn').addEventListener('click', lockContent);

const f1 = document.getElementById('frame1');
const f2 = document.getElementById('frame2');
let tick = 0;
setInterval(function() {
  tick = (tick + 1) % 4;
  const showF2 = tick === 3;
  f1.style.display = showF2 ? 'none' : 'block';
  f2.style.display = showF2 ? 'block' : 'none';
}, 200);

const CORRECT = ['identitycustoms', 'identity', 'mines', 'brrr', 'ohyea', 'game', 'upset', 'marcherarrant', 'aemo', '2buck', 'jon'];

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, '');
}

const VIDEO_SRC = 'https://www.youtube.com/embed/hSTOnDBhfMg?si=oGLog--mmi5OMDAn&autoplay=1';

const input = document.getElementById('pw-input');
const errorMsg = document.getElementById('error-msg');

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkPassword();
  errorMsg.classList.remove('visible');
});

function checkPassword() {
  const val = input.value.trim();
  if (CORRECT.includes(normalize(val))) {
    unlockContent();
  } else {
    errorMsg.classList.add('visible');
    input.value = '';
    input.focus();
    input.style.background = '#ffd6d6';
    setTimeout(function() { input.style.background = ''; }, 600);
  }
}

function unlockContent() {
  document.getElementById('locked-placeholder').style.display = 'none';
  const vc = document.getElementById('video-container');
  vc.classList.add('active');
  document.getElementById('yt-iframe').src = VIDEO_SRC;
  document.getElementById('panel-label').textContent = '\u25A0 Content \u2014 Authorized';
  document.getElementById('panel-label').style.background = '#0a7a3e';
  document.getElementById('clearance-level').textContent = 'Full Access';
  document.getElementById('status-value').textContent = 'Authenticated';

  const pz = document.getElementById('left-panel').querySelector('.password-zone');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '64');
  svg.setAttribute('height', '64');
  svg.setAttribute('viewBox', '0 0 64 64');
  svg.setAttribute('fill', 'none');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '32');
  circle.setAttribute('cy', '32');
  circle.setAttribute('r', '30');
  circle.setAttribute('stroke', '#f0ede6');
  circle.setAttribute('stroke-width', '3');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M18 33l10 10 18-20');
  path.setAttribute('stroke', '#0a7a3e');
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'square');
  svg.appendChild(circle);
  svg.appendChild(path);

  const gateText = document.createElement('div');
  gateText.className = 'gate-text';
  gateText.innerHTML = '<h2>Access<br>Granted</h2><p>Identity verified \u2014 enjoy the content</p>';

  const link = document.createElement('a');
  link.href = 'info.html';
  link.className = 'info-link';
  link.textContent = '\u25BA\u00A0 About Identity Customs';

  pz.innerHTML = '';
  pz.appendChild(svg);
  pz.appendChild(gateText);
  pz.appendChild(link);
}

function lockContent() {
  document.getElementById('yt-iframe').src = '';
  document.getElementById('video-container').classList.remove('active');
  document.getElementById('locked-placeholder').style.display = '';
  document.getElementById('panel-label').textContent = '\u25A0 Content \u2014 Locked';
  document.getElementById('panel-label').style.background = '';
  document.getElementById('clearance-level').textContent = 'None';
  document.getElementById('status-value').textContent = 'Awaiting Auth';
  location.reload();
}
