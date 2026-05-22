'use strict';

/* ═══════════════════════════════════════════════════════════════
   SEGUE & JOGA! — jogo.js
   Children's motor-recovery game using MediaPipe Hands
═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   SVG CHARACTERS
────────────────────────────────────────────────────────────── */
const CHARS = {

  dolphin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 110" width="200" height="100">
  <!-- Golfinho cinzento com contorno escuro — contraste máximo sobre fundo azul -->
  <defs>
    <linearGradient id="dBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D0E8F0"/>
      <stop offset="50%" stop-color="#90B8CC"/>
      <stop offset="100%" stop-color="#6090A8"/>
    </linearGradient>
  </defs>

  <!-- Cauda — animada por .dolphin-tail -->
  <g class="dolphin-tail" transform-origin="42 55">
    <path d="M42,55 C28,46 6,32 2,18 C14,22 26,34 36,44 C30,30 26,12 33,4 C43,16 46,36 42,55Z"
          fill="url(#dBody)" stroke="#2A4A5A" stroke-width="2"/>
    <path d="M42,55 C28,64 6,78 2,92 C14,88 26,76 36,66 C30,80 26,98 33,106 C43,94 46,74 42,55Z"
          fill="url(#dBody)" stroke="#2A4A5A" stroke-width="2"/>
  </g>

  <!-- Corpo principal -->
  <ellipse cx="120" cy="56" rx="84" ry="30" fill="url(#dBody)" stroke="#2A4A5A" stroke-width="2.5"/>

  <!-- Barriga branca bem visível -->
  <ellipse cx="132" cy="68" rx="64" ry="16" fill="white" opacity="0.92"/>

  <!-- Barbatana dorsal -->
  <path d="M106,28 C116,6 134,2 140,14 C135,19 124,25 112,28Z"
        fill="#7AAABB" stroke="#2A4A5A" stroke-width="2"/>

  <!-- Barbatana peitoral -->
  <path d="M106,70 C120,86 136,90 138,82 C128,76 116,71 110,65Z"
        fill="#7AAABB" stroke="#2A4A5A" stroke-width="1.5"/>

  <!-- Rostro/focinho -->
  <path d="M202,51 C215,52 220,56 218,61 C215,65 208,63 196,63 L188,57Z"
        fill="url(#dBody)" stroke="#2A4A5A" stroke-width="2"/>

  <!-- Sorriso -->
  <path d="M196,62 C203,66 210,66 216,64" fill="none" stroke="#2A4A5A" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Espiraculoo -->
  <ellipse cx="166" cy="30" rx="6" ry="4" fill="#5A8898" stroke="#2A4A5A" stroke-width="1.5"/>

  <!-- Olho — grande e bem visível -->
  <circle cx="184" cy="48" r="8" fill="#1A2A30" stroke="#2A4A5A" stroke-width="1.5"/>
  <circle cx="182" cy="46" r="3" fill="white"/>

  <!-- Linha do dorso (contraste) -->
  <path d="M50,38 C90,28 148,26 188,38" fill="none" stroke="#2A4A5A" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
</svg>`,

  butterfly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120">
  <!-- Borboleta Monarca — laranja/preto, muito reconhecível -->

  <!-- Asas esquerdas -->
  <g class="wing-l" transform-origin="78 62">
    <!-- Asa superior esquerda - laranja com borda preta -->
    <path d="M78,60 C70,36 50,12 22,16 C10,24 12,50 28,60 C46,70 66,64 78,60Z" fill="#E87818"/>
    <path d="M78,60 C72,40 56,20 28,18" fill="none" stroke="#100800" stroke-width="10" stroke-linecap="round" opacity="0.9"/>
    <path d="M78,60 C70,44 52,26 30,22" fill="none" stroke="#100800" stroke-width="1.5" opacity="0.5"/>
    <path d="M78,60 C72,50 58,36 36,30" fill="none" stroke="#100800" stroke-width="1" opacity="0.4"/>
    <!-- Pontos brancos na borda preta -->
    <circle cx="16" cy="22" r="3.5" fill="white"/>
    <circle cx="10" cy="34" r="3" fill="white"/>
    <circle cx="10" cy="46" r="3" fill="white"/>
    <circle cx="18" cy="57" r="2.5" fill="white"/>
    <circle cx="30" cy="62" r="2" fill="white"/>

    <!-- Asa inferior esquerda - laranja/preta -->
    <path d="M78,64 C66,80 46,96 26,98 C12,94 8,78 20,68 C34,60 58,64 78,64Z" fill="#E87818"/>
    <path d="M78,64 C68,82 50,94 26,96" fill="none" stroke="#100800" stroke-width="9" stroke-linecap="round" opacity="0.9"/>
    <!-- Pontos brancos borda inferior -->
    <circle cx="22" cy="86" r="3" fill="white"/>
    <circle cx="12" cy="76" r="2.5" fill="white"/>
    <circle cx="14" cy="64" r="2" fill="white"/>
    <!-- Linha preta interna -->
    <path d="M26,66 C36,68 56,68 72,66" fill="none" stroke="#100800" stroke-width="1.5" opacity="0.5"/>
  </g>

  <!-- Asas direitas -->
  <g class="wing-r" transform-origin="82 62">
    <!-- Asa superior direita -->
    <path d="M82,60 C90,36 110,12 138,16 C150,24 148,50 132,60 C114,70 94,64 82,60Z" fill="#E87818"/>
    <path d="M82,60 C88,40 104,20 132,18" fill="none" stroke="#100800" stroke-width="10" stroke-linecap="round" opacity="0.9"/>
    <path d="M82,60 C90,44 108,26 130,22" fill="none" stroke="#100800" stroke-width="1.5" opacity="0.5"/>
    <path d="M82,60 C88,50 102,36 124,30" fill="none" stroke="#100800" stroke-width="1" opacity="0.4"/>
    <!-- Pontos brancos -->
    <circle cx="144" cy="22" r="3.5" fill="white"/>
    <circle cx="150" cy="34" r="3" fill="white"/>
    <circle cx="150" cy="46" r="3" fill="white"/>
    <circle cx="142" cy="57" r="2.5" fill="white"/>
    <circle cx="130" cy="62" r="2" fill="white"/>

    <!-- Asa inferior direita -->
    <path d="M82,64 C94,80 114,96 134,98 C148,94 152,78 140,68 C126,60 102,64 82,64Z" fill="#E87818"/>
    <path d="M82,64 C92,82 110,94 134,96" fill="none" stroke="#100800" stroke-width="9" stroke-linecap="round" opacity="0.9"/>
    <circle cx="138" cy="86" r="3" fill="white"/>
    <circle cx="148" cy="76" r="2.5" fill="white"/>
    <circle cx="146" cy="64" r="2" fill="white"/>
    <path d="M134,66 C124,68 104,68 88,66" fill="none" stroke="#100800" stroke-width="1.5" opacity="0.5"/>
  </g>

  <!-- Corpo -->
  <ellipse cx="80" cy="64" rx="5.5" ry="26" fill="#100800"/>
  <!-- Segmentos do corpo -->
  <ellipse cx="80" cy="58" rx="4" ry="4" fill="#1A1000"/>
  <ellipse cx="80" cy="68" rx="4.5" ry="4" fill="#1A1000"/>
  <ellipse cx="80" cy="78" rx="4" ry="4" fill="#1A1000"/>

  <!-- Cabeça -->
  <circle cx="80" cy="38" r="8" fill="#100800"/>
  <!-- Olhos -->
  <circle cx="76" cy="36" r="3" fill="#E87818"/>
  <circle cx="76" cy="36" r="1.5" fill="#100800"/>
  <circle cx="75.5" cy="35.5" r="0.7" fill="white"/>
  <circle cx="84" cy="36" r="3" fill="#E87818"/>
  <circle cx="84" cy="36" r="1.5" fill="#100800"/>
  <circle cx="83.5" cy="35.5" r="0.7" fill="white"/>

  <!-- Antenas -->
  <path d="M77,31 C72,22 66,16 60,12" fill="none" stroke="#100800" stroke-width="2" stroke-linecap="round"/>
  <circle cx="60" cy="12" r="4" fill="#E87818" stroke="#100800" stroke-width="1"/>
  <path d="M83,31 C88,22 94,16 100,12" fill="none" stroke="#100800" stroke-width="2" stroke-linecap="round"/>
  <circle cx="100" cy="12" r="4" fill="#E87818" stroke="#100800" stroke-width="1"/>
</svg>`,

  rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 180" width="70" height="140">
  <defs>
    <linearGradient id="rBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C8D8E8"/>
      <stop offset="30%" stop-color="#F0F4F8"/>
      <stop offset="70%" stop-color="#F0F4F8"/>
      <stop offset="100%" stop-color="#A0B4C8"/>
    </linearGradient>
    <linearGradient id="rNose" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C0302A"/>
      <stop offset="40%" stop-color="#E84040"/>
      <stop offset="100%" stop-color="#961818"/>
    </linearGradient>
    <linearGradient id="rFlame" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE040"/>
      <stop offset="40%" stop-color="#FF8020"/>
      <stop offset="100%" stop-color="#FF2000" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="rWindow" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#C8EEFF"/>
      <stop offset="70%" stop-color="#5AADDF"/>
      <stop offset="100%" stop-color="#2468A0"/>
    </radialGradient>
  </defs>

  <!-- Rocket body group — shake animation -->
  <g class="rocket-body">
    <!-- Main cylinder body -->
    <rect x="22" y="45" width="46" height="90" rx="8" fill="url(#rBody)" stroke="#8AA0B8" stroke-width="0.8"/>

    <!-- Nose cone -->
    <path d="M22,45 C22,20 38,4 45,2 C52,4 68,20 68,45Z"
          fill="url(#rNose)" stroke="#7A1818" stroke-width="0.8"/>
    <!-- Nose highlight -->
    <path d="M32,40 C35,25 40,12 45,8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>

    <!-- Blue stripe band -->
    <rect x="22" y="90" width="46" height="14" rx="2" fill="#2468D0" stroke="#1448A8" stroke-width="0.5"/>
    <!-- Stars on band -->
    <text x="35" y="101" font-size="8" fill="white" opacity="0.8">★ ★</text>

    <!-- Porthole window -->
    <circle cx="45" cy="68" r="14" fill="#2468A0" stroke="#1448A8" stroke-width="1.5"/>
    <circle cx="45" cy="68" r="11" fill="url(#rWindow)"/>
    <!-- Astronaut helmet suggestion -->
    <ellipse cx="45" cy="68" rx="7" ry="8" fill="#E0F0FF" opacity="0.7"/>
    <ellipse cx="45" cy="66" rx="4" ry="4" fill="#AADDFF" opacity="0.8"/>
    <circle cx="42" cy="65" r="1.5" fill="white" opacity="0.6"/>

    <!-- Large lower fins -->
    <path d="M22,118 C8,122 4,138 8,148 L22,140Z"
          fill="#E03030" stroke="#A01818" stroke-width="0.8"/>
    <path d="M68,118 C82,122 86,138 82,148 L68,140Z"
          fill="#E03030" stroke="#A01818" stroke-width="0.8"/>

    <!-- Small upper fins -->
    <path d="M22,68 C12,65 10,58 14,54 L22,62Z"
          fill="#C02020" stroke="#A01818" stroke-width="0.8"/>
    <path d="M68,68 C78,65 80,58 76,54 L68,62Z"
          fill="#C02020" stroke="#A01818" stroke-width="0.8"/>

    <!-- Engine nozzle -->
    <path d="M30,135 L28,148 L32,145 L35,152 L39,147 L45,154 L51,147 L55,152 L58,145 L62,148 L60,135Z"
          fill="#8090A0" stroke="#506070" stroke-width="0.5"/>

    <!-- Body highlight -->
    <rect x="30" y="50" width="8" height="75" rx="4" fill="white" opacity="0.2"/>
  </g>

  <!-- Flame — animated by CSS .rocket-flame (attached below nozzle) -->
  <g class="rocket-flame">
    <path d="M32,148 C30,162 36,175 45,178 C54,175 60,162 58,148 C52,155 48,158 45,156 C42,158 38,155 32,148Z"
          fill="url(#rFlame)" opacity="0.92"/>
    <path d="M37,150 C36,160 40,170 45,172 C50,170 54,160 53,150 C50,156 47,158 45,157 C43,158 40,156 37,150Z"
          fill="#FFEF80" opacity="0.7"/>
    <!-- Inner hot core -->
    <ellipse cx="45" cy="155" rx="4" ry="6" fill="white" opacity="0.5"/>
  </g>
</svg>`,

  macaw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" width="180" height="126">
  <!-- Arara — perfil claro: vermelho/azul/verde, bico curvo inconfundível -->

  <!-- Cauda longa -->
  <path d="M48,88 C36,102 24,118 16,136 C24,132 32,122 40,112 C38,122 40,132 44,130 C50,120 50,104 48,88Z" fill="#2060D0"/>
  <path d="M56,90 C50,106 46,124 46,140 C52,136 58,126 60,118 C62,128 64,136 68,134 C70,122 68,106 56,90Z" fill="#18A050"/>
  <path d="M64,92 C62,108 62,126 64,140 C70,136 74,126 76,118 C78,128 82,134 86,132 C86,118 80,104 64,92Z" fill="#2060D0"/>

  <!-- Asa esquerda (vermelho) — bird-wing-l -->
  <g class="bird-wing-l" transform-origin="80 72">
    <path d="M80,72 C64,54 40,34 14,30 C4,38 8,60 24,70 C42,80 64,76 80,72Z" fill="#D01818" stroke="#800808" stroke-width="1"/>
    <path d="M80,72 C66,56 46,40 20,34" fill="none" stroke="#F0C010" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
    <path d="M68,60 C54,48 36,38 18,36" fill="none" stroke="#B01010" stroke-width="1.5" opacity="0.45"/>
    <path d="M74,66 C60,56 42,44 22,40" fill="none" stroke="#B01010" stroke-width="1" opacity="0.35"/>
  </g>

  <!-- Asa direita (azul) — bird-wing-r -->
  <g class="bird-wing-r" transform-origin="100 72">
    <path d="M100,72 C116,54 140,34 166,30 C176,38 172,60 156,70 C138,80 116,76 100,72Z" fill="#1A50C8" stroke="#081880" stroke-width="1"/>
    <path d="M100,72 C114,56 134,40 160,34" fill="none" stroke="#F0C010" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
    <path d="M112,60 C126,48 144,38 162,36" fill="none" stroke="#0828A0" stroke-width="1.5" opacity="0.45"/>
    <path d="M106,66 C120,56 138,44 158,40" fill="none" stroke="#0828A0" stroke-width="1" opacity="0.35"/>
  </g>

  <!-- Corpo -->
  <ellipse cx="90" cy="82" rx="32" ry="26" fill="#D01818" stroke="#900808" stroke-width="1"/>
  <!-- Peito mais claro -->
  <ellipse cx="96" cy="90" rx="20" ry="18" fill="#E83030" opacity="0.6"/>

  <!-- Pescoço -->
  <ellipse cx="106" cy="64" rx="16" ry="13" fill="#C81818" stroke="#900808" stroke-width="0.8"/>

  <!-- Cabeça grande e arredondada -->
  <circle cx="124" cy="52" r="24" fill="#C81818" stroke="#900808" stroke-width="1"/>

  <!-- Mancha branca da face (característica da arara) -->
  <ellipse cx="134" cy="55" rx="13" ry="12" fill="#F8F0E0" stroke="#D0C8A8" stroke-width="0.8"/>
  <!-- Riscas da face -->
  <path d="M124,51 C130,48 136,47 142,49" fill="none" stroke="#806030" stroke-width="1.2"/>
  <path d="M124,55 C130,52 136,51 142,53" fill="none" stroke="#806030" stroke-width="1.2"/>
  <path d="M125,59 C131,56 136,55 141,57" fill="none" stroke="#806030" stroke-width="1.2"/>

  <!-- Bico superior curvado (característica mais marcante) -->
  <path d="M138,50 C152,47 162,53 160,61 C152,65 140,60 138,50Z" fill="#C89010" stroke="#806000" stroke-width="1"/>
  <!-- Gancho do bico -->
  <path d="M158,58 C166,62 168,68 162,72 C157,68 155,62 158,58Z" fill="#A07010" stroke="#604000" stroke-width="0.8"/>
  <!-- Bico inferior -->
  <path d="M140,60 C150,63 158,66 156,72 C148,76 138,70 138,60Z" fill="#A07010" stroke="#604000" stroke-width="0.8"/>

  <!-- Anel amarelo do olho -->
  <circle cx="126" cy="46" r="9" fill="#F0C010" stroke="#C09000" stroke-width="0.8"/>
  <!-- Olho -->
  <circle cx="126" cy="46" r="6.5" fill="#1A0800"/>
  <!-- Brilho olho -->
  <circle cx="124" cy="44" r="2.2" fill="white" opacity="0.85"/>

  <!-- Penas da crista -->
  <path d="M112,34 C114,20 120,12 122,10 C124,13 122,22 118,30" fill="#D82020" stroke="#900808" stroke-width="1"/>
  <path d="M118,32 C122,18 128,12 130,10 C131,13 130,22 126,28" fill="#D82020" stroke="#900808" stroke-width="1"/>
  <path d="M124,30 C128,16 134,10 136,8 C137,11 135,20 131,26" fill="#1A50C8" stroke="#082880" stroke-width="1"/>
</svg>`
};

/* ──────────────────────────────────────────────────────────────
   SCENE DEFINITIONS
────────────────────────────────────────────────────────────── */
const SCENES = [
  {
    id: 'ocean',
    name: 'Oceano',
    emoji: '🐬',
    charKey: 'dolphin',
    bgTop: '#0A2A6E',
    bgBottom: '#051840',
    accentColor: '#3AB8F0',
    waypoints: [
      [0.15, 0.55], [0.25, 0.35], [0.38, 0.60], [0.50, 0.30],
      [0.62, 0.55], [0.72, 0.25], [0.82, 0.50], [0.88, 0.35]
    ]
  },
  {
    id: 'garden',
    name: 'Jardim',
    emoji: '🦋',
    charKey: 'butterfly',
    bgTop: '#87CEEB',
    bgBottom: '#A8E890',
    accentColor: '#FFD700',
    waypoints: [
      [0.12, 0.60], [0.22, 0.30], [0.35, 0.55], [0.48, 0.25],
      [0.58, 0.60], [0.68, 0.30], [0.78, 0.55], [0.88, 0.28]
    ]
  },
  {
    id: 'space',
    name: 'Espaço',
    emoji: '🚀',
    charKey: 'rocket',
    bgTop: '#04040E',
    bgBottom: '#0A0A24',
    accentColor: '#FF8040',
    waypoints: [
      [0.50, 0.80], [0.35, 0.65], [0.60, 0.50], [0.25, 0.38],
      [0.70, 0.28], [0.40, 0.20], [0.65, 0.15], [0.50, 0.10]
    ]
  },
  {
    id: 'sky',
    name: 'Céu',
    emoji: '🦜',
    charKey: 'macaw',
    bgTop: '#4CA8E8',
    bgBottom: '#A8D8F8',
    accentColor: '#FFE040',
    waypoints: [
      [0.12, 0.45], [0.25, 0.25], [0.38, 0.50], [0.52, 0.20],
      [0.62, 0.45], [0.72, 0.22], [0.82, 0.40], [0.90, 0.18]
    ]
  }
];

/* ──────────────────────────────────────────────────────────────
   ENCOURAGEMENT MESSAGES
────────────────────────────────────────────────────────────── */
const MSGS = [
  'Muito bem! 🌟', 'Fantástico!', 'Incrível! ⭐', 'Continua assim!',
  'Boa! 🎉', 'Excelente!', 'Parabéns! 🏆', 'Estás a arrasar!'
];

/* ──────────────────────────────────────────────────────────────
   WEB AUDIO SOUND ENGINE
────────────────────────────────────────────────────────────── */
const Sound = (() => {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, type, duration, gain, delay = 0) {
    const c = getCtx();
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.connect(g);
    g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + delay);
    g.gain.setValueAtTime(0, c.currentTime + delay);
    g.gain.linearRampToValueAtTime(gain, c.currentTime + delay + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + duration);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration + 0.05);
  }

  function noise(duration, gain, delay = 0, bandFreq = 800) {
    const c = getCtx();
    const buf = c.createBuffer(1, c.sampleRate * duration, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = bandFreq;
    filter.Q.value = 2;
    const g = c.createGain();
    src.connect(filter);
    filter.connect(g);
    g.connect(c.destination);
    g.gain.setValueAtTime(0, c.currentTime + delay);
    g.gain.linearRampToValueAtTime(gain, c.currentTime + delay + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + duration);
    src.start(c.currentTime + delay);
    src.stop(c.currentTime + delay + duration + 0.05);
  }

  const scenes = {
    ocean: () => {
      // Dolphin click train
      for (let i = 0; i < 5; i++) {
        tone(2200 + i * 300, 'sine', 0.06, 0.12, i * 0.08);
      }
      tone(800, 'sine', 0.3, 0.08, 0.2);
    },
    garden: () => {
      // Flutter + cheerful notes
      noise(0.15, 0.06, 0, 1200);
      tone(880, 'sine', 0.15, 0.1, 0.05);
      tone(1100, 'sine', 0.12, 0.08, 0.15);
      tone(1320, 'sine', 0.1, 0.08, 0.24);
    },
    space: () => {
      // Whoosh + engine rumble
      const c = getCtx();
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.connect(g);
      g.connect(c.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, c.currentTime);
      osc.frequency.linearRampToValueAtTime(200, c.currentTime + 0.4);
      g.gain.setValueAtTime(0.15, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.5);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + 0.55);
      noise(0.4, 0.05, 0, 400);
    },
    sky: () => {
      // Bird tweet
      tone(2400, 'sine', 0.08, 0.12);
      tone(2800, 'sine', 0.07, 0.1, 0.09);
      tone(2200, 'sine', 0.1, 0.1, 0.17);
      tone(3000, 'sine', 0.06, 0.08, 0.26);
    }
  };

  return {
    play(name) {
      if (muted) return;
      try { (scenes[name] || (() => {}))(); } catch (e) {}
    },

    starCollect() {
      if (muted) return;
      try {
        tone(880,  'sine', 0.12, 0.15);
        tone(1320, 'sine', 0.10, 0.12, 0.08);
        tone(1760, 'sine', 0.08, 0.10, 0.16);
      } catch (e) {}
    },

    levelComplete() {
      if (muted) return;
      try {
        const notes = [523, 659, 784, 1047, 784, 1047, 1319];
        notes.forEach((f, i) => tone(f, 'sine', 0.2, 0.14, i * 0.12));
      } catch (e) {}
    },

    countdown(n) {
      if (muted) return;
      try { tone(n === 0 ? 880 : 440, 'sine', 0.18, 0.2); } catch (e) {}
    },

    toggleMute() {
      muted = !muted;
      return muted;
    },

    isMuted() { return muted; }
  };
})();

/* ──────────────────────────────────────────────────────────────
   CATMULL-ROM SPLINE
────────────────────────────────────────────────────────────── */
function catmullRom(pts, t) {
  // pts: array of [x,y], t in [0,1]
  const n = pts.length;
  const totalSeg = n - 1;
  const seg = Math.min(Math.floor(t * totalSeg), totalSeg - 1);
  const lt = t * totalSeg - seg;

  const p0 = pts[Math.max(0, seg - 1)];
  const p1 = pts[seg];
  const p2 = pts[Math.min(n - 1, seg + 1)];
  const p3 = pts[Math.min(n - 1, seg + 2)];

  const t2 = lt * lt, t3 = lt * lt * lt;
  return [
    0.5 * ((2*p1[0]) + (-p0[0]+p2[0])*lt + (2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2 + (-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),
    0.5 * ((2*p1[1]) + (-p0[1]+p2[1])*lt + (2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2 + (-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)
  ];
}

function buildFullPath(waypoints) {
  // Add a start point off the left edge
  const first = waypoints[0];
  const last = waypoints[waypoints.length - 1];
  return [
    [first[0] - 0.12, first[1]],
    ...waypoints,
    [last[0] + 0.12, last[1]]
  ];
}

/* ──────────────────────────────────────────────────────────────
   BACKGROUND RENDERERS
────────────────────────────────────────────────────────────── */
const BgRenderers = {
  ocean: (() => {
    const bubbles = Array.from({length: 25}, () => ({
      x: Math.random(), y: Math.random(),
      r: 2 + Math.random() * 6, speed: 0.00008 + Math.random() * 0.00015,
      wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.001 + Math.random() * 0.002
    }));
    const seaweed = Array.from({length: 8}, () => ({
      x: 0.05 + Math.random() * 0.9,
      h: 0.08 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#1A8040' : '#20A050'
    }));

    return function(ctx, w, h, t) {
      // Gradient background
      const grd = ctx.createLinearGradient(0, 0, 0, h);
      grd.addColorStop(0, '#0D5FA0');
      grd.addColorStop(1, '#082860');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Light rays from surface
      ctx.save();
      for (let i = 0; i < 5; i++) {
        const rx = (0.1 + i * 0.2) * w;
        ctx.beginPath();
        ctx.moveTo(rx, 0);
        ctx.lineTo(rx - 40, h);
        ctx.lineTo(rx + 40, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(100,180,255,${0.03 + Math.sin(t * 0.0008 + i) * 0.015})`;
        ctx.fill();
      }
      ctx.restore();

      // Seaweed
      seaweed.forEach(sw => {
        const bx = sw.x * w, by = h;
        const swH = sw.h * h;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        for (let i = 0; i < 10; i++) {
          const frac = i / 10;
          const sway = Math.sin(sw.phase + t * 0.001 + frac * Math.PI) * 12;
          ctx.lineTo(bx + sway, by - frac * swH);
        }
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // Bubbles
      bubbles.forEach(b => {
        b.y -= b.speed * 16;
        if (b.y < -0.05) b.y = 1.05;
        b.wobble += b.wobbleSpeed * 16;
        const bx = b.x * w + Math.sin(b.wobble) * 8;
        const by = b.y * h;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(150,210,255,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(150,210,255,0.12)';
        ctx.fill();
      });
    };
  })(),

  garden: (() => {
    const clouds = Array.from({length: 5}, () => ({
      x: Math.random(), y: 0.05 + Math.random() * 0.3,
      w: 0.1 + Math.random() * 0.15, speed: 0.00002 + Math.random() * 0.00003
    }));
    const flowers = Array.from({length: 18}, () => ({
      x: Math.random(), y: 0.65 + Math.random() * 0.3,
      r: 6 + Math.random() * 10,
      color: ['#FF6090','#FFD700','#FF8C20','#E040FB','#40E0D0'][Math.floor(Math.random()*5)],
      phase: Math.random() * Math.PI * 2
    }));

    return function(ctx, w, h, t) {
      const grd = ctx.createLinearGradient(0, 0, 0, h);
      grd.addColorStop(0, '#87CEEB');
      grd.addColorStop(0.65, '#C8F080');
      grd.addColorStop(1, '#60B830');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Sun
      const sunX = w * 0.88, sunY = h * 0.12;
      const sGrd = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 55);
      sGrd.addColorStop(0, '#FFE840');
      sGrd.addColorStop(0.5, '#FFB820');
      sGrd.addColorStop(1, 'rgba(255,180,20,0)');
      ctx.fillStyle = sGrd;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(sunX, sunY, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE840';
      ctx.fill();

      // Clouds
      clouds.forEach(c => {
        c.x = (c.x + c.speed) % 1.2;
        const cx = c.x * w, cy = c.y * h, cw = c.w * w;
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, cw, cw * 0.4, 0, 0, Math.PI * 2);
        ctx.ellipse(cx - cw * 0.3, cy + cw * 0.1, cw * 0.5, cw * 0.32, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + cw * 0.3, cy + cw * 0.1, cw * 0.5, cw * 0.32, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Flowers
      flowers.forEach(f => {
        const fx = f.x * w, fy = f.y * h;
        const sway = Math.sin(f.phase + t * 0.0008) * 3;
        // Stem
        ctx.beginPath();
        ctx.moveTo(fx, fy + f.r * 1.5);
        ctx.lineTo(fx + sway, fy);
        ctx.strokeStyle = '#2A7820';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Petals
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + sway * 0.1;
          ctx.beginPath();
          ctx.ellipse(fx + Math.cos(angle) * f.r * 0.7, fy + Math.sin(angle) * f.r * 0.7,
                      f.r * 0.5, f.r * 0.3, angle, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();
        }
        // Center
        ctx.beginPath();
        ctx.arc(fx, fy, f.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE040';
        ctx.fill();
      });
    };
  })(),

  space: (() => {
    const stars = Array.from({length: 200}, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.3 + Math.random() * 1.8,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.001 + Math.random() * 0.003
    }));
    const nebula = Array.from({length: 4}, () => ({
      x: Math.random(), y: Math.random(),
      rx: 0.1 + Math.random() * 0.2, ry: 0.05 + Math.random() * 0.15,
      color: ['#6020A0','#2040A0','#A02060','#204060'][Math.floor(Math.random()*4)]
    }));

    return function(ctx, w, h, t) {
      ctx.fillStyle = '#04040E';
      ctx.fillRect(0, 0, w, h);

      // Nebulae
      nebula.forEach(n => {
        const grd = ctx.createRadialGradient(n.x*w, n.y*h, 0, n.x*w, n.y*h, n.rx*w);
        grd.addColorStop(0, n.color + '30');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(n.x*w, n.y*h, n.rx*w, n.ry*h, 0, 0, Math.PI*2);
        ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        s.twinkle += s.speed;
        const alpha = 0.4 + Math.sin(s.twinkle) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // Distant planet
      const px = w * 0.82, py = h * 0.18;
      const pGrd = ctx.createRadialGradient(px - 10, py - 10, 2, px, py, 38);
      pGrd.addColorStop(0, '#E08040');
      pGrd.addColorStop(0.6, '#A05020');
      pGrd.addColorStop(1, '#401808');
      ctx.beginPath();
      ctx.arc(px, py, 38, 0, Math.PI * 2);
      ctx.fillStyle = pGrd;
      ctx.fill();
      // Planet rings
      ctx.beginPath();
      ctx.ellipse(px, py, 60, 14, -0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200,140,80,0.4)';
      ctx.lineWidth = 6;
      ctx.stroke();
    };
  })(),

  sky: (() => {
    const clouds = Array.from({length: 7}, () => ({
      x: Math.random(), y: 0.05 + Math.random() * 0.55,
      w: 0.08 + Math.random() * 0.18, speed: 0.000015 + Math.random() * 0.000025,
      opacity: 0.5 + Math.random() * 0.4
    }));

    return function(ctx, w, h, t) {
      const grd = ctx.createLinearGradient(0, 0, 0, h);
      grd.addColorStop(0, '#4CA8E8');
      grd.addColorStop(1, '#A8D8F8');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Sun rays
      const sunX = w * 0.15, sunY = h * 0.1;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + t * 0.0002;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX + Math.cos(angle) * 120, sunY + Math.sin(angle) * 120);
        ctx.strokeStyle = `rgba(255,220,60,${0.08 + Math.sin(angle + t * 0.001) * 0.03})`;
        ctx.lineWidth = 8;
        ctx.stroke();
      }
      // Sun disc
      const sGrd = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 50);
      sGrd.addColorStop(0, '#FFFFA0');
      sGrd.addColorStop(0.5, '#FFE040');
      sGrd.addColorStop(1, 'rgba(255,200,0,0)');
      ctx.fillStyle = sGrd;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 50, 0, Math.PI * 2);
      ctx.fill();

      // Clouds
      clouds.forEach(c => {
        c.x = (c.x + c.speed) % 1.15;
        if (c.x > 1.1) c.x = -0.15;
        const cx = c.x * w, cy = c.y * h, cw = c.w * w;
        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(cx, cy, cw, cw * 0.38, 0, 0, Math.PI * 2);
        ctx.ellipse(cx - cw * 0.28, cy + cw * 0.08, cw * 0.52, cw * 0.3, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + cw * 0.28, cy + cw * 0.08, cw * 0.52, cw * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };
  })()
};

/* ──────────────────────────────────────────────────────────────
   ELEMENT HELPERS
────────────────────────────────────────────────────────────── */
function el(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = el(id);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
}

/* ──────────────────────────────────────────────────────────────
   PARTICLE BURST
────────────────────────────────────────────────────────────── */
function burstParticles(x, y, color = '#FFD700') {
  const layer = el('particles-layer');
  if (!layer) return;
  const count = 10;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = color;
    const angle = (i / count) * 360;
    const dist = 40 + Math.random() * 50;
    p.style.setProperty('--px', Math.cos(angle * Math.PI / 180) * dist + 'px');
    p.style.setProperty('--py', Math.sin(angle * Math.PI / 180) * dist + 'px');
    layer.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

/* ──────────────────────────────────────────────────────────────
   STAR TRAIL CANVAS
────────────────────────────────────────────────────────────── */
const Trail = (() => {
  let canvas, ctx2;
  const history = [];
  const MAX_TRAIL = 28;

  return {
    init() {
      canvas = el('trail-canvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx2 = canvas.getContext('2d');
      }
    },
    resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },
    push(x, y) {
      history.push({x, y});
      if (history.length > MAX_TRAIL) history.shift();
    },
    clear() { history.length = 0; },
    draw() {
      if (!ctx2 || !canvas) return;
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      if (history.length < 2) return;
      for (let i = 1; i < history.length; i++) {
        const alpha = i / history.length;
        const w = alpha * 6;
        ctx2.beginPath();
        ctx2.moveTo(history[i-1].x, history[i-1].y);
        ctx2.lineTo(history[i].x, history[i].y);
        ctx2.strokeStyle = `rgba(255,220,80,${alpha * 0.7})`;
        ctx2.lineWidth = w;
        ctx2.lineCap = 'round';
        ctx2.stroke();
        // Small star dot every 4 points
        if (i % 4 === 0) {
          ctx2.beginPath();
          ctx2.arc(history[i].x, history[i].y, w * 0.8, 0, Math.PI * 2);
          ctx2.fillStyle = `rgba(255,255,200,${alpha * 0.5})`;
          ctx2.fill();
        }
      }
    }
  };
})();

/* ──────────────────────────────────────────────────────────────
   GAME STATE
────────────────────────────────────────────────────────────── */
const G = {
  scene: null,          // current SCENES entry
  pathPts: null,        // full spline points (screen-space fractions)
  t: 0,                 // character path progress [0..1]
  charSpeed: 0.000030,  // path units per ms (~33s para percorrer o caminho)
  charPos: [0, 0],      // current [x,y] in px
  handPos: [0.5, 0.5],  // normalized [0..1]
  handVisible: false,
  stars: [],            // {t, x, y, el, collected}
  starsCount: 0,
  totalStars: 9,
  running: false,
  paused: false,
  lastTime: 0,
  sceneIndex: 0,
  sessionStars: 0,      // across all scenes
  animFrame: null,
  bgCanvas: null,
  bgCtx: null,
  pipCanvas: null,
  pipCtx: null,
  hands: null,
  camera: null,
  mediaStream: null,
  handFollowing: false,
  encourageTimeout: null,
  mode: 'follow',     // 'follow' | 'grab'
  grabbed: false,
  fistDetected: false,
};

/* ──────────────────────────────────────────────────────────────
   STAR PLACEMENT
────────────────────────────────────────────────────────────── */
function placeStars(scene) {
  const layer = el('stars-layer');
  if (!layer) return;
  layer.innerHTML = '';
  G.stars = [];

  const pts = G.pathPts;
  const totalStars = G.totalStars;

  for (let i = 0; i < totalStars; i++) {
    let x, y, t;
    if (G.mode === 'free') {
      // Distribui as estrelas aleatoriamente pelo ecrã (com margem)
      t = 0.05 + (i / (totalStars - 1)) * 0.90; // mantido para compatibilidade mas não usado em posição
      x = (0.1 + Math.random() * 0.8) * window.innerWidth;
      y = (0.1 + Math.random() * 0.75) * window.innerHeight;
    } else {
      t = 0.05 + (i / (totalStars - 1)) * 0.90;
      const [fx, fy] = catmullRom(pts, t);
      x = fx * window.innerWidth;
      y = fy * window.innerHeight;
    }

    const star = document.createElement('div');
    star.className = 'path-star';
    star.textContent = '⭐';
    star.style.left = (x - 20) + 'px';
    star.style.top = (y - 20) + 'px';
    layer.appendChild(star);

    G.stars.push({ t, x, y, el: star, collected: false });
  }

  // Mode 2: desenha guia do circuito no trail canvas
  if (G.mode === 'grab') {
    setTimeout(() => drawPathGuide(), 100);
  }
}

function drawPathGuide() {
  const canvas = el('trail-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = window.innerWidth, H = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha caminho pontilhado entre estrelas
  ctx.save();
  ctx.setLineDash([8, 12]);
  ctx.strokeStyle = 'rgba(255, 220, 80, 0.35)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const t = 0.05 + (i / steps) * 0.85;
    const [fx, fy] = catmullRom(G.pathPts, t);
    if (i === 0) ctx.moveTo(fx * W, fy * H);
    else ctx.lineTo(fx * W, fy * H);
  }
  ctx.stroke();
  ctx.restore();
}

/* ──────────────────────────────────────────────────────────────
   ENCOURAGE MESSAGE
────────────────────────────────────────────────────────────── */
function showEncourage(msg) {
  const div = el('encourage-msg');
  if (!div) return;
  if (G.encourageTimeout) clearTimeout(G.encourageTimeout);
  div.textContent = msg;
  div.removeAttribute('hidden');
  div.classList.remove('pop-in');
  void div.offsetWidth;
  div.classList.add('pop-in');
  G.encourageTimeout = setTimeout(() => div.setAttribute('hidden', ''), 2200);
}

/* ──────────────────────────────────────────────────────────────
   MEDIAPIPE HANDS SETUP
────────────────────────────────────────────────────────────── */
function initMediaPipe(videoEl) {
  return new Promise((resolve, reject) => {
    if (typeof Hands === 'undefined') {
      reject(new Error('MediaPipe not loaded'));
      return;
    }

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5
    });

    hands.onResults(onHandResults);

    const camera = new Camera(videoEl, {
      onFrame: async () => {
        await hands.send({ image: videoEl });
      },
      width: 320,
      height: 240
    });

    G.hands = hands;
    G.camera = camera;

    camera.start()
      .then(() => resolve({ hands, camera }))
      .catch(reject);
  });
}

function onHandResults(results) {
  // Update pip canvas
  drawPip(results);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const lm = results.multiHandLandmarks[0];
    // Use wrist (0) + middle finger base (9) average for more stable point
    const wx = lm[0].x, wy = lm[0].y;
    const mx = lm[9].x, my = lm[9].y;
    const rawX = (wx + mx) / 2;
    const rawY = (wy + my) / 2;

    // Mirror X because camera is front-facing
    G.handPos = [1 - rawX, rawY];
    G.handVisible = true;
    G.fistDetected = detectFist(results.multiHandLandmarks[0]);

    // Check for hand in setup screen
    if (el('hand-detected')) {
      el('hand-detected').style.opacity = '1';
      setTimeout(() => { if (el('hand-detected')) el('hand-detected').style.opacity = '0'; }, 1000);
    }
  } else {
    G.handVisible = false;
    G.fistDetected = false;
    G.grabbed = false;
  }
}

function detectFist(landmarks) {
  // Compare each fingertip distance to wrist vs hand size
  const wrist = landmarks[0];
  const midMCP = landmarks[9];
  const handSize = Math.hypot(midMCP.x - wrist.x, midMCP.y - wrist.y);
  const tips = [8, 12, 16, 20];
  let closed = 0;
  for (const t of tips) {
    const d = Math.hypot(landmarks[t].x - wrist.x, landmarks[t].y - wrist.y);
    if (d < handSize * 1.5) closed++;
  }
  return closed >= 3;
}

function drawPip(results) {
  const canvas = G.pipCanvas;
  const ctx = G.pipCtx;
  if (!canvas || !ctx) return;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#00FF88', lineWidth: 2 });
      drawLandmarks(ctx, landmarks, { color: '#FF4444', lineWidth: 1, radius: 3 });
    }
  }
  ctx.restore();
}

/* ──────────────────────────────────────────────────────────────
   MODE INSTRUCTIONS
────────────────────────────────────────────────────────────── */
const MODE_INSTRUCTIONS = {
  follow: {
    icon: '🏃',
    title: 'Modo Seguir',
    text: 'Move a mão perto do animal para ele avançar.\nApanha todas as estrelas ⭐ pelo caminho!'
  },
  grab: {
    icon: '✊',
    title: 'Modo Guiar',
    text: 'Fecha o punho junto ao animal para o agarrar.\nArrasta-o até cada estrela ⭐!'
  },
  free: {
    icon: '🖐',
    title: 'Modo Livre',
    text: 'Move a mão pelo ecrã — o animal segue-te!\nPassa pelas estrelas ⭐ para as apanhar.'
  }
};

const INSTR_DURATION = 6000; // ms que as instruções ficam visíveis

function showInstructions(mode, callback) {
  const overlay = el('instructions-overlay');
  const iconEl  = el('instructions-icon');
  const titleEl = el('instructions-title');
  const textEl  = el('instructions-text');
  const bar     = el('instructions-bar');

  if (!overlay) { callback(); return; }

  const instr = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.follow;
  iconEl.textContent  = instr.icon;
  titleEl.textContent = instr.title;
  textEl.textContent  = instr.text;

  bar.style.transition = 'none';
  bar.style.width = '0%';
  overlay.classList.add('visible');

  // Inicia barra de progresso
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bar.style.transition = `width ${INSTR_DURATION}ms linear`;
      bar.style.width = '100%';
    });
  });

  setTimeout(() => {
    overlay.classList.remove('visible');
    callback();
  }, INSTR_DURATION);
}

/* ──────────────────────────────────────────────────────────────
   COUNTDOWN
────────────────────────────────────────────────────────────── */
function popNum(num, text) {
  num.textContent = text;
  num.classList.remove('pop');
  void num.offsetWidth; // força reflow para reiniciar animação
  num.classList.add('pop');
}

function runCountdown(callback) {
  const overlay = el('countdown-overlay');
  const num = el('countdown-num');
  if (!overlay || !num) { callback(); return; }

  overlay.classList.add('visible');
  let count = 3;
  popNum(num, count);
  Sound.countdown(count);

  const tick = setInterval(() => {
    count--;
    if (count > 0) {
      popNum(num, count);
      Sound.countdown(count);
    } else {
      popNum(num, 'VAI!');
      Sound.countdown(0);
      clearInterval(tick);
      setTimeout(() => {
        overlay.classList.remove('visible');
        callback();
      }, 700);
    }
  }, 900);
}

/* ──────────────────────────────────────────────────────────────
   GAME LOOP
────────────────────────────────────────────────────────────── */
function gameLoop(time) {
  G.animFrame = requestAnimationFrame(gameLoop);
  if (!G.running || G.paused) return;

  const dt = G.lastTime ? Math.min(time - G.lastTime, 64) : 16;
  G.lastTime = time;

  try {

  const W = window.innerWidth, H = window.innerHeight;

  if (G.mode === 'follow') {
    // Mode 1: personagem avança ao longo do caminho
    const speedMult = G.handFollowing ? 1.0 : 0.25;
    G.t = Math.min(1, G.t + G.charSpeed * speedMult * dt);
    const [fx, fy] = catmullRom(G.pathPts, G.t);
    G.charPos = [fx * W, fy * H];
  } else if (G.mode === 'grab') {
    // Mode 2: personagem segue a mão quando agarrada
    const hx = G.handPos[0] * W;
    const hy = G.handPos[1] * H;
    const dx = hx - G.charPos[0], dy = hy - G.charPos[1];
    const distToChar = Math.sqrt(dx*dx + dy*dy);
    const grabRadius = Math.min(W, H) * 0.14;

    if (G.fistDetected && G.handVisible) {
      if (!G.grabbed && distToChar < grabRadius) {
        G.grabbed = true; // inicia agarre
      }
      if (G.grabbed) {
        G.charPos = [hx, hy]; // segue a mão
      }
    } else {
      G.grabbed = false; // larga ao abrir a mão
    }
  } else {
    // Mode 3: personagem segue a mão livremente com suavização
    if (G.handVisible) {
      const hx = G.handPos[0] * W;
      const hy = G.handPos[1] * H;
      const lerpSpeed = 1 - Math.pow(0.04, dt / 1000);
      G.charPos[0] += (hx - G.charPos[0]) * lerpSpeed;
      G.charPos[1] += (hy - G.charPos[1]) * lerpSpeed;
    }
  }

  // Update character element position (centrado no ponto do caminho)
  const charWrap = el('character-wrap');
  if (charWrap) {
    const offsets = { dolphin:[100,50], butterfly:[80,60], rocket:[35,70], macaw:[90,63] };
    const [ox, oy] = offsets[G.scene.charKey] || [60, 40];
    charWrap.style.transform = `translate(${G.charPos[0] - ox}px, ${G.charPos[1] - oy}px)`;

    // Feedback visual: grabbed state
    const charEl = el('character-el');
    if (charEl) {
      if (G.mode === 'grab') {
        if (G.grabbed) charEl.classList.add('grabbed');
        else charEl.classList.remove('grabbed');
        // Mostra pulse quando punho fechado mas ainda não agarrou
        if (G.fistDetected && !G.grabbed) charEl.classList.add('grab-ready');
        else charEl.classList.remove('grab-ready');
      } else {
        charEl.classList.remove('grabbed', 'grab-ready');
      }
    }
  }

  // Add trail point
  Trail.push(G.charPos[0], G.charPos[1]);

  // Update hand indicator
  const handInd = el('hand-indicator');
  if (handInd) {
    if (G.handVisible) {
      const hx = G.handPos[0] * W;
      const hy = G.handPos[1] * H;
      handInd.style.left = hx + 'px';
      handInd.style.top = hy + 'px';
      handInd.removeAttribute('hidden');

      // Check proximity to character
      const dx = hx - G.charPos[0], dy = hy - G.charPos[1];
      const dist = Math.sqrt(dx*dx + dy*dy);
      const threshold = Math.min(W, H) * 0.15;
      G.handFollowing = dist < threshold;
      if (G.handFollowing) {
        handInd.classList.add('following');
      } else {
        handInd.classList.remove('following');
      }
    } else {
      handInd.setAttribute('hidden', '');
      G.handFollowing = false;
    }
  }

  // Check star collection
  G.stars.forEach(star => {
    if (star.collected) return;
    const sx = star.x, sy = star.y;
    const charDx = G.charPos[0] - sx, charDy = G.charPos[1] - sy;
    const charDist = Math.sqrt(charDx*charDx + charDy*charDy);
    const collectRadius = Math.min(W, H) * 0.13;

    // Mode 1: precisa de mão a seguir; Mode 2: basta estar agarrado; Mode 3: basta passar perto
    const canCollect = G.mode === 'follow' ? G.handFollowing : G.mode === 'grab' ? G.grabbed : true;
    if (charDist < collectRadius && canCollect) {
      collectStar(star);
    }
  });

  // Draw background
  if (G.bgCtx && G.bgCanvas) {
    const renderer = BgRenderers[G.scene.id];
    if (renderer) renderer(G.bgCtx, G.bgCanvas.width, G.bgCanvas.height, time);
  }

  // Draw trail
  Trail.draw();

  // Play ambient sound occasionally
  if (Math.floor(time / 4000) !== Math.floor((time - dt) / 4000)) {
    Sound.play(G.scene.id);
  }

  // Check path end — loop it
  if (G.t >= 0.98) {
    G.t = 0;
    Trail.clear();
  }

  } catch(e) { console.error('gameLoop error:', e); }
}

function collectStar(star) {
  star.collected = true;
  G.starsCount++;
  G.sessionStars++;
  el('hud-stars').textContent = G.starsCount;

  // Animate star
  star.el.classList.add('star-collect');
  setTimeout(() => star.el.remove(), 500);

  // Particles at star position
  burstParticles(star.x, star.y, G.scene.accentColor);

  // Sound + message
  Sound.starCollect();
  const msg = MSGS[Math.floor(Math.random() * MSGS.length)];
  showEncourage(msg);

  // Check level complete
  if (G.starsCount >= G.totalStars) {
    setTimeout(levelComplete, 600);
  }
}

function levelComplete() {
  G.running = false;
  cancelAnimationFrame(G.animFrame);
  Sound.levelComplete();

  // Build complete screen
  const scene = G.scene;
  const completeBg = el('complete-bg');
  if (completeBg) {
    completeBg.style.background = `linear-gradient(135deg, ${scene.bgTop}, ${scene.bgBottom})`;
  }

  el('complete-char').innerHTML = CHARS[scene.charKey];
  el('complete-title').textContent = 'Fantástico! 🎉';
  el('complete-subtitle').textContent = `Apanhaste todas as estrelas no ${scene.name}!`;

  // Stars display
  const starsDiv = el('stars-display');
  starsDiv.innerHTML = '';
  for (let i = 0; i < G.starsCount; i++) {
    const s = document.createElement('span');
    s.className = 'star-reward';
    s.textContent = '⭐';
    s.style.animationDelay = (i * 0.12) + 's';
    starsDiv.appendChild(s);
  }

  showScreen('screen-complete');
}

/* ──────────────────────────────────────────────────────────────
   START GAME
────────────────────────────────────────────────────────────── */
function startGame(sceneIndex, mode = 'follow') {
  G.sceneIndex = sceneIndex;
  G.scene = SCENES[sceneIndex];
  G.t = 0.12; // começa no 1.º waypoint real (salta o ponto fantasma)
  G.starsCount = 0;
  G.running = false;
  G.paused = false;
  G.lastTime = 0;
  G.handVisible = false;
  G.handFollowing = false;
  G.mode = mode;
  G.grabbed = false;
  G.fistDetected = false;

  // Build path with screen-space fractions
  G.pathPts = buildFullPath(G.scene.waypoints);

  // Setup HUD
  el('hud-stars').textContent = '0';
  const modeIcon = mode === 'grab' ? ' ✊' : mode === 'free' ? ' 🖐' : ' 🏃';
  el('hud-scene-name').textContent = G.scene.name + modeIcon;

  // Setup character
  const charEl = el('character-el');
  charEl.innerHTML = CHARS[G.scene.charKey];

  // Clear layers
  el('stars-layer').innerHTML = '';
  el('particles-layer').innerHTML = '';
  el('encourage-msg').setAttribute('hidden', '');

  // Setup bg canvas
  G.bgCanvas = el('bg-canvas');
  G.bgCanvas.width = window.innerWidth;
  G.bgCanvas.height = window.innerHeight;
  G.bgCtx = G.bgCanvas.getContext('2d');

  // Setup pip canvas
  G.pipCanvas = el('pip-canvas');
  G.pipCanvas.width = 160;
  G.pipCanvas.height = 120;
  G.pipCtx = G.pipCanvas.getContext('2d');

  // Trail
  Trail.init();
  Trail.clear();

  // Show game screen then countdown
  showScreen('screen-game');

  // Place stars + pré-posicionar personagem antes do countdown
  requestAnimationFrame(() => {
    const W = window.innerWidth, H = window.innerHeight;
    const offsets = { dolphin:[100,50], butterfly:[80,60], rocket:[35,70], macaw:[90,63] };
    const [ox, oy] = offsets[G.scene.charKey] || [70, 50];

    // Posição inicial: centro do ecrã em modo livre, 1.º waypoint nos outros modos
    let fx0, fy0;
    if (mode === 'free') {
      fx0 = 0.5; fy0 = 0.5;
    } else {
      [fx0, fy0] = catmullRom(G.pathPts, G.t);
    }
    G.charPos = [fx0 * W, fy0 * H];
    const charWrap = el('character-wrap');
    if (charWrap) {
      charWrap.style.transform = `translate(${G.charPos[0] - ox}px, ${G.charPos[1] - oy}px)`;
    }

    placeStars(G.scene);

    showInstructions(mode, () => {
      runCountdown(() => {
        G.running = true;
        G.lastTime = performance.now();
        G.animFrame = requestAnimationFrame(gameLoop);
      });
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   PAUSE / RESUME
────────────────────────────────────────────────────────────── */
function pauseGame() {
  if (!G.running) return;
  G.paused = true;
  el('pause-overlay').classList.add('visible');
}

function resumeGame() {
  G.paused = false;
  G.lastTime = 0;
  el('pause-overlay').classList.remove('visible');
}

function quitGame() {
  G.running = false;
  cancelAnimationFrame(G.animFrame);
  el('pause-overlay').classList.remove('visible');
  showScreen('screen-select');
}

/* ──────────────────────────────────────────────────────────────
   SCENE SELECT SCREEN
────────────────────────────────────────────────────────────── */
function buildSceneSelect() {
  const grid = el('scene-grid');
  if (!grid) return;
  grid.innerHTML = '';

  SCENES.forEach((scene, i) => {
    const card = document.createElement('div');
    card.className = `scene-card ${scene.id}`;
    card.innerHTML = `
      <div class="scene-card-emoji">${scene.emoji}</div>
      <div class="scene-card-name">${scene.name}</div>
      <div class="scene-card-char">${CHARS[scene.charKey]}</div>
      <div class="scene-mode-btns">
        <button class="btn-mode btn-mode-follow" data-i="${i}">🏃 Seguir</button>
        <button class="btn-mode btn-mode-grab"   data-i="${i}">✊ Guiar</button>
        <button class="btn-mode btn-mode-free"   data-i="${i}">🖐 Livre</button>
      </div>
    `;
    card.querySelector('.btn-mode-follow').addEventListener('click', e => { e.stopPropagation(); startGame(i, 'follow'); });
    card.querySelector('.btn-mode-grab').addEventListener('click',   e => { e.stopPropagation(); startGame(i, 'grab'); });
    card.querySelector('.btn-mode-free').addEventListener('click',   e => { e.stopPropagation(); startGame(i, 'free'); });
    grid.appendChild(card);
  });
}

/* ──────────────────────────────────────────────────────────────
   CAMERA SETUP SCREEN
────────────────────────────────────────────────────────────── */
async function setupCamera() {
  const btn = el('btn-allow-camera');
  const loadWrap = el('loading-bar-wrap');
  const loadFill = el('loading-fill');
  const loadText = el('loading-text');
  const previewWrap = el('camera-preview-wrap');
  const setupVideo = el('setup-video');
  const gameVideo = el('game-video');

  btn.disabled = true;
  btn.textContent = 'A ativar…';

  try {
    // Request camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240, facingMode: 'user' },
      audio: false
    });
    G.mediaStream = stream;

    setupVideo.srcObject = stream;
    gameVideo.srcObject = stream;
    previewWrap.removeAttribute('hidden');

    loadWrap.removeAttribute('hidden');
    loadText.textContent = 'A carregar inteligência artificial…';

    // Animate loading bar while MediaPipe loads
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + (Math.random() * 8), 85);
      loadFill.style.width = progress + '%';
    }, 200);

    // Init MediaPipe on setup video
    await initMediaPipe(setupVideo);

    clearInterval(interval);
    loadFill.style.width = '100%';
    loadText.textContent = 'Pronto! ✓';

    await new Promise(r => setTimeout(r, 800));

    // Now setup game video with same stream (already set above)
    // Transition to scene select
    buildSceneSelect();
    showScreen('screen-select');

  } catch (err) {
    console.error('Camera/MediaPipe error:', err);
    btn.disabled = false;
    btn.textContent = 'Tentar novamente';
    loadText.textContent = 'Erro: ' + (err.message || 'Câmara não disponível');
    loadWrap.removeAttribute('hidden');
    loadFill.style.width = '0%';
    loadFill.style.background = '#EF4444';
  }
}

/* ──────────────────────────────────────────────────────────────
   WELCOME SCREEN ANIMATION
────────────────────────────────────────────────────────────── */
function animateWelcome() {
  const charDiv = el('welcome-char');
  if (charDiv) {
    // Show dolphin as welcome character
    charDiv.innerHTML = CHARS['dolphin'];
  }
}

/* ──────────────────────────────────────────────────────────────
   WINDOW RESIZE
────────────────────────────────────────────────────────────── */
window.addEventListener('resize', () => {
  if (G.bgCanvas) {
    G.bgCanvas.width = window.innerWidth;
    G.bgCanvas.height = window.innerHeight;
  }
  Trail.resize();

  // Reposition stars
  if (G.running && G.pathPts) {
    const W = window.innerWidth, H = window.innerHeight;
    G.stars.forEach(star => {
      if (!star.collected) {
        const [fx, fy] = catmullRom(G.pathPts, star.t);
        star.x = fx * W;
        star.y = fy * H;
        star.el.style.left = (star.x - 20) + 'px';
        star.el.style.top = (star.y - 20) + 'px';
      }
    });
  }
});

/* ──────────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  animateWelcome();

  // Welcome → Camera
  el('btn-play').addEventListener('click', () => {
    Sound.play('ocean'); // warm up audio context
    showScreen('screen-camera');
  });

  // Allow camera
  el('btn-allow-camera').addEventListener('click', () => {
    setupCamera();
  });

  // Pause button
  el('btn-pause-game').addEventListener('click', () => pauseGame());

  // Mute button
  el('btn-mute-game').addEventListener('click', () => {
    const muted = Sound.toggleMute();
    el('btn-mute-game').textContent = muted ? '🔇' : '🔊';
  });

  // Resume button
  el('btn-resume').addEventListener('click', () => resumeGame());

  // Quit button
  el('btn-quit').addEventListener('click', () => quitGame());

  // Complete screen buttons
  el('btn-next-scene').addEventListener('click', () => {
    const next = (G.sceneIndex + 1) % SCENES.length;
    startGame(next);
  });

  el('btn-replay').addEventListener('click', () => {
    startGame(G.sceneIndex);
  });

  el('btn-menu').addEventListener('click', () => {
    showScreen('screen-select');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
      if (G.running) {
        if (G.paused) resumeGame(); else pauseGame();
      }
    }
    if (e.key === 'm' || e.key === 'M') {
      const muted = Sound.toggleMute();
      el('btn-mute-game').textContent = muted ? '🔇' : '🔊';
    }
  });
});
