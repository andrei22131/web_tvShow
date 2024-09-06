<template>
    <nav class="navbar has-background-dark is-spaced" role="navigation" aria-label="main navigation">
        <div id="Idnavbar" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item has-text-light title is-4" v-bind:to="{ name: 'home' }">
                    Anime Catalog
                </router-link>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <router-link v-if="store.token === ''" class="button is-primary is-outlined is-rounded"
                        v-bind:to="{ name: 'SignUp' }" role="button">
                        Sign up
                    </router-link>
                    <router-link v-if="store.token !== ''" class="button is-link is-light is-rounded"
                        v-bind:to="{ name: 'HistoryView' }" role="button">
                        History
                    </router-link>
                    <router-link v-if="store.token !== ''" class="button is-link is-light is-rounded"
                        v-bind:to="{ name: 'ProfileView' }" role="button">
                        Profile
                    </router-link>
                    <router-link v-if="store.token === ''" class="button is-primary is-outlined is-rounded"
                        v-bind:to="{ name: 'LoginView' }" role="button">
                        Login
                    </router-link>
                    <router-link v-if="store.token !== ''" class="button is-danger is-light is-rounded"
                        v-bind:to="{ name: 'home' }" v-on:click="deleteToken" role="button">
                        Logout
                    </router-link>
                    <!--
                    <router-link class="button is-info is-light is-rounded" v-bind:to="{ name: 'home' }" role="button">
                        About
                    </router-link>
                    -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { myStore } from "@/stores/counter";

export default {
    name: "MenuView",
    setup() {
        const store = myStore();
        return { store };
    },

    methods: {
        async deleteToken() {
            this.store.removeToken();
            sessionStorage.removeItem("token");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.navbar {
    padding: 1rem 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-item {
    transition: background-color 0.3s, color 0.3s;
}

.navbar-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.buttons .button {
    margin-right: 0.75rem;
}

.button.is-rounded {
    border-radius: 30px;
}
</style>