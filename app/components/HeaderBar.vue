<script setup lang="ts">
const { isOpen } = storeToRefs(useSlide())
const { status } = storeToRefs(useWebcontainerStore())
</script>

<template>
  <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
    <div class="mx-auto px-4 sm:px-6 flex items-center justify-between font-bold gap-3 h-14">
      <UButton
        v-show="status === 'finish'"
        icon="i-heroicons:bars-3-20-solid"
        aria-label="Menu"
        color="gray"
        variant="ghost"
        class="md:hidden"
        @click="isOpen = !isOpen"
      />

      <nuxt-link to="/">
        <img src="/logo-2.svg" alt="pkg-graph">
      </nuxt-link>

      <div>
        <nuxt-link to="https://github.com/yuyinws/pkg-graph.info" target="_blank">
          <UButton
            icon="i-mdi:github"
            color="gray"
            variant="ghost"
            aria-label="GitHub"
          />
        </nuxt-link>

        <DarkToggle />
      </div>
    </div>
  </header>
</template>
