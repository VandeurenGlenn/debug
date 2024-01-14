if (!globalThis.DEBUG) {
  let DEBUG = [];
  if (globalThis.localStorage) {
    DEBUG = globalThis.localStorage.getItem('DEBUG');
    globalThis.DEBUG = DEBUG ? DEBUG.split(',') : [DEBUG];
  }
}

const debug = (target, text) => {
  if (!globalThis.DEBUG && globalThis.DEBUG.length === 0) return;
  if (
    globalThis.DEBUG === 'true' ||
    globalThis.DEBUG === true ||
    globalThis.DEBUG?.indexOf(target) !== -1 ||
    globalThis.DEBUG?.indexOf('*') !== -1 ||
    globalThis.DEBUG?.indexOf(target.split('/')[0]) !== -1
  )
    if (text) console.log('\x1b[34m\x1b[1m%s', `${target}: ${text}`, '\x1b[0m');
    else console.log('\x1b[34m\x1b[1m%s', `${target}`, '\x1b[0m');
};

if (!globalThis.debug) {
  globalThis.debug = debug;

  globalThis.createDebugger = (target) => (text) => debug(target, text);
}
