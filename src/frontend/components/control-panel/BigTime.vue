<script setup>
import {watch} from "vue";
import {useTimer} from "@frontend/composables/useTimer.js";

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
  <div class="flex flex-col border-2 border-neutral-300 rounded-lg items-center justify-center w-36 h-auto">
    <div class="flex flex-row justify-between items-center w-full p-3">
      <i class="pi pi-stopwatch text-black"/>
      <span class="text-4xl text-center text-black">
        {{ formattedTime }}
      </span>
    </div>
  </div>
</template>
