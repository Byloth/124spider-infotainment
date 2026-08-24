<script lang="ts" setup>
// How ID7 actually gets in — the project's own finding, from reading the package.
//
// It is not an exploit against the firmware. It is a genuine Johnson Controls diagnostic package, signed
// in 2013, whose configuration file has every real diagnostic option switched off and one line that runs
// an arbitrary script. The unit executes it *because* the signature is valid.
</script>

<template>
    <figure class="diagram">
        <svg viewBox="0 0 900 300"
             role="img"
             aria-labelledby="id7-title id7-desc">
            <title id="id7-title">How ID7 gets root: command injection into a signed diagnostic package</title>
            <desc id="id7-desc">
                A USB stick carries a genuine signed Johnson Controls diagnostic package and a
                configuration file. The unit validates the signature, accepts the package, and runs the
                command named in the configuration — which is an arbitrary shell script.
            </desc>

            <!-- the stick -->
            <rect x="24"
                  y="60"
                  width="210"
                  height="150"
                  rx="12"
                  class="box" />
            <text x="129"
                  y="88"
                  class="box-title">USB stick</text>
            <text x="129"
                  y="116"
                  class="file">cmu_dataretrieval.up</text>
            <text x="129"
                  y="134"
                  class="file-note">genuine JCI package</text>
            <text x="129"
                  y="150"
                  class="file-note">signed 2013 · dated 2014</text>
            <text x="129"
                  y="178"
                  class="file">dataRetrieval_config.txt</text>
            <text x="129"
                  y="196"
                  class="file-note">every option set to “no”…</text>

            <!-- the injected line -->
            <rect x="268"
                  y="104"
                  width="240"
                  height="62"
                  rx="8"
                  class="inject" />
            <text x="388"
                  y="128"
                  class="inject-label">…except one</text>
            <text x="388"
                  y="152"
                  class="inject-code">CMD_LINE=sh /mnt/sd*/tweaks.sh</text>

            <!-- the unit -->
            <rect x="546"
                  y="60"
                  width="200"
                  height="150"
                  rx="12"
                  class="box" />
            <text x="646"
                  y="88"
                  class="box-title">the unit</text>
            <text x="646"
                  y="118"
                  class="check ok">signature valid ✓</text>
            <text x="646"
                  y="142"
                  class="file-note">so the package is accepted</text>
            <text x="646"
                  y="172"
                  class="check bad">runs the command as root</text>

            <path d="M 238 135 L 262 135"
                  class="flow"
                  marker-end="url(#id7-arrow)" />
            <path d="M 512 135 L 540 135"
                  class="flow"
                  marker-end="url(#id7-arrow)" />

            <text x="450"
                  y="248"
                  class="conclusion">
                Not a flaw in the firmware — the firmware behaved exactly as designed.
            </text>
            <text x="450"
                  y="272"
                  class="conclusion-note">
                Which is why Mazda needed three releases to close it, rather than revoking a key.
            </text>

            <defs>
                <marker id="id7-arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" class="marker" />
                </marker>
            </defs>
        </svg>

        <figcaption>
            <p>
                The package on the stick is not counterfeit: it is Johnson Controls' own diagnostic tool,
                carrying their certificates. Beside it sits a configuration file in which every genuine
                diagnostic option — screenshots, memory info, NVRAM dumps — is switched off, and a single
                line names a shell script to run instead.
            </p>
            <p>
                The unit checks the signature, finds it valid, and does as it is told. That is why this
                kept working after the ordinary USB path was closed, and why shutting it down took
                <code>neutralizeid7</code> and a forced password change rather than a revoked key.
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram { margin: 24px 0; }

svg { display: block; width: 100%; height: auto; }

.box
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1;
}

.box-title
{
    fill: var(--vp-c-text-1);
    font-size: 15px;
    font-weight: 700;
    text-anchor: middle;
}

.file
{
    fill: var(--vp-c-text-1);
    font-family: var(--vp-font-family-mono);
    font-size: 11px;
    text-anchor: middle;
}

.file-note
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
    text-anchor: middle;
}

.inject
{
    fill: var(--vp-c-danger-soft);
    stroke: var(--vp-c-danger-1);
    stroke-width: 1.5;
}

.inject-label
{
    fill: var(--vp-c-danger-1);
    font-size: 12px;
    font-weight: 700;
    text-anchor: middle;
}

.inject-code
{
    fill: var(--vp-c-danger-1);
    font-family: var(--vp-font-family-mono);
    font-size: 12px;
    text-anchor: middle;
}

.check
{
    font-size: 12px;
    font-weight: 600;
    text-anchor: middle;

    &.ok { fill: var(--vp-c-text-2); }
    &.bad { fill: var(--vp-c-danger-1); }
}

.flow { stroke: var(--vp-c-text-3); stroke-width: 2; }
.marker { fill: var(--vp-c-text-3); }

.conclusion
{
    fill: var(--vp-c-text-1);
    font-size: 14px;
    font-weight: 600;
    text-anchor: middle;
}

.conclusion-note
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
    text-anchor: middle;
}

figcaption
{
    margin-top: 12px;
    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 22px;
}
</style>
