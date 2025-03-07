import {ref, computed} from 'vue';

export function useTimer(durationInSecs) {

  let timeLeft = ref(durationInSecs * 1000);
  let minutes = ref(Math.floor(durationInSecs / 60));
  let seconds = ref(durationInSecs % 60);
  let timer = ref(null);
  let startTime;

  const setTimer = (durationInSecs) => {
    timeLeft.value = durationInSecs * 1000;
    minutes.value = Math.floor(durationInSecs / 60);
    seconds.value = durationInSecs % 60;
    timer.value = null;
  }

  const start = (durationInSecs = null) => {
    setTimer(durationInSecs);
    resume();
  };

  const resume = () => {
    if (!timer.value) {
      const totalDuration = Math.ceil(timeLeft.value / 1000);
      startTime = new Date().getTime() - (totalDuration * 1000 - timeLeft.value);
      setTimeout(step, 1000);
      timer.value = setInterval(step, 100);
    }
  };

  const pause = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
    timeLeft.value = 0;
    minutes.value = 0;
    seconds.value = 0;

  };

  // update timeLeft, seconds, and minutes
  const step = () => {

    const now = new Date().getTime(); // current time in milliseconds
    const elapsed = now - startTime; // start time in milliseconds

    timeLeft.value = Math.max((durationInSecs * 1000) - elapsed, 0);
    seconds.value = Math.floor((timeLeft.value / 1000) % 60);
    minutes.value = Math.floor(timeLeft.value / 60000);

    if (timeLeft.value === 0) {
      stop();
    }
  };

  const isRunning = computed(() => Boolean(timer.value));
  const formattedTime = computed(() => {
    const paddedSeconds = seconds.value < 10 ? `0${seconds.value}` : seconds.value;
    return `${minutes.value}:${paddedSeconds}`;
  });

  return {
    minutes,
    seconds,
    timeLeft,
    isRunning,
    formattedTime,
    start,
    pause,
    resume,
    stop
  };
}