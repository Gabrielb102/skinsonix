<script setup>
import {useTimer} from "@frontend/composables/useTimer";

const props = defineProps({
  time: Number
})

const {minutes, seconds, timeLeft, isRunning, formattedTime, start, pause, resume, stop} = useTimer(props.time);

defineExpose({
  start,
  resume,
  pause,
  stop,
  isRunning
})
</script>

<template>

  <div>
    <span class="text-neutral-400 text-xl text-center font-light">
      Switch in: {{ formattedTime }}
    </span>
  </div>

</template>