import { isEnabled, TARGETS } from './utils/targets.js'
export { TARGETS, setTargets, isEnabled } from './utils/targets.js'

const getLogger = (trace?: boolean) => (trace ? console.trace : console.log)

const debug = (target: string, text: string, trace?: boolean) => {
  if (!TARGETS) return
  if (!isEnabled(target)) return

  if (text)
    getLogger(trace)('\x1b[34m\x1b[1m%s', `${target}: ${text}`, '\x1b[0m')
  else getLogger(trace)('\x1b[34m\x1b[1m%s', `${target}`, '\x1b[0m')
}

export const createDebugger =
  (target: string) => (text: string, trace?: boolean) =>
    debug(target, text, trace)
