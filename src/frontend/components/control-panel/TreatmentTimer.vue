<script setup>
import {computed, ref, watch} from "vue";
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

// <editor-fold desc="Defining Time Properties">--------------------------------

const totalTime = computed(() => {
  let totalTime = 0;
  for (let phase of props.phases) {
    totalTime += phase.duration;
  }
  return totalTime;
});
const sectionTime = computed(() => props.phases[0].duration);

// </editor-fold>---------------------------------------------------------------

// <editor-fold desc="Controlling timers">--------------------------------------

const bigTimeDisplay = ref(null);
const sectionTimeDisplay = ref(null);
const isStarted = ref(false);
const isPaused = ref(false);
const isRunning = computed(() => bigTimeDisplay['value']?.isRunning ?? false);

watch(isRunning, () => {
  console.log("Is running changed: ", isRunning.value);
})

const start = () => {
  if (bigTimeDisplay['value']?.isRunning) {
    bigTimeDisplay['value']?.resume();
    sectionTimeDisplay['value']?.resume();
  } else {
    bigTimeDisplay['value']?.start(totalTime.value);
    sectionTimeDisplay['value']?.start(sectionTime.value);
  }
  isStarted.value = true;
  isPaused.value = false;
  props.turnOn();
}

const pause = () => {
  bigTimeDisplay['value']?.pause();
  sectionTimeDisplay['value']?.pause();
  isPaused.value = true;
  props.turnOff();
}

const stop = () => {
  bigTimeDisplay['value']?.stop();
  sectionTimeDisplay['value']?.stop();
  isPaused.value = false;
  props.turnOff();
}

// </editor-fold>---------------------------------------------------------------

// <editor-fold desc="Section Timer">-------------------------------------------

const phaseIndex = ref(1); // Start at 1 because the first phase is already running
const startNextSection = () => {
  const nextPhase = props.phases[phaseIndex.value];
  console.log("Starting next section: ", nextPhase);

  if (nextPhase) {
    sectionTimeDisplay['value']?.start(nextPhase.duration);
    phaseIndex.value++;
  } else {
    stop();
  }
}

// </editor-fold>---------------------------------------------------------------

</script>

<template>
  <div class="flex flex-col gap-5 my-12 w-full items-center">
    <BigTime ref="bigTimeDisplay" :time="totalTime"/>
    <SectionTime ref="sectionTimeDisplay" :time="sectionTime" @end="startNextSection"/>
    <slot/>
    <div class="flex flex-row gap-10 w-full mt-5 justify-center">
      <PrimeButton @click="start" icon="pi pi-play" label="Start" severity="success" size="large" :disabled="isRunning"/>
      <PrimeButton v-if="isRunning && !isPaused" @click="pause" icon="pi pi-pause" label="Pause" severity="secondary" size="large"/>
      <PrimeButton v-else @click="stop" icon="pi pi-stop" label="Stop" severity="danger" size="large" :disabled="!isStarted"/>
    </div>
  </div>
</template>