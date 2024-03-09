declare global {
  function debug(target: string, text: string): void;
  createDebugger = (target: sting) => debuggerFunction;
}
export declare const debuggerFunction = (text: sting) => globalThis.debug;
export declare const createDebugger = (target: sting) => debuggerFunction;
