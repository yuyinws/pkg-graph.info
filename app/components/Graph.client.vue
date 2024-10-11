<script setup lang="ts">
import type { Graph } from '~~/types/graph'
import type { PkgMeta } from '~~/types/pkg'
import { useDebounceFn } from '@vueuse/core'
import chroma from 'chroma-js'
import { Network } from 'vis-network'

const networkRef = useTemplateRef('networkRef')

const { webcontainerInstance } = useWebcontainerStore()
const { status } = storeToRefs(useWebcontainerStore())
let network: Network | null = null

const { name, pkg } = usePkgName()
const pkgMetaData = ref<PkgMeta>()

const visData = await webcontainerInstance?.fs.readFile('./visData.json', 'utf-8')
const parsedData = JSON.parse(visData!) as Graph

const pkgLockRaw = await webcontainerInstance?.fs.readFile('./package-lock.json', 'utf-8')
const pkgLock = JSON.parse(pkgLockRaw!)
async function getNestedPkgInfo(pkg: string) {
  const packages = pkgLock.packages

  const findPkgPath = Object.keys(packages).find(key => key.includes(`/${pkg}`))
  if (findPkgPath) {
    const pkgInfo = await webcontainerInstance?.fs.readFile(`${findPkgPath}/package.json`, 'utf-8')
    return pkgInfo || ''
  }

  return ''
}

async function getPkgInfo(pkg: string) {
  let pkgInfo = ''
  try {
    const _pkgInfo = await webcontainerInstance?.fs.readFile(`./node_modules/${pkg}/package.json`, 'utf-8')
    if (_pkgInfo)
      pkgInfo = _pkgInfo
  }
  catch {
    // Nested dependency
    pkgInfo = await getNestedPkgInfo(pkg)
  }

  pkgMetaData.value = JSON.parse(pkgInfo) as PkgMeta
}

function getNodeColor(level: number, opacity = 1) {
  const colors = [
    '#15803d',
    '#6d28d9',
    '#0369a1',
    '#374151',
  ]
  const colorIndex = Math.min(level, colors.length - 1)
  const baseColor = chroma(colors[colorIndex]!)

  const [_l, c, h] = baseColor.oklch()

  return chroma.oklch(0.7, c, h).mix('#ffff', 1 - opacity).hex()
}

function getNodes(_level: number): any {
  return parsedData.nodes.filter(node => node.level! <= _level).map((node) => {
    return {
      ...node,
      color: {
        background: getNodeColor(node.level!, 0.3),
        border: getNodeColor(node.level!, 0.8),
      },
      shape: 'box',
      font: {
        size: node.level === 0 ? 26 : node.level === 1 ? 18 : 14,
        face: 'arial',
        color: node.level === 0 ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.8)',
      },
      borderWidth: node.level === 0 ? 2 : 1,
      margin: 12,
      fixed: node.level === 0,
      x: node.level === 0 ? 0 : undefined,
      y: node.level === 0 ? 0 : undefined,
      shapeProperties: { borderDashes: node.level! < 2 ? [0, 0] : [2, 2] },
    }
  })
}

const loading = ref(false)
const level = ref(Math.min(parsedData.maxLevel, 3))
watch(level, async (value) => {
  try {
    loading.value = true
    const nodes = getNodes(value)
    const filteredEdges = parsedData.edges.filter(edge =>
      nodes.some((node: any) => node.id === edge.from)
      && nodes.some((node: any) => node.id === edge.to),
    )
    network?.setData({ nodes, edges: filteredEdges })

    network?.setOptions({ physics: true })

    await new Promise(resolve => setTimeout(resolve, 1000))
    network?.stabilize()

    await new Promise(resolve => setTimeout(resolve, 1000))

    network?.setOptions({ physics: false })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
})

function moveNetwork(direction: 'left' | 'right' | 'up' | 'down') {
  const currentPosition = network?.getViewPosition()
  const moveDistance = 100

  if (currentPosition) {
    let newX = currentPosition.x
    let newY = currentPosition.y

    switch (direction) {
      case 'left':
        newX -= moveDistance
        break
      case 'right':
        newX += moveDistance
        break
      case 'up':
        newY -= moveDistance
        break
      case 'down':
        newY += moveDistance
        break
    }

    network?.moveTo({
      position: { x: newX, y: newY },
      animation: {
        duration: 500,
        easingFunction: 'easeInOutQuad',
      },
    })
  }
}

function zoomNetwork(zoomIn: boolean) {
  const currentScale = network?.getScale() || 1
  const zoomFactor = 1.5

  const newScale = zoomIn ? currentScale * zoomFactor : currentScale / zoomFactor

  network?.moveTo({
    scale: newScale,
    animation: {
      duration: 500,
      easingFunction: 'easeInOutQuad',
    },
  })
}

function focus() {
  network?.focus(name, {
    scale: 0.7,
    animation: {
      duration: 1000,
      easingFunction: 'easeInOutQuad',
    },
  })
}

let imageHref = ''

function saveImage() {
  const link = document.createElement('a')
  link.href = imageHref
  link.download = `${pkg}-dependency-graph.png`
  link.click()
}

onMounted(async () => {
  const nodes = getNodes(level.value)
  network = new Network(networkRef.value!, { nodes, edges: parsedData.edges }, {
    nodes: {
      labelHighlightBold: false,
      shape: 'box',
      borderWidth: 0,
      color: {
        highlight: '#4ade80',
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

  network?.on('stabilizationIterationsDone', () => {
    network?.setOptions({ physics: false })
    focus()

    status.value = 'finish'

    getPkgInfo(name)
  })

  network?.on('selectNode', (params) => {
    getPkgInfo(params.nodes[0])
  })

  network?.on('deselectNode', () => {
    getPkgInfo(name)
  })

  network.on('afterDrawing', useDebounceFn((ctx) => {
    imageHref = ctx.canvas.toDataURL('image/png')
  }, 1000))
})

onUnmounted(() => {
  network?.destroy()
  network = null
})

const { isOpen } = storeToRefs(useSlide())
</script>

<template>
  <div class="flex m-4 gap-4">
    <div class="w-[14rem] hidden md:block">
      <PkgMeta
        v-model:level="level"
        :max-level="parsedData.maxLevel"
        :meta="pkgMetaData"
        @save-image="saveImage"
      />
    </div>

    <USlideover v-model="isOpen" class="md:hidden block" side="left">
      <div class="m-4">
        <PkgMeta
          v-model:level="level"
          :max-level="parsedData.maxLevel"
          :meta="pkgMetaData"
          @save-image="saveImage"
        />
      </div>
    </USlideover>

    <UCard
      :ui="{
        body: {
          base: 'rounded-lg',
          background: 'bg-gray-50 dark:bg-gray-900',
          padding: 'p-2 sm:p-2',
        },
      }" class="flex-1 h-[calc(100vh-6rem)] relative"
    >
      <div ref="networkRef" class="h-[calc(100vh-7rem)] w-full" :class="loading ? 'opacity-0' : ''" />

      <div class="absolute right-4 bottom-4">
        <GraphActions
          @move="moveNetwork"
          @zoom="zoomNetwork"
          @focus="focus"
        />
      </div>

      <Overlay :open="loading">
        <div class="flex items-center justify-center h-full">
          <UIcon name="i-eos-icons:loading" class="w-8 h-8 text-gray" />
        </div>
      </Overlay>
    </UCard>
  </div>
</template>
