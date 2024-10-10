export interface PkgMeta {
  name: string
  version: string
  author: string | {
    name: string
  } | undefined
  keywords: string[] | undefined
  description: string
  homepage: string
  license: string
  repository: {
    type: string
    url: string
  } | string | undefined
  dependencies: Record<string, string> | undefined
  funding: {
    type: string
    url: string
  }[] | string | {
    type: string
    url: string
  } | undefined
}
