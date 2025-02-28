<script setup>
const props = defineProps({
  modelValue: Number
})
const emits = defineEmits('decrease', 'increase');
</script>

<template>

  <div class="flex flex-row justify-between w-56 gap-3 items-center">
    <PrimeButton icon="pi pi-minus" severity="primary"/>
    <PrimeSlider :value="modelValue" class="w-auto"/>
    <PrimeButton icon="pi pi-plus" severity="primary"/>
  </div>

</template>