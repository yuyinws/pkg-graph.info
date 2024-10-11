export function randomPkg(count: number) {
  const pkgs = [
    'vue',
    'react',
    'svelte',
    '@angular/core',
    'solid-js',
    'next',
    'nuxt',
    'astro',
    'supabase',
    '@nestjs/core',
    'express',
    'h3',
    'nitropack',
    'unplugin',
    'vite',
    'unocss',
    'tailwindcss',
  ]

  return pkgs.sort(() => Math.random() - 0.5).slice(0, count)
}
