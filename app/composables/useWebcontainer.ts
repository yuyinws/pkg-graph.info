import type { WebContainer } from '@webcontainer/api'
import type { Raw } from 'vue'
import { defineStore } from 'pinia'

export const useWebcontainerStore = defineStore('webcontainer', () => {
  const webcontainerState = shallowRef<Raw<WebContainer>>()

  let _promiseInit: Promise<void> | undefined

  if (import.meta.client) {
    async function init() {
      const { WebContainer } = await import('@webcontainer/api')
      const wc = await WebContainer.boot()
      await wc.mount(files)
      webcontainerState.value = wc
    }

    _promiseInit = init()
  }

  return {
    get init() {
      return _promiseInit
    },
    webcontainerState,
  }
})
