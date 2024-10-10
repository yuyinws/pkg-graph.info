export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 5111,
    host: '0.0.0.0',
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
    // 'nuxt-og-image',
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
      title: 'pkg-graph | Visualize the dependency graph of npm packages.',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },
  // site: {
  //   url: 'https://pkg-graph.info',
  // },
})
