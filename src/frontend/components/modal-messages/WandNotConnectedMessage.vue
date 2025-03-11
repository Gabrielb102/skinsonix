<script setup>
const props = defineProps({
  isPluggedIn: Boolean
})
</script>

<template>
  <PrimeDialog :closable="false" :visible="true"
               class="h-full w-full m-12 items-center" header="Wand Error">
    <div class="flex flex-col gap-5 justify-center items-center h-full gap-16">
      <div class="mt-20">
        <p class="font-bold text-5xl text-center text-red-900">
          Wand not detected!
        </p>
        <p class="font-bold text-5xl text-center ">
          Please connect the treatment wand before
          proceeding
        </p>
      </div>
      <p class="text-center">
        Notification will disappear once connected.
      </p>
      <router-link to="/select">
        <PrimeButton class="mx-auto" label="Back to Treatment Selection" severity="secondary" size="large"/>
      </router-link>
    </div>
  </PrimeDialog>
</template>