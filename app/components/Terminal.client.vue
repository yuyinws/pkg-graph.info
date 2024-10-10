<script setup lang="ts">
import type { ITheme } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import * as Xterm from '@xterm/xterm'
import themeDark from 'theme-vitesse/extra/xterm-vitesse-dark.json'
import themeLight from 'theme-vitesse/extra/xterm-vitesse-light.json'
import '@xterm/xterm/css/xterm.css'

const wc = useWebcontainerStore()
const { status } = storeToRefs(useWebcontainerStore())
const colorMode = useColorMode()
const terminalRef = useTemplateRef('terminalRef')

const { pkg } = usePkgName()

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

const terminal = new Xterm.Terminal({
  customGlyphs: true,
  allowTransparency: true,
  theme: theme.value,
  fontFamily: 'DM Mono, monospace',
})

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

async function startProcess() {
  status.value = 'idle'

  if (!wc.webcontainerInstance) {
    await wc.init()
  }

  await wc.cleanProgress()

  const installRes = await wc.launchInstallProcess(pkg)
  if (!installRes) {
    status.value = 'error'
    return
  }
  const collectRes = await wc.launchCollectPkgProcess(pkg)
  if (!collectRes) {
    status.value = 'error'
    return
  }
  status.value = 'graph'

  // await wc.lanuchInteractiveProgress()
}

watch(
  () => wc.currentProcess,
  (process) => {
    if (!process)
      return

    try {
      const reader = process.output.getReader()

      function read() {
        reader.read().then(({ done, value }) => {
          if (value) {
            terminal.write(value)
            terminal.scrollToBottom()
          }
          if (!done)
            read()
        })
      }

      read()
    }
    catch (error) {
      console.error(error)
    }

    try {
      const writer = process.input.getWriter()
      terminal.onData((data) => {
        try {
          writer.write(data)
        }
        catch (e) {
          console.error(e)
        }
      })
    }
    catch (e) {
      console.error(e)
    }
  },
)

watch(terminalRef, async (value) => {
  if (value) {
    terminal.open(value)
    fitAddon.fit()

    startProcess()
  }
}, { immediate: true })

function handleReload() {
  window.location.reload()
}
</script>

<template>
  <Overlay :open="status !== 'finish'">
    <div class="flex items-center justify-center h-full">
      <div class="flex flex-col w-[23rem] md:w-[40rem] items-center justify-center h-full">
        <div class="bg-gray-300 dark:bg-gray-800 w-full rounded-t-[.5rem] flex items-center justify-between">
          <div class="px-5 py-3">
            <div class="flex gap-2">
              <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#ed695e]" />
              <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#f4be4f]" />
              <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#61c454]" />
            </div>
          </div>

          <div class="flex items-center">
            <div class="text-gray-500 font-medium text-sm">
              <span v-if="status === 'idle'">Starting up</span>
              <span v-if="status === 'install'">npm install {{ pkg }}</span>
              <span v-if="status === 'analyse'">Analyzing {{ pkg }}</span>
              <span v-if="status === 'graph'">Generate graph</span>
              <span v-if="status === 'error'">Ops, something went wrong</span>
            </div>
            <UIcon v-if="status !== 'error'" name="i-eos-icons:three-dots-loading" class="relative top-[.25rem] text-gray-500 w-5 h-5" />
          </div>
          <div class="w-[3rem] flex items-center gap-2">
            <template v-if="status === 'error'">
              <UTooltip text="Back" :popper="{ placement: 'top' }" :ui="{ background: 'bg-gray-300 dark:bg-gray-700' }">
                <UIcon name="i-ri:arrow-left-line" class="w-4 h-4 text-gray-500 cursor-pointer" @click="$router.replace('/')" />
              </UTooltip>

              <UTooltip text="Reload" :popper="{ placement: 'top' }" :ui="{ background: 'bg-gray-300 dark:bg-gray-700' }">
                <UIcon name="i-ri:loop-right-fill" class="w-4 h-4 text-gray-500 cursor-pointer" @click="handleReload" />
              </UTooltip>
            </template>
          </div>
        </div>
        <div class="w-full bg-gray-300/65 dark:bg-gray-700/65 p-4 rounded-b-[.5rem]">
          <div ref="terminalRef" class="w-full h-[15.5rem]" />
        </div>
      </div>
    </div>
  </Overlay>
</template>
