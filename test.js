import { test, afterEach } from 'node:test'
import assert from 'node:assert'
import {
  setTargets,
  createDebugger,
  isEnabled,
  getTargets,
} from './exports/debug.js'

afterEach(() => {
  // Reset targets to prevent test interference
  setTargets(false)
})

test('Debug logging with specific targets', () => {
  setTargets(['test', 'lfc'])
  const testDebug = createDebugger('test')
  const lfcDebug = createDebugger('lfc/chain')

  // Capture output
  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('hello from test')
  lfcDebug('hello from lfc/chain')

  console.log = originalLog

  assert.ok(
    logs.some(log => log.includes('test: hello from test')),
    'test message should be logged'
  )
  assert.ok(
    logs.some(log => log.includes('lfc/chain: hello from lfc/chain')),
    'lfc/chain message should be logged'
  )
})

test('Debug logging when disabled', () => {
  setTargets(false)
  const testDebug = createDebugger('test')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('this should not log')

  console.log = originalLog

  assert.equal(
    logs.length,
    0,
    'no messages should be logged when targets are disabled'
  )
})

test('Debug logging when enabled globally', () => {
  setTargets(true)
  const testDebug = createDebugger('test')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('test with all enabled')

  console.log = originalLog

  assert.ok(
    logs.some(log => log.includes('test: test with all enabled')),
    'message should be logged with global enable'
  )
})

test('Debug logging with namespace prefix matching', () => {
  setTargets(['lfc'])
  const lfcDebug = createDebugger('lfc/chain')
  const otherDebug = createDebugger('lfc/other')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  lfcDebug('lfc/chain message')
  otherDebug('lfc/other message')

  console.log = originalLog

  assert.equal(logs.length, 2, 'both lfc/* namespaces should be logged')
  assert.ok(logs.some(log => log.includes('lfc/chain: lfc/chain message')))
  assert.ok(logs.some(log => log.includes('lfc/other: lfc/other message')))
})

test('Debug logging with wildcard target', () => {
  setTargets(['*'])
  const testDebug = createDebugger('test')
  const otherDebug = createDebugger('other')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('message from test')
  otherDebug('message from other')

  console.log = originalLog

  assert.equal(logs.length, 2, 'all namespaces should be logged with wildcard')
  assert.ok(logs.some(log => log.includes('test: message from test')))
  assert.ok(logs.some(log => log.includes('other: message from other')))
})

test('Debug logging with trace enabled', () => {
  setTargets(true)
  const testDebug = createDebugger('test')

  const traces = []
  const originalTrace = console.trace
  console.trace = (...args) => traces.push(args.join(' '))

  testDebug('trace test', true)

  console.trace = originalTrace

  assert.ok(
    traces.some(trace => trace.includes('test: trace test')),
    'message should be traced when trace parameter is true'
  )
})

test('Debug logging without text parameter', () => {
  setTargets(true)
  const testDebug = createDebugger('test')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('')

  console.log = originalLog

  assert.ok(
    logs.some(log => log.includes('test')),
    'namespace should be logged even without message text'
  )
})

test('isEnabled function with various targets', () => {
  setTargets(['test', 'lfc'])
  assert.equal(isEnabled('test'), true, 'should enable exact match')
  assert.equal(isEnabled('lfc/chain'), true, 'should enable prefix match')
  assert.equal(
    isEnabled('other'),
    false,
    'should not enable non-matching target'
  )

  setTargets(true)
  assert.equal(isEnabled('anything'), true, 'should enable all with true')

  setTargets(false)
  assert.equal(isEnabled('test'), false, 'should disable all with false')

  setTargets(['*'])
  assert.equal(isEnabled('anything'), true, 'should enable all with wildcard')
})

test('getTargets export reflects current state', () => {
  setTargets(['test'])

  assert.deepEqual(getTargets(), ['test'], 'getTargets should match set value')

  setTargets(true)
  assert.equal(
    isEnabled('anything'),
    true,
    'getTargets should return true when set to true'
  )

  setTargets(false)
  assert.equal(
    isEnabled('test'),
    false,
    'getTargets should return false when set to false'
  )
})

test('Debug caching updates when targets change', () => {
  setTargets(['test'])
  const testDebug = createDebugger('test')
  const otherDebug = createDebugger('other')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('first message')
  otherDebug('should not log')

  // Change targets
  setTargets(['other'])

  testDebug('should not log after change')
  otherDebug('second message')

  console.log = originalLog

  assert.equal(
    logs.length,
    2,
    'should log correct messages based on current targets'
  )
  assert.ok(logs[0].includes('test: first message'))
  assert.ok(logs[1].includes('other: second message'))
})

test('Multiple debuggers with same namespace', () => {
  setTargets(['test'])
  const debug1 = createDebugger('test')
  const debug2 = createDebugger('test')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  debug1('from debug1')
  debug2('from debug2')

  console.log = originalLog

  assert.equal(logs.length, 2, 'both debuggers should log')
  assert.ok(logs[0].includes('test: from debug1'))
  assert.ok(logs[1].includes('test: from debug2'))
})

test('Empty targets array disables all logging', () => {
  setTargets([])
  const testDebug = createDebugger('test')

  const logs = []
  const originalLog = console.log
  console.log = (...args) => logs.push(args.join(' '))

  testDebug('should not log')

  console.log = originalLog

  assert.equal(logs.length, 0, 'empty array should disable all logging')
})
