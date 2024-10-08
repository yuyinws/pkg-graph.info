<script setup lang="ts">
import type { ITheme } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import Xterm from '@xterm/xterm'
import themeDark from 'theme-vitesse/extra/xterm-vitesse-dark.json'
import themeLight from 'theme-vitesse/extra/xterm-vitesse-light.json'
import '@xterm/xterm/css/xterm.css'

const wc = useWebcontainerStore()
const { webcontainerStatus } = storeToRefs(useWebcontainerStore())
const colorMode = useColorMode()
const root = ref<HTMLDivElement>()

const route = useRoute()
const pkg = (route.params.pkg as string[]).join('/')

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

const { Terminal } = Xterm
const terminal = new Terminal({
  customGlyphs: true,
  allowTransparency: true,
  theme: theme.value,
  fontFamily: 'DM Mono, monospace',
})

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

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

onMounted(async () => {
  terminal.open(root.value!)
  fitAddon.fit()

  if (!wc.webcontainerInstance) {
    await wc.init
  }
  await wc.launchInstallProcess(pkg)
  await wc.launchCollectPkgProcess(pkg)
  await wc.lanuchInteractiveProgress()
})
</script>

<template>
  <Overlay :open="webcontainerStatus !== 'finish'">
    <div class="flex items-center justify-center h-full">
      <div class="flex flex-col w-[40rem] items-center justify-center h-full">
        <div class="bg-gray-300 w-full rounded-t-[.5rem] flex items-center justify-between">
          <div class="px-5 py-3">
            <div class="flex gap-2">
              <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#ed695e]" />
              <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#f4be4f]" />
              <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#61c454]" />
            </div>
          </div>

          <div v-if="webcontainerStatus === 'idle'" class="flex items-center">
            <div class="text-gray-500 font-medium text-sm">
              Starting up
            </div>
            <UIcon name="i-eos-icons:three-dots-loading" class="relative top-[.25rem] text-gray-500 w-5 h-5" />
          </div>

          <div v-if="webcontainerStatus === 'install'" class="flex items-center">
            <div class="text-gray-500 font-medium text-sm">
              npm install {{ pkg }}
            </div>
            <UIcon name="i-eos-icons:three-dots-loading" class="relative top-[.25rem] text-gray-500 w-5 h-5" />
          </div>

          <div v-if="webcontainerStatus === 'analyse'" class="flex items-center">
            <div class="text-gray-500 font-medium text-sm">
              Analyzing {{ pkg }}
            </div>
            <UIcon name="i-eos-icons:three-dots-loading" class="relative top-[.25rem] text-gray-500 w-5 h-5" />
          </div>

          <div class="w-[3rem]" />
        </div>
        <div class="w-full bg-gray-200/75 dark:bg-gray-800/75 p-4 rounded-b-[.5rem]">
          <div ref="root" class="w-full h-[15.5rem]" />
        </div>
      </div>
    </div>
  </Overlay>

  <Graph v-if="webcontainerStatus === 'finish'" />
</template>
