<script setup lang="ts">
const { status } = storeToRefs(useWebcontainerStore())

const { pkg } = usePkgName()

useSeoMeta({
  title: `${pkg}'s package graph`,
})

useServerSeoMeta({
  ogTitle: `pkg-graph ｜ ${pkg}`,
  twitterTitle: `pkg-graph ｜ ${pkg}`,
  description: `${pkg}'s package graph`,
  ogDescription: `${pkg}'s package graph`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <Terminal />

  <Graph v-if="['graph', 'finish'].includes(status)" />
</template>
