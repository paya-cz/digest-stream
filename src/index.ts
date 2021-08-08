import { Hash, Hmac } from 'crypto';
import { Transform } from 'stream';

export type DigestStream = Transform & { digest: () => Buffer; };

export function createDigestStream(digest: Hash | Hmac): DigestStream {
    const transform: DigestStream = new Transform({
        transform(chunk, encoding: any, callback) {
            if (typeof chunk === 'string') {
                digest.update(chunk, encoding);
                callback(undefined, chunk);
            } else if (Buffer.isBuffer(chunk)) {
                digest.update(chunk);
                callback(undefined, chunk);
            } else {
                callback(new Error(`Unsupported chunk type: ${typeof chunk}`));
            }
        },
    }) as any;

    transform.digest = () => digest.digest();
    return transform;
}