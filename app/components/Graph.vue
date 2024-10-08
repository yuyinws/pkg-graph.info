<script setup lang="ts">
import { Network } from 'vis-network'

const networkRef = useTemplateRef('network')

const { webcontainerInstance } = useWebcontainerStore()

onMounted(async () => {
  const data = await webcontainerInstance?.fs.readFile('./visData.json', 'utf-8')
  const parsedData = JSON.parse(data!)

  const getNodeColor = (level: number) => {
    const colors = [
      '#06b6d4',
      '#22d3ee',
      '#a5f3fc',
    ]
    const colorIndex = Math.min(level, colors.length - 1)
    const baseColor = colors[colorIndex]!

    const rgb = hexToRgb(baseColor)
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.8})`
  }

  const getNodeSize = (level: number) => {
    if (level === 0)
      return { width: 200, height: 80 }
    if (level === 1)
      return { width: 180, height: 70 }
    return { width: 150, height: 50 }
  }

  // 辅助函数：将十六进制颜色转换为 RGB
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

  const rootNode = parsedData.nodes.find((node: any) => node.level === 0)

  const nodes = parsedData.nodes.map((node: any) => {
    const size = getNodeSize(node.level)
    return {
      ...node,
      color: {
        background: getNodeColor(node.level),
      },
      shape: 'box',
      ...size,
      font: {
        size: node.level === 0 ? 30 : node.level === 1 ? 18 : 14,
        face: 'arial',
        bold: node.level === 0 || node.level === 1,
      },
      margin: 12,
      fixed: node.level === 0,
      x: node.level === 0 ? 0 : undefined,
      y: node.level === 0 ? 0 : undefined,
    }
  })

  const network = new Network(networkRef.value!, { nodes, edges: parsedData.edges }, {
    nodes: {
      labelHighlightBold: false,
      shape: 'box',
      borderWidth: 0,
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
        highlight: '#22d3ee',
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
    layout: {
      improvedLayout: true,
    },
  })

  network.on('stabilizationIterationsDone', () => {
    network.setOptions({ physics: false })
    if (rootNode) {
      network.focus(rootNode.id, {
        scale: 0.7,
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad',
        },
      })
    }
  })
})
</script>

<template>
  <div ref="network" class="h-screen w-screen" />
</template>
