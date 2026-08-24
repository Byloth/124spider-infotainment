<script lang="ts" setup>
    import { computed } from "vue";

    import { LINKS } from "../../data/links";
    import LinkStatus from "./LinkStatus.vue";

    // Ranked deliberately: first-party before community re-host before reseller. A reader who stops reading
    // after the first entry should have stopped at the best one.
    const RANKED_URLS = [
        "https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/",
        "https://www.mazdashare.com/mtds",
        "https://navi-world.com/",
        "https://my.hidrive.com/share/hsodpqja"
    ];

    const sources = computed(() =>
        RANKED_URLS
            .map((url) => LINKS.find((l) => l.url === url))
            .filter((l): l is NonNullable<typeof l> => l !== undefined));
</script>

<template>
    <div class="download-sources">
        <div class="custom-block warning">
            <p class="custom-block-title">
                This site hosts none of these files
            </p>
            <p>
                It publishes hashes and provenance so you can verify whatever you obtained, wherever you
                obtained it. Check what you downloaded against the table below before you flash anything.
            </p>
        </div>

        <ol>
            <li v-for="s in sources" :key="s.url">
                <LinkStatus :url="s.url" />
                <span class="checked">last checked {{ s.lastChecked }}</span>
            </li>
        </ol>
    </div>
</template>

<style lang="scss" scoped>
.download-sources { margin: 16px 0; }

ol
{
    margin: 16px 0 0;
    padding-left: 20px;
}

li
{
    margin-bottom: 16px;
    line-height: 24px;
}

.checked
{
    display: block;
    color: var(--vp-c-text-3);
    font-size: 12px;
}
</style>
