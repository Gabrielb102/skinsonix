<script setup>
import {watch, watchEffect} from "vue";
import {usePhaseStore} from "@frontend/stores/usePhaseStore.js";
import {useTimer} from "@frontend/composables/useTimer";

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

// Phase Completion Status
const phaseStore = usePhaseStore();
watch(timeLeft,() => {
  phaseStore.$patch({completion: (props.time - (timeLeft.value / 1000)) / props.time});
})

</script>

<template>

  <div>
    <span class="text-neutral-400 text-xl text-center font-light">
      Switch in: {{ formattedTime }}
    </span>
  </div>

</template>