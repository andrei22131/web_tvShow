<template>
    <nav class="navbar has-background-link" role="navigation" aria-label="main navigation">
        <div id="Idnavbar" class="navbar-menu">
            <div class="navbar-start ">
                <router-link class="navbar-item has-text-white" v-bind:to="{ name: 'home' }">
                    Web TV shows catalog application
                </router-link>

            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <router-link v-if="store.token === ''" class="navbar-item has-text-white" v-bind:to="{ name: 'SignUp' }"
                        role="button">
                        Sign up
                    </router-link>
                    <router-link v-if="store.token !== ''" class="navbar-item has-text-white"
                        v-bind:to="{ name: 'HistoryView' }" role="button">
                        History
                    </router-link>
                    <router-link v-if="store.token !== ''" class="navbar-item has-text-white"
                        v-bind:to="{ name: 'ProfileView' }" role="button">
                        Profile
                    </router-link>
                    <router-link v-if="store.token === ''" class="navbar-item has-text-white"
                        v-bind:to="{ name: 'LoginView' }" role="button">
                        Login
                    </router-link>
                    <router-link v-if="store.token !== ''" class="navbar-item has-text-white" v-bind:to="{ name: 'home' }"
                        v-on:click="deleteToken" role="button">
                        Logout
                    </router-link>
                    <router-link class="navbar-item has-text-white" v-bind:to="{ name: 'home' }" role="button">
                        About
                    </router-link>


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