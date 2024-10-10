<script setup lang="ts">
const pkg = ref('')

const randomPkgs = useState('randomPkgs', () => randomPkg(5))

defineShortcuts({
  enter: {
    usingInput: true,
    handler: () => {
      if (pkg.value) {
        navigateTo(`/${pkg.value}`)
      }
    },
  },
})

defineOgImageComponent('Home')
</script>

<template>
  <div>
    <img src="/logo-2.svg" alt="pkg-graph" class="w-[20rem] mt-[10rem] mx-auto">

    <p class="text-center text-gray-500 dark:text-gray-400 mt-[.2rem]">
      Visualize the dependency graph of <span class="font-bold">npm packages</span>.
    </p>

    <div class="w-[22rem] sm:w-[26rem] gap-2 mx-auto mt-[1rem] flex flex-col items-center">
      <div class="flex w-full gap-2">
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
    </div>

    <div class="flex flex-wrap justify-center gap-2 mt-[.8rem] mx-auto w-[22rem] sm:w-[26rem]">
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
</template>
