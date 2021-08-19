# digest-stream

Compute hash or HMAC using a transform stream.

# Installation

With [npm](https://www.npmjs.com/) do:

    $ npm install @mangosteen/digest-stream

# Usage

```js
import { DigestStream } from '@mangosteen/digest-stream';
import crypto from 'crypto';
import fs from 'fs';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

(async () => {
    const digestStream = new DigestStream({
        digest: crypto.createHash('sha256'),
    });

    await pipeline([
        fs.createReadStream('./shakespeare.txt'),
        digestStream,
        // ...
    ]);

    const sha256: string = digestStream.digest().toString('hex');
    console.log(sha256);
})();
```