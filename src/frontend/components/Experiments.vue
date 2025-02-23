<script setup lang="ts">
import { ref, watch } from 'vue';

const redValue = ref(0);
const blueValue = ref(0);

const listPorts = () => {
  window.wand.list().then((ports) => {
    console.log(ports);
  });
};

const openPort = () => {
  window.wand.openPort().then((port) => {
    console.log(port);
  });
}

const writeWand = () => {

const message = new Uint8Array([
  0xFF,                   // Start byte
  0x00,                   // Command or parameter byte
  blueValue.value,        // Blue LED intensity (0-255)
  redValue.value,         // Red LED intensity (0-255)
]);

  // Write the message to the serial port
  window.wand.write(message, (err: Error) => {
    if (err) {
      console.error('Error writing to port:', err.message);
    }
  });
};
watch([redValue, blueValue], writeWand);
</script>

<template>
  <div>
    <h1>SkinSonix App</h1>
    <p>Here is the main content of the app</p>
    <button @click="listPorts">List Ports</button>
    <button @click="openPort">Get Wand Port</button>

    <input name="name" id="red"
           type="range" v-model="redValue"
           :min="0" :max="100" />
    <input name="name" id="blue"
           type="range" v-model="blueValue"
           :min="0" :max="100" />
  </div>
</template>

<style scoped>

</style>