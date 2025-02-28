<script setup>
import {ref} from "vue";
import IntensitySlider from "@components/IntensitySlider.vue";

const redValue = ref(0);
const blueValue = ref(0);
const volumeValue = ref(0);

</script>

<template>
  <div class="flex flex-col gap-5">
    <IntensitySlider v-model="redValue" label="Red Intensity"/>
    <IntensitySlider v-model="blueValue" label="Blue Intensity"/>
    <IntensitySlider v-model="volumeValue" label="Volume"/>
  </div>
</template>