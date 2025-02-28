<script setup>

import TreatmentButton from "@components/buttons/TreatmentButton.vue";

const dummyTreatments = [
  {
    id: 1,
    name: 'Treatment 1',
    description: 'Description of Treatment 1',
  },
  {
    id: 2,
    name: 'Treatment 2',
    description: 'Description of Treatment 2',
  },
  {
    id: 3,
    name: 'Treatment 3',
    description: 'Description of Treatment 3',
  },
  {
    id: 4,
    name: 'Treatment 4',
    description: 'Description of Treatment 4',
  },
  {
    id: 5,
    name: 'Treatment 5',
    description: 'Description of Treatment 5',
  },
  {
    id: 6,
    name: 'Treatment 5',
    description: 'Description of Treatment 5',
  },
]

</script>

<template>

  <div class="flex flex-row items-center">
    <router-link to="/">
      <PrimePanel icon="pi pi-angle-left" severity="contrast" variant="text" rounded/>
    </router-link>
    <span class="text-2xl font-sans font-bold text-black">
        Select a Treatment
      </span>
  </div>
  <div class="flex flex-wrap  border border-surface-300 rounded-xl h-full w-full place-content-center">
    <TreatmentButton v-for="treatment of dummyTreatments" :treatment/>
  </div>

</template>
