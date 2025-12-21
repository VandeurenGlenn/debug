import { setTargets, TARGETS } from "../debug.js";

/**
 * Browser plugin to set debug targets from localStorage
 */
if (localStorage) {
  const DEBUG = localStorage.getItem?.("DEBUG");
  if (DEBUG) {
    if (TARGETS === undefined) setTargets(JSON.parse(DEBUG));
    else if (Array.isArray(TARGETS))
      setTargets([...TARGETS, ...JSON.parse(DEBUG)]);
  }
}
