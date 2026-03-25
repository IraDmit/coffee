<template>
    <div>
        <label
            @click="toggleTheme()"
            class="switcher-label"
            :class="{ active: isDarkTheme }"
            for="switcher-input"
        >
            <v-icon>mdi-moon-waning-crescent</v-icon>
            <span class="switcher-toggler"></span>
            <v-icon>mdi-white-balance-sunny</v-icon>
        </label>
        <input
            type="checkbox"
            name="switcher"
            id="switcher-input"
            class="switcher-input"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDarkTheme: false,
        };
    },
    methods: {
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            this.$vuetify.theme.dark = this.isDarkTheme;
            this.saveThemePreference();
        },
        saveThemePreference() {
            localStorage.setItem(
                "user-theme",
                this.isDarkTheme ? "dark" : "light",
            );
        },
        loadThemePreference() {
            const savedTheme = localStorage.getItem("user-theme");
            if (savedTheme) {
                this.$vuetify.theme.dark = savedTheme === "dark";
            }
        },
    },
    mounted() {
        this.loadThemePreference();
    },
};
</script>

<style lang="scss" scoped>
$bg-color: #e9e9e9;
$bg-active-color: #111;
$toggler-bg-color: white;
$toggler-size: 25px;
$padding: 2px 10px;
$height: 35px;
$radius: 30px;

input[type="checkbox"] {
    opacity: 0;
    display: none;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
}

.switcher-label {
    background-color: $bg-color;
    cursor: pointer;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $padding;
    height: auto;
    min-height: $height;
    border-radius: $radius;
    position: relative;

    .switcher-toggler {
        background-color: $toggler-bg-color;
        width: $toggler-size;
        height: $toggler-size;
        z-index: 1;
        border-radius: 50%;
        position: absolute;
        transform: translateY(-50%);
        left: 7px;
        top: 50%;
        transition: all 0.4s ease;
    }
    &.active {
        background-color: $bg-active-color;
        .switcher-toggler {
            left: calc(100% - #{35px});
        }
    }

    i {
        font-size: 24px;
    }

    i:first-child {
        color: dodgerblue;
    }

    i:last-child {
        color: gold;
    }
}
</style>
