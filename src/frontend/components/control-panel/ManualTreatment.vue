<script setup>
  import {computed, ref} from "vue";
  import BigTime from "@components/control-panel/BigTime.vue";
  import SectionTime from "@components/control-panel/SectionTime.vue";

  const props = defineProps({
    phases: Array,
    turnOn: Function,
    turnOff: Function
  });

  // Define missing state variables
  const isStarted = ref(false);
  const isStopped = ref(true);

  // <editor-fold desc="Control Functions">-------------------------------------------
  const start = () => {
    isStarted.value = true;
    isStopped.value = false;
    props.turnOn();
  }

  const stop = () => {
    isStarted.value = false;
    isStopped.value = true;
    props.turnOff();
  }
  // </editor-fold>---------------------------------------------------------------

  // <editor-fold desc="Phase Management">-------------------------------------------
  const currentPhase = computed(() => ({
    area: "",
    red_start_intensity: 0,
    blue_start_intensity: 0,
    red_end_intensity: 0,
    blue_end_intensity: 0,
    end_frequency: 0,
    start_frequency: 0,
  }));

  // </editor-fold>---------------------------------------------------------------

  // Static time display - always showing 0:00
  const staticTime = 0;

  </script>

<template>
  <div class="flex flex-col gap-5 my-12 w-full items-center">
    <BigTime ref="bigTimeDisplay" :time="staticTime"/>
    <SectionTime ref="sectionTimeDisplay" :time="staticTime"/>
    <slot :phase="currentPhase"/>
    <div class="flex flex-row gap-10 w-full mt-5 justify-center">
      <PrimeButton @click="start" icon="pi pi-play" label="Start" severity="success" size="large" :disabled="isStarted"/>
      <PrimeButton @click="stop" icon="pi pi-stop" label="Stop" severity="danger" size="large" :disabled="!isStarted"/>
    </div>
  </div>
</template>