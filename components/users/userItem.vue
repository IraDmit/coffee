<template>
    <v-skeleton-loader :loading="loading" type="card-avatar, article, actions">
        <v-card outlined>
            <v-card-title class="d-flex align-center">
                <v-avatar color="indigo" size="40" class="mr-3">
                    <span class="white--text text-h6">{{ user.avatar }}</span>
                </v-avatar>
                <span class="text-subtitle-1 font-weight-medium">{{
                    user.name
                }}</span>
            </v-card-title>

            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <div class="d-flex justify-space-between">
                            <span class="text--secondary">Телефон:</span>
                            <span>{{ user.phone }}</span>
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="d-flex justify-space-between">
                            <span class="text--secondary">Город:</span>
                            <v-btn
                                to="/users"
                                small
                                outlined
                                color="accent"
                                nuxt
                            >
                                {{ user.city.title }}
                            </v-btn>
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="d-flex justify-space-between">
                            <span class="text--secondary">Баланс:</span>
                            <span class="font-weight-bold accent--text">{{
                                formatCurrency(user.balance)
                            }}</span>
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <v-divider class="my-2"></v-divider>
                    </v-col>

                    <v-col cols="6">
                        <v-sheet outlined rounded class="pa-2 text-center">
                            <div class="text-h6 success--text">
                                {{ formatCurrency(user.saveTotal) }}
                            </div>
                            <div class="text-caption text--secondary">
                                Накоплено
                            </div>
                        </v-sheet>
                    </v-col>

                    <v-col cols="6">
                        <v-sheet outlined rounded class="pa-2 text-center">
                            <div class="text-h6 error--text">
                                {{ formatCurrency(user.spendTotal) }}
                            </div>
                            <div class="text-caption text--secondary">
                                Потрачено
                            </div>
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
                        <v-divider class="my-2"></v-divider>
                    </v-col>

                    <v-col cols="12">
                        <div class="d-flex justify-space-between">
                            <span class="text--secondary"
                                >Последний визит:</span
                            >
                            <span>{{ formatDate(user.lastVisit) }}</span>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="info" depressed :to="`/users/${user.id}`" nuxt>
                    <v-icon left>mdi-account</v-icon>
                    Перейти на профиль
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-skeleton-loader>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => {},
        },
        loading: {
            type: Boolean,
            default: () => true,
        },
    },
    methods: {
        formatCurrency(value) {
            if (value === null || value === undefined) return "0 ₽";

            try {
                return new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits: 0,
                }).format(value);
            } catch (e) {
                return value + " ₽";
            }
        },

        formatDate(date) {
            if (!date) return "";

            let dateObj;
            try {
                dateObj = new Date(date);
                if (isNaN(dateObj.getTime())) return "";

                return dateObj
                    .toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })
                    .replace(/\./g, "-");
            } catch (e) {
                return "";
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
