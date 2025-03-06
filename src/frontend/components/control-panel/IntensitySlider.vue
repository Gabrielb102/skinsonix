<script setup>
import {computed} from "vue";
const props = defineProps({
  modelValue: Number,
  label: String,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
})
const emits = defineEmits('decrease', 'increase', 'update:modelValue');

const updateValue = (value) => {
  emits('update:modelValue', value);
}

const decrease = () => {
  if (props.modelValue > 0) {
    updateValue(props.modelValue - 1);
    emits('decrease');
  }
}

const increase = () => {
  if (props.modelValue < 100) {
    updateValue(props.modelValue + 1);
    emits('increase');
  }
}

const percentage = computed(() => {
  return props.modelValue ? Math.round((props.modelValue / props.max) * 100) : 0;
})

const step = computed((value) => {
  return Math.round((props.max - props.min) / 100);
})

</script>

<template>
  <div class="flex flex-col w-full items-start">
    <div class="flex flex-row justify-between w-full px-16">
      <span class="font-semibold text-lg grow">{{ label }}</span>
      <span class="font-semibold text-lg w-fit">{{ percentage }}%</span>
    </div>
    <div class="flex flex-row justify-between w-full gap-8 items-center">
      <div class="h-12 w-12">
        <PrimeButton @click="decrease" icon="pi pi-minus" severity="primary" rounded size="large"/>
      </div>
      <PrimeSlider @change="updateValue" :value="modelValue" class="w-full" :min :max :step/>
      <div class="h-12 w-12">
        <PrimeButton @click="increase" icon="pi pi-plus" severity="primary" rounded size="large"/>
      </div>
    </div>
  </div>

</template>