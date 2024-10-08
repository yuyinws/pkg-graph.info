<script setup lang="ts">
const isOpen = defineModel<boolean>('open')
</script>

<template>
  <div :class="isOpen ? 'opacity-100  z-50' : 'opacity-0 -z-50'" class="fixed inset-0 transition-opacity bg-gray-200/75 dark:bg-gray-800/75">
    <slot />
  </div>
</template>
