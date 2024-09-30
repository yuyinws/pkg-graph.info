<script setup lang="ts">
const wc = useWebcontainerStore()

if (!wc.webcontainerState) {
  await wc.init
}
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
