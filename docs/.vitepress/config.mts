import { defineConfig } from "vitepress";

// Deploy target is not decided yet — the site runs locally for now, so base stays '/'.
// If this ever moves to GitHub Pages as a project site, set base to '/<repo-name>/'.
//
// i18n: English content lives at the root of docs/ on purpose. VitePress keeps the root
// locale in place and gives additional locales their own subdirectory, so adding Italian
// later means adding a `locales` key here — no existing file has to move.

export default defineConfig({
    lang: "en-US",
    title: "124 Spider Infotainment",
    description: "Upgrading the Fiat and Abarth 124 Spider infotainment unit to Mazda firmware for " +
        "Apple CarPlay and Android Auto — a versioned, sourced, verified knowledge base.",

    base: "/",
    cleanUrls: true,
    lastUpdated: true,

    head: [
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
