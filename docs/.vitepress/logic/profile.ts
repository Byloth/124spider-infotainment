/**
 * What the site remembers about the reader's car.
 *
 * One composable, one `localStorage` key, consumed by every component that adapts itself. It is
 * deliberately the *only* shared state on the site: a store would add an SSR hydration problem for no
 * gain, and VitePress already owns routing.
 *
 * ## The rule this file exists to serve
 *
 * With JavaScript disabled — or in the moment before hydration — every page must still show every route
 * and every market. So `ready` starts `false` and only becomes `true` after mount. Components gate their
 * *personalisation* on `ready`, never their content: until then they render the neutral,
 * show-everything state, which is also exactly what ends up in the server-rendered HTML.
 *
 * Getting this wrong produces two failures at once: a hydration mismatch, and a page that hides
 * safety-critical information from a reader whose browser did not run our JavaScript.
 */

import { useStorage } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

import type { Market, Route } from "../data/types";
import { routeFor } from "./route";
import type { Id7State } from "./route";
import { parseVersion } from "./version";

export interface Profile
{
    market: Market | null;
    /** The 3-inch display cannot be upgraded at all, so this is a hard gate on eligibility. */
    display: "7-inch" | "3-inch" | null;
    /** Exactly as the reader typed it; parsed on demand rather than stored parsed. */
    version: string | null;
    id7: Id7State;
    hubFitted: boolean | null;
}

const EMPTY: Profile = {
    market: null,
    display: null,
    version: null,
    id7: "unknown",
    hubFitted: null
};

const STORAGE_KEY = "124spider:profile";

export interface UseProfile
{
    profile: Ref<Profile>;
    /** False until mounted. Gate personalisation on this, never content. */
    ready: Ref<boolean>;
    /** True once the reader has told us anything at all. */
    known: ComputedRef<boolean>;
    parsedVersion: ComputedRef<ReturnType<typeof parseVersion>>;
    /** The applicable procedure, or undefined while we do not know enough. */
    route: ComputedRef<Route | undefined>;
    reset: () => void;
}

export const useProfile = (): UseProfile =>
{
    // VueUse returns the default when `window` is absent, so this is safe to call during SSR.
    const profile = useStorage<Profile>(STORAGE_KEY, { ...EMPTY }, undefined, {
        mergeDefaults: true
    });

    const ready = ref(false);
    onMounted(() => { ready.value = true; });

    const known = computed(() => ready.value && (
        profile.value.market !== null ||
        profile.value.version !== null ||
        profile.value.display !== null
    ));

    const parsedVersion = computed(() =>
        (profile.value.version === null ? undefined : parseVersion(profile.value.version)));

    const route = computed(() =>
    {
        if (!ready.value) { return undefined; }

        const parsed = parsedVersion.value;
        if (parsed === undefined) { return undefined; }

        return routeFor(parsed.version + (parsed.revision ?? ""), profile.value.id7);
    });

    const reset = (): void => { profile.value = { ...EMPTY }; };

    return { profile, ready, known, parsedVersion, route, reset };
};
