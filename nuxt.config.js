import colors from "vuetify/es5/util/colors";

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: "server",

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - coffee",
        title: "coffee",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossorigin: "anonymous",
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap",
            },
        ],
    },

    publicRuntimeConfig: {
        apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000", // или ваш домен
    },

    serverMiddleware: [{ path: "/api", handler: "~/api/users.js" }],

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@/assets/styles/main.scss"],

    styleResources: {
        scss: [
            "@/assets/styles/abstract/_variables.scss",
            "@/assets/styles/abstract/_typography.scss",
            "@/assets/styles/abstract/_functions.scss",
        ],
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@/plugins/api.js"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        "@nuxtjs/eslint-module",
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["@nuxtjs/style-resources"],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ["@/assets/styles/abstract/_variables.scss"],
        theme: {
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: "#FFFFFF",
                    secondary: colors.amber.darken3,
                    info: "#0D47A1",
                    warning: "#FFAB40",
                    error: "#B71C1C",
                    success: "#2E7D32",
                },
                light: {
                    primary: "#FFFFFF",
                    accent: "#FFD166",
                    secondary: "#EEEEEE",
                    info: "#4DD0E1",
                    warning: "#FFA000",
                    error: "#F44336",
                    success: "#4CAF50",
                },
            },
        },

        font: {
            family: "Nunito",
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
