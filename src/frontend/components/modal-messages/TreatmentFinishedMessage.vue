<script setup>
const props = defineProps({
  isPluggedIn: Boolean
})
</script>

<template>
  <PrimeDialog :closable="false" :visible="true"
               class="h-full w-full m-12 items-center" header="Treatment Complete">
    <div class="flex flex-col gap-5 justify-center items-center h-full gap-16">
      <div class="my-28">
        <p class="font-bold text-5xl text-center text-primary-500">
          Treatment Finished!
        </p>
        <p class="font-normal text-5xl mt-5 text-center ">
          Return to Treatment Selection Screen
        </p>
      </div>
      <router-link to="/select">
        <PrimeButton class="mx-auto" label="Back to Treatment Selection" severity="secondary" size="large"/>
      </router-link>
    </div>
  </PrimeDialog>
</template>