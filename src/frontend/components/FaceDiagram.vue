<script setup>
import fullDiagram from "@images/face-diagram/full-diagram.svg";
import face from "@images/face-diagram/face-bw.png";
</script>

<template>
<div class="flex h-screen w-21/40">
    <img class="absolute object-contain w-auto h-[125%] -translate-y-24 translate-x-10" :src="face" alt="Example Face">
    <img class="absolute object-contain w-auto h-[96%] translate-y-14 translate-x-28" :src="fullDiagram" alt="Facial Diagram">
  </div>
</template>