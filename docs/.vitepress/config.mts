import { defineConfig } from "vitepress";

// Deployed to GitHub Pages as a project site at https://byloth.github.io/124spider-infotainment/,
// published by .github/workflows/publish.yml on every push to master. As a project site it lives under
// a sub-path, so `base` is '/124spider-infotainment/' — VitePress rewrites every markdown link with it;
// component-authored internal links must prefix it themselves via `import.meta.env.BASE_URL`
// (see SourceCite.vue).
//
// i18n: English content lives at the root of docs/ on purpose. VitePress keeps the root
// locale in place and gives additional locales their own subdirectory, so adding Italian
// later means adding a `locales` key here — no existing file has to move.

// VitePress does not prefix `base` onto <head> asset URLs, so favicon links have to carry it
// themselves. Keeping the base in one const avoids it drifting from the `base` option below.
const BASE = "/124spider-infotainment/";

export default defineConfig({
    lang: "en-US",
    title: "124 Spider Infotainment",
    description: "Upgrading the Fiat and Abarth 124 Spider infotainment unit to Mazda firmware for " +
        "Apple CarPlay and Android Auto — a versioned, sourced, verified knowledge base.",

    base: BASE,
    cleanUrls: true,
    lastUpdated: true,
    sitemap: { hostname: "https://byloth.github.io/124spider-infotainment/" },

    head: [
        ["link", { rel: "icon", type: "image/x-icon", href: `${BASE}favicon.ico` }],
        ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: `${BASE}favicon-32x32.png` }],
        ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: `${BASE}favicon-16x16.png` }],
        ["link", { rel: "apple-touch-icon", sizes: "180x180", href: `${BASE}apple-touch-icon.png` }],
        ["meta", { name: "theme-color", content: "#8c1007" }],
        ["meta", { name: "author", content: "Matteo Bilotta" }]
    ],

    themeConfig: {
        search: {
            // Local index: no external service, works offline, fits a reference site.
            provider: "local"
        },

        nav: [
            { text: "Start here", link: "/guide/" },
            { text: "Procedure", link: "/procedure/" },
            { text: "Firmware", link: "/firmware/" },
            { text: "Hardware", link: "/hardware/" },
            { text: "Recovery", link: "/recovery/" },
            { text: "Security", link: "/security/" },
            { text: "Reference", link: "/reference/" }
        ],

        sidebar: {
            "/guide/": [
                {
                    text: "Start here",
                    items: [
                        { text: "Overview", link: "/guide/" },
                        { text: "Is my car eligible?", link: "/guide/eligibility" },
                        { text: "What you gain and lose", link: "/guide/what-changes" },
                        { text: "Risks and one-way doors", link: "/guide/risks" },
                        { text: "Which route is mine?", link: "/guide/route" }
                    ]
                }
            ],

            "/procedure/": [
                {
                    text: "Procedure",
                    items: [
                        { text: "Choose your route", link: "/procedure/" },
                        { text: "1 · Prepare", link: "/procedure/prepare" },
                        { text: "2 · Flash the firmware", link: "/procedure/flash" },
                        { text: "3 · Restore Fiat branding and navigation", link: "/procedure/rebrand" },
                        { text: "4 · Install the hardware", link: "/procedure/hardware" },
                        { text: "5 · Verify", link: "/procedure/verify" }
                    ]
                }
            ],

            "/firmware/": [
                {
                    text: "Firmware",
                    items: [
                        { text: "Version matrix", link: "/firmware/" },
                        { text: "Regions and file naming", link: "/firmware/regions" },
                        { text: "Points of no return", link: "/firmware/points-of-no-return" },
                        { text: "Obtaining and verifying files", link: "/firmware/obtaining" }
                    ]
                }
            ],

            "/hardware/": [
                {
                    text: "Hardware",
                    items: [
                        { text: "The retrofit kit", link: "/hardware/" },
                        { text: "Part numbers by market", link: "/hardware/part-numbers" },
                        { text: "Genuine vs clone", link: "/hardware/oem-vs-clone" }
                    ]
                }
            ],

            "/recovery/": [
                {
                    text: "Recovery",
                    items: [
                        { text: "Troubleshooting", link: "/recovery/" },
                        { text: "Downgrading", link: "/recovery/downgrade" },
                        { text: "Recovering a bricked unit", link: "/recovery/brick" }
                    ]
                }
            ],

            "/security/": [
                {
                    text: "Security",
                    items: [
                        { text: "What the tweaks leave on your car", link: "/security/" },
                        { text: "Old guides and dead links", link: "/security/link-safety" }
                    ]
                }
            ],

            "/reference/": [
                {
                    text: "Reference",
                    items: [
                        { text: "Overview", link: "/reference/" },
                        { text: "Sources", link: "/reference/sources" },
                        { text: "File inventory", link: "/reference/inventory" },
                        { text: "Open questions", link: "/reference/open-questions" },
                        { text: "Glossary", link: "/reference/glossary" }
                    ]
                }
            ]
        },

        outline: { level: [2, 3], label: "On this page" },

        editLink: undefined,

        footer: {
            message: "Community research. Unofficial and unaffiliated with Mazda, FCA, Fiat or " +
                "Abarth. Every procedure here can damage your car — read the risks first.",
            copyright: "Content under CC BY-SA 4.0 · code under MIT"
        },

        docFooter: { prev: "Previous", next: "Next" }
    },

    // Vite 5 still hands SCSS to SASS through the legacy JS API, which emits a deprecation notice per
    // file — around fifty lines per build, enough to bury the output we actually check. Asking for the
    // modern compiler changes nothing about the CSS; `vitest.config.ts` does the same.
    vite: {
        css: { preprocessorOptions: { scss: { api: "modern-compiler" } } }
    }
});
