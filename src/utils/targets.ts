export let TARGETS: undefined | string[] | boolean = undefined

export const setTargets = (targets: string[] | boolean) => {
  TARGETS = targets
}

export const isEnabled = (target: string) => {
  if (!TARGETS) return false
  return (
    TARGETS === true ||
    TARGETS?.indexOf(target) !== -1 ||
    TARGETS?.indexOf('*') !== -1 ||
    TARGETS?.indexOf(target.split('/')[0]) !== -1
  )
}
