import { ref, computed } from 'vue';

export function useTimer(durationInSeconds) {
  const minutes = ref(0);
  const seconds = ref(0);
  const timeLeft = ref(durationInSeconds * 1000);
  let timer = null;
  let startTime;

  const start = () => {
    startTime = new Date().getTime();
    resume();
  };

  const resume = () => {
    if (!timer) {
      const totalDuration = Math.ceil(timeLeft.value / 1000);
      startTime = new Date().getTime() - (totalDuration * 1000 - timeLeft.value);
      timer = setInterval(step, 1000);
    }
  };

  const pause = () => {
    if (timer) {
      timeLeft.value = step();
      clearInterval(timer);
      timer = null;
    }
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    timeLeft.value = 0;
    minutes.value = 0;
    seconds.value = 0;
  };

  const step = () => {
    const now = Math.max(0, timeLeft.value - 1);
    minutes.value = Math.floor(now / 60000);
    seconds.value = Math.floor(now / 1000) % 60;
    timeLeft.value = now;

    if (now === 0) {
      stop();
    }

    return now;
  };

  const isRunning = ref(() => Boolean(timer));
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