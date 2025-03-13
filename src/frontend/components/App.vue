<script setup>
import {onMounted} from "vue";

onMounted(() => {
  window.mainProcessMessages.onUpdateStatus((status, data) => {
    console.log(`Update status: ${status}`, data);
    // You can also display these in UI or trigger notifications
  });
});
</script>


<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">
    <router-view/>
  </div>
</template>