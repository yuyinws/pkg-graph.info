export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/ui',
    ['nuxt-module-cli-shortcuts', {
      rawMode: true,
    }],
    'unplugin-turbo-console/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  compatibilityDate: '2024-09-29',
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
  app: {
    head: {
      title: 'pkg-graph | Show dependency graph of a npm package',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },
})
