<script setup lang="ts">
import type { PkgMeta } from '~~/types/pkg'

const { meta, maxLevel } = defineProps<{
  meta: PkgMeta | undefined
  maxLevel: number
}>()

const emit = defineEmits<{
  (event: 'save-image'): void
}>()

const { name, pkg } = usePkgName()

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

  if (typeof meta.funding === 'string') {
    try {
      const url = new URL(meta.funding)
      return [{ type: url.hostname.replace('www.', ''), url: meta.funding }]
    }
    catch {
      return [
        {
          type: 'funding',
          url: meta.funding,
        },
      ]
    }
  }

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

const shareUrl = computed(() => {
  const message = `Check out the dependency graph of ${pkg}`
  const url = `https://pkg-graph.info/${pkg}`
  return `https://x.com/intent/tweet?text=${encodeURIComponent(`${message}\n\n${url}`)}`
})
</script>

<template>
  <div v-if="meta" class="flex flex-col justify-between h-[calc(100vh-6rem)] gap-4">
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
        <UButton :to="`https://www.npmjs.com/package/${meta.name}`" target="_blank" size="xs" color="gray" :ui="{ padding: { xs: 'py-1' } }">
          <UIcon name="i-mdi:npm-variant-outline" />
          <span>
            v{{ meta.version }}
          </span>
        </UButton>

        <UButton v-if="meta.homepage" :to="meta.homepage" target="_blank" size="xs" color="gray" :ui="{ padding: { xs: 'py-1' } }">
          <UIcon name="i-heroicons-globe-alt" />
          <span>homepage</span>
        </UButton>

        <UButton v-if="githubUrl" color="gray" :to="githubUrl" target="_blank" size="xs" :ui="{ padding: { xs: 'py-1' } }">
          <UIcon name="i-mdi:github" />
          <span>GitHub</span>
        </UButton>

        <UButton v-if="name !== meta.name" color="gray" :to="`/${meta.name}`" size="xs" :ui="{ padding: { xs: 'py-1' } }">
          <UIcon name="i-ph:graph" />
          <span>pkg-graph</span>
        </UButton>

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
        <UButton v-for="keyword in meta.keywords" :key="keyword" :to="`https://www.npmjs.com/search?q=${keyword}`" target="_blank" size="xs" color="gray" class="rounded-full" :ui="{ padding: { xs: 'py-1' } }">
          {{ keyword }}
        </UButton>
      </div>

      <p v-show="dependenciesCount > 0" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Dependencies ({{ dependenciesCount }})
      </p>

      <p v-show="dependenciesCount === 0" class="text-sm font-semibold text-gray-500 dark:text-gray-400">
        🎉 Zero dependencies 🎉
      </p>

      <div class="flex flex-wrap items-start gap-2 overflow-y-auto">
        <UButton v-for="(_, key) in meta.dependencies" :key="key" :to="`/${key}`" size="xs" color="gray" :ui="{ padding: { xs: 'py-1' } }">
          {{ key }}
        </UButton>
      </div>

      <template v-if="fundings">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Funding ({{ fundings?.length || 0 }})
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton v-for="funding in fundings" :key="funding.url" :to="funding.url" target="_blank" size="xs" color="gray" :ui="{ padding: { xs: 'py-1' } }">
            {{ funding.type }}
          </UButton>
        </div>
      </template>
    </div>

    <div class="flex flex-col w-full gap-4">
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-500 dark:text-gray-400">Deep level ({{ `${level}/${maxLevel}` }})</span>
        <UTooltip text="The deepest level of dependency shown in the graph" :popper="{ placement: 'top' }">
          <UIcon name="i-radix-icons:question-mark-circled" class="text-gray-500 dark:text-gray-400" />
        </UTooltip>
      </div>

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
          @click="emit('save-image')"
        />

        <UButton
          target="_blank"
          icon="i-ri:twitter-x-fill"
          :to="shareUrl"
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
