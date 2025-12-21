import { isEnabled, getTargets } from './utils/targets.js'
export { setTargets, getTargets, isEnabled } from './utils/targets.js'

const getLogger = (trace?: boolean) => (trace ? console.trace : console.log)

export const createDebugger = (target: string) => {
  // Cache the enabled check on first call
  let enabled: boolean | null = null
  let lastTargets: string[] | undefined = undefined

  return (text: string, trace?: boolean) => {
    const targets = getTargets()
    if (lastTargets !== targets) {
      enabled = targets ? isEnabled(target) : false
      lastTargets = targets
    }

    if (!enabled) return

    if (text)
      getLogger(trace)('\x1b[34m\x1b[1m%s', `${target}: ${text}`, '\x1b[0m')
    else getLogger(trace)('\x1b[34m\x1b[1m%s', `${target}`, '\x1b[0m')
  }
}
