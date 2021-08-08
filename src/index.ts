import { Hash, Hmac } from 'crypto';
import { Transform } from 'stream';

export type DigestTransform = Transform & { digest: () => Buffer; };

export function createDigestStream(digest: Hash | Hmac): DigestTransform {
    const transform: DigestTransform = new Transform({
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