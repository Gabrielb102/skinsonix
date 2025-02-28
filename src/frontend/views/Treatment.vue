<script setup>
import FaceDiagram from "@components/FaceDiagram.vue";
import ControlPanel from "@components/ControlPanel.vue";
</script>

<template>
  <router-link to="/select">
    <PrimePanel icon="pi pi-angle-left" severity="contrast" variant="text" rounded/>
  </router-link>
  <div class="flex">
    <FaceDiagram/>
    <ControlPanel/>
  </div>
</template>