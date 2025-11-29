# debug
> easy debug

## install
```sh
npm i -S @vandeurenglenn/debug
```

## usage
## v2.0.0
 ```js
import { setTargets, createDebugger } from '@vandeurenglenn/debug'

setTargets(['myLib'])
const debug = createDebugger('target')
debug('text')
 ```

  ```js
import { setTargets, createDebugger } from '@vandeurenglenn/debug'

setTargets(true)
const debug = createDebugger('target')
debug('text')
 ```
