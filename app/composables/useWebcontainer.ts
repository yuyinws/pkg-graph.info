import type { WebContainer, WebContainerProcess } from '@webcontainer/api'
import type { Raw } from 'vue'
import { files } from '@/utils/files'
import { defineStore } from 'pinia'

export const useWebcontainerStore = defineStore('webcontainer', () => {
  const webcontainerInstance = shallowRef<Raw<WebContainer>>()
  const status = ref<'idle' | 'error' | 'install' | 'analyse' | 'graph' | 'finish'>('idle')
  const error = shallowRef<{ message: string }>()
  let _promiseInit: Promise<void> | undefined

  const currentProcess = shallowRef<Raw<WebContainerProcess | undefined>>()

  async function spawn(command: string, args: string[] = []) {
    if (currentProcess.value)
      throw new Error('A process is already running')
    const process = await webcontainerInstance.value!.spawn(command, args)
    currentProcess.value = process
    return process.exit.then((r) => {
      if (currentProcess.value === process)
        currentProcess.value = undefined
      return r
    })
  }

  async function launchInstallProcess(pkg: string) {
    status.value = 'install'
    const installExitCode = await spawn('npm', ['install', pkg])
    if (installExitCode !== 0) {
      error.value = { message: `Unable to run npm install, exit as ${installExitCode}` }
      console.error('Unable to run npm install')
      return false
    }

    return true
  }

  async function launchCollectPkgProcess(pkg: string) {
    status.value = 'analyse'
    const installExitCode = await spawn('node', ['collect-pkg.mjs', pkg])
    if (installExitCode !== 0) {
      status.value = 'error'
      error.value = { message: `Unable to run npm install, exit as ${installExitCode}` }
      console.error('Unable to run npm install')
      return false
    }

    return true
  }

  async function lanuchInteractiveProgress() {
    await spawn('jsh')
  }

  if (import.meta.client) {
    async function init() {
      try {
        const { WebContainer } = await import('@webcontainer/api')
        const wc = await WebContainer.boot()

        await wc.mount(files)
        webcontainerInstance.value = wc
      }
      catch (error) {
        console.error(error)
        status.value = 'error'
      }
    }

    _promiseInit = init()
  }

  return {
    get init() {
      return _promiseInit
    },
    webcontainerInstance,
    status,
    currentProcess,
    launchInstallProcess,
    launchCollectPkgProcess,
    lanuchInteractiveProgress,
  }
})
