<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Live Score Overlay — Man City vs Crystal Palace</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- Transparent root so overlay can sit on top of camera -->
  <div id="overlay-root" aria-hidden="false">
    <div id="scoreboard" class="modern">
      <div class="team left">
        <div class="logo-slot" id="logoA"></div>
        <div class="team-name" id="teamA">MAN CITY</div>
      </div>

      <div class="score-center">
        <div class="score-controls">
          <div class="control left-controls">
            <button class="btn small" id="plusA">＋</button>
            <button class="btn small" id="minusA">–</button>
          </div>

          <div class="score-box">
            <span id="scoreA">0</span>
            <span class="dash">–</span>
            <span id="scoreB">0</span>
          </div>

          <div class="control right-controls">
            <button class="btn small" id="plusB">＋</button>
            <button class="btn small" id="minusB">–</button>
          </div>
        </div>
      </div>

      <div class="team right">
        <div class="logo-slot" id="logoB"></div>
        <div class="team-name" id="teamB">CRYSTAL PALACE</div>
      </div>
    </div>

    <!-- GOAL banner (hidden by default) -->
    <div id="goal-banner" class="goal-hide">
      <div class="goal-inner">
        <div class="goal-text">GOAL! ⚽ <span id="goal-player">Player</span></div>
      </div>
    </div>

    <!-- control small panel (toggleable) -->
    <div id="control-panel" class="control-panel-visible">
      <input id="playerName" placeholder="Player name (for GOAL)" />
      <button id="showGoal" class="btn">Show GOAL</button>
      <button id="hidePanel" class="btn">Hide Controls</button>
      <button id="reset" class="btn danger">Reset</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
:root{
  --mc-sky: rgba(94,179,226,0.98); /* Man City sky blue */
  --mc-dark: rgba(6,62,101,0.95);
  --white: #ffffff;
  --glass: rgba(255,255,255,0.06);
}

/* Make body transparent so camera shows through */
html,body{
  height:100%;
  margin:0;
  background: transparent;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  touch-action: manipulation;
}

/* overlay root full-screen, pointer-events ON so buttons clickable */
#overlay-root{
  position:fixed;
  inset:0;
  pointer-events:auto;
}

/* Scoreboard container */
#scoreboard.modern{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
  display:flex;
  align-items:center;
  gap:14px;
  padding: 10px 14px;
  border-radius:12px;
  backdrop-filter: blur(6px);
  background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.03));
  border:1px solid rgba(255,255,255,0.06);
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  min-width: 300px;
  max-width: 94%;
}

/* team columns */
.team{
  display:flex;
  align-items:center;
  gap:10px;
  min-width:90px;
}
.team .team-name{
  color:var(--white);
  font-weight:700;
  font-size:14px;
  letter-spacing:0.6px;
  text-transform:uppercase;
  text-shadow:0 1px 0 rgba(0,0,0,0.4);
}

/* logo slot (transparent circle to paste logos) */
.logo-slot{
  width:36px;
  height:36px;
  border-radius:50%;
  background: rgba(255,255,255,0.03);
  border:1px dashed rgba(255,255,255,0.06);
}

/* center score box */
.score-center{
  display:flex;
  align-items:center;
  justify-content:center;
  flex:1;
}
.score-controls{
  display:flex;
  align-items:center;
  gap:12px;
  width:100%;
  justify-content:center;
}
.score-box{
  display:flex;
  align-items:center;
  color:var(--white);
  font-weight:800;
  font-size:28px;
  padding:6px 12px;
  border-radius:10px;
  background: linear-gradient(90deg, var(--mc-sky), rgba(94,179,226,0.8));
  box-shadow: 0 4px 12px rgba(94,179,226,0.14);
  min-width:130px;
  justify-content:center;
  gap:8px;
}

/* small control buttons */
.btn{
  background: var(--glass);
  color:var(--white);
  border:1px solid rgba(255,255,255,0.06);
  padding:8px 10px;
  border-radius:8px;
  font-weight:700;
  cursor:pointer;
  font-size:13px;
}
.btn.small{
  padding:6px 10px;
  font-size:18px;
  width:40px;
  height:40px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.btn.danger{
  background: rgba(220,50,50,0.9);
}

/* GOAL banner */
#goal-banner{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  top: 90px;
  pointer-events:none; /* so it doesn't block clicks */
}
.goal-inner{
  background: linear-gradient(90deg, #ffd54d, #ffb84d);
  padding:10px 18px;
  border-radius:12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.28);
  min-width: 220px;
  text-align:center;
}
.goal-text{
  font-weight:900;
  color:#08121a;
  font-size:18px;
  letter-spacing:0.6px;
}
.goal-hide{
  opacity:0;
  visibility:hidden;
  transform: translate(-50%, -10px);
  transition: all 230ms ease;
}
.goal-show{
  opacity:1;
  visibility:visible;
  transform: translate(-50%, 0);
}

/* control panel (small) */
#control-panel{
  position: absolute;
  right: 10px;
  bottom: 12px;
  display:flex;
  gap:8px;
  align-items:center;
  padding:8px;
  background: rgba(0,0,0,0.28);
  border-radius:10px;
  backdrop-filter: blur(4px);
}
#control-panel input{
  padding:8px 10px;
  border-radius:8px;
  border:1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  color:var(--white);
  min-width:140px;
}
.control-panel-hidden{ display:none; }

/* small screens tweak */
@media (max-width:420px){
  .team .team-name{ font-size:12px; }
  .score-box{ font-size:22px; min-width:110px; }
  #goal-banner{ top: 80px; }
  }
// Basic overlay script: increment/decrement, goal banner, team name query params
(function(){
  const el = id => document.getElementById(id);
  const scoreA = el('scoreA');
  const scoreB = el('scoreB');
  const plusA = el('plusA');
  const minusA = el('minusA');
  const plusB = el('plusB');
  const minusB = el('minusB');
  const teamA = el('teamA');
  const teamB = el('teamB');
  const goalBanner = el('goal-banner');
  const goalPlayer = el('goal-player');
  const playerInput = el('playerName');
  const showGoalBtn = el('showGoal');
  const hidePanelBtn = el('hidePanel');
  const resetBtn = el('reset');

  function intVal(node){ return parseInt(node.textContent||'0',10); }
  function setScore(node, n){ node.textContent = String(n); }

  plusA.addEventListener('click', ()=> setScore(scoreA, intVal(scoreA)+1));
  minusA.addEventListener('click', ()=> setScore(scoreA, Math.max(0, intVal(scoreA)-1)));
  plusB.addEventListener('click', ()=> setScore(scoreB, intVal(scoreB)+1));
  minusB.addEventListener('click', ()=> setScore(scoreB, Math.max(0, intVal(scoreB)-1)));

  // Show goal banner for 3.5s and auto-hide
  let goalTimer = null;
  function showGoal(text){
    goalPlayer.textContent = text || 'Player';
    goalBanner.classList.remove('goal-hide');
    goalBanner.classList.add('goal-show');
    // auto hide
    if(goalTimer) clearTimeout(goalTimer);
    goalTimer = setTimeout(()=> {
      goalBanner.classList.remove('goal-show');
      goalBanner.classList.add('goal-hide');
    }, 3500);
  }

  showGoalBtn.addEventListener('click', ()=>{
    const name = playerInput.value.trim() || 'Player';
    showGoal(name);
  });

  hidePanelBtn.addEventListener('click', ()=>{
    const panel = document.getElementById('control-panel');
    panel.classList.toggle('control-panel-hidden');
  });

  resetBtn.addEventListener('click', ()=>{
    setScore(scoreA, 0);
    setScore(scoreB, 0);
  });

  // Keyboard shortcuts for quick control (works when overlay is focused)
  document.addEventListener('keydown', (e)=>{
    // + A: ArrowUp/ArrowDown for team A; ArrowUp -> plusA, ArrowDown -> minusA
    if(e.key === 'ArrowUp') { plusA.click(); }
    if(e.key === 'ArrowDown'){ minusA.click(); }
    // Right/Left for team B
    if(e.key === 'ArrowRight'){ plusB.click(); }
    if(e.key === 'ArrowLeft'){ minusB.click(); }
    // G to show goal using current player name
    if(e.key.toLowerCase() === 'g'){ showGoalBtn.click(); }
  });

  // Helper: read URL params for team names and initial scores
  function readParams(){
    const p = new URLSearchParams(window.location.search);
    if(p.get('teamA')) teamA.textContent = decodeURIComponent(p.get('teamA')).toUpperCase();
    if(p.get('teamB')) teamB.textContent = decodeURIComponent(p.get('teamB')).toUpperCase();
    if(p.get('scoreA')) setScore(scoreA, Math.max(0, parseInt(p.get('scoreA'),10)||0));
    if(p.get('scoreB')) setScore(scoreB, Math.max(0, parseInt(p.get('scoreB'),10)||0));
  }
  readParams();

  // expose some helpers for remote control (optional)
  window.overlayControl = {
    setScoreA(n){ setScore(scoreA, Math.max(0, n|0)); },
    setScoreB(n){ setScore(scoreB, Math.max(0, n|0)); },
    showGoal
  };
})();
