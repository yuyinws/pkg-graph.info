<script setup lang="ts">
import { deps } from '@/utils/deps'
import { DataSet } from 'vis-data'
import { Network } from 'vis-network'

const networkRef = useTemplateRef('network')

// const nodes = new DataSet(deps.map((item) => {
//   return {
//     label: item.from,
//     id: item.id,
//   }
// }))

// const edges = new DataSet([
//   { id: 1, from: 1, to: 2, arrows: 'to' },
//   { id: 2, from: 1, to: 3, arrows: 'to' },
// ])

onMounted(() => {
  // eslint-disable-next-line no-new
  new Network(networkRef.value!, deps, {
    nodes: {
      labelHighlightBold: false,
      shape: 'box',
      margin: {
        top: 10,
        right: 10,
        bottom: 8,
        left: 10,
      },
    },
    edges: {
      smooth: {
        enabled: true,
        type: 'discrete',
        roundness: 0.5,
      },
      width: 1,
      hoverWidth: 0,
      arrows: {
        to: {
          enabled: true,
          type: 'arrow',
        },
      },
    },
    physics: {
      enabled: false,
    },
    interaction: {
      dragNodes: false,
    },
  })
})
</script>

<template>
  <div ref="network" class="h-[500px]" />
</template>
