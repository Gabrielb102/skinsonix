<script setup>
import {computed, ref, watch} from "vue";
import {usePhaseStore} from "@frontend/stores/usePhaseStore.js";
import {useDiagram} from "@frontend/composables/useDiagram.js";
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
const isStopped = ref(false);

const start = () => {
  if (isStarted.value) {
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

const phaseIndex = ref(0); // Start at 1 because the first phase is already running
const currentPhase = computed(() => props.phases[phaseIndex.value]);
const phaseStore = usePhaseStore();

// Section Timer
const startNextSection = () => {
    phaseIndex.value++;
  if (currentPhase && !isStopped.value) {
    sectionTimeDisplay['value']?.start(currentPhase['duration']);
  } else {
    stop();
  }
}

// Section indicator - This handles the changing of indicators on the face diagram
const {changeAreaStatus, resetDiagram} = useDiagram();
watch(currentPhase, (newPhase, prevPhase) => {
  phaseStore.$patch({current: newPhase});
  if (prevPhase) {
    changeAreaStatus(prevPhase['area'], 'default');
  }
  if (newPhase) {
    changeAreaStatus(newPhase['area'], 'active');
  } else {
    resetDiagram();
  }
}, {immediate: true});

// </editor-fold>---------------------------------------------------------------

// <editor-fold desc="End">---------------------------------------------------

const emits = defineEmits(["end"]);
const end = () => {
  console.log("Big Timer ended apparently");
  isStopped.value = true;
  emits("end");
}

// </editor-fold>----------------------------------------------------------------

</script>

<template>
  <div class="flex flex-col gap-5 my-12 w-full items-center">
    <BigTime ref="bigTimeDisplay" :time="totalTime" @end="end"/>
    <SectionTime ref="sectionTimeDisplay" :time="sectionTime" @end="startNextSection"/>
    <slot :phase="phases[phaseIndex]"/>
    <div class="flex flex-row gap-10 w-full mt-5 justify-center">
      <PrimeButton @click="start" icon="pi pi-play" label="Start" severity="success" size="large" :disabled="isRunning"/>
      <PrimeButton v-if="isRunning && !isPaused" @click="pause" icon="pi pi-pause" label="Pause" severity="secondary" size="large"/>
      <PrimeButton v-else @click="stop" icon="pi pi-stop" label="Stop" severity="danger" size="large" :disabled="!isStarted"/>
    </div>
  </div>
</template>