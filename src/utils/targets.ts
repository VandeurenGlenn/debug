let targetsSet: Set<string> | undefined = undefined
let hasWildcard = false
let debugAll = false

export const getTargets = () => Array.from(targetsSet?.keys() ?? [])

export const setTargets = (targets: string[] | boolean) => {
  if (Array.isArray(targets)) {
    targetsSet = new Set(targets)
    hasWildcard = targetsSet.has('*')
    debugAll = false
  } else if (targets === true) {
    targetsSet = undefined
    hasWildcard = true
    debugAll = true
  } else {
    targetsSet = undefined
    hasWildcard = false
    debugAll = false
  }
}

export const isEnabled = (target: string) => {
  if (debugAll) return true
  if (hasWildcard) return true

  if (targetsSet) {
    if (targetsSet.has(target)) return true
    const prefix = target.split('/')[0]
    return targetsSet.has(prefix)
  }
  return false
}
