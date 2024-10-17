import { btnPause, btnStart } from "./elements.js";
import state from "./state.js";
import * as sounds from "./sounds.js";

let intervalId = null;

export function toggleRunning() {
    state.isRunning = document.documentElement.classList.toggle('running')

    if (state.isRunning && state.seconds > 0) {
        play();
    } else {
        pause();
    }
}

export function play() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            if (state.seconds > 0) {
                state.seconds -= 1;
                updateDisplay();
            } else {
                pause();
            }
        }, 1000);
    } else {
        return;
    }

    btnStart.classList.toggle('hide');
    btnPause.classList.toggle('hide');
}

export function pause() {
    if (!state.isRunning) {
        clearInterval(intervalId);
        intervalId = null;

        btnStart.classList.toggle('hide');
        btnPause.classList.toggle('hide');
    }
}

export function set() {
    state.seconds = 0
    state.isRunning = false
    updateDisplay()

    clearInterval(intervalId);
    intervalId = null;

    btnStart.classList.remove('hide');
    btnPause.classList.add('hide');
}

export function plus() {
    state.seconds += 300;
    updateDisplay();
}

export function minus() {
    if (state.seconds <= 300) {
        state.seconds = 0;
    } else {
        state.seconds -= 300;
    }
    updateDisplay()
}

function updateDisplay() {
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const totalSeconds = state.minutes * 60 + state.seconds;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

sounds.btnFlorest.addEventListener('click', () => {
    sounds.buttonAudioFlorest.play()
})

sounds.btnChuva.addEventListener('click', () => {
    sounds.buttonAudioChuva.play()
})

sounds.btnLareira.addEventListener('click', () => {
    sounds.buttonAudioLareira.play()
})

sounds.btnCafeteria.addEventListener('click', () => {
    sounds.buttonAudioCafeteria.play()
})