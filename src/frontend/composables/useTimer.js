import {ref, computed} from 'vue';

export function useTimer(durationInSecs) {
    const timeLeft = ref(durationInSecs * 1000);
    const timer = ref(null);
    let startTime;
    let pauseTime;

    const start = (durationInSecs = null) => {
        if (durationInSecs !== null) {
            timeLeft.value = durationInSecs * 1000;
        }
        startTime = new Date().getTime();
        timer.value = setInterval(step, 100);
    };

    const resume = () => {
        if (!timer.value) {
            const pauseDuration = new Date().getTime() - pauseTime;
            startTime += pauseDuration;
            timer.value = setInterval(step, 100);
        }
    };

    const pause = () => {
        if (timer.value) {
            clearInterval(timer.value);
            timer.value = null;
            pauseTime = new Date().getTime();
        }
    };

    const stop = () => {
        if (timer.value) {
            clearInterval(timer.value);
            timer.value = null;
        }
        timeLeft.value = 0;
    };

    const step = () => {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        timeLeft.value = Math.max((durationInSecs * 1000) - elapsed, 0);

        if (timeLeft.value === 0) {
            stop();
        }
    };

    const isRunning = computed(() => Boolean(timer.value));
    const minutes = computed(() => Math.floor(timeLeft.value / 60000));
    const seconds = computed(() => Math.floor((timeLeft.value / 1000) % 60));
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