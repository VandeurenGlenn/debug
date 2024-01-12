const test = require('tape');
require('./debug');
DEBUG = ['test', true];
debug('hello');
debug('hello', 'hello');
debug('test', 'hello');
const degger = globalThis.createDebugger('test');
degger('world');

// test('debug is defined', tape => {
//   tape.plan(1)
//   tape.ok(Boolean(globalThis.debug !== undefined))
// })

// test('debug is enablad', tape => {
//   tape.plan(1)
//   DEBUG = true
//   tape.ok(Boolean(globalThis.DEBUG === true))
// })

// test('debug is disabled', tape => {
//   tape.plan(1)
//   DEBUG = false
//   tape.ok(Boolean(globalThis.DEBUG === false))
// })
