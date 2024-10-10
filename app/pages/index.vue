<script setup lang="ts">
const pkg = ref('')

const randomPkgs = useState('randomPkgs', () => randomPkg(5))
</script>

<template>
  <div>
    <img src="/logo-2.svg" alt="pkg-graph" class="w-[20rem] mt-[10rem] mx-auto">

    <p class="text-center text-gray-500 dark:text-gray-400 mt-[.2rem]">
      Show the dependency graph of a npm package.
    </p>

    <div class="w-[26rem] gap-2 mx-auto mt-[1rem] flex flex-col items-center">
      <div class="flex w-full">
        <UInput
          v-model="pkg"
          icon="i-mdi:npm-variant-outline"
          size="lg"
          autofocus
          placeholder="npm package name"
          class="flex-1"
        />

        <UButton
          :disabled="!pkg"
          :to="`/${pkg}`"
          aria-label="search"
          icon="i-heroicons-magnifying-glass"
        />
      </div>

      <div class="flex justify-center gap-2 w-full">
        <UButton
          v-for="pkg in randomPkgs"
          :key="pkg"
          :to="`/${pkg}`"
          color="gray"
          :label="pkg"
          size="xs"
        />
      </div>
    </div>
  </div>
</template>
