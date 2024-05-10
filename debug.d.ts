declare global {
  function debug(target: string, text: string, trace: boolean): void;
  createDebugger = (target: sting) => debuggerFunction;
}
export declare const debuggerFunction = (text: sting) => globalThis.debug;
export declare const createDebugger = (target: sting) => debuggerFunction;
