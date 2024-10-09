import type { WebContainer, WebContainerProcess } from '@webcontainer/api'
import type { Raw } from 'vue'
import { files } from '@/utils/files'
import { defineStore } from 'pinia'

export const useWebcontainerStore = defineStore('webcontainer', () => {
  const webcontainerInstance = shallowRef<Raw<WebContainer>>()
  const status = ref<'idle' | 'error' | 'install' | 'analyse' | 'graph' | 'finish'>('idle')
  const error = shallowRef<{ message: string }>()

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
    await spawn('cp', ['package.json.tmp', 'package.json'])
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

  async function cleanProgress() {
    const cleanProgress = await spawn('rm', ['-rf', 'node_modules package-lock.json package.json'])
    if (cleanProgress !== 0) {
      status.value = 'error'
      error.value = { message: `Unable to run rm, exit as ${cleanProgress}` }
      console.error('Unable to run rm')
      return false
    }

    return true
  }

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

  return {
    init,
    webcontainerInstance,
    status,
    currentProcess,
    launchInstallProcess,
    launchCollectPkgProcess,
    lanuchInteractiveProgress,
    cleanProgress,
  }
})
