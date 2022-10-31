import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', promiseHandler);

function promiseHandler(e) {
  e.preventDefault();

  const formElements = e.currentTarget.elements;

  let delay = Number(formElements.delay.value);
  let step = Number(formElements.step.value);
  let amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    
    createPromise(i, delay)
    .then(({ position, delay }) =>
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
    )
    .catch(({ position, delay }) =>
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
    );
    
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}