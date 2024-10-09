<script setup lang="ts">
import type { Graph } from '~~/types/graph'
import { Network } from 'vis-network'

const networkRef = useTemplateRef('networkRef')

const { webcontainerInstance } = useWebcontainerStore()
const { status } = storeToRefs(useWebcontainerStore())

onMounted(async () => {
  const data = await webcontainerInstance?.fs.readFile('./visData.json', 'utf-8')
  const parsedData = JSON.parse(data!) as Graph
  const getNodeColor = (level: number) => {
    const colors = [
      '#22c55e',
      '#4ade80',
      '#86efac',
    ]
    const colorIndex = Math.min(level, colors.length - 1)
    const baseColor = colors[colorIndex]!

    const rgb = hexToRgb(baseColor)
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${level === 0 ? 0.6 : 0.5})`
  }

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1]!, 16),
          g: Number.parseInt(result[2]!, 16),
          b: Number.parseInt(result[3]!, 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const rootNode = parsedData.nodes.find(node => node.level === 0)

  const nodes = parsedData.nodes.filter(node => node.level! < 4).map((node) => {
    return {
      ...node,
      color: {
        background: getNodeColor(node.level!),
      },
      shape: 'box',
      font: {
        size: node.level === 0 ? 26 : node.level === 1 ? 18 : 14,
        face: 'arial',
        color: node.level === 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: node.level === 0 ? 2 : 1,
      margin: 12,
      fixed: node.level === 0,
      x: node.level === 0 ? 0 : undefined,
      y: node.level === 0 ? 0 : undefined,
      shapeProperties: { borderDashes: node.level! < 2 ? [0, 0] : [2, 2] },
    }
  })

  const network = new Network(networkRef.value!, { nodes: nodes as any, edges: parsedData.edges }, {
    nodes: {
      labelHighlightBold: false,
      shape: 'box',
      borderWidth: 0,
      color: {
        highlight: '#4ade80',
        border: '#4ade80',
      },
    },
    edges: {
      smooth: {
        enabled: true,
        type: 'cubicBezier',
        roundness: 0.5,
      },
      width: 1,
      color: {
        color: '#d1d5db',
        highlight: '#4ade80',
      },
      hoverWidth: 0,
      arrows: {
        to: {
          enabled: true,
          type: 'arrow',
        },
      },
    },
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -15000,
        centralGravity: 0.7,
        springLength: 250,
        springConstant: 0.05,
        damping: 0.09,
        avoidOverlap: 1,
      },
      stabilization: {
        enabled: true,
        iterations: 2000,
        updateInterval: 50,
        onlyDynamicEdges: false,
        fit: true,
      },
    },
  })

  network.on('stabilizationIterationsDone', () => {
    network.setOptions({ physics: nodes.length <= 50 })
    if (rootNode) {
      network.focus(rootNode.id!, {
        scale: 0.7,
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad',
        },
      })
    }

    status.value = 'finish'
  })
})
</script>

<template>
  <div ref="networkRef" class="h-screen w-screen" />
</template>
