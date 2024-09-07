<template>
    <div class="container">
        <div class="signup-box">
            <div class="content">
                <div class="columns is-centered">
                    <h1 class="title is-2 has-text-centered" role="heading">
                        Sign Up
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
                    <label for="email" class="label">Email</label>
                    <div class="control has-icons-left">
                        <input id="email" type="email" placeholder="e1234567@site.com" class="input"
                            autocomplete="email" required v-model="email" aria-required="true" />
                        <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="username" class="label">Username</label>
                    <div class="control has-icons-left">
                        <input id="username" type="text" placeholder="e1234567" class="input" autocomplete="username"
                            required v-model="username" aria-required="true">
                        <span class="icon is-small is-left"><i class="fa fa-user"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="password" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input id="password" type="password" placeholder="*******" class="input"
                            autocomplete="new-password" required v-model="password" aria-describedby="password-error"
                            aria-required="true">
                        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="password_match" class="label">Confirm Password</label>
                    <div class="control has-icons-left">
                        <input id="password_match" type="password" placeholder="*******" class="input"
                            autocomplete="new-password" required v-model="password_match" aria-required="true">
                        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                    </div>
                </div>
                <div class="field">
                    <div class="control buttons-group">
                        <button id="connexion" class="button is-primary is-fullwidth" v-on:click="getToken">Sign
                            Up</button>
                        <button id="annuler" class="button is-light is-fullwidth mt-2"
                            v-on:click="this.$router.push('/')">Cancel</button>
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
    name: "SignUp",
    setup() {
        const store = myStore();
        return { store };
    },
    data() {
        return {
            email: null,
            username: null,
            password: null,
            password_match: null,
            errorMessage: [],
            pwned: [],
        };
    },
    methods: {
        async getToken() {
            let valid = true;
            this.errorMessage = [];

            const r1 = /^.+@.+$/;
            if (!r1.test(this.email)) {
                this.errorMessage.push("The email must contain an '@'.");
                valid = false;
            }
            const r2 = /^.{5,50}$/;
            if (!r2.test(this.email)) {
                this.errorMessage.push("The email must be between 5 and 50 characters.");
                valid = false;
            }
            const r3 = /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/;
            if (!r3.test(this.username)) {
                this.errorMessage.push("The username must start with a letter, contain between 5 and 20 characters, and be made up of uppercase, lowercase letters, digits, and/or underscores (_).");
                valid = false;
            }
            const r4 = /^.{8,30}$/;
            if (!r4.test(this.password)) {
                this.errorMessage.push("The password must be between 8 and 30 characters.");
                valid = false;
            }
            if (this.password !== this.password_match) {
                this.errorMessage.push("The confirmation password must match the password.");
                valid = false;
            }
            let a = await this.sha1(this.password);
            let b = a.slice(0, 5);

            await this.getPwned(b);
            for (let i = 0; i < this.pwned.length; i++) {
                if (a.toUpperCase() === this.pwned[i].sha1) {
                    valid = false;
                    this.errorMessage.push("The password is compromised, please change it.");
                    break;
                }
            }

            const response = await fetch(`${svrURL}/auth/register`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }),
            });

            if (response.ok && valid == true) {
                const data = await response.json();
                this.store.username = data.username;
                this.$router.push("/login");
            } else {
                this.$nextTick(() => {
                    this.$refs.errorDiv.focus();
                });
            }
        },
        async sha1(message) {
            const msgUint8 = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
            return hashHex;
        },
        async getPwned(a) {
            const response = await fetch(`https://pwnedpasswords.herokuapp.com/api/v1/range?firstfive=${a}&key=9bc96211-6977-4970-a3de-c913ec9d17f7`);
            if (response.ok) {
                this.pwned = await response.json();
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

.signup-box {
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
