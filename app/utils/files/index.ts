import type { FileSystemTree } from '@webcontainer/api'
import collectContent from './collect.mjs?raw'
import pkgJson from './pkg.json?raw'

export const files: FileSystemTree = {
  // scripts: {
  //   directory: {
  //     'collect-pkg.mjs': {
  //       file: {
  //         contents: collectContent,
  //       },
  //     },
  //   },
  // },

  'package.json': {
    file: {
      contents: pkgJson,
    },
  },
  'collect-pkg.mjs': {
    file: {
      contents: collectContent,
    },
  },
}
