<script setup>

const props = defineProps({
  treatment: {
    type: Object,
    required: true,
    validator: (value) => {
      const hasId = value.hasOwnProperty('id') && typeof (value.id) === 'number'
      const hasName = value.hasOwnProperty('name') && typeof (value.name) === 'string'
      const hasDescription = value.hasOwnProperty('description') && typeof (value.description) === 'string'
      return hasId && hasName && hasDescription
    }
  }
})

const routeInfo = {
  path: 'treatment',
  query: {
    treatmentID: props.treatment['id']
  }
}
</script>

<template>
  <router-link :to="routeInfo">
    <PrimeButton
        class="m-2 h-12 w-36 p-3" severity="primary"
        :label="treatment['name']"
    />
  </router-link>
</template>