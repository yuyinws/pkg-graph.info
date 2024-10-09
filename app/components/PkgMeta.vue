<script setup lang="ts">
import type { PkgMeta } from '~~/types/pkg'

const { meta } = defineProps<{
  meta: PkgMeta | undefined
}>()

const route = useRoute()
const pkg = (route.params.pkg as string[]).join('/')

const githubUrl = computed(() => {
  if (!meta)
    return undefined
  if (typeof meta.repository === 'string')
    return `https://github.com/${meta.repository}`
  return meta?.repository?.url?.replace('git+https://github.com/', 'https://github.com/')
})

const fundings = computed(() => {
  if (!meta)
    return undefined

  if (typeof meta.funding === 'string')
    return [{ type: 'funding', url: meta.funding }]

  return meta.funding
})
</script>

<template>
  <div v-if="meta" class="flex flex-col items-start gap-2">
    <p class="text-xl font-bold">
      {{ meta.name.charAt(0).toUpperCase() + meta.name.slice(1) }}
    </p>

    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ meta.description }}
    </p>

    <div class="flex flex-wrap gap-2">
      <nuxt-link v-if="meta.version" :to="`https://www.npmjs.com/package/${meta.name}`" target="_blank">
        <UBadge color="gray">
          <UIcon name="i-mdi:npm-variant-outline" />
          <span class="ml-1">
            v{{ meta.version }}
          </span>
        </UBadge>
      </nuxt-link>

      <nuxt-link v-if="meta.homepage" color="gray" :to="meta.homepage" target="_blank">
        <UBadge color="gray" :to="meta.homepage" target="_blank">
          <UIcon name="i-heroicons-globe-alt" />
          <span class="ml-1">homepage</span>
        </UBadge>
      </nuxt-link>

      <nuxt-link v-if="githubUrl" color="gray" :to="githubUrl" target="_blank">
        <UBadge color="gray">
          <UIcon name="i-logos:github-icon" />
          <span class="ml-1">GitHub</span>
        </UBadge>
      </nuxt-link>

      <nuxt-link v-if="pkg !== meta.name" color="gray" :to="`/${meta.name}`">
        <UBadge color="gray">
          <UIcon name="i-ph:graph" />
          <span class="ml-1">pkg-graph</span>
        </UBadge>
      </nuxt-link>

      <UBadge color="gray">
        <UIcon name="i-lineicons:license" />
        <span class="ml-1">{{ meta.license }}</span>
      </UBadge>

      <nuxt-link />
    </div>

    <UDivider />

    <p class="text-xs text-gray-500 dark:text-gray-400">
      Keywords ({{ meta.keywords?.length || 0 }})
    </p>

    <div class="flex flex-wrap gap-2">
      <UBadge v-for="keyword in meta.keywords" :key="keyword" :ui="{ rounded: 'rounded-full' }" color="gray" variant="solid">
        {{ keyword }}
      </UBadge>
    </div>

    <p class="text-xs text-gray-500 dark:text-gray-400">
      Dependencies ({{ Object.keys(meta.dependencies || {}).length }})
    </p>

    <div class="flex flex-wrap gap-2 max-h-[15rem] overflow-y-auto">
      <UBadge v-for="(_, key) in meta.dependencies" :key="key" color="gray" variant="solid">
        {{ key }}
      </UBadge>
    </div>

    <template v-if="fundings">
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Funding ({{ fundings?.length || 0 }})
      </p>

      <div class="flex flex-wrap gap-2">
        <nuxt-link v-for="funding in fundings" :key="funding.url" :to="funding.url" target="_blank">
          <UBadge color="gray" variant="solid">
            {{ funding.type }}
          </UBadge>
        </nuxt-link>
      </div>
    </template>

    <UDivider />
  </div>
</template>
