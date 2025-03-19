<script setup>
import { watch } from "vue";
import background from "@images/start-screen-background.jpg";
import logo from "@images/skin-sonix-logo.jpg";
import { useLights } from "@frontend/composables/useLights";

const { turnLightsOff, isPluggedIn } = useLights();

watch(isPluggedIn, () => {
  console.log("isPluggedIn: ", isPluggedIn.value);
  if (isPluggedIn.value) {
    console.log("Turning lights off");
    turnLightsOff();
  }
}, { immediate: true });

</script>

<template>
  <div class="flex flex-col h-screen w-screen items-center justify-center"
       :style="{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'top' }">
    <div class="flex flex-col justify-center items-center">
      <img :src="logo" alt="SkinSonix Logo" class="w-72"/>
    <router-link to="select">
      <PrimeButton severity="primary" class="h-12 w-20" label="Enter"/>
    </router-link>
    </div>
  </div>
</template>