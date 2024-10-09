<script setup lang="ts">
import type { PkgMeta } from '~~/types/pkg'

const { meta } = defineProps<{
  meta: PkgMeta | undefined
}>()

const isOpen = ref(true)

const pkgIcon = computed(() => {
  if (!meta?.homepage)
    return undefined
  if (meta.homepage.includes('github.com'))
    return undefined
  return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${meta.homepage}&size=128`
})
</script>

<template>
  <div
    class="absolute top-0 transition-all duration-300 flex-1 flex flex-col h-screen focus:outline-none w-screen max-w-xs bg-white dark:bg-gray-900 shadow-xl p-2"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex justify-end">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        square
        padded
        @click="isOpen = false"
      />
    </div>

    <div v-if="meta" class="flex items-center w-full gap-2">
      <UAvatar :src="pkgIcon" :alt="meta.name" />
      <p class="text-xl font-bold">
        {{ meta.name }}
      </p>
    </div>
  </div>
</template>
