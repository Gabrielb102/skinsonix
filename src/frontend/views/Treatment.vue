<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import FaceDiagram from "@components/FaceDiagram.vue";
import ControlPanel from "@components/control-panel/ControlPanel.vue";

const route = useRoute();
const id = route.query.treatmentID;

const treatment = ref(null);
onMounted(async () => {
  treatment.value = await window.db.getTreatments({id});
});


</script>

<template>
  <router-link class="absolute left-8 top-8 z-100" to="/select">
    <PrimeButton icon="pi pi-angle-left" severity="contrast" variant="text" rounded/>
  </router-link>
  <div class="absolute flex w-screen h-screen overflow-hidden">
    <FaceDiagram/>
    <ControlPanel v-if="treatment" :treatment/>
  </div>
</template>