# @vandeurenglenn/debug

> easy debug

## install

```sh
npm i -S @vandeurenglenn/debug
```

## usage

### basic

 ```js
import { setTargets, createDebugger } from '@vandeurenglenn/debug'

setTargets(['myLib']) // or true to enable all
const debug = createDebugger('target')
debug('text')
 ```

### plugins

#### local-storage

On a browser you can import this plugin and use localStorage to set the targets.

  ```js
import { setTargets, createDebugger } from '@vandeurenglenn/debug'
import '@vandeurenglenn/debug/local-storage.js'

const debug = createDebugger('my-module')
debug('text')
 ```
