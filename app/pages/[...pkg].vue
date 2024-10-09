<script setup lang="ts">
const { status } = storeToRefs(useWebcontainerStore())
</script>

<template>
  <Terminal />

  <Graph v-if="['graph', 'finish'].includes(status)" />
</template>
