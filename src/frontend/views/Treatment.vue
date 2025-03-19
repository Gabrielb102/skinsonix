<script setup>
import {ref, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import FaceDiagram from "@components/FaceDiagram.vue";
import ControlPanel from "@components/control-panel/ControlPanel.vue";

const route = useRoute();
const id = route.query.treatmentID;

const treatment = ref(null);
onMounted(async () => {
  if (id !== 0) {
    // If the treatment is not manual
    if (id === undefined) {
      // If no treatment is selected, redirect to selection page
      window.location.href = "/select";
    }
    treatment.value = await window.db.getTreatments({id});
  } else {
    treatment.value = {
      TreatmentPhases: [],
      description: "Treatment focused on lips and jaw area for a radiant smile",
      id: 3,
      name: "Super Smile"
    }
  }
});

watch(treatment, () => {
  if (treatment.value === null) {
    treatment.value = {
      TreatmentPhases: [],
      description: "Treatment focused on lips and jaw area for a radiant smile",
      id: 3,
      name: "Super Smile"
    }
    return;
  }
}, {immediate: true})


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