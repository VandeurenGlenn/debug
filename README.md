# debug
> easy debug

## install
```sh
npm i -S @vandeurenglenn/debug
```

## usage
## v2.0.0
 ```js
import '@vandeurenglenn/debug'
// or
require('@vandeurenglenn/debug')

DEBUG = ['myLib']
debug('myLib', 'some text')
const mydebugger = createDebugger('target', 'text')
 ```

## v1.0.0
 ```js
import '@vandeurenglenn/debug'
// or
require('@vandeurenglenn/debug')

DEBUG = true
debug('some text')
 ```
