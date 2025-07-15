console.log("index.js loaded");

const timeDisplay = document.getElementById("time-display"),
  alarmHourInput = document.getElementById("alarm-hour"),
  alarmMinuteInput = document.getElementById("alarm-minute"),
  setAlarmBtn = document.getElementById("set-alarm-btn"),
  stopAlarmBtn = document.getElementById("stop-alarm-btn"),
  alarmStatus = document.getElementById("alarm-status"),
  digitalAlarmSound = document.getElementById("digital-alarm-sound");

let alarmTime = null,
  isAlarmSet = false;

let timeNow = new Date();

function getTimeNowAndRender() {
  let timeNow = new Date(),
    hours = timeNow.getHours(),
    minutes = timeNow.getMinutes(),
    seconds = timeNow.getSeconds();

  hours.toString().length === 1 ? (hours = "0" + hours) : null;
  minutes.toString().length === 1 ? (minutes = "0" + minutes) : null;
  seconds.toString().length === 1 ? (seconds = "0" + seconds) : null;

  timeNow = `${hours}:${minutes}:${seconds}`;
  timeDisplay.textContent = timeNow;
}

function updateTime() {
  setInterval(function () {
    let [hours, minutes, seconds] = timeDisplay.textContent.split(":"),
      timeNow;

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
      digitalAlarmSound.play()
    }
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
    console.log("cest bien 2 ou 1 digit");
    console.log(alarmMinuteInput.value);
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
  alarmStatus.textContent = '';
  isAlarmSet = false;
  alarmTime = null;
});
