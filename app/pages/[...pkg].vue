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

useHead({
  title: 'Starting up...',
})

watch(status, (val) => {
  switch (val) {
    case 'idle': {
      useHead({
        title: 'Starting up...',
      })
      break
    }

    case 'install': {
      useHead({
        title: 'Installing...',
      })
      break
    }

    case 'analyse': {
      useHead({
        title: 'Analysing...',
      })
      break
    }

    case 'graph': {
      useHead({
        title: 'Generate graph...',
      })
      break
    }

    default: {
      useHead({
        title: `${pkg}'s package graph`,
      })
    }
  }
}, {
  deep: true,
})
</script>

<template>
  <Terminal />

  <Graph v-if="['graph', 'finish'].includes(status)" />
</template>
