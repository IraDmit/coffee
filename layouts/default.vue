<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            :clipped="clipped"
            :temporary="$vuetify.breakpoint.smAndDown"
            :permanent="$vuetify.breakpoint.mdAndUp"
            mini-variant-width="70"
            fixed
            app
        >
            <div class="pa-4">
                <div class="d-flex align-center mb-4">
                    <v-icon large class="mr-2" color="accent"
                        >mdi-coffee</v-icon
                    >
                    <v-toolbar-title v-if="!mini">{{ title }}</v-toolbar-title>
                </div>
            </div>

            <v-list dense>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                    nav
                    color="accent"
                >
                    <v-list-item-action>
                        <v-icon large>{{ item.icon }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content v-if="!mini">
                        <v-list-item-title class="base-text">
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar fixed app>
            <div
                class="d-flex flex-row justify-space-between align-center w-100"
            >
                <div class="app-bar__main d-flex flex-row align-center">
                    <v-app-bar-nav-icon @click.stop="toggleDrawer" />

                    <v-toolbar-title
                        ><h1>
                            {{ items[$route.name].title }}
                        </h1>
                    </v-toolbar-title>
                </div>

                <ThemeSwitcher />
            </div>
        </v-app-bar>

        <v-main>
            <Nuxt />
        </v-main>
    </v-app>
</template>

<script>
import ThemeSwitcher from "~/components/common/themeSwitcher.vue";

export default {
    components: { ThemeSwitcher },

    data() {
        return {
            clipped: false,
            drawer: true,
            mini: false,

            items: {
                index: {
                    icon: "mdi-home-account",
                    title: "Главная",
                    to: "/",
                },
                users: {
                    icon: "mdi-account",
                    title: "Пользователи",
                    to: "/users",
                },
            },

            title: "Добрый Кофе",
        };
    },

    methods: {
        toggleDrawer() {
            if (this.$vuetify.breakpoint.mdAndUp) {
                this.mini = !this.mini;
            } else {
                this.drawer = !this.drawer;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.v-app-bar-nav-icon {
    margin-left: auto !important;
}

.w-100 {
    width: 100%;
}
</style>
