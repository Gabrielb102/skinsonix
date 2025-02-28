<script setup>
import background from "@images/start-screen-background.jpg";
import logo from "@images/skin-sonix-logo.jpg";

</script>

<template>
  <div class="flex flex-col h-screen w-screen items-center justify-center -m-8"
       :style="{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'top' }">
    <div class="flex flex-col justify-center items-center">
      <img :src="logo" alt="SkinSonix Logo" class="w-72"/>
    <router-link to="select">
      <PrimePanel severity="primary" class="h-12 w-20" label="Enter"/>
    </router-link>
    </div>
  </div>
</template>