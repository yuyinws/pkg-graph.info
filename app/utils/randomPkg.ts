export function randomPkg(count: number) {
  const pkgs = [
    'vue',
    'react',
    'svelte',
    '@angular/core',
    'solid-js',
    'next',
    'hono',
    'fastify',
    'nuxt',
    'astro',
    'supabase',
    '@adonisjs/core',
    '@nestjs/core',
    'lodash',
    'date-fns',
    'express',
    'h3',
    'nitropack',
    'unplugin',
    'typescript',
    'vite',
  ]

  return pkgs.sort(() => Math.random() - 0.5).slice(0, count)
}
