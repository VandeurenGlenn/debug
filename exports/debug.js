let TARGETS = undefined;
const setTargets = (targets) => {
    TARGETS = targets;
};
if (globalThis.localStorage && !TARGETS) {
    const DEBUG = globalThis.localStorage.getItem("DEBUG");
    if (DEBUG) {
        TARGETS = JSON.parse(DEBUG);
    }
}
const getLogger = (trace) => (trace ? console.trace : console.log);
const debug = (target, text, trace) => {
    const _logger = getLogger(trace);
    if (!TARGETS)
        return;
    if (TARGETS === true ||
        TARGETS?.indexOf(target) !== -1 ||
        TARGETS?.indexOf("*") !== -1 ||
        TARGETS?.indexOf(target.split("/")[0]) !== -1)
        if (text)
            _logger("\x1b[34m\x1b[1m%s", `${target}: ${text}`, "\x1b[0m");
        else
            _logger("\x1b[34m\x1b[1m%s", `${target}`, "\x1b[0m");
};
const createDebugger = (target) => (text, trace) => debug(target, text, trace);

export { createDebugger, setTargets };
