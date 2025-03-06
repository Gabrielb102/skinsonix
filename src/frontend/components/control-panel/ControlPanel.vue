<script setup>
import {useLights} from "@frontend/composables/useLights.js";
import {useSound} from "@frontend/composables/useSound.js";
import IntensitySlider from "@components/control-panel/IntensitySlider.vue";
import TreatmentTimer from "@components/control-panel/TreatmentTimer.vue";
import WandNotConnectedMessage from "@components/WandNotConnectedMessage.vue";

const props = defineProps({
  treatment: {
    type: Object,
    required: true
  }
});

// Lights & Sound
const {redValue, blueValue, isPluggedIn, turnLightsOn, turnLightsOff} = useLights();
const {volumeValue, startSound, stopSound} = useSound();

const turnOn = () => {
  turnLightsOn();
  startSound();
};

const turnOff = () => {
  turnLightsOff();
  stopSound();
};

// Treatment

</script>

<template>
  <div class="flex h-screen w-19/40 bg-surface-0">
    <WandNotConnectedMessage v-if="!isPluggedIn"/>
    <TreatmentTimer :phases="treatment['TreatmentPhases']" :turnOn :turnOff>
      <div class="flex flex-col gap-5 w-full px-12 justify-center items-center">
        <IntensitySlider v-model="redValue" label="Red Intensity" :max="255"/>
        <IntensitySlider v-model="blueValue" label="Blue Intensity" :max="255"/>
        <IntensitySlider v-model="volumeValue" label="Volume"/>
      </div>
    </TreatmentTimer>
  </div>
</template>