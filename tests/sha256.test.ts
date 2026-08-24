/**
 * Incremental SHA-256.
 *
 * `crypto.subtle.digest()` is one-shot: it takes a whole buffer and there is no `update()`/`finalize()`
 * anywhere in WebCrypto. The firmware images this verifies are 0.9–2.4 GB, which will not fit in a
 * single `ArrayBuffer` on most machines — so the digest has to be computed chunk by chunk in TypeScript.
 *
 * That makes correctness entirely our problem, which is why these tests exist before the implementation.
 * The strongest check is against `crypto.subtle` itself: if the two ever disagree, ours is wrong.
 *
 * The failure mode that matters is a false negative — telling someone their perfectly good 2.3 GB
 * download is corrupt, sending them off to fetch it again from a worse source.
 */

import { describe, expect, it } from "vitest";

import { Sha256, sha256OfStream } from "../docs/.vitepress/logic/sha256";

const nativeDigest = async (bytes: Uint8Array): Promise<string> =>
{
    const buffer = await crypto.subtle.digest("SHA-256", bytes as unknown as ArrayBuffer);

    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
};

const encode = (s: string): Uint8Array => new TextEncoder().encode(s);

describe("Sha256", () =>
{
    it("matches the published digest of the empty input", () =>
    {
        expect(new Sha256().digest())
            .toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    });

    it("matches the published digest of \"abc\"", () =>
    {
        expect(new Sha256().update(encode("abc"))
            .digest())
            .toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    });

    it("agrees with crypto.subtle on assorted inputs", async () =>
    {
        for (const input of ["", "a", "hello world", "€ — ünïcodé", "x".repeat(1000)])
        {
            const bytes = encode(input);

            expect(new Sha256().update(bytes)
                .digest()).toBe(await nativeDigest(bytes));
        }
    });

    it("produces the same digest however the input is split", async () =>
    {
        // The bug this catches: mishandling data that does not land on a 64-byte block boundary.
        const bytes = encode("The quick brown fox jumps over the lazy dog. ".repeat(37));
        const expected = await nativeDigest(bytes);

        for (const size of [1, 3, 55, 63, 64, 65, 127, 128, 1000])
        {
            const hasher = new Sha256();
            for (let i = 0; i < bytes.length; i += size)
            {
                hasher.update(bytes.subarray(i, i + size));
            }

            expect(hasher.digest(), `chunk size ${size}`).toBe(expected);
        }
    });

    it("handles input spanning the 55/56-byte padding boundary", async () =>
    {
        // Lengths around 55–64 bytes are where a naive padding implementation breaks.
        for (let n = 50; n <= 70; n += 1)
        {
            const bytes = encode("y".repeat(n));

            expect(new Sha256().update(bytes)
                .digest(), `length ${n}`).toBe(await nativeDigest(bytes));
        }
    });

    it("handles input larger than 512 MB worth of length bookkeeping", async () =>
    {
        // Not actually 512 MB — but the length field is 64-bit and must be written big-endian. Feed
        // enough to exercise the high half being zero and the low half being large.
        const chunk = new Uint8Array(64 * 1024).fill(0x41);
        const hasher = new Sha256();
        for (let i = 0; i < 64; i += 1) { hasher.update(chunk); }

        const whole = new Uint8Array(64 * 1024 * 64).fill(0x41);

        expect(hasher.digest()).toBe(await nativeDigest(whole));
    });

    it("refuses to be used after digesting", () =>
    {
        const hasher = new Sha256();
        hasher.update(encode("abc"));
        hasher.digest();

        expect(() => hasher.update(encode("more"))).toThrow();
    });
});

describe("sha256OfStream", () =>
{
    const streamOf = (chunks: Uint8Array[]): ReadableStream<Uint8Array> =>
        new ReadableStream({
            start(controller)
            {
                for (const c of chunks) { controller.enqueue(c); }
                controller.close();
            }
        });

    it("digests a stream", async () =>
    {
        const bytes = encode("streamed content");

        expect(await sha256OfStream(streamOf([bytes]))).toBe(await nativeDigest(bytes));
    });

    it("digests a stream arriving in awkward pieces", async () =>
    {
        const text = "a stream that does not respect block boundaries";
        const bytes = encode(text);
        const chunks = [bytes.subarray(0, 7), bytes.subarray(7, 8), bytes.subarray(8)];

        expect(await sha256OfStream(streamOf(chunks))).toBe(await nativeDigest(bytes));
    });

    it("reports progress as it goes", async () =>
    {
        const chunk = new Uint8Array(100);
        const seen: number[] = [];

        await sha256OfStream(streamOf([chunk, chunk, chunk]), (bytes) => seen.push(bytes));

        // Progress must be monotonic and end at the true total, or the UI lies about how far it is.
        expect(seen).toEqual([100, 200, 300]);
    });

    it("digests an empty stream", async () =>
    {
        expect(await sha256OfStream(streamOf([])))
            .toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    });
});
