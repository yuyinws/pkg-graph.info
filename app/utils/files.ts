import type { FileSystemTree } from '@webcontainer/api'

export const files: FileSystemTree = {
  scripts: {
    directory: {
      'collect-pkg.mjs': {
        file: {
          contents: 'console.log("collect-pkg")',
        },
      },
    },
  },
}
