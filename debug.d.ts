declare global {
  function debug(target: string, text: string): void;
  var myVariable: number;
}
export declare const debuggerFunction = (text: sting) => globalThis.debug;
export declare const createDebugger = (target: sting) => debuggerFunction;
