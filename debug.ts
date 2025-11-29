let TARGETS: undefined | string[] | boolean = undefined;

export const setTargets = (targets: string[] | boolean) => {
  TARGETS = targets;
};

if (globalThis.localStorage && !TARGETS) {
  const DEBUG = globalThis.localStorage.getItem("DEBUG");
  if (DEBUG) {
    TARGETS = JSON.parse(DEBUG);
  }
}

const getLogger = (trace?: boolean) => (trace ? console.trace : console.log);

const debug = (target: string, text: string, trace?: boolean) => {
  const _logger = getLogger(trace);
  if (!TARGETS) return;
  if (
    TARGETS === true ||
    TARGETS?.indexOf(target) !== -1 ||
    TARGETS?.indexOf("*") !== -1 ||
    TARGETS?.indexOf(target.split("/")[0]) !== -1
  )
    if (text) _logger("\x1b[34m\x1b[1m%s", `${target}: ${text}`, "\x1b[0m");
    else _logger("\x1b[34m\x1b[1m%s", `${target}`, "\x1b[0m");
};

export const createDebugger =
  (target: string) => (text: string, trace?: boolean) =>
    debug(target, text, trace);
