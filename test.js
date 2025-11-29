import { setTargets, createDebugger } from "./exports/debug.js";

setTargets(["test", "lfc"]);
const debug = createDebugger("test");
debug("hello");
const degger = createDebugger("lfc/chain");
degger("world");

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
