//Variables
const sounds = {
    megaKnight: ' mega-knight-clash-royale.mp3',
    sixSeven: ' 67-normal.mp3',
    bruh: ' bruh.mp3',
    catLaughing: ' CarLaugh.mp3',
    aughh: ' Aughh.mp3',
    bloodScrem: ' bloodScrem.mp3',
    fahh: ' fahh.mp3',
    FNAF: ' FNAF.mp3',
    gahDamn: ' gahDamn.mp3',
    getOut: ' getOut.mp3',
    mustard: ' Mustard.mp3',
    rizz: ' Rizz.mp3',
}
let currentSound = null;
let currentButton = null;
const nowPlayingText = document.getElementById('nowPlayingText');


// volume state
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
let currentVolume = volumeSlider.value / 100;


//Audio Playing Logic
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
        const soundID = button.id;
        const src = sounds[soundID];

        //Audio Logic
        if (currentSound){
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        const audio = new Audio(src);
        audio.volume = currentVolume;
        audio.play().catch(e => console.error(e));
        currentSound = audio;
        currentButton = button;

        //UI Updates
        if (currentButton) {
            currentButton.classList.remove('playing');
        }
        button.classList.add('playing');
        nowPlayingText.textContent = button.textContent;
        audio.addEventListener('ended', () => {
            button.classList.remove('playing');
            nowPlayingText.textContent = 'No sound playing';
            currentSound = null;
            currentButton = null;
        });
    })
})

//Volume Control Logic
volumeSlider.addEventListener('input', () => {
    currentVolume = volumeSlider.value / 100;     
    volumeValue.textContent = volumeSlider.value;
    if (currentSound) {
        currentSound.volume = currentVolume;
    }
});

// Additional Controls
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