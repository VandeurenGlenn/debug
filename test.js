import { test } from "node:test";
import assert from "node:assert";
import { setTargets, createDebugger } from "./exports/debug.js";

test("Debug logging with specific targets", () => {
  setTargets(["test", "lfc"]);
  const testDebug = createDebugger("test");
  const lfcDebug = createDebugger("lfc/chain");

  // Capture output
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));

  testDebug("hello from test");
  lfcDebug("hello from lfc/chain");

  console.log = originalLog;

  assert.ok(
    logs.some((log) => log.includes("test: hello from test")),
    "test message should be logged"
  );
  assert.ok(
    logs.some((log) => log.includes("lfc/chain: hello from lfc/chain")),
    "lfc/chain message should be logged"
  );
});

test("Debug logging when disabled", () => {
  setTargets(false);
  const testDebug = createDebugger("test");

  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));

  testDebug("this should not log");

  console.log = originalLog;

  assert.equal(
    logs.length,
    0,
    "no messages should be logged when targets are disabled"
  );
});

test("Debug logging when enabled globally", () => {
  setTargets(true);
  const testDebug = createDebugger("test");

  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));

  testDebug("test with all enabled");

  console.log = originalLog;

  assert.ok(
    logs.some((log) => log.includes("test: test with all enabled")),
    "message should be logged with global enable"
  );
});

test("Debug logging with namespace prefix matching", () => {
  setTargets(["lfc"]);
  const lfcDebug = createDebugger("lfc/chain");
  const otherDebug = createDebugger("lfc/other");

  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));

  lfcDebug("lfc/chain message");
  otherDebug("lfc/other message");

  console.log = originalLog;

  assert.equal(logs.length, 2, "both lfc/* namespaces should be logged");
  assert.ok(logs.some((log) => log.includes("lfc/chain: lfc/chain message")));
  assert.ok(logs.some((log) => log.includes("lfc/other: lfc/other message")));
});
