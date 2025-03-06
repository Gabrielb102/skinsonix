<script setup>
import {computed, ref, watchEffect} from "vue";
import BigTime from "@components/control-panel/BigTime.vue";
import SectionTime from "@components/control-panel/SectionTime.vue";

const props = defineProps({
  phases: {
    type: Array,
    required: true
  },
  turnOn: Function,
  turnOff: Function
});

// Defining time
const totalTime = computed(() => {
  let totalTime = 0;
  for (let phase of props.phases) {
    totalTime += phase.duration;
  }
  return totalTime;
});
const sectionTime = computed(() => props.phases[0].duration);

// Controlling timers
const bigTimeDisplay = ref(null);
const sectionTimeDisplay = ref(null);
const isPaused = ref(false);
const isRunning = computed(() => bigTimeDisplay?.value?.isRunning ?? false);

watchEffect(() => {
  console.log("Is Running: ", isRunning.value);
  console.log("Is Paused: ", isPaused.value);
});

const start = () => {
  if (bigTimeDisplay.value.isRunning) {
    bigTimeDisplay?.value?.resume();
    sectionTimeDisplay?.value?.resume();
  } else {
    bigTimeDisplay?.value?.start(totalTime.value);
    sectionTimeDisplay?.value?.start(sectionTime.value);
  }
}

const pause = () => {
  bigTimeDisplay?.value?.pause();
  sectionTimeDisplay?.value?.pause();
}

const stop = () => {
  bigTimeDisplay?.value?.stop();
  sectionTimeDisplay?.value?.stop();
}

</script>

<template>
  <div class="flex flex-col gap-5 my-12 w-full items-center">
    <BigTime ref="bigTimeDisplay" :time="totalTime"/>
    <SectionTime ref="sectionTimeDisplay" :time="sectionTime"/>
    <slot/>
    <div class="flex flex-row gap-10 w-full mt-5 justify-center">
      <PrimeButton @click="start" icon="pi pi-play" label="Start" severity="success" size="large" :disabled="isRunning.value"/>
      <PrimeButton v-if="isRunning.value && !isPaused.value" @click="pause" icon="pi pi-pause" label="Pause" severity="secondary" size="large"/>
      <PrimeButton v-else @click="stop" icon="pi pi-stop" label="Stop" severity="danger" size="large" :disabled="!isRunning.value"/>
    </div>
  </div>
</template>