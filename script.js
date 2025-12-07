//variables
const sounds = {
    megaKnight: 'mega-knight-clash-royale.mp3',
    sixSeven: '67-normal.mp3',
    bruh: 'bruh.mp3',
    catLaughing: 'CarLaugh.mp3',
    aughh: 'Aughh.mp3',
    bloodScrem: 'bloodScrem.mp3',
    fahh: 'fahh.mp3',
    FNAF: 'FNAF.mp3',
    gahDamn: 'gahDamn.mp3',
    getOut: 'getOut.mp3',
    mustard: 'Mustard.mp3',
    rizz: 'Rizz.mp3',
}
let currentSound = null;
let currentButton = null;
const nowPlayingText = document.getElementById('nowPlayingText');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
let currentVolume = volumeSlider.value / 100;
const muteToggle = document.getElementById('muteToggle');
const speedSelect = document.getElementById('speedSelect');
const loopToggle = document.getElementById('loopToggle');
let isMuted = false;
let currentSpeed = parseFloat(speedSelect.value);
let isLooping = false;

//audio Playing Logic
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
        const soundID = button.id;
        const src = sounds[soundID];
        //Audio Logic
        if (currentSound){
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        if (currentButton) {
            currentButton.classList.remove('playing');
        }
        const audio = new Audio(src);
        audio.volume = currentVolume;
        audio.muted = isMuted;
        audio.playbackRate = currentSpeed;
        audio.loop = isLooping;
        audio.play().catch(e => console.error(e));
        currentSound = audio;
        currentButton = button;
        
        
        //updates
        button.classList.add('playing');
        nowPlayingText.textContent = button.textContent;
        audio.addEventListener('ended', () => {
            if (!audio.loop) {
                button.classList.remove('playing');
                nowPlayingText.textContent = 'No sound playing';
                currentSound = null;
                currentButton = null;
            }
        });
    })
})

//volume Control Logic
volumeSlider.addEventListener('input', () => {
    currentVolume = volumeSlider.value / 100;     
    volumeValue.textContent = volumeSlider.value;
    if (currentSound) {
        currentSound.volume = currentVolume;
    }
});

//additional Controls
muteToggle.addEventListener('change', () => {
    isMuted = muteToggle.checked;
    if (currentSound) {
        currentSound.muted = isMuted;
    }
});
speedSelect.addEventListener('change', () => {
    currentSpeed = parseFloat(speedSelect.value);
    if (currentSound) {
        currentSound.playbackRate = currentSpeed;
    }
});
loopToggle.addEventListener('change', () => {
    isLooping = loopToggle.checked;
    if (currentSound) {
        currentSound.loop = isLooping;
    }
});

// timer state (trying to make a timer here, not perfect, had to use some help from tools, but not entirely copied)
const timerSecondsInput = document.getElementById('timerSeconds');
const timerSoundSelect = document.getElementById('timerSound');
const startTimerButton = document.getElementById('startTimer');
const timerDisplay = document.getElementById('timerDisplay');
let timerInterval = null;

startTimerButton.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    let remaining = parseInt(timerSecondsInput.value, 10);
    if (isNaN(remaining) || remaining <= 0) {
        return;
    }
    const soundID = timerSoundSelect.value;
    const src = sounds[soundID];
    if (!src) {
        console.error('No sound for timer:', soundID);
        return;
    }
    timerDisplay.textContent = `Timer: ${remaining}s`;
    timerInterval = setInterval(() => {
        remaining--;
        timerDisplay.textContent = `Timer: ${remaining}s`;
        if (remaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            const audio = new Audio(src);
            audio.volume = currentVolume;
            audio.muted = isMuted;
            audio.playbackRate = currentSpeed;
            audio.play().catch(e => console.error(e));
        }
    }, 1000);
});
