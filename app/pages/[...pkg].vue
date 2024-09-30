<script setup lang="ts">
import type { WebContainerProcess } from '@webcontainer/api'
import type { ITheme } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { Terminal } from '@xterm/xterm'
import themeDark from 'theme-vitesse/extra/xterm-vitesse-dark.json'
import themeLight from 'theme-vitesse/extra/xterm-vitesse-light.json'
import '@xterm/xterm/css/xterm.css'

const wc = useWebcontainerStore()
let shellProcess: WebContainerProcess
const colorMode = useColorMode()
const root = ref<HTMLDivElement>()

const theme = computed<ITheme>(() => {
  return colorMode.value === 'dark'
    ? {
        ...themeDark,
        background: '#00000000',
      }
    : {
        ...themeLight,
        background: '#00000000',
      }
})

async function installPkg() {
  const terminal = new Terminal({
    customGlyphs: true,
    allowTransparency: true,
    theme: theme.value,
    fontFamily: 'DM Mono, monospace',
  })

  const fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)
  terminal.open(root.value!)

  fitAddon.fit()

  // await wc.webcontainerState!.spawn('npm', ['install', 'nuxt'])

  shellProcess = await wc.webcontainerState!.spawn('jsh')

  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data)
      },
    }),
  )
  const writer = shellProcess.input.getWriter()

  terminal.onData((data) => {
    writer.write(data)
  })

  // writer.write('cd pkg && npm install vue\n')
}

onMounted(async () => {
  if (!wc.webcontainerState) {
    await wc.init
    installPkg()
  }
  else {
    installPkg()
  }
})

async function test() {

}
</script>

<template>
  <div ref="root" class="w-full px-4 py-2 h-[15.5rem]" />

  <button @click="test">
    test
  </button>
</template>
