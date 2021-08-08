# digest-stream

Compute hash or HMAC using a transform stream.

# Installation

With [npm](https://www.npmjs.com/) do:

    $ npm install @mangosteen/digest-stream

# Usage

```js
import { createDigestStream } from '@mangosteen/digest-stream';
import crypto from 'crypto';
import fs from 'fs';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

(async () => {
    const digestStream = createDigestStream(crypto.createHash('sha256'));

    await pipeline([
        fs.createReadStream('./shakespeare.txt'),
        digestStream,
        // ...
    ]);

    console.log(digestStream.digest().toString('hex'));
})();
```