if (!globalThis.DEBUG) {
  if (globalThis.localStorage) globalThis.DEBUG = Boolean(globalThis.localStorage.getItem('DEBUG') === 'true')
}

globalThis.debug = text => {
  if (globalThis.DEBUG) console.log('\x1b[34m\x1b[1m%s', text, '\x1b[0m'); // bright blue
}
