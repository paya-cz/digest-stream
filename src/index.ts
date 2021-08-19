import { Hash, Hmac } from 'crypto';
import { Transform, TransformCallback, TransformOptions } from 'stream';

export interface DigestOptions extends Omit<TransformOptions, 'transform' | 'flush'> {
    /**
     * Instance of a `Hash` or `Hmac` class, created via `crypto.createHash` or `crypto.createHmac`.
     * The crypto instance will be consumed by the transform stream, so do not use it anywhere else.
     */
    digest: Hash | Hmac;
}

/**
 * This stream works as a passthrough stream, sending data from the writable side to the readable side.
 * However, it also passes the data to the digest instance, computing a hash/hmac along the way.
 * 
 * Call `digest` to get the final digest value after the stream emits `end` event.
 */
export class DigestStream extends Transform {
    constructor(opts: DigestOptions) {
        const { digest, ...transformOpts } = opts;
        super(transformOpts);

        this._digestTransform = digest;
    }

    private readonly _digestTransform: Hash | Hmac;

    override _transform(chunk: any, encoding: string, callback: TransformCallback): void {
        try {
            if (typeof chunk === 'string') {
                this._digestTransform.update(chunk, encoding as any);
            } else if (Buffer.isBuffer(chunk)) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof DataView) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Uint8Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Uint8ClampedArray) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Uint16Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Uint32Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Int8Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Int16Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Int32Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof BigUint64Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof BigInt64Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Float32Array) {
                this._digestTransform.update(chunk);
            } else if (chunk instanceof Float64Array) {
                this._digestTransform.update(chunk);
            } else {
                throw new Error(`Unsupported chunk type: ${typeof chunk}`);
            }
            
            callback(undefined, chunk);
        } catch (error) {
            callback(error);
        }
    }

    /**
     * Calculates the digest of all of the data that passed through the stream.
     * Call this method only once after the stream emits `end` event.
     * 
     * - Calling this method multiple times will throw an error.
     * - Calling this method before the stream emits `end` event will cause the stream to emit `error` event.
     */
    digest(): Buffer {
        return this._digestTransform.digest();
    }
}