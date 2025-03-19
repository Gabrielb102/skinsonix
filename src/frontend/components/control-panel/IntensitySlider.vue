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
  },
  buttonStep: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits('decrease', 'increase', 'update:modelValue');

const updateValue = (value) => {
  emits('update:modelValue', value);
}

// <editor-fold desc="Display Figures">----------------------

const percentage = computed(() => {
  return props.modelValue ? Math.round((props.modelValue / props.max) * 100) : 0;
})

const step = computed((value) => {
  return (props.max - props.min) / 100;
})

// </editor-fold>--------------------------------------------

// <editor-fold desc="Buttons">------------------------------

const buttonStep = computed(() => {
  return step.value * props.buttonStep;
})

const steps = computed(() => {
  const result = [];
  for (let i = props.min; i <= props.max; i += buttonStep.value) {
    result.push(i);
  }
  // Make sure we include the max value if it's not already included
  if (result[result.length - 1] !== props.max) {
    result.push(props.max);
  }
  return result;
})

const quantize = (changedValue) => {
  let closestStep = steps.value[0];

  for (let step of steps.value) {
    const minDistance = Math.abs(changedValue - closestStep);
    const distance = Math.abs(changedValue - step);
    closestStep = distance < minDistance ? step : closestStep;
  }

  return closestStep;
}

const decrease = () => {
  const changedValue = props.modelValue - buttonStep.value;
  updateValue(quantize(changedValue));
}

const increase = () => {
  const changedValue = props.modelValue + buttonStep.value;
  updateValue(quantize(changedValue));
}

// </editor-fold>--------------------------------------------

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
      <PrimeSlider @change="updateValue" :modelValue class="w-full" :min :max :step/>
      <div class="h-12 w-12">
        <PrimeButton @click="increase" icon="pi pi-plus" severity="primary" rounded size="large"/>
      </div>
    </div>
  </div>

</template>