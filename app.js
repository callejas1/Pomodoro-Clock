'use strict';
/*
  A user can specify how many minutes the timer should be set, and with a click on the play button
  it starts counting down!If the user wants to pause the timer, they can do so by clicking the pause button.

  If the timer is running, the user can 't change the session length anymore
  If the timer finishes the timer is replaced by the message: Time 's up!
 
 */

const app = () => {
  // Up & down arrows
  const arrowDown = document.querySelector('.fa-arrow-down');
  const arrowUp = document.querySelector('.fa-arrow-up');

  // Length display (user select)
  const lengthDisplay = document.getElementById('length-select');

  // Minute & seconds display + container
  const timeContainer = document.getElementById('timer-container');
  const minuteDisplay = document.getElementById('minute-display');
  const secondsDisplay = document.getElementById('seconds-display');

  // Play, pause & stop buttons
  const play = document.querySelector('.fa-play');
  const pause = document.querySelector('.fa-pause');
  const stop = document.querySelector('.fa-stop');

  // empty variable will be later used to condition/trigger the countdown
  let timer;
  lengthDisplay.innerText = minuteDisplay.innerText;

  // whenever the seconds aren't 0, the countdown begins
  const pomodoroTimer = () => {
    if (secondsDisplay.innerText != 0) {
      secondsDisplay.innerText--;
    } else if (minuteDisplay.innerText != 0 && secondsDisplay.innerText == 0) {
      secondsDisplay.innerText = 59;
      minuteDisplay.innerText--;
    } else if (minuteDisplay.innerText == 0 && secondsDisplay.innerText == 0) {
      timeContainer.innerText = "Time's up";
    }
  };

  // when arrow up is clicked it will add a number to the currently displaying session length
  const increase = () => {
    minuteDisplay.innerText++;
    lengthDisplay.innerHTML = minuteDisplay.innerText;
  };

  // when arrow down it will decrease a num
  const decrease = () => {
    minuteDisplay.innerHTML--;
    lengthDisplay.innerText = minuteDisplay.innerText;
  };

  // when play is clicked the arrows won't work (to prevent user from changing length)
  const playEvent = () => {
    arrowUp.removeEventListener('click', increase);
    arrowDown.removeEventListener('click', decrease);
    stop.style.visibility = 'visible';
    timer === undefined
      ? (timer = setInterval(pomodoroTimer, 1000))
      : alert('Timer is running');
  };

  // when paused, the interval will be cleared & button can resume playing
  const pauseEvent = () => {
    if (timer != undefined) {
      stopInterval();
      timer = undefined;
    } else if (timer === undefined && secondsDisplay.innerText !== '00') {
      timer = setInterval(pomodoroTimer, 1000);
    }
  };

  // when stopped the icon will be hidden, the interval will be cleared and default time will take place
  const stopEvent = () => {
    stopInterval();
    minuteDisplay.innerText = lengthDisplay.innerText;
    secondsDisplay.innerText = '00';
    timer = undefined;
    arrowUp.addEventListener('click', increase);
    arrowDown.addEventListener('click', decrease);
  };

  // Stop Interval function will stop the interval set within the event listener on play
  const stopInterval = () => clearInterval(timer);

  arrowUp.addEventListener('click', increase);
  arrowDown.addEventListener('click', decrease);
  play.addEventListener('click', playEvent);
  pause.addEventListener('click', pauseEvent);
  stop.addEventListener('click', stopEvent);
};

app();
