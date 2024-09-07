<template>
    <div class="container">
        <div class="login-box">
            <div class="content">
                <div class="columns is-centered">
                    <h1 class="title is-2 has-text-centered">
                        Login
                    </h1>
                </div>
                <div v-if="errorMessage.length !== 0" class="notification is-danger" tabindex="0" role="alert"
                    id="errorDiv" ref="errorDiv">
                    <span v-for="error in errorMessage" v-bind:key="error">
                        {{ error }}
                        <br />
                    </span>
                </div>
                <div class="field">
                    <label for="email" class="label">Username</label>
                    <div class="control has-icons-left">
                        <input id="email" type="email" placeholder="e1234567@site.com" class="input"
                            autocomplete="email" aria-required="true" v-model="username" />
                        <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="password" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input id="password" type="password" placeholder="*******" class="input" autocomplete="password"
                            required v-model="password">
                        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                    </div>
                </div>
                <div class="field">
                    <div class="control buttons-group">
                        <button id="connexion" class="button is-primary is-fullwidth"
                            v-on:click="getToken">Login</button>
                        <button id="annuler" class="button is-light is-fullwidth mt-2"
                            v-on:click="annuler">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from "@/constants";
import { myStore } from "@/stores/counter";

export default {
    name: "LoginView",
    setup() {
        const store = myStore();
        return { store };
    },
    data() {
        return {
            username: null,
            password: null,
            errorMessage: [],
        };
    },
    async mounted() {
        this.getUsername();
    },
    methods: {
        getUsername() {
            if (this.store.username !== "") {
                this.username = this.store.username;
            }
        },
        annuler() {
            this.store.username = "";
            this.$router.push("/");
        },
        async getToken() {
            let valid = true;
            this.errorMessage = [];

            if (!this.username) {
                this.errorMessage.push("Le nom d'utilisateur est requis.");
                valid = false;
            }

            if (!this.password) {
                this.errorMessage.push("Le mot de passe est requis.");
                valid = false;
            }

            if (valid) {
                const response = await fetch(`${svrURL}/auth/token`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    this.store.token = data.token;
                    this.store.username = "";
                    sessionStorage.setItem("token", data.token);
                    this.store.ajoutToken(sessionStorage.getItem("token"));
                    this.$router.push("/");
                    console.log(this.store.token);
                } else {
                    this.errorMessage.push("Mauvais nom d'utilisateur ou mot de passe");
                    this.$nextTick(() => {
                        this.$refs.errorDiv.focus();
                    });
                    console.error("API DOWN, TRY AGAIN LATER");
                }
            } else {
                this.$nextTick(() => {
                    this.$refs.errorDiv.focus();
                });
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7fb;
}

.login-box {
    background: white;
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.title {
    color: #333;
}

.notification.is-danger {
    background-color: #ffdddd;
    color: #a94442;
    border: 1px solid #ebccd1;
    border-radius: 5px;
    padding: 1rem;
}

.input {
    border-radius: 5px;
}

.input:focus {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.buttons-group .button {
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.buttons-group .button:hover {
    background-color: #276cda;
    color: white;
}

.buttons-group .button.is-light:hover {
    background-color: #f0f0f0;
}
</style>