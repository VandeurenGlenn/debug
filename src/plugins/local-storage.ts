import { setTargets, getTargets } from '../utils/targets.js'

/**
 * Browser plugin to set debug targets from localStorage
 */
if (localStorage) {
  const DEBUG = localStorage.getItem?.('DEBUG')
  if (DEBUG) {
    const targets = getTargets()
    if (targets === undefined) setTargets(JSON.parse(DEBUG))
    else if (Array.isArray(targets))
      setTargets([...targets, ...JSON.parse(DEBUG)])
  }
}
