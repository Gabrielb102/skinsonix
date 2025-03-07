<script setup>
import {useTimer} from "@frontend/composables/useTimer";
import {watch} from "vue";

const props = defineProps({
  time: Number
})
const emit = defineEmits(["end"]);

const {minutes, seconds, timeLeft, isRunning, formattedTime, start, pause, resume, stop} = useTimer(props.time);
defineExpose({
  start,
  resume,
  pause,
  stop,
  isRunning
})

watch(isRunning, (newVal, oldVal) => {
  if (!newVal && oldVal && timeLeft.value === 0) {
    emit("end");
  }
})

</script>

<template>

  <div>
    <span class="text-neutral-400 text-xl text-center font-light">
      Switch in: {{ formattedTime }}
    </span>
  </div>

</template>