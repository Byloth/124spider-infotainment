<script lang="ts" setup>
    import { computed, ref } from "vue";

    import { ARTIFACTS } from "../../data/files";
    import { sha256OfStream } from "../../logic/sha256";

    const file = ref<File | null>(null);
    const digest = ref<string | null>(null);
    const processed = ref(0);
    const busy = ref(false);
    const failed = ref<string | null>(null);

    const match = computed(() =>
        (digest.value === null ? undefined : ARTIFACTS.find((a) => a.sha256 === digest.value)));

    const percent = computed(() =>
        (file.value === null || file.value.size === 0 ?
            0 :
            Math.min(100, Math.round((processed.value / file.value.size) * 100))));

    const pick = async (event: Event): Promise<void> =>
    {
        const chosen = (event.target as HTMLInputElement).files?.[0] ?? null;
        if (chosen === null) { return; }

        file.value = chosen;
        digest.value = null;
        failed.value = null;
        processed.value = 0;
        busy.value = true;

        try
        {
            digest.value = await sha256OfStream(chosen.stream(), (n) => { processed.value = n; });
        }
        catch (error)
        {
            failed.value = error instanceof Error ? error.message : String(error);
        }
        finally
        {
            busy.value = false;
        }
    };
</script>

<template>
    <div class="hash-verifier">
        <div class="custom-block tip">
            <p class="custom-block-title">
                Nothing leaves your browser
            </p>
            <p>
                The file is read locally and hashed here, in this page. It is not uploaded anywhere, and
                this site never sees it. You can disconnect from the network and it will still work.
            </p>
        </div>

        <label for="hv-file">Choose the file you downloaded</label>
        <input id="hv-file"
               type="file"
               :disabled="busy"
               @change="pick" />

        <p class="hint">
            Large firmware images take a while — roughly three minutes for a 2.3 GB file. Browsers offer
            no faster way: their built-in hashing cannot work through a file piece by piece, so this does
            it in JavaScript instead.
        </p>

        <div v-if="busy || digest" class="progress">
            <div class="bar">
                <div class="fill" :style="{ width: percent + '%' }"></div>
            </div>
            <span class="pct">{{ percent }}%</span>
        </div>

        <div v-if="failed" class="custom-block danger">
            <p class="custom-block-title">
                Could not read that file
            </p>
            <p>{{ failed }}</p>
        </div>

        <template v-if="digest && !busy">
            <p class="digest">
                <code>{{ digest }}</code>
            </p>

            <div v-if="match" class="custom-block tip">
                <p class="custom-block-title">
                    Recognised — this is {{ match.filename }}
                </p>
                <p>
                    {{ match.notes }}
                    <template v-if="match.scan === 'too-large'">
                        This file is larger than any malware scanner will accept, so a matching hash is
                        the only evidence available for it — and it matches.
                    </template>
                </p>
            </div>

            <div v-else class="custom-block warning">
                <p class="custom-block-title">
                    Not a file this site knows about
                </p>
                <p>
                    That is not necessarily bad. This site records hashes for the files it has seen, and
                    plenty of legitimate firmware is not among them — a different region, a version nobody
                    published a hash for, or a file renamed along the way. It does mean this page cannot
                    vouch for it. Compare it against the hash published wherever you got it.
                </p>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.hash-verifier { margin: 16px 0; }

label
{
    display: block;
    margin: 16px 0 6px;
    font-size: 14px;
    font-weight: 600;
}

.hint
{
    margin: 8px 0 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
    line-height: 20px;
}

.progress
{
    display: flex;
    gap: 12px;
    align-items: center;
    margin: 16px 0;
}

.bar
{
    flex: 1;
    height: 8px;
    overflow: hidden;

    border-radius: 8px;
    background-color: var(--vp-c-default-soft);
}

.fill
{
    height: 100%;
    background-color: var(--vp-c-brand-3);
    transition: width .25s;
}

.pct
{
    color: var(--vp-c-text-2);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
}

.digest
{
    margin: 16px 0;
    word-break: break-all;

    code { font-size: 13px; }
}
</style>
