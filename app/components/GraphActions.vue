<script setup lang="ts">
const emit = defineEmits(['move', 'zoom', 'focus'])

defineShortcuts({
  'arrowup': () => emit('move', 'up'),
  'arrowdown': () => emit('move', 'down'),
  'arrowleft': () => emit('move', 'left'),
  'arrowright': () => emit('move', 'right'),
  ' ': () => emit('focus'),
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <UButton
        color="gray"
        size="sm"
        icon="i-iconoir:zoom-in"
        @click="emit('zoom', true)"
      />

      <UButton
        color="gray"
        size="sm"
        icon="i-radix-icons:chevron-up"
        @click="emit('move', 'up')"
      />

      <UButton
        color="gray"
        size="sm"
        icon="i-iconoir:zoom-out"
        @click="emit('zoom', false)"
      />
    </div>

    <div class="flex gap-2">
      <UButton
        color="gray"
        size="sm"
        icon="i-radix-icons:chevron-left"
        @click="emit('move', 'left')"
      />

      <UButton
        color="gray"
        size="sm"
        icon="i-radix-icons:corners"
        @click="emit('focus')"
      />

      <UButton
        color="gray"
        size="sm"
        icon="i-radix-icons:chevron-right"
        @click="emit('move', 'right')"
      />
    </div>

    <div class="flex justify-center">
      <UButton
        color="gray"
        size="sm"
        icon="i-radix-icons:chevron-down"
        @click="emit('move', 'down')"
      />
    </div>
  </div>
</template>
