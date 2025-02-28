<script setup>
import fullDiagram from "@images/face-diagram/full-diagram.svg";
import face from "@images/face-diagram/face-bw.png";
</script>

<template>
  <div class="-z-10 relative w-screen h-screen">
    <img class="absolute object-contain size-5/4 -top-50 -left-70" :src="face" alt="Example Face">
    <img class="absolute object-contain size-17/18 top-5 -left-61" :src="fullDiagram" alt="Facial Diagram">
  </div>
</template>