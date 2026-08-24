<script lang="ts" setup>
    import { computed, onUnmounted, ref } from "vue";

    // The CMU drops out of ACC after 25 minutes, and losing power mid-flash is the classic way to brick the
    // unit. The advice is to press the clutch or brake roughly every 20 minutes — this counts that down.
    const INTERVAL_SECONDS = 20 * 60;

    const remaining = ref(INTERVAL_SECONDS);
    const running = ref(false);
    let handle: ReturnType<typeof setInterval> | undefined;

    const clock = computed(() =>
    {
        const m = Math.floor(remaining.value / 60);
        const s = remaining.value % 60;

        return `${m}:${String(s).padStart(2, "0")}`;
    });

    const elapsed = ref(false);

    const tick = (): void =>
    {
        remaining.value -= 1;
        if (remaining.value <= 0)
        {
            elapsed.value = true;
            remaining.value = INTERVAL_SECONDS;
        }
    };

    const start = (): void =>
    {
        if (running.value) { return; }

        running.value = true;
        elapsed.value = false;
        handle = setInterval(tick, 1000);
    };

    const stop = (): void =>
    {
        running.value = false;
        if (handle !== undefined)
        {
            clearInterval(handle);
            handle = undefined;
        }
    };

    const acknowledge = (): void => { elapsed.value = false; };

    onUnmounted(stop);
</script>

<template>
    <div class="flash-timer">
        <div class="custom-block warning">
            <p class="custom-block-title">
                An aid, not a guarantee
            </p>
            <p>
                This is a countdown in a web page. It stops if the tab is discarded, the phone sleeps or
                the browser is closed. Set an alarm on something else as well — a missed pedal press
                during the reinstall is how units die.
            </p>
        </div>

        <div class="face" :class="{ elapsed }">
            <span class="clock">{{ clock }}</span>
            <span class="label">until the next pedal press</span>
        </div>

        <p v-if="elapsed"
           class="due"
           role="alert">
            Press and release the clutch or brake now, then acknowledge.
        </p>

        <div class="actions">
            <button v-if="!running"
                    type="button"
                    @click="start">
                Start
            </button>
            <button v-else
                    type="button"
                    @click="stop">
                Stop
            </button>
            <button v-if="elapsed"
                    type="button"
                    class="primary"
                    @click="acknowledge">
                Done — reset
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.flash-timer { margin: 16px 0; }

.face
{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    margin: 16px 0;

    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;

    background-color: var(--vp-c-bg-soft);

    transition: color .25s, border-color .25s, background-color .25s;

    &.elapsed
    {
        border-color: var(--vp-c-warning-1);
        background-color: var(--vp-c-warning-soft);
    }
}

.clock
{
    font-family: var(--vp-font-family-mono);
    font-size: 40px;
    font-weight: 600;
    line-height: 1.2;
}

.label
{
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.due
{
    margin: 0 0 12px;

    color: var(--vp-c-warning-1);
    font-weight: 600;
}

.actions
{
    display: flex;
    gap: 8px;

    button
    {
        padding: 0 20px;

        border: 1px solid var(--vp-c-border);
        border-radius: 20px;

        background: none;
        color: var(--vp-c-text-1);
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        line-height: 38px;

        transition: color .25s, border-color .25s, background-color .25s;

        &:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

        &.primary
        {
            border-color: transparent;
            background-color: var(--vp-c-brand-3);
            color: var(--vp-c-white);

            &:hover { background-color: var(--vp-c-brand-2); color: var(--vp-c-white); }
        }
    }
}
</style>
