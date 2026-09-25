
const dancerEl = document.getElementById('dancer');
const instructionEl = document.getElementById('instruction-text');
const routineTrackEl = document.getElementById('routine-track');
const generateBtn = document.getElementById('generate-btn');
const playBtn = document.getElementById('play-btn');

const MOVE_LIBRARY = [
    { emoji: '💃', name: 'Sway Side to Side', class: 'anim-slide' },
    { emoji: '🕺', name: 'The Disco Spin', class: 'anim-spin' },
    { emoji: '🙌', name: 'Hands Up High', class: 'anim-bounce' },
    { emoji: '👏', name: 'Clap It Out', class: 'anim-shake' },
    { emoji: '🤸', name: 'The Flip', class: 'anim-spin' },
    { emoji: '✨', name: 'Magic Sparkle', class: 'anim-bounce' },
    { emoji: '👟', name: 'Footwork Shuffle', class: 'anim-shake' },
    { emoji: '🔥', name: 'Drop it Low', class: 'anim-slide' }
];

let currentRoutine = [];
let isPlaying = false;

function generateRoutine() {
    const length = Math.floor(Math.random() * 4) + 4; // 4 to 8 moves
    const routine = [];
    
    for (let i = 0; i < length; i++) {
        const randomMove = MOVE_LIBRARY[Math.floor(Math.random() * MOVE_LIBRARY.length)];
        routine.push(randomMove);
    }
    
    currentRoutine = routine;
    localStorage.setItem('lastRoutine', JSON.stringify(routine));
    renderRoutine();
    instructionEl.innerText = "New routine ready!";
}

function renderRoutine() {
    routineTrackEl.innerHTML = '';
    currentRoutine.forEach((move, index) => {
        const span = document.createElement('span');
        span.innerText = move.emoji;
        span.id = `move-${index}`;
        routineTrackEl.appendChild(span);
    });
}

async function playRoutine() {
    if (isPlaying || currentRoutine.length === 0) return;
    
    isPlaying = true;
    playBtn.disabled = true;
    generateBtn.disabled = true;

    for (let i = 0; i < currentRoutine.length; i++) {
        const move = currentRoutine[i];
        
        // Update UI
        document.querySelectorAll('.routine-track span').forEach(s => s.classList.remove('active'));
        document.getElementById(`move-${i}`).classList.add('active');
        
        dancerEl.innerText = move.emoji;
        instructionEl.innerText = move.name;
        
        // Apply Animation
        dancerEl.className = 'dancer ' + move.class;
        
        // Wait for move duration
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Reset
    dancerEl.className = 'dancer';
    dancerEl.innerText = '🕺';
    instructionEl.innerText = "Routine Complete! 🌟";
    document.querySelectorAll('.routine-track span').forEach(s => s.classList.remove('active'));
    
    isPlaying = false;
    playBtn.disabled = false;
    generateBtn.disabled = false;
}

// Load saved routine
window.onload = () => {
    const saved = localStorage.getItem('lastRoutine');
    if (saved) {
        currentRoutine = JSON.parse(saved);
        renderRoutine();
    } else {
        generateRoutine();
    }
};

generateBtn.addEventListener('click', generateRoutine);
playBtn.addEventListener('click', playRoutine);