import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minutesCounter: document.querySelector('[data-minutes]'),
  secondsCounter: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
const DELAY = 1000

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate(selectedDates);
  },
};

flatpickr('input#datetime-picker', options);

function chooseDate(selectedDates) {
  let selectedDate = selectedDates[0].getTime();

  let currentDate = new Date().getTime();

  if (selectedDate < currentDate) {
    Report.info('Please choose a date in the future');
  }
  if (selectedDate > currentDate) {
    refs.startBtn.disabled = false;

    refs.startBtn.addEventListener('click', () => {
      
      const timerId = setInterval(() => {

        currentDate = new Date().getTime();

        const dateDifference = selectedDate - currentDate;

        renderTimer(convertMs(dateDifference));

        if (dateDifference < DELAY) {
          clearInterval(timerId);
        }
        
      }, DELAY);
    });
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysCounter.textContent = days;
  refs.hoursCounter.textContent = hours;
  refs.minutesCounter.textContent = minutes;
  refs.secondsCounter.textContent = seconds;
}