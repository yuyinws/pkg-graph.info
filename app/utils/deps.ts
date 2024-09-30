export const deps = {
  nodes: [
    {
      id: 'vue',
      label: 'vue',
    },
    {
      id: '@vue/compiler-dom',
      label: '@vue/compiler-dom',
    },
    {
      id: '@vue/compiler-core',
      label: '@vue/compiler-core',
    },
    {
      id: '@babel/parser',
      label: '@babel/parser',
    },
    {
      id: '@babel/types',
      label: '@babel/types',
    },
    {
      id: '@babel/helper-string-parser',
      label: '@babel/helper-string-parser',
    },
    {
      id: '@babel/helper-validator-identifier',
      label: '@babel/helper-validator-identifier',
    },
    {
      id: 'to-fast-properties',
      label: 'to-fast-properties',
    },
    {
      id: '@vue/shared',
      label: '@vue/shared',
    },
    {
      id: 'entities',
      label: 'entities',
    },
    {
      id: 'estree-walker',
      label: 'estree-walker',
    },
    {
      id: 'source-map-js',
      label: 'source-map-js',
    },
    {
      id: '@vue/compiler-sfc',
      label: '@vue/compiler-sfc',
    },
    {
      id: '@vue/compiler-ssr',
      label: '@vue/compiler-ssr',
    },
    {
      id: 'magic-string',
      label: 'magic-string',
    },
    {
      id: '@jridgewell/sourcemap-codec',
      label: '@jridgewell/sourcemap-codec',
    },
    {
      id: 'postcss',
      label: 'postcss',
    },
    {
      id: 'nanoid',
      label: 'nanoid',
    },
    {
      id: 'picocolors',
      label: 'picocolors',
    },
    {
      id: '@vue/runtime-dom',
      label: '@vue/runtime-dom',
    },
    {
      id: '@vue/reactivity',
      label: '@vue/reactivity',
    },
    {
      id: '@vue/runtime-core',
      label: '@vue/runtime-core',
    },
    {
      id: 'csstype',
      label: 'csstype',
    },
    {
      id: '@vue/server-renderer',
      label: '@vue/server-renderer',
    },
  ],
  edges: [
    {
      id: 1,
      from: 'vue',
      to: '@vue/compiler-dom',
    },
    {
      id: 2,
      from: '@vue/compiler-dom',
      to: '@vue/compiler-core',
    },
    {
      id: 3,
      from: '@vue/compiler-core',
      to: '@babel/parser',
    },
    {
      id: 4,
      from: '@babel/parser',
      to: '@babel/types',
    },
    {
      id: 5,
      from: '@babel/types',
      to: '@babel/helper-string-parser',
    },
    {
      id: 6,
      from: '@babel/types',
      to: '@babel/helper-validator-identifier',
    },
    {
      id: 7,
      from: '@babel/types',
      to: 'to-fast-properties',
    },
    {
      id: 8,
      from: '@vue/compiler-core',
      to: '@vue/shared',
    },
    {
      id: 9,
      from: '@vue/compiler-core',
      to: 'entities',
    },
    {
      id: 10,
      from: '@vue/compiler-core',
      to: 'estree-walker',
    },
    {
      id: 11,
      from: '@vue/compiler-core',
      to: 'source-map-js',
    },
    {
      id: 12,
      from: '@vue/compiler-dom',
      to: '@vue/shared',
    },
    {
      id: 13,
      from: 'vue',
      to: '@vue/compiler-sfc',
    },
    {
      id: 14,
      from: '@vue/compiler-sfc',
      to: '@babel/parser',
    },
    {
      id: 15,
      from: '@babel/parser',
      to: '@babel/types',
    },
    {
      id: 16,
      from: '@babel/types',
      to: '@babel/helper-string-parser',
    },
    {
      id: 17,
      from: '@babel/types',
      to: '@babel/helper-validator-identifier',
    },
    {
      id: 18,
      from: '@babel/types',
      to: 'to-fast-properties',
    },
    {
      id: 19,
      from: '@vue/compiler-sfc',
      to: '@vue/compiler-core',
    },
    {
      id: 20,
      from: '@vue/compiler-core',
      to: '@babel/parser',
    },
    {
      id: 21,
      from: '@babel/parser',
      to: '@babel/types',
    },
    {
      id: 22,
      from: '@babel/types',
      to: '@babel/helper-string-parser',
    },
    {
      id: 23,
      from: '@babel/types',
      to: '@babel/helper-validator-identifier',
    },
    {
      id: 24,
      from: '@babel/types',
      to: 'to-fast-properties',
    },
    {
      id: 25,
      from: '@vue/compiler-core',
      to: '@vue/shared',
    },
    {
      id: 26,
      from: '@vue/compiler-core',
      to: 'entities',
    },
    {
      id: 27,
      from: '@vue/compiler-core',
      to: 'estree-walker',
    },
    {
      id: 28,
      from: '@vue/compiler-core',
      to: 'source-map-js',
    },
    {
      id: 29,
      from: '@vue/compiler-sfc',
      to: '@vue/compiler-dom',
    },
    {
      id: 30,
      from: '@vue/compiler-dom',
      to: '@vue/compiler-core',
    },
    {
      id: 31,
      from: '@vue/compiler-core',
      to: '@babel/parser',
    },
    {
      id: 32,
      from: '@babel/parser',
      to: '@babel/types',
    },
    {
      id: 33,
      from: '@babel/types',
      to: '@babel/helper-string-parser',
    },
    {
      id: 34,
      from: '@babel/types',
      to: '@babel/helper-validator-identifier',
    },
    {
      id: 35,
      from: '@babel/types',
      to: 'to-fast-properties',
    },
    {
      id: 36,
      from: '@vue/compiler-core',
      to: '@vue/shared',
    },
    {
      id: 37,
      from: '@vue/compiler-core',
      to: 'entities',
    },
    {
      id: 38,
      from: '@vue/compiler-core',
      to: 'estree-walker',
    },
    {
      id: 39,
      from: '@vue/compiler-core',
      to: 'source-map-js',
    },
    {
      id: 40,
      from: '@vue/compiler-dom',
      to: '@vue/shared',
    },
    {
      id: 41,
      from: '@vue/compiler-sfc',
      to: '@vue/compiler-ssr',
    },
    {
      id: 42,
      from: '@vue/compiler-ssr',
      to: '@vue/compiler-dom',
    },
    {
      id: 43,
      from: '@vue/compiler-dom',
      to: '@vue/compiler-core',
    },
    {
      id: 44,
      from: '@vue/compiler-core',
      to: '@babel/parser',
    },
    {
      id: 45,
      from: '@babel/parser',
      to: '@babel/types',
    },
    {
      id: 46,
      from: '@babel/types',
      to: '@babel/helper-string-parser',
    },
    {
      id: 47,
      from: '@babel/types',
      to: '@babel/helper-validator-identifier',
    },
    {
      id: 48,
      from: '@babel/types',
      to: 'to-fast-properties',
    },
    {
      id: 49,
      from: '@vue/compiler-core',
      to: '@vue/shared',
    },
    {
      id: 50,
      from: '@vue/compiler-core',
      to: 'entities',
    },
    {
      id: 51,
      from: '@vue/compiler-core',
      to: 'estree-walker',
    },
    {
      id: 52,
      from: '@vue/compiler-core',
      to: 'source-map-js',
    },
    {
      id: 53,
      from: '@vue/compiler-dom',
      to: '@vue/shared',
    },
    {
      id: 54,
      from: '@vue/compiler-ssr',
      to: '@vue/shared',
    },
    {
      id: 55,
      from: '@vue/compiler-sfc',
      to: '@vue/shared',
    },
    {
      id: 56,
      from: '@vue/compiler-sfc',
      to: 'estree-walker',
    },
    {
      id: 57,
      from: '@vue/compiler-sfc',
      to: 'magic-string',
    },
    {
      id: 58,
      from: 'magic-string',
      to: '@jridgewell/sourcemap-codec',
    },
    {
      id: 59,
      from: '@vue/compiler-sfc',
      to: 'postcss',
    },
    {
      id: 60,
      from: 'postcss',
      to: 'nanoid',
    },
    {
      id: 61,
      from: 'postcss',
      to: 'picocolors',
    },
    {
      id: 62,
      from: 'postcss',
      to: 'source-map-js',
    },
    {
      id: 63,
      from: '@vue/compiler-sfc',
      to: 'source-map-js',
    },
    {
      id: 64,
      from: 'vue',
      to: '@vue/runtime-dom',
    },
    {
      id: 65,
      from: '@vue/runtime-dom',
      to: '@vue/reactivity',
    },
    {
      id: 66,
      from: '@vue/reactivity',
      to: '@vue/shared',
    },
    {
      id: 67,
      from: '@vue/runtime-dom',
      to: '@vue/runtime-core',
    },
    {
      id: 68,
      from: '@vue/runtime-core',
      to: '@vue/reactivity',
    },
    {
      id: 69,
      from: '@vue/reactivity',
      to: '@vue/shared',
    },
    {
      id: 70,
      from: '@vue/runtime-core',
      to: '@vue/shared',
    },
    {
      id: 71,
      from: '@vue/runtime-dom',
      to: '@vue/shared',
    },
    {
      id: 72,
      from: '@vue/runtime-dom',
      to: 'csstype',
    },
    {
      id: 73,
      from: 'vue',
      to: '@vue/server-renderer',
    },
    {
      id: 74,
      from: '@vue/server-renderer',
      to: '@vue/compiler-ssr',
    },
    {
      id: 75,
      from: '@vue/compiler-ssr',
      to: '@vue/compiler-dom',
    },
    {
      id: 76,
      from: '@vue/compiler-dom',
      to: '@vue/compiler-core',
    },
    {
      id: 77,
      from: '@vue/compiler-core',
      to: '@babel/parser',
    },
    {
      id: 78,
      from: '@babel/parser',
      to: '@babel/types',
    },
    {
      id: 79,
      from: '@babel/types',
      to: '@babel/helper-string-parser',
    },
    {
      id: 80,
      from: '@babel/types',
      to: '@babel/helper-validator-identifier',
    },
    {
      id: 81,
      from: '@babel/types',
      to: 'to-fast-properties',
    },
    {
      id: 82,
      from: '@vue/compiler-core',
      to: '@vue/shared',
    },
    {
      id: 83,
      from: '@vue/compiler-core',
      to: 'entities',
    },
    {
      id: 84,
      from: '@vue/compiler-core',
      to: 'estree-walker',
    },
    {
      id: 85,
      from: '@vue/compiler-core',
      to: 'source-map-js',
    },
    {
      id: 86,
      from: '@vue/compiler-dom',
      to: '@vue/shared',
    },
    {
      id: 87,
      from: '@vue/compiler-ssr',
      to: '@vue/shared',
    },
    {
      id: 88,
      from: '@vue/server-renderer',
      to: '@vue/shared',
    },
    {
      id: 89,
      from: 'vue',
      to: '@vue/shared',
    },
  ],
}
