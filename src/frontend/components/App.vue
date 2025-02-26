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
]

</script>


<template>
  <div>
    <PButton icon="pi pi-angle-left"/>
    <Panel class="flex-wrap">
      <TreatmentButton v-for="treatment of dummyTreatments" :treatment/>
    </Panel>
  </div>
</template>