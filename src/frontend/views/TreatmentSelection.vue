<script setup>
import { ref, onMounted, watch } from "vue";
import TreatmentButton from "@components/buttons/TreatmentButton.vue"

const treatments = ref([]);

onMounted(async () => {
  treatments.value = await window.db.getTreatments()
});

</script>

<template>

  <div class="p-8 h-full w-full flex flex-col">
    <div class="flex flex-row items-center">
      <router-link to="/">
        <PrimeButton icon="pi pi-angle-left" severity="contrast" variant="text" rounded/>
      </router-link>
      <span class="text-2xl font-sans font-bold text-black">
        Select a Treatment
      </span>
    </div>
    <div class="flex flex-wrap grow border border-surface-300 rounded-xl w-full place-content-center">
      <TreatmentButton v-for="treatment of treatments" :treatment/>
    </div>
  </div>

</template>
