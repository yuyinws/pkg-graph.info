<script setup lang="ts">
import type { PkgMeta } from '~~/types/pkg'

const { meta, maxLevel } = defineProps<{
  meta: PkgMeta | undefined
  maxLevel: number
}>()

const { name } = usePkgName()

const githubUrl = computed(() => {
  if (!meta)
    return undefined
  if (typeof meta.repository === 'string')
    return `https://github.com/${meta.repository}`
  return meta?.repository?.url?.replace('git+https://github.com/', 'https://github.com/').replace('git://github.com', 'https://github.com')
})

const fundings = computed(() => {
  if (!meta)
    return undefined

  if (typeof meta.funding === 'string')
    return [{ type: 'funding', url: meta.funding }]

  if (typeof meta.funding === 'object' && !Array.isArray(meta.funding))
    return [meta.funding]

  return meta.funding
})

const author = computed(() => {
  if (!meta)
    return undefined
  if (typeof meta.author === 'string')
    return meta.author
  return meta.author?.name
})

const dependenciesCount = computed(() => Object.keys(meta?.dependencies || {}).length)

const level = defineModel<number>('level')
const { isOpen } = storeToRefs(useSlide())
</script>

<template>
  <div v-if="meta" class="flex flex-col justify-between h-full pb-5">
    <div class="flex flex-col gap-2 overflow-y-auto">
      <div class="flex justify-between w-full">
        <p class="text-xl font-bold">
          {{ meta.name.charAt(0).toUpperCase() + meta.name.slice(1) }}
        </p>

        <UButton
          color="gray"
          variant="ghost"
          aria-label="Close"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="md:hidden block"
          @click="isOpen = false"
        />
      </div>

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
            <UIcon name="i-mdi:github" />
            <span class="ml-1">GitHub</span>
          </UBadge>
        </nuxt-link>

        <nuxt-link v-if="name !== meta.name" color="gray" :to="`/${meta.name}`">
          <UBadge color="gray">
            <UIcon name="i-ph:graph" />
            <span class="ml-1">pkg-graph</span>
          </UBadge>
        </nuxt-link>

        <UBadge v-show="meta.license" color="gray">
          <UIcon name="i-lineicons:license" />
          <span class="ml-1">{{ meta.license }}</span>
        </UBadge>
      </div>

      <p v-show="author" class="text-xs text-gray-500 dark:text-gray-400">
        Made by <span class="font-semibold">{{ author }}</span>
      </p>

      <UDivider />

      <p v-show="meta.keywords?.length" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Keywords ({{ meta.keywords?.length || 0 }})
      </p>

      <div class="flex flex-wrap gap-2">
        <nuxt-link v-for="keyword in meta.keywords" :key="keyword" :to="`https://www.npmjs.com/search?q=${keyword}`" target="_blank">
          <UBadge :ui="{ rounded: 'rounded-full' }" color="gray" variant="solid">
            {{ keyword }}
          </UBadge>
        </nuxt-link>
      </div>

      <p v-show="dependenciesCount > 0" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Dependencies ({{ dependenciesCount }})
      </p>

      <p v-show="dependenciesCount === 0" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
        🎉 Zero dependencies 🎉
      </p>

      <div class="flex flex-wrap items-start gap-2 max-h-[calc(100vh-41rem)] overflow-y-auto">
        <nuxt-link v-for="(_, key) in meta.dependencies" :key="key" :to="`/${key}`">
          <UBadge color="gray" variant="solid">
            {{ key }}
          </UBadge>
        </nuxt-link>
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
    </div>

    <div class="flex flex-col w-full gap-4">
      <span class="text-xs text-gray-500 dark:text-gray-400">Deep level ({{ `${level}/${maxLevel}` }})</span>
      <URange v-model="level" class="flex-1" size="sm" :min="0" :max="maxLevel" :disabled="maxLevel === 0" />

      <div class="flex justify-between">
        <UButton
          icon="i-radix-icons:image"
          size="sm"
          color="gray"
          variant="solid"
          label="Save"
          class="mr-3"
          :trailing="false"
        />

        <UButton
          target="_blank"
          icon="i-ri:twitter-x-fill"
          size="sm"
          color="black"
          variant="solid"
          label="Share"
          :trailing="false"
        />
      </div>
    </div>
  </div>
</template>
