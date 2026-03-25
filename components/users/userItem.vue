<template>
    <v-card outlined class="user-card">
        <v-skeleton-loader
            :loading="loading"
            class="skeleton-content"
            type="card, card-avatar, article, actions"
        >
            <v-card-title class="card-header">
                <v-avatar size="40" color="accent" class="mr-3">
                    <span class="avatar-text">
                        {{ initials }}
                    </span>
                </v-avatar>

                <div class="header-text">
                    <div class="user-name">
                        {{ user.name }}
                    </div>

                    <div class="user-phone">
                        {{ user.phone }}
                    </div>
                </div>
            </v-card-title>

            <v-card-text>
                <div class="info-group">
                    <div class="d-flex justify-space-between">
                        <div class="label">Город</div>

                        <v-chip
                            small
                            outlined
                            color="accent"
                            :to="`/users?city=${user.city.title}`"
                            nuxt
                        >
                            {{ user.city.title }}
                        </v-chip>
                    </div>

                    <div class="d-flex justify-space-between">
                        <div class="label">Баланс</div>

                        <div class="balance accent--text">
                            {{ formatCurrency(user.balance) }}
                        </div>
                    </div>
                </div>

                <v-row class="stats-row">
                    <v-col cols="6">
                        <v-sheet class="stat-card" rounded>
                            <div class="stat-value success--text">
                                {{ formatCurrency(user.saveTotal) }}
                            </div>

                            <div class="stat-label">Накоплено</div>
                        </v-sheet>
                    </v-col>

                    <v-col cols="6">
                        <v-sheet class="stat-card" rounded>
                            <div class="stat-value error--text">
                                {{ formatCurrency(user.spendTotal) }}
                            </div>

                            <div class="stat-label">Потрачено</div>
                        </v-sheet>
                    </v-col>
                </v-row>

                <div class="d-flex justify-space-between last-visit">
                    <div class="label">Последний визит</div>

                    <div class="value">
                        {{ formatDate(user.lastVisit) }}
                    </div>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    block
                    :color="$vuetify.theme.dark ? 'primary' : 'accent'"
                    depressed
                    :to="`/users/${user.id}`"
                    nuxt
                >
                    <v-icon left> mdi-account </v-icon>

                    Профиль
                </v-btn>
            </v-card-actions>
        </v-skeleton-loader>
    </v-card>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => ({}),
        },

        loading: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        initials() {
            if (!this.user.name) return "";

            return this.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
        },
    },

    methods: {
        formatCurrency(value) {
            if (!value) return "0 ₽";

            try {
                return new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits: 0,
                }).format(value);
            } catch {
                return value + " ₽";
            }
        },

        formatDate(date) {
            if (!date) return "";

            try {
                const d = new Date(date);

                return d.toLocaleDateString("ru-RU").replace(/\./g, "-");
            } catch {
                return "";
            }
        },
    },
};
</script>

<style scoped lang="scss">
$gray-text: #787878;

.user-card {
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    }
}

.skeleton-content {
    border-radius: inherit;
}

.card-header {
    display: flex;
    align-items: center;

    .v-avatar {
        font-weight: 700;
        color: black;
        font-size: font-size(base);
    }
}

.header-text {
    display: flex;
    flex-direction: column;

    .user-name {
        font-size: font-size(base);
        font-weight: 600;
    }

    .user-phone {
        font-size: font-size(caption);
        color: $gray-text;
    }
}

.info-group {
    display: flex;
    flex-direction: column;
    gap: 14px;

    .label {
        font-size: font-size(caption);
        color: $gray-text;
    }

    .value {
        font-size: font-size(base);
    }

    .balance {
        font-weight: 600;
    }
}

.stats-row {
    margin: 10px 0;

    .stat-card {
        text-align: center;

        .stat-value {
            font-size: font-size(base);
            font-weight: 600;
        }

        .stat-label {
            font-size: font-size(caption);
            color: $gray-text;
        }
    }
}

.last-visit {
    .label,
    .value {
        font-size: font-size(caption);
    }
}
</style>
