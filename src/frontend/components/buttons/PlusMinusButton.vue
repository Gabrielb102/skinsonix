<script setup>
import {computed} from 'vue';

const props = defineProps({
  icon: String
})

const icon = computed(() => {
  return `pi pi-${props.icon}`;
});
</script>

<template>
  <PrimePanel :icon/>
</template>

<style scoped>

</style>