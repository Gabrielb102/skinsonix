<script setup>
  import {onMounted, onUnmounted, ref, computed} from "vue";
  import {useLights} from "@frontend/composables/useLights.js";
  import {useSound} from "@frontend/composables/useSound.js";
  import {useAutoChange} from "@frontend/composables/useAutoChange.js";
  import IntensitySlider from "@components/control-panel/IntensitySlider.vue";
  import TreatmentTimer from "@components/control-panel/TreatmentTimer.vue";
  import ManualTreatment from "@components/control-panel/ManualTreatment.vue";
  import WandNotConnectedMessage from "@components/modal-messages/WandNotConnectedMessage.vue";
  import TreatmentFinishedMessage from "@components/modal-messages/TreatmentFinishedMessage.vue";

const props = defineProps({
  treatment: {
    type: Object,
    required: true
  }
});

// Lights & Sound
const {redValue, blueValue, isPluggedIn, turnLightsOn, turnLightsOff} = useLights();
const {volume, frequency, startSound, stopSound, soundNotify} = useSound();

const turnOn = () => {
  turnLightsOn();
  startSound();
};
const turnOff = () => {
  turnLightsOff();
  stopSound();
};

onMounted(turnOff);
onUnmounted(turnOff);

const component = computed(() => {
  return props.treatment['TreatmentPhases'] && props.treatment['TreatmentPhases'].length !== 0 ? TreatmentTimer : ManualTreatment;
});

// Treatment
const {changeOverPhase} = useAutoChange();

changeOverPhase(redValue, 'red_start_intensity', 'red_end_intensity', 2.55);
changeOverPhase(blueValue, 'blue_start_intensity', 'blue_end_intensity', 2.55);
changeOverPhase(frequency, 'start_frequency', 'end_frequency');

const isFinished = ref(false);
const showEndMessage = () => {
  isFinished.value = true;
  console.log("Treatment Ended");
  turnOff();
};

</script>

<template>
  <div class="flex h-screen w-19/40 bg-surface-0">
    <WandNotConnectedMessage v-if="!isPluggedIn"/>
    <TreatmentFinishedMessage v-if="isFinished"/>
    <component
        :is="component"
        :phases="treatment['TreatmentPhases']"
        :turnOn="turnOn"
        :turnOff="turnOff"
        @end="showEndMessage"
        @areaSwitch="soundNotify"
    >
      <template v-slot="{phase}">
        <div class="flex flex-col gap-5 w-full px-12 justify-center items-center">
          <IntensitySlider v-model="redValue" label="Red Intensity" :max="255" :buttonStep="5"/>
          <IntensitySlider v-model="blueValue" label="Blue Intensity" :max="255" :buttonStep="5"/>
          <IntensitySlider v-model="volume" label="Volume" :buttonStep="5"/>
        </div>
      </template>
    </component>
  </div>
</template>