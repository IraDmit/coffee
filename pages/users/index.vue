<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <p class="subtitle-1">
                    Всего пользователей: {{ meta.totalUsers }}
                </p>
            </v-col>
        </v-row>

        <v-row class="mb-4">
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="search"
                    label="Поиск по имени или телефону"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    dense
                    outlined
                    color="accent"
                    @input="searchWithDebounce"
                    hide-details
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-select
                    v-model="city"
                    :items="cities"
                    label="Фильтр по городу"
                    clearable
                    dense
                    outlined
                    color="accent"
                    item-color="accent"
                    @change="onFilterCity"
                    hide-details
                />
            </v-col>
        </v-row>

        <v-row v-if="filteredUsers && filteredUsers.length">
            <v-col
                v-for="user in filteredUsers"
                :key="user.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
                <UserItem :user="user" :loading="loading" />
            </v-col>
        </v-row>

        <v-pagination
            :value="page"
            :length="meta.totalPages"
            :color="$vuetify.theme.dark ? 'primary' : 'accent'"
            total-visible="10"
            @input="changePage"
            class="mt-4"
        />
    </v-container>
</template>

<script>
import UserItem from "~/components/users/userItem.vue";
import debounce from "~/utils/debounce";

export default {
    name: "UsersPage",

    components: { UserItem },

    watchQuery: ["page"],

    data() {
        return {
            loading: true,
            limit: 50,

            users: [],
            filteredUsers: [],
            page: 1,

            search: "",
            city: "",

            cities: [
                "Москва",
                "Санкт-Петербург",
                "Казань",
                "Оренбург",
                "Екатеринбург",
            ],

            meta: {
                totalPages: 1,
                totalUsers: 0,
            },
        };
    },
    mounted() {
        this.searchWithDebounce = debounce(this.onSearch);

        if (this.$route.query.city || this.$route.query.search) {
            this.syncQueryWithState();
            this.applyFilters();
        }
    },

    async asyncData({ $api, query }) {
        const page = parseInt(query.page) || 1;
        const limit = 50;
        const offset = (page - 1) * limit;

        try {
            const data = await $api.users.list({
                offset,
                limit,
            });

            return {
                users: data.data,
                filteredUsers: data.data,
                meta: data.pagination || { totalPages: 1 },
                page,

                loading: false,
            };
        } catch (e) {
            return {
                users: [],
                filteredUsers: [],
                meta: { totalPages: 1 },
                page: 1,

                loading: false,
            };
        }
    },

    watch: {
        "$route.query": {
            handler() {
                this.syncQueryWithState();
                this.applyFilters();
            },
            deep: true,
        },
    },

    methods: {
        syncQueryWithState() {
            this.page = parseInt(this.$route.query.page) || 1;
            this.search = this.$route.query.search || "";
            this.city = this.$route.query.city || "";
        },

        searchWithDebounce: debounce(() => {
            this.applyFilters();
        }),

        async changePage(page) {
            this.loading = true;

            this.$router.push({ query: { page } });

            try {
                const offset = (page - 1) * this.limit;

                const data = await this.$api.users.list({
                    offset,
                    limit: this.limit,
                });

                this.users = data.data;
                this.meta = data.pagination || {};
            } catch (error) {
                console.error("Fetch failed:", error);
                this.users = [];
                this.filteredUsers = [];
            } finally {
                this.loading = false;
            }
        },
        applyFilters() {
            let list = [...this.users];

            if (this.search) {
                const search = this.search.toLowerCase();

                list = list.filter((user) => {
                    return (
                        user.name.toLowerCase().includes(search) ||
                        user.phone.includes(search)
                    );
                });
            }

            if (this.city) {
                list = list.filter((user) => {
                    return user.city?.title === this.city;
                });
            }

            this.filteredUsers = list;
        },
        onSearch() {
            this.$router.push({
                query: {
                    ...this.$route.query,
                    search: this.search || undefined,
                },
            });

            this.applyFilters();
        },
        onFilterCity() {
            this.$router.push({
                query: {
                    ...this.$route.query,
                    city: this.city || undefined,
                },
            });

            this.applyFilters();
        },
    },

    head() {
        return {
            title: "Пользователи",
        };
    },
};
</script>

<style lang="css" scoped></style>
