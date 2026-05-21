/* ═══════════════════════════════════════════════════════════
   REMOTIVA — Recuperação Motora
   Lógica principal · Dados · Animações SVG · Voz · Câmara
═══════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. DADOS DOS EXERCÍCIOS
════════════════════════════════════════════════════════════ */

const EXERCISES = {
  /* ── CABEÇA ─────────────────────────────────────── */
  cabeca: [
    {
      id: 'rotacao-cabeca',
      name: 'Rotação da Cabeça',
      desc: 'Vire a cabeça lentamente para a esquerda e depois para a direita, mantendo o pescoço relaxado.',
      reps: 8,
      repDuration: 4,      /* segundos por repetição */
      phases: ['Vire para a esquerda', 'Centro', 'Vire para a direita', 'Centro'],
      phaseDuration: 2000, /* ms por fase */
      introAudio: 'Exercício de rotação da cabeça. Vire a cabeça lentamente para a esquerda, depois para a direita. Mantenha o pescoço relaxado e os ombros imóveis. Faça o movimento de forma suave e controlada.',
      doneAudio: 'Muito bem! Rotação da cabeça concluída.',
      animId: 'head-rotation',
    },
    {
      id: 'inclinacao-lateral',
      name: 'Inclinação Lateral',
      desc: 'Incline a cabeça em direção ao ombro esquerdo e depois ao direito, como se quisesse tocar no ombro com a orelha.',
      reps: 8,
      repDuration: 4,
      phases: ['Incline para a esquerda', 'Centro', 'Incline para a direita', 'Centro'],
      phaseDuration: 2000,
      introAudio: 'Inclinação lateral. Incline a cabeça em direção ao ombro esquerdo, depois ao direito. Mantenha os ombros baixos e relaxados. Não force o movimento.',
      doneAudio: 'Excelente! Muito bem feito.',
      animId: 'head-tilt',
    },
    {
      id: 'flexao-cervical',
      name: 'Flexão Cervical',
      desc: 'Baixe o queixo lentamente em direção ao peito, depois regresse à posição neutra e olhe ligeiramente para cima.',
      reps: 8,
      repDuration: 4,
      phases: ['Baixe o queixo', 'Centro', 'Olhe ligeiramente para cima', 'Centro'],
      phaseDuration: 2000,
      introAudio: 'Flexão cervical. Baixe o queixo devagar em direção ao peito. Depois regresse ao centro e incline ligeiramente a cabeça para trás. Faça tudo com muita suavidade.',
      doneAudio: 'Fantástico! Continue com este esforço.',
      animId: 'head-nod',
    },
    {
      id: 'retracao-queixo',
      name: 'Retração do Queixo',
      desc: 'Empurre o queixo suavemente para trás (como a fazer duplo queixo) alongando a base do crânio. Regresse ao centro.',
      reps: 10,
      repDuration: 3,
      phases: ['Queixo para trás', 'Relaxe'],
      phaseDuration: 1500,
      introAudio: 'Retração do queixo. Empurre o queixo para trás, como se estivesse a fazer um duplo queixo. Sinta o alongamento na nuca. Depois relaxe e repita.',
      doneAudio: 'Ótimo trabalho! Excelente.',
      animId: 'chin-tuck',
    },
  ],

  /* ── BRAÇOS ─────────────────────────────────────── */
  bracos: [
    {
      id: 'elevacao-frontal',
      name: 'Elevação Frontal',
      desc: 'Levante os dois braços estendidos à frente do corpo, até ao nível dos ombros. Desça devagar.',
      reps: 10,
      repDuration: 5,
      phases: ['Levante os braços', 'Mantenha', 'Desça devagar'],
      phaseDuration: 1700,
      introAudio: 'Elevação frontal. Com os braços estendidos, levante-os à frente até ao nível dos ombros. Desça devagar. Respire de forma regular durante o exercício.',
      doneAudio: 'Muito bem! Os seus braços estão a ganhar força.',
      animId: 'arm-raise-front',
    },
    {
      id: 'elevacao-lateral',
      name: 'Elevação Lateral',
      desc: 'Abra os braços para os lados como se fosse voar, levantando até ao nível dos ombros. Desça com controlo.',
      reps: 10,
      repDuration: 5,
      phases: ['Abra os braços', 'Mantenha', 'Desça devagar'],
      phaseDuration: 1700,
      introAudio: 'Elevação lateral. Abra os braços para os lados, como asas, até ao nível dos ombros. Desça com controlo. Sinta os ombros a trabalhar.',
      doneAudio: 'Excelente! Muito bom esforço.',
      animId: 'arm-raise-side',
    },
    {
      id: 'flexao-cotovelo',
      name: 'Flexão do Cotovelo',
      desc: 'Com os braços ao longo do corpo, dobre os cotovelos trazendo as mãos até aos ombros. Desça lentamente.',
      reps: 12,
      repDuration: 4,
      phases: ['Dobre os cotovelos', 'Mantenha', 'Desça devagar'],
      phaseDuration: 1300,
      introAudio: 'Flexão do cotovelo. Com os braços ao longo do corpo, dobre os cotovelos trazendo as mãos até aos ombros. Desça devagar. Este exercício fortalece o bicípite.',
      doneAudio: 'Fantástico! Os seus músculos estão a trabalhar.',
      animId: 'elbow-flex',
    },
    {
      id: 'rotacao-ombros',
      name: 'Rotação dos Ombros',
      desc: 'Rode os ombros em círculos lentos para a frente e depois para trás. Mantenha o pescoço relaxado.',
      reps: 10,
      repDuration: 3,
      phases: ['Rode para a frente', 'Rode para trás'],
      phaseDuration: 1500,
      introAudio: 'Rotação dos ombros. Rode os ombros em círculos lentos, primeiro para a frente, depois para trás. Este exercício alivia a tensão e melhora a mobilidade dos ombros.',
      doneAudio: 'Muito bem! Os seus ombros estão mais soltos.',
      animId: 'shoulder-roll',
    },
  ],

  /* ── MÃOS ───────────────────────────────────────── */
  maos: [
    {
      id: 'abertura-mao',
      name: 'Abertura da Mão',
      desc: 'Feche a mão num punho suave, depois abra bem todos os dedos esticando ao máximo. Repita devagar.',
      reps: 15,
      repDuration: 2,
      phases: ['Feche o punho', 'Abra os dedos'],
      phaseDuration: 1000,
      introAudio: 'Abertura da mão. Feche a mão num punho suave, depois abra bem todos os dedos. Esticá-los o máximo que conseguir. Repita devagar e com controlo.',
      doneAudio: 'Ótimo! As suas mãos estão mais flexíveis.',
      animId: 'hand-open-close',
    },
    {
      id: 'rotacao-punho',
      name: 'Rotação do Punho',
      desc: 'Com os braços apoiados, rode os punhos em círculos completos. Cinco vezes para cada lado.',
      reps: 10,
      repDuration: 3,
      phases: ['Rode para a direita', 'Rode para a esquerda'],
      phaseDuration: 1500,
      introAudio: 'Rotação do punho. Rode os punhos em círculos lentos, primeiro para a direita, depois para a esquerda. Faça movimentos suaves e amplos.',
      doneAudio: 'Excelente! Os seus punhos estão a recuperar mobilidade.',
      animId: 'wrist-rotation',
    },
    {
      id: 'extensao-dedos',
      name: 'Extensão dos Dedos',
      desc: 'Abra a mão e afaste os dedos o máximo possível, como um leque. Junte e repita.',
      reps: 10,
      repDuration: 3,
      phases: ['Abra em leque', 'Junte os dedos'],
      phaseDuration: 1500,
      introAudio: 'Extensão dos dedos. Abra a mão e afaste os dedos o mais possível, como um leque. Depois junte-os. Este exercício melhora a amplitude de movimento dos dedos.',
      doneAudio: 'Muito bem! Excelente trabalho com os dedos.',
      animId: 'finger-spread',
    },
    {
      id: 'pinca-digital',
      name: 'Pinça Digital',
      desc: 'Toque o polegar em cada um dos outros dedos em sequência: indicador, médio, anelar, mindinho. Repita.',
      reps: 8,
      repDuration: 5,
      phases: ['Polegar ao indicador', 'Polegar ao médio', 'Polegar ao anelar', 'Polegar ao mindinho'],
      phaseDuration: 1250,
      introAudio: 'Pinça digital. Toque o polegar a cada dedo em sequência: indicador, médio, anelar, mindinho. Este exercício melhora a coordenação e a destreza dos dedos.',
      doneAudio: 'Fantástico! A coordenação dos seus dedos está a melhorar.',
      animId: 'pinch',
    },
  ],
};

/* ════════════════════════════════════════════════════════════
   2. CONSTRUTORES DE SVG (Animações por exercício)
════════════════════════════════════════════════════════════ */

/* ── Marcador de seta (defs compartilhados) ───────────── */
const SVG_DEFS = `
<defs>
  <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
    <path d="M0,0 L0,6 L6,3 z" fill="#F59E0B"/>
  </marker>
  <marker id="arr-g" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
    <path d="M0,0 L0,6 L6,3 z" fill="#10B981"/>
  </marker>
</defs>`;

/* ── Figura base sentada ─────────────────────────────── */
/*  hideHead / hideArms: oculta secções que serão redesenhadas
    com animação SMIL por cima, evitando sobreposição.          */
function figBase({
  activeHead = false, activeLeftArm = false, activeRightArm = false,
  activeBothArms = false, dimArms = false, dimHead = false,
  hideHead = false, hideArms = false,
} = {}) {
  const aL  = activeBothArms || activeLeftArm;
  const aR  = activeBothArms || activeRightArm;
  const armStroke = (active, dimmed) => active ? '#10B981' : (dimmed ? '#1A3A5C' : '#3B82F6');
  const armFilt   = (active) => active ? 'drop-shadow(0 0 5px #10B98166)' : 'none';
  const headStroke= activeHead ? '#10B981' : (dimHead ? '#1A3A5C' : '#F59E0B');
  const headFill  = activeHead ? '#A7F3D0' : '#FDE68A';
  const headFilt  = activeHead ? 'drop-shadow(0 0 6px #10B98188)' : 'none';

  const armsHtml = hideArms ? '' : `
  <!-- Braço esquerdo -->
  <g style="filter:${armFilt(aL)}">
    <line x1="162" y1="210" x2="128" y2="258"
          stroke="${armStroke(aL, dimArms)}" stroke-width="15" stroke-linecap="round"/>
    <line x1="128" y1="258" x2="116" y2="298"
          stroke="${armStroke(aL, dimArms)}" stroke-width="13" stroke-linecap="round"/>
    <circle cx="113" cy="308" r="13"
            fill="${aL ? '#6EE7B7' : (dimArms ? '#162B40' : '#FDE68A')}"
            stroke="${armStroke(aL, dimArms)}" stroke-width="2"/>
  </g>
  <!-- Braço direito -->
  <g style="filter:${armFilt(aR)}">
    <line x1="238" y1="210" x2="272" y2="258"
          stroke="${armStroke(aR, dimArms)}" stroke-width="15" stroke-linecap="round"/>
    <line x1="272" y1="258" x2="284" y2="298"
          stroke="${armStroke(aR, dimArms)}" stroke-width="13" stroke-linecap="round"/>
    <circle cx="287" cy="308" r="13"
            fill="${aR ? '#6EE7B7' : (dimArms ? '#162B40' : '#FDE68A')}"
            stroke="${armStroke(aR, dimArms)}" stroke-width="2"/>
  </g>`;

  const headHtml = hideHead ? '' : `
  <!-- Pescoço -->
  <line x1="200" y1="190" x2="200" y2="168"
        stroke="${activeHead ? '#10B981' : '#3B82F6'}" stroke-width="14" stroke-linecap="round"
        style="filter:${headFilt}"/>
  <!-- Cabeça -->
  <circle cx="200" cy="135" r="34"
          fill="${headFill}" stroke="${headStroke}" stroke-width="2.5"
          style="filter:${headFilt}"/>
  <circle cx="188" cy="128" r="4.5" fill="#1E293B" opacity="${dimHead ? .3 : 1}"/>
  <circle cx="212" cy="128" r="4.5" fill="#1E293B" opacity="${dimHead ? .3 : 1}"/>
  <path d="M 187 148 Q 200 160 213 148"
        stroke="#92400E" stroke-width="2.5" fill="none" stroke-linecap="round"
        opacity="${dimHead ? .3 : 1}"/>`;

  return `
  <!-- Cadeira traseiro -->
  <rect x="145" y="190" width="110" height="92" rx="6"
        fill="#1D3557" stroke="#457B9D" stroke-width="2" opacity=".85"/>
  <!-- Cadeira assento -->
  <rect x="128" y="282" width="144" height="24" rx="5"
        fill="#1D3557" stroke="#457B9D" stroke-width="2"/>
  <!-- Pernas cadeira -->
  <line x1="140" y1="306" x2="132" y2="375" stroke="#2C5282" stroke-width="6" stroke-linecap="round"/>
  <line x1="260" y1="306" x2="268" y2="375" stroke="#2C5282" stroke-width="6" stroke-linecap="round"/>
  <!-- Tronco -->
  <rect x="162" y="190" width="76" height="92" rx="12"
        fill="#1E4EB0" stroke="#4A82E0" stroke-width="2"/>
  ${armsHtml}
  ${headHtml}`;
}

/* ── ANIMAÇÕES DE CABEÇA ─────────────────────────────── */

function animHeadRotation() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ dimArms: true, hideHead: true })}

  <!-- Setas indicadoras -->
  <path d="M 142 135 L 118 135" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>
  <path d="M 258 135 L 282 135" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>

  <!-- Grupo animado: cabeça + pescoço -->
  <g>
    <line x1="200" y1="190" x2="200" y2="168"
          stroke="#10B981" stroke-width="14" stroke-linecap="round"
          style="filter:drop-shadow(0 0 6px #10B98188)"/>
    <circle cx="200" cy="135" r="34" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"
            style="filter:drop-shadow(0 0 6px #10B98188)"/>
    <circle cx="188" cy="128" r="4.5" fill="#1E293B"/>
    <circle cx="212" cy="128" r="4.5" fill="#1E293B"/>
    <path d="M 187 148 Q 200 160 213 148" stroke="#92400E" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="translate"
      values="0,0; -24,0; 0,0; 24,0; 0,0"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      dur="4s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
      additive="sum"/>
  </g>
</svg>`;
}

function animHeadTilt() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ dimArms: true, hideHead: true })}

  <!-- Setas -->
  <path d="M 146 100 Q 152 80 168 82" stroke="#F59E0B" stroke-width="3"
        fill="none" stroke-linecap="round" marker-end="url(#arr)"/>
  <path d="M 254 100 Q 248 80 232 82" stroke="#F59E0B" stroke-width="3"
        fill="none" stroke-linecap="round" marker-end="url(#arr)"/>

  <!-- Cabeça animada (inclina em torno do topo do pescoço) -->
  <g>
    <line x1="200" y1="190" x2="200" y2="168"
          stroke="#10B981" stroke-width="14" stroke-linecap="round"/>
    <circle cx="200" cy="135" r="34" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"
            style="filter:drop-shadow(0 0 6px #10B98188)"/>
    <circle cx="188" cy="128" r="4.5" fill="#1E293B"/>
    <circle cx="212" cy="128" r="4.5" fill="#1E293B"/>
    <path d="M 187 148 Q 200 160 213 148" stroke="#92400E" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 200 168; -20 200 168; 0 200 168; 20 200 168; 0 200 168"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      dur="4s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
      additive="sum"/>
  </g>
</svg>`;
}

function animHeadNod() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ dimArms: true, hideHead: true })}

  <!-- Setas cima/baixo -->
  <path d="M 200 88 L 200 68" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>
  <path d="M 200 182 L 200 196" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>

  <!-- Cabeça animada: nod forward/back -->
  <g>
    <line x1="200" y1="190" x2="200" y2="168"
          stroke="#10B981" stroke-width="14" stroke-linecap="round"/>
    <circle cx="200" cy="135" r="34" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"
            style="filter:drop-shadow(0 0 6px #10B98188)"/>
    <circle cx="188" cy="128" r="4.5" fill="#1E293B"/>
    <circle cx="212" cy="128" r="4.5" fill="#1E293B"/>
    <path d="M 187 148 Q 200 160 213 148" stroke="#92400E" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 200 168; 15 200 168; 0 200 168; -12 200 168; 0 200 168"
      keyTimes="0; 0.3; 0.5; 0.75; 1"
      dur="4s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
      additive="sum"/>
  </g>
</svg>`;
}

function animChinTuck() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ dimArms: true, hideHead: true })}

  <!-- Linha guia de retração -->
  <line x1="235" y1="135" x2="265" y2="135" stroke="#F59E0B" stroke-width="2"
        stroke-dasharray="5,4" opacity=".7"/>
  <path d="M 248 125 L 265 135 L 248 145" stroke="#F59E0B" stroke-width="2.5"
        fill="none" stroke-linecap="round"/>

  <!-- Cabeça animada: translada para trás -->
  <g>
    <line x1="200" y1="190" x2="200" y2="168"
          stroke="#10B981" stroke-width="14" stroke-linecap="round"/>
    <circle cx="200" cy="135" r="34" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"
            style="filter:drop-shadow(0 0 6px #10B98188)"/>
    <circle cx="188" cy="128" r="4.5" fill="#1E293B"/>
    <circle cx="212" cy="128" r="4.5" fill="#1E293B"/>
    <path d="M 187 148 Q 200 160 213 148" stroke="#92400E" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>
    <!-- Chin tuck: ligeira retração (translação para trás = para cima no ecrã = y negativo) -->
    <animateTransform attributeName="transform" type="translate"
      values="0,0; 0,10; 0,0"
      keyTimes="0; 0.5; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      additive="sum"/>
  </g>
</svg>`;
}

/* ── ANIMAÇÕES DE BRAÇOS ─────────────────────────────── */

function animArmRaiseFront() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ hideArms: true })}

  <!-- Setas para cima -->
  <path d="M 95 195 L 95 155" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>
  <path d="M 305 195 L 305 155" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>

  <!-- Braço esquerdo animado (roda em torno do ombro esquerdo) -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="162" y1="210" x2="128" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <line x1="128" y1="258" x2="116" y2="298"
          stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
    <circle cx="113" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 162 210; 68 162 210; 0 162 210"
      keyTimes="0; 0.5; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.45 0 0.2 1; 0.45 0 0.2 1"
      additive="sum"/>
  </g>

  <!-- Braço direito animado -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="238" y1="210" x2="272" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <line x1="272" y1="258" x2="284" y2="298"
          stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
    <circle cx="287" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 238 210; -68 238 210; 0 238 210"
      keyTimes="0; 0.5; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.45 0 0.2 1; 0.45 0 0.2 1"
      additive="sum"/>
  </g>
</svg>`;
}

function animArmRaiseSide() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ hideArms: true })}

  <!-- Setas laterais -->
  <path d="M 100 220 L 70 220" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>
  <path d="M 300 220 L 330 220" stroke="#F59E0B" stroke-width="3"
        stroke-linecap="round" marker-end="url(#arr)"/>

  <!-- Linha guia horizontal -->
  <line x1="40" y1="210" x2="360" y2="210" stroke="rgba(255,255,255,.12)"
        stroke-width="2" stroke-dasharray="6,5"/>

  <!-- Braço esquerdo animado (eleva para o lado) -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="162" y1="210" x2="128" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <line x1="128" y1="258" x2="116" y2="298"
          stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
    <circle cx="113" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 162 210; 62 162 210; 0 162 210"
      keyTimes="0; 0.5; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.45 0 0.2 1; 0.45 0 0.2 1"
      additive="sum"/>
  </g>

  <!-- Braço direito animado -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="238" y1="210" x2="272" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <line x1="272" y1="258" x2="284" y2="298"
          stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
    <circle cx="287" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 238 210; -62 238 210; 0 238 210"
      keyTimes="0; 0.5; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.45 0 0.2 1; 0.45 0 0.2 1"
      additive="sum"/>
  </g>
</svg>`;
}

function animElbowFlex() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ hideArms: true })}

  <!-- Arcos de flexão -->
  <path d="M 116 298 Q 80 240 128 210" stroke="#F59E0B" stroke-width="2"
        fill="none" stroke-dasharray="5,4" opacity=".7"/>
  <path d="M 284 298 Q 320 240 272 210" stroke="#F59E0B" stroke-width="2"
        fill="none" stroke-dasharray="5,4" opacity=".7"/>

  <!-- Braço esquerdo: parte superior fixa, antebraço anima -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <!-- Braço superior (imóvel) -->
    <line x1="162" y1="210" x2="128" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <!-- Antebraço animado em torno do cotovelo -->
    <g>
      <line x1="128" y1="258" x2="116" y2="298"
            stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
      <circle cx="113" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
      <animateTransform attributeName="transform" type="rotate"
        values="0 128 258; -100 128 258; 0 128 258"
        keyTimes="0; 0.5; 1"
        dur="3s" repeatCount="indefinite" calcMode="spline"
        keySplines="0.45 0 0.2 1; 0.45 0 0.2 1"
        additive="sum"/>
    </g>
  </g>

  <!-- Braço direito: parte superior fixa, antebraço anima -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="238" y1="210" x2="272" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <g>
      <line x1="272" y1="258" x2="284" y2="298"
            stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
      <circle cx="287" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
      <animateTransform attributeName="transform" type="rotate"
        values="0 272 258; 100 272 258; 0 272 258"
        keyTimes="0; 0.5; 1"
        dur="3s" repeatCount="indefinite" calcMode="spline"
        keySplines="0.45 0 0.2 1; 0.45 0 0.2 1"
        additive="sum"/>
    </g>
  </g>
</svg>`;
}

function animShoulderRoll() {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${figBase({ hideArms: true })}

  <!-- Círculos de rotação nos ombros -->
  <circle cx="162" cy="210" r="22" fill="none" stroke="#F59E0B" stroke-width="2"
          stroke-dasharray="5,4" opacity=".7"/>
  <circle cx="238" cy="210" r="22" fill="none" stroke="#F59E0B" stroke-width="2"
          stroke-dasharray="5,4" opacity=".7"/>
  <!-- Ponto de rotação -->
  <circle cx="162" cy="210" r="5" fill="#F59E0B" opacity=".8"/>
  <circle cx="238" cy="210" r="5" fill="#F59E0B" opacity=".8"/>

  <!-- Braços com rotação dos ombros (translação circular) -->
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="162" y1="210" x2="128" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <line x1="128" y1="258" x2="116" y2="298"
          stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
    <circle cx="113" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
    <animateTransform attributeName="transform" type="translate"
      values="0,0; 8,-14; 0,-18; -8,-14; 0,0; 8,14; 0,18; -8,14; 0,0"
      keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
      additive="sum"/>
  </g>
  <g style="filter:drop-shadow(0 0 5px #10B98166)">
    <line x1="238" y1="210" x2="272" y2="258"
          stroke="#10B981" stroke-width="15" stroke-linecap="round"/>
    <line x1="272" y1="258" x2="284" y2="298"
          stroke="#10B981" stroke-width="13" stroke-linecap="round"/>
    <circle cx="287" cy="308" r="13" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>
    <animateTransform attributeName="transform" type="translate"
      values="0,0; -8,-14; 0,-18; 8,-14; 0,0; -8,14; 0,18; 8,14; 0,0"
      keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
      dur="3s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
      additive="sum"/>
  </g>
</svg>`;
}

/* ── ANIMAÇÕES DE MÃOS (close-up) ───────────────────── */

/* Mão esquerda vista dorsal, close-up */
function handBase({ color = '#3B82F6' } = {}) {
  return `
  <!-- Pulso -->
  <rect x="118" y="272" width="64" height="30" rx="10"
        fill="${color}" stroke="#60A5FA" stroke-width="2" opacity=".9"/>
  <!-- Palma -->
  <ellipse cx="150" cy="228" rx="52" ry="45"
           fill="${color}" stroke="#60A5FA" stroke-width="2"/>
  <!-- Polegar -->
  <line x1="180" y1="248" x2="212" y2="208"
        stroke="${color}" stroke-width="18" stroke-linecap="round"/>`;
}

function fingerLines({ spread = false, closed = false } = {}) {
  /* Os dedos são linhas de base->ponta */
  const angles = spread
    ? [[-30, 185], [-12, 168], [7, 162], [28, 168]]
    : [[-18, 185], [-5, 172], [10, 168], [23, 172]];
  const tips = closed
    ? [[160, 245], [150, 238], [148, 235], [155, 240]]
    : [
        [150 + Math.round(Math.sin((-18 * Math.PI) / 180) * 75), 242 - Math.round(Math.cos((-18 * Math.PI) / 180) * 75)],
        [150 + Math.round(Math.sin((-5  * Math.PI) / 180) * 80), 240 - Math.round(Math.cos((-5  * Math.PI) / 180) * 80)],
        [150 + Math.round(Math.sin(( 10 * Math.PI) / 180) * 80), 240 - Math.round(Math.cos(( 10 * Math.PI) / 180) * 80)],
        [150 + Math.round(Math.sin(( 23 * Math.PI) / 180) * 72), 242 - Math.round(Math.cos(( 23 * Math.PI) / 180) * 72)],
      ];
  const bases = [
    [150 + Math.round(Math.sin((-18 * Math.PI) / 180) * 20), 240 - Math.round(Math.cos((-18 * Math.PI) / 180) * 20)],
    [150 + Math.round(Math.sin((-5  * Math.PI) / 180) * 18), 240 - Math.round(Math.cos((-5  * Math.PI) / 180) * 18)],
    [150 + Math.round(Math.sin(( 10 * Math.PI) / 180) * 16), 240 - Math.round(Math.cos(( 10 * Math.PI) / 180) * 16)],
    [150 + Math.round(Math.sin(( 23 * Math.PI) / 180) * 18), 240 - Math.round(Math.cos(( 23 * Math.PI) / 180) * 18)],
  ];
  return bases.map((b, i) =>
    `<line x1="${b[0]}" y1="${b[1]}" x2="${tips[i][0]}" y2="${tips[i][1]}"
           stroke="#10B981" stroke-width="16" stroke-linecap="round"/>`
  ).join('\n  ');
}

function animHandOpenClose() {
  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${handBase({ color: '#1E4EB0' })}
  <!-- Polegar animado -->
  <line x1="180" y1="248" stroke="#10B981" stroke-width="18" stroke-linecap="round"
        style="filter:drop-shadow(0 0 5px #10B98166)">
    <animate attributeName="x2" values="212;195;212" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="208;233;208" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Indicador -->
  <line x1="137" y1="222" stroke="#10B981" stroke-width="16" stroke-linecap="round"
        style="filter:drop-shadow(0 0 5px #10B98166)">
    <animate attributeName="x2" values="128;138;128" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="148;220;148" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Médio -->
  <line x1="150" y1="218" stroke="#10B981" stroke-width="16" stroke-linecap="round">
    <animate attributeName="x2" values="150;150;150" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="y2" values="140;217;140" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Anelar -->
  <line x1="163" y1="220" stroke="#10B981" stroke-width="16" stroke-linecap="round">
    <animate attributeName="x2" values="169;163;169" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="144;219;144" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Mindinho -->
  <line x1="175" y1="227" stroke="#10B981" stroke-width="14" stroke-linecap="round">
    <animate attributeName="x2" values="183;175;183" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="155;225;155" dur="2s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>

  <!-- Labels -->
  <text x="150" y="305" text-anchor="middle" font-size="13" fill="#8BA3BF" font-family="Segoe UI, sans-serif">Abrir ↔ Fechar</text>
</svg>`;
}

function animWristRotation() {
  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  <!-- Círculo de rotação guia -->
  <circle cx="150" cy="210" r="80" fill="none" stroke="rgba(255,255,255,.1)"
          stroke-width="2" stroke-dasharray="6,5"/>
  <!-- Seta circular -->
  <path d="M 230 210 a 80,80 0 1 1 -1,0" stroke="#F59E0B" stroke-width="2.5" fill="none"
        stroke-dasharray="12,180" stroke-linecap="round" marker-end="url(#arr)"/>

  <!-- Grupo mão animada em rotação -->
  <g style="transform-origin:150px 285px">
    ${handBase({ color: '#1E4EB0' })}
    <!-- Dedos estendidos -->
    <line x1="137" y1="222" x2="128" y2="148" stroke="#10B981" stroke-width="16" stroke-linecap="round"/>
    <line x1="150" y1="218" x2="150" y2="140" stroke="#10B981" stroke-width="16" stroke-linecap="round"/>
    <line x1="163" y1="220" x2="169" y2="144" stroke="#10B981" stroke-width="16" stroke-linecap="round"/>
    <line x1="175" y1="227" x2="183" y2="155" stroke="#10B981" stroke-width="14" stroke-linecap="round"/>
    <line x1="180" y1="248" x2="212" y2="208" stroke="#10B981" stroke-width="18" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate"
      values="0 150 285; 180 150 285; 360 150 285"
      keyTimes="0; 0.5; 1"
      dur="4s" repeatCount="indefinite" calcMode="linear"/>
  </g>

  <text x="150" y="310" text-anchor="middle" font-size="13" fill="#8BA3BF" font-family="Segoe UI, sans-serif">Rodar o punho</text>
</svg>`;
}

function animFingerSpread() {
  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${handBase({ color: '#1E4EB0' })}

  <!-- Polegar animado -->
  <line x1="180" y1="248" stroke="#10B981" stroke-width="18" stroke-linecap="round"
        style="filter:drop-shadow(0 0 5px #10B98166)">
    <animate attributeName="x2" values="212;224;212" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="208;198;208" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Indicador: abre para esquerda -->
  <line x1="137" y1="222" stroke="#10B981" stroke-width="16" stroke-linecap="round">
    <animate attributeName="x2" values="128;110;128" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="148;140;148" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Médio: sobe -->
  <line x1="150" y1="218" x2="150" stroke="#10B981" stroke-width="16" stroke-linecap="round">
    <animate attributeName="y2" values="140;124;140" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Anelar: abre para direita -->
  <line x1="163" y1="220" stroke="#10B981" stroke-width="16" stroke-linecap="round">
    <animate attributeName="x2" values="169;184;169" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="144;136;144" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>
  <!-- Mindinho: abre mais para direita -->
  <line x1="175" y1="227" stroke="#10B981" stroke-width="14" stroke-linecap="round">
    <animate attributeName="x2" values="183;200;183" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2" values="155;148;155" dur="2.5s" repeatCount="indefinite"
             calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>

  <text x="150" y="308" text-anchor="middle" font-size="13" fill="#8BA3BF" font-family="Segoe UI, sans-serif">Afastar ↔ Juntar dedos</text>
</svg>`;
}

function animPinch() {
  /* 4 fases: polegar toca indicador, médio, anelar, mindinho */
  const fingerPositions = [
    [128, 148], /* indicador */
    [150, 140], /* médio */
    [169, 144], /* anelar */
    [183, 155], /* mindinho */
  ];
  const thumbTargets = fingerPositions;
  const tValues = thumbTargets.map(p => `${p[0]},${p[1]}`).join(';');
  const dur = 5;

  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">
  ${SVG_DEFS}
  ${handBase({ color: '#1E4EB0' })}

  <!-- Dedos estendidos (estáticos) -->
  <line x1="137" y1="222" x2="128" y2="148" stroke="#3B82F6" stroke-width="16" stroke-linecap="round"/>
  <line x1="150" y1="218" x2="150" y2="140" stroke="#3B82F6" stroke-width="16" stroke-linecap="round"/>
  <line x1="163" y1="220" x2="169" y2="144" stroke="#3B82F6" stroke-width="16" stroke-linecap="round"/>
  <line x1="175" y1="227" x2="183" y2="155" stroke="#3B82F6" stroke-width="14" stroke-linecap="round"/>

  <!-- Pontos de toque pulsantes em cada dedo -->
  <circle r="10" fill="#F59E0B" opacity="0">
    <animate attributeName="cx" values="128;128;150;150;169;169;183;183;128" dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
    <animate attributeName="cy" values="148;148;140;140;144;144;155;155;148" dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/>
    <animate attributeName="opacity" values="0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0"
             keyTimes="0;0.06;0.18;0.24;0.31;0.37;0.49;0.55;0.56;0.62;0.74;0.80;0.81;0.87;0.99;1.0;1.0"
             dur="${dur}s" repeatCount="indefinite"/>
  </circle>

  <!-- Polegar animado: vai a cada dedo em sequência -->
  <line x1="180" y1="248" stroke="#10B981" stroke-width="18" stroke-linecap="round"
        style="filter:drop-shadow(0 0 6px #F59E0B88)">
    <animate attributeName="x2"
      values="212; 212; 128; 128; 150; 150; 169; 169; 183; 183; 212"
      keyTimes="0; 0.05; 0.18; 0.3; 0.43; 0.55; 0.68; 0.8; 0.93; 0.97; 1"
      dur="${dur}s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"/>
    <animate attributeName="y2"
      values="208; 208; 148; 148; 140; 140; 144; 144; 155; 155; 208"
      keyTimes="0; 0.05; 0.18; 0.3; 0.43; 0.55; 0.68; 0.8; 0.93; 0.97; 1"
      dur="${dur}s" repeatCount="indefinite" calcMode="spline"
      keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"/>
  </line>

  <text x="150" y="308" text-anchor="middle" font-size="13" fill="#8BA3BF" font-family="Segoe UI, sans-serif">Polegar toca cada dedo</text>
</svg>`;
}

/* Mapa de animações */
const ANIM_MAP = {
  'head-rotation': animHeadRotation,
  'head-tilt':     animHeadTilt,
  'head-nod':      animHeadNod,
  'chin-tuck':     animChinTuck,
  'arm-raise-front': animArmRaiseFront,
  'arm-raise-side':  animArmRaiseSide,
  'elbow-flex':    animElbowFlex,
  'shoulder-roll': animShoulderRoll,
  'hand-open-close': animHandOpenClose,
  'wrist-rotation':  animWristRotation,
  'finger-spread':   animFingerSpread,
  'pinch':           animPinch,
};


/* ════════════════════════════════════════════════════════════
   3. MOTOR DE VOZ (Web Speech API)
════════════════════════════════════════════════════════════ */

const Speech = {
  synth: window.speechSynthesis,
  voice: null,
  muted: false,

  init() {
    const pick = () => {
      const voices = this.synth.getVoices();
      this.voice = voices.find(v => v.lang === 'pt-PT')
                || voices.find(v => v.lang === 'pt-BR')
                || voices.find(v => v.lang.startsWith('pt'))
                || voices[0] || null;
    };
    pick();
    this.synth.addEventListener('voiceschanged', pick);
  },

  speak(text, { rate = 0.88, pitch = 1.0, interrupt = true } = {}) {
    if (this.muted || !text) return;
    if (interrupt) this.synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = 'pt-PT';
    utt.rate  = rate;
    utt.pitch = pitch;
    if (this.voice) utt.voice = this.voice;
    this.synth.speak(utt);
  },

  stop() { this.synth.cancel(); },
};


/* ════════════════════════════════════════════════════════════
   4. CÂMARA + DETEÇÃO DE MOVIMENTO
════════════════════════════════════════════════════════════ */

const Camera = {
  video:       null,
  canvas:      null,
  ctx:         null,
  prevData:    null,
  rafId:       null,
  stream:      null,
  active:      false,
  onMotion:    null,

  async start(videoEl, canvasEl, onMotionCb) {
    this.video    = videoEl;
    this.canvas   = canvasEl;
    this.ctx      = canvasEl.getContext('2d');
    this.onMotion = onMotionCb;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' }, audio: false,
      });
      videoEl.srcObject = this.stream;
      videoEl.classList.add('active');
      this.active = true;
      videoEl.addEventListener('loadeddata', () => this.detectLoop(), { once: true });
      return true;
    } catch {
      return false;
    }
  },

  detectLoop() {
    if (!this.active) return;
    const W = 320, H = 240;
    this.canvas.width  = W;
    this.canvas.height = H;
    this.ctx.drawImage(this.video, 0, 0, W, H);
    const curr = this.ctx.getImageData(0, 0, W, H).data;

    if (this.prevData) {
      let diff = 0;
      for (let i = 0; i < curr.length; i += 16) { /* amostrar cada 4º pixel */
        diff += Math.abs(curr[i] - this.prevData[i]);
      }
      const score = Math.min(100, Math.round(diff / (curr.length / 16) * 4));
      if (this.onMotion) this.onMotion(score);
    }

    this.prevData = new Uint8ClampedArray(curr);
    this.rafId = requestAnimationFrame(() => {
      setTimeout(() => this.detectLoop(), 120); /* ~8 fps — suficiente */
    });
  },

  stop() {
    this.active = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    this.video?.classList.remove('active');
    this.stream   = null;
    this.prevData = null;
  },
};


/* ════════════════════════════════════════════════════════════
   5. HISTÓRICO (localStorage)
════════════════════════════════════════════════════════════ */

const History = {
  KEY: 'remotiva_history',

  load() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },

  save(entry) {
    const h = this.load();
    h.unshift(entry);
    localStorage.setItem(this.KEY, JSON.stringify(h.slice(0, 50)));
  },

  clear() { localStorage.removeItem(this.KEY); },
};


/* ════════════════════════════════════════════════════════════
   6. ESTADO DA APLICAÇÃO
════════════════════════════════════════════════════════════ */

const State = {
  screen:          'home',
  exercises:       [],    /* lista de exercícios da sessão */
  exIndex:         0,     /* exercício atual */
  repDone:         0,
  running:         false,
  paused:          false,
  sessionStart:    null,
  sessionResults:  [],
  phaseIndex:      0,
  timerInterval:   null,
  phaseInterval:   null,
  motionTotal:     0,
  motionSamples:   0,
  elapsedRep:      0,     /* ms decorridos nesta repetição */
};


/* ════════════════════════════════════════════════════════════
   7. CONTROLADOR DO EXERCÍCIO
════════════════════════════════════════════════════════════ */

const ExCtrl = {
  get exercise()  { return State.exercises[State.exIndex]; },
  get isLast()    { return State.exIndex >= State.exercises.length - 1; },
  circum: 2 * Math.PI * 48, /* 301.6px — timer SVG r=48 */

  /* Carrega o exercício atual no ecrã */
  load() {
    const ex = this.exercise;
    if (!ex) { App.showSummary(); return; }

    /* Atualiza UI */
    el('exercise-name').textContent = ex.name;
    el('exercise-desc').textContent = ex.desc;
    el('rep-done').textContent  = '0';
    el('rep-total').textContent = ex.reps;
    el('phase-text').textContent = 'Pronto para começar';
    el('timer-seconds').textContent = ex.repDuration;
    el('btn-start-pause').textContent = '▶ Iniciar';
    el('btn-start-pause').classList.remove('running');

    /* Barra de progresso da sessão */
    const pct = Math.round((State.exIndex / State.exercises.length) * 100);
    el('progress-fill').style.width = pct + '%';
    el('progress-bar').setAttribute('aria-valuenow', pct);
    el('session-counter').textContent =
      `Exercício ${State.exIndex + 1} de ${State.exercises.length}`;

    /* Animação SVG */
    const builder = ANIM_MAP[ex.animId];
    el('animation-stage').innerHTML = builder ? builder() : '';

    /* Timer ring reset */
    el('timer-circle').style.strokeDasharray  = this.circum;
    el('timer-circle').style.strokeDashoffset = 0;

    State.repDone    = 0;
    State.phaseIndex = 0;
    State.elapsedRep = 0;
    State.running    = false;
    State.paused     = false;

    /* Instrução de voz */
    setTimeout(() => Speech.speak(ex.introAudio), 400);
  },

  /* Inicia / retoma */
  start() {
    State.running = true;
    State.paused  = false;
    el('btn-start-pause').textContent = '⏸ Pausar';
    el('btn-start-pause').classList.add('running');
    el('phase-text').textContent = this.exercise.phases[0];
    Speech.speak(this.exercise.phases[0], { rate: 1.0 });
    this.startTimers();
  },

  /* Pausa */
  pause() {
    State.paused = true;
    el('btn-start-pause').textContent = '▶ Retomar';
    el('btn-start-pause').classList.remove('running');
    el('phase-text').textContent = '— Pausado —';
    this.clearTimers();
    /* Pausa animação SVG */
    el('animation-stage').querySelector('svg')?.pauseAnimations?.();
    Speech.speak('Exercício pausado.', { interrupt: true });
  },

  /* Retoma após pausa */
  resume() {
    State.paused = false;
    el('btn-start-pause').textContent = '⏸ Pausar';
    el('btn-start-pause').classList.add('running');
    el('phase-text').textContent = this.exercise.phases[State.phaseIndex % this.exercise.phases.length];
    el('animation-stage').querySelector('svg')?.unpauseAnimations?.();
    this.startTimers();
  },

  startTimers() {
    const TICK = 100; /* ms */
    const repMs = this.exercise.repDuration * 1000;

    this.clearTimers();

    /* Timer principal (por repetição) */
    State.timerInterval = setInterval(() => {
      State.elapsedRep += TICK;
      const progress = State.elapsedRep / repMs;
      const remaining = Math.ceil((repMs - State.elapsedRep) / 1000);

      /* Atualiza ring */
      el('timer-circle').style.strokeDashoffset = this.circum * progress;
      el('timer-seconds').textContent = Math.max(0, remaining);

      if (State.elapsedRep >= repMs) {
        /* Uma repetição concluída */
        State.repDone++;
        State.elapsedRep = 0;
        el('rep-done').textContent = State.repDone;
        el('timer-circle').style.strokeDashoffset = 0;

        if (State.repDone >= this.exercise.reps) {
          this.completeExercise();
        }
      }
    }, TICK);

    /* Fases de voz */
    const phaseDur = this.exercise.phaseDuration;
    State.phaseInterval = setInterval(() => {
      State.phaseIndex++;
      const phase = this.exercise.phases[State.phaseIndex % this.exercise.phases.length];
      el('phase-text').textContent = phase;
      Speech.speak(phase, { rate: 1.0, interrupt: false });
    }, phaseDur);
  },

  clearTimers() {
    clearInterval(State.timerInterval);
    clearInterval(State.phaseInterval);
  },

  completeExercise() {
    this.clearTimers();
    State.running = false;

    const avgMotion = State.motionSamples > 0
      ? Math.round(State.motionTotal / State.motionSamples) : null;

    State.sessionResults.push({
      name:       this.exercise.name,
      reps:       State.repDone,
      motionAvg:  avgMotion,
    });

    State.motionTotal   = 0;
    State.motionSamples = 0;

    /* Feedback visual */
    const feedbacks = [
      { e: '🎉', m: 'Muito Bem!' },
      { e: '💪', m: 'Excelente!' },
      { e: '⭐', m: 'Fantástico!' },
      { e: '🏅', m: 'Parabéns!' },
    ];
    const fb = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    el('feedback-emoji').textContent = fb.e;
    el('feedback-msg').textContent   = fb.m;
    el('feedback-overlay').hidden = false;
    setTimeout(() => { el('feedback-overlay').hidden = true; }, 2500);

    Speech.speak(this.exercise.doneAudio, { interrupt: true });

    /* Avança após 3s */
    setTimeout(() => {
      State.exIndex++;
      if (State.exIndex >= State.exercises.length) {
        App.showSummary();
      } else {
        this.load();
      }
    }, 3000);
  },

  skip() {
    this.clearTimers();
    State.sessionResults.push({
      name: this.exercise.name,
      reps: State.repDone,
      motionAvg: null,
    });
    State.exIndex++;
    if (State.exIndex >= State.exercises.length) {
      App.showSummary();
    } else {
      this.load();
    }
  },
};


/* ════════════════════════════════════════════════════════════
   8. APLICAÇÃO PRINCIPAL
════════════════════════════════════════════════════════════ */

function el(id) { return document.getElementById(id); }

const ENCOURAGE = [
  'Excelente! Continue assim!',
  'Muito bem! Está a fazer um trabalho incrível!',
  'Ótimo esforço! Os seus músculos estão a responder!',
  'Fantástico! Cada movimento conta!',
  'Parabéns! A persistência é a chave da recuperação!',
];

const App = {
  init() {
    Speech.init();
    this.bindEvents();
    this.showHistoryStrip();
  },

  /* ── Transição de ecrã ─────────────────────────── */
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    el('screen-' + id).classList.add('active');
    State.screen = id;
  },

  /* ── Ecrã inicial ──────────────────────────────── */
  showHistoryStrip() {
    const h = History.load();
    if (h.length === 0) return;
    const last = h[0];
    el('history-strip-text').textContent =
      `Última sessão: ${last.date} · ${last.exerciseCount} exercícios · ${last.totalReps} reps`;
    el('history-strip').hidden = false;
  },

  /* ── Iniciar sessão ────────────────────────────── */
  startSession(category) {
    let list;
    if (category === 'completo') {
      list = [
        ...EXERCISES.cabeca,
        ...EXERCISES.bracos,
        ...EXERCISES.maos,
      ];
    } else {
      list = EXERCISES[category] || [];
    }
    if (!list.length) return;

    State.exercises      = list;
    State.exIndex        = 0;
    State.sessionResults = [];
    State.sessionStart   = Date.now();

    this.showScreen('session');
    ExCtrl.load();

    const catNames = { cabeca: 'Cabeça', bracos: 'Braços', maos: 'Mãos', completo: 'Sessão Completa' };
    Speech.speak(`A iniciar: ${catNames[category]}. ${list[0].introAudio}`);
  },

  /* ── Resumo da sessão ──────────────────────────── */
  showSummary() {
    ExCtrl.clearTimers();
    Camera.stop();

    const results   = State.sessionResults;
    const duration  = Math.max(1, Math.round((Date.now() - State.sessionStart) / 60000));
    const totalReps = results.reduce((s, r) => s + (r.reps || 0), 0);

    el('stat-exercises').textContent = results.length;
    el('stat-reps').textContent      = totalReps;
    el('stat-time').textContent      = duration + 'm';

    const msg = totalReps > 20
      ? 'Excelente trabalho hoje! Continue assim!'
      : 'Bom trabalho! Cada sessão é uma vitória!';
    el('complete-msg').textContent = msg;

    const listEl = el('completed-list');
    listEl.innerHTML = results.map(r => `
      <div class="completed-item">
        <span class="completed-check">✓</span>
        <span class="completed-name">${r.name}</span>
        <span class="completed-reps">${r.reps} rep</span>
      </div>`).join('');

    /* Guardar histórico */
    const today = new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    History.save({
      date:          today,
      exerciseCount: results.length,
      totalReps,
      duration,
    });

    this.showScreen('complete');
    Speech.speak(msg + ' ' + ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]);
  },

  /* ── Ecrã histórico ────────────────────────────── */
  showHistory() {
    const h = History.load();
    const listEl = el('history-list');
    if (!h.length) {
      listEl.innerHTML = '<p class="history-empty">Ainda não há sessões registadas.</p>';
    } else {
      listEl.innerHTML = h.map(s => `
        <div class="history-entry">
          <span class="history-entry-date">${s.date}</span>
          <div class="history-entry-info">
            <span class="history-badge">💪 ${s.exerciseCount} exercícios</span>
            <span class="history-badge">🔁 ${s.totalReps} reps</span>
            <span class="history-badge">⏱ ${s.duration}m</span>
          </div>
        </div>`).join('');
    }
    this.showScreen('history');
  },

  /* ── Ligação de eventos ────────────────────────── */
  bindEvents() {
    /* Categorias */
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => this.startSession(btn.dataset.category));
    });

    /* Iniciar / Pausar / Retomar */
    el('btn-start-pause').addEventListener('click', () => {
      if (!State.running && !State.paused) {
        ExCtrl.start();
      } else if (State.running && !State.paused) {
        ExCtrl.pause();
      } else if (State.paused) {
        ExCtrl.resume();
      }
    });

    /* Repetir instrução áudio */
    el('btn-repeat-audio').addEventListener('click', () => {
      if (ExCtrl.exercise) Speech.speak(ExCtrl.exercise.introAudio, { interrupt: true });
    });

    /* Saltar exercício */
    el('btn-skip').addEventListener('click', () => ExCtrl.skip());

    /* Silenciar */
    el('btn-mute').addEventListener('click', () => {
      Speech.muted = !Speech.muted;
      if (Speech.muted) { Speech.stop(); }
      el('btn-mute').textContent   = Speech.muted ? '🔇' : '🔊';
      el('btn-mute').title         = Speech.muted ? 'Ativar voz' : 'Silenciar voz';
      el('btn-mute').setAttribute('aria-label', Speech.muted ? 'Ativar voz' : 'Silenciar voz');
    });

    /* Câmara */
    el('btn-enable-camera').addEventListener('click', async () => {
      const ok = await Camera.start(
        el('camera-video'),
        el('motion-canvas'),
        (score) => {
          State.motionTotal   += score;
          State.motionSamples++;
          const bar = el('motion-bar');
          bar.style.width      = score + '%';
          bar.style.background = score > 25 ? '#10B981' : score > 10 ? '#F59E0B' : '#3B82F6';
        }
      );
      if (ok) {
        el('camera-placeholder').style.display = 'none';
        el('motion-bar-wrap').hidden = false;
      } else {
        Speech.speak('Não foi possível aceder à câmara. Verifique as permissões do navegador.');
        el('btn-enable-camera').textContent = 'Câmara indisponível';
        el('btn-enable-camera').disabled    = true;
      }
    });

    /* Sair da sessão */
    el('btn-session-exit').addEventListener('click', () => {
      if (State.running || State.repDone > 0) {
        el('dialog-exit').showModal();
      } else {
        this.exitSession();
      }
    });
    el('btn-exit-confirm').addEventListener('click', () => {
      el('dialog-exit').close();
      this.exitSession();
    });
    el('btn-exit-cancel').addEventListener('click', () => el('dialog-exit').close());

    /* Resumo */
    el('btn-new-session').addEventListener('click', () => {
      this.showScreen('home');
      this.showHistoryStrip();
    });
    el('btn-go-history').addEventListener('click', () => this.showHistory());

    /* Histórico */
    el('btn-view-history').addEventListener('click', () => this.showHistory());
    el('btn-history-back').addEventListener('click', () => this.showScreen('home'));
    el('btn-clear-history').addEventListener('click', () => {
      if (confirm('Tem a certeza que quer apagar todo o histórico?')) {
        History.clear();
        this.showHistory();
      }
    });
  },

  exitSession() {
    ExCtrl.clearTimers();
    Camera.stop();
    Speech.stop();
    State.running = false;
    State.paused  = false;
    this.showScreen('home');
    this.showHistoryStrip();
  },
};

/* ════════════════════════════════════════════════════════════
   9. ARRANQUE
════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  App.init();

  /* Nota sobre câmara em file:// */
  if (window.location.protocol === 'file:') {
    console.warn(
      '[ReMotiva] A câmara pode não funcionar em file://.\n' +
      'Use um servidor local (ex: extensão "Live Server" no VS Code) para ativar a câmara.'
    );
  }
});
