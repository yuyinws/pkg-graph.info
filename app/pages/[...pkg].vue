<script setup lang="ts">
const { status } = storeToRefs(useWebcontainerStore())

const { pkg } = usePkgName()

useSeoMeta({
  title: `${pkg}'s package graph`,
})

useServerSeoMeta({
  ogTitle: `${pkg}'s package graph`,
  twitterTitle: `${pkg}'s package graph`,
  description: `${pkg}'s package graph`,
  ogDescription: `${pkg}'s package graph`,
  twitterCard: 'summary_large_image',
})

// defineOgImageComponent('Pkg', {
//   pkg,
// })
</script>

<template>
  <Terminal />

  <Graph v-if="['graph', 'finish'].includes(status)" />
</template>
