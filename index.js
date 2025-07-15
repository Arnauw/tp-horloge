console.log("index.js loaded");

// #region Digital Clock

const timeDisplay = document.querySelector("#time-display"),
  alarmHourInput = document.querySelector("#alarm-hour"),
  alarmMinuteInput = document.querySelector("#alarm-minute"),
  setAlarmBtn = document.querySelector("#set-alarm-btn"),
  stopAlarmBtn = document.querySelector("#stop-alarm-btn"),
  alarmStatus = document.querySelector("#alarm-status"),
  digitalAlarmSound = document.querySelector("#digital-alarm-sound"),
  analogTickingBtn = document.querySelector("#analog-ticking-btn"),
  analogTickingSound = document.querySelector("#analog-ticking-sound"),
  analogAlarmCheckbox = document.querySelector("#analog-alarm-checkbox"),
  analogAlarmSound = document.querySelector("#analog-alarm-sound");

const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");

let alarmTime = null,
  isAlarmSet = false,
  timeNow;

function getTimeNowAndRender() {
  (timeNow = new Date()),
    (hours = timeNow.getHours()),
    (minutes = timeNow.getMinutes()),
    (seconds = timeNow.getSeconds());

  hours.toString().length === 1 ? (hours = "0" + hours) : null;
  minutes.toString().length === 1 ? (minutes = "0" + minutes) : null;
  seconds.toString().length === 1 ? (seconds = "0" + seconds) : null;

  timeNow = `${hours}:${minutes}:${seconds}`;
  timeDisplay.textContent = timeNow;
}

function updateTime() {
  setInterval(function () {
    let [hours, minutes, seconds] = timeDisplay.textContent.split(":");

    seconds++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }

    if (hours >= 24) {
      hours = 0;
    }

    hours.toString().length === 1 ? (hours = "0" + hours) : null;
    minutes.toString().length === 1 ? (minutes = "0" + minutes) : null;
    seconds.toString().length === 1 ? (seconds = "0" + seconds) : null;

    timeNow = `${hours}:${minutes}:${seconds}`;
    timeDisplay.textContent = timeNow;

    if (isAlarmSet && alarmTime + ":00" === timeNow) {
      console.log("Alarm Launched !!!");

      if (analogAlarmCheckbox.checked) {
        analogAlarmSound.play();
      } else {
        digitalAlarmSound.play();
      }
    }

    if (timeNow.endsWith('00:00')) {
      analogAlarmSound.play();
    }

    // 360 / 60 = 6
    // 360 / 12 = 30
    // Analog clock logic here

    let hourDeg = hours * 30,
      minuteDeg = minutes * 6,
      secondDeg = seconds * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  }, 1000); // 1s interval
}

getTimeNowAndRender();
updateTime();

setAlarmBtn.addEventListener("click", (event) => {
  let isHoursValid = false,
    isMinutesValid = false;

  if (/^\d{1,2}$/.test(alarmHourInput.value) && alarmHourInput.value < 24) {
    isHoursValid = true;
  } else {
    alert(
      `Erreur, la valeur du champ des heures est invalide, 
      sont seulement autorisé les chiffres de 0 a 23`
    );
  }

  if (/^\d{1,2}$/.test(alarmMinuteInput.value) && alarmMinuteInput.value < 60) {
    isMinutesValid = true;
  } else {
    alert(
      `Erreur, la valeur du champ des minutes est invalide, 
      sont seulement autorisé les chiffres de 0 a 59`
    );
  }

  if (isHoursValid && isMinutesValid) {
    alarmTime = `${alarmHourInput.value}:${alarmMinuteInput.value}`;
    isAlarmSet = true;
    alarmStatus.textContent = `Votre alarme sonnera a ${alarmHourInput.value}:${alarmMinuteInput.value}`;
  }
});

stopAlarmBtn.addEventListener("click", (event) => {
  alarmStatus.textContent = "";
  isAlarmSet = false;
  alarmTime = null;
  digitalAlarmSound.pause();
  digitalAlarmSound.currentTime = 0;
  analogAlarmSound.pause();
  analogAlarmSound.currentTime = 0;
});

analogTickingBtn.addEventListener("click", () => {
  console.log("le bouton marche");
  analogTickingSound.play();
});

// #endregion

// #region Analog Clock

// 360 / 60 = 6
// 360 / 24 = 15

// #endregion
