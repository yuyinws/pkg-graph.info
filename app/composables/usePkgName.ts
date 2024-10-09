export function usePkgName(): {
  name: string
  version?: string
  pkg: string
} {
  const route = useRoute()
  const pkg = (route.params.pkg as string[]).join('/')
  const parts = pkg.split('@')

  if (parts[0] === '') {
    // 处理 @scope/package@version 或 @scope/package 的情况
    return {
      name: `@${parts[1]}`,
      version: parts[2] || undefined,
      pkg,
    }
  }
  else if (parts.length > 1) {
    // 处理 package@version 的情况
    return {
      name: parts[0]!,
      version: parts[1],
      pkg,
    }
  }
  else {
    // 处理只有包名没有版本号的情况
    return {
      name: parts[0]!,
      pkg,
    }
  }
}
