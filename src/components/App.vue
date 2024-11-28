<script setup lang="ts">
const listPorts = () => {
  window.serialport.list().then((ports) => {
    console.log(ports);
  });
};
</script>

<template>
  <div>
    <h1>SkinSonix App</h1>
    <p>Here is the main content of the app</p>
    <button @click="listPorts">List Ports</button>
  </div>
</template>

<style scoped>

</style>