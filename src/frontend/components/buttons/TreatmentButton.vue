<script setup>

const props = defineProps({
  treatment: {
    type: Object,
    required: true,
    validator: (value) => {
      const hasId = value.hasOwnProperty('id') && typeof(value.id) === 'number'
      const hasName = value.hasOwnProperty('name') && typeof(value.name) === 'string'
      const hasDescription = value.hasOwnProperty('description') && typeof(value.description) === 'string'
      return hasId && hasName && hasDescription
    }
  }
})
</script>

<template>
<PButton
    class="m-2 h-4 w-12 p-3" severity="secondary"
    :label="treatment['name']"
/>
</template>

<style scoped>

</style>