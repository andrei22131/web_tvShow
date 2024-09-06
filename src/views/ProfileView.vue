<template>
    <div id="app" class="container" v-if="infos !== null">
        <div class="container mt-5">
            <div class="section">
                <div class="content">
                    <div class="columns is-centered">
                        <h1 class="title is-2" role="heading">
                            Profile
                        </h1>
                    </div>

                    <div v-if="errorMessage.length !== 0" class="notification is-danger">
                        <div tabindex="0" role="alert" id="errorDiv" ref="errorDiv">
                            <p v-for="error in errorMessage" :key="error">
                                {{ error }}
                            </p>
                        </div>
                    </div>

                    <div class="box">
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
                                <input id="username" type="text" placeholder="e1234567" class="input"
                                    autocomplete="username" required v-model="username" aria-required="true">
                                <span class="icon is-small is-left"><i class="fa fa-user"></i></span>
                            </div>
                        </div>

                        <div class="field">
                            <label for="password" class="label">Password</label>
                            <div class="control has-icons-left">
                                <input id="password" type="password" placeholder="*******" class="input"
                                    autocomplete="current-password" required v-model="password" aria-required="true">
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

                        <div class="field is-grouped is-grouped-right">
                            <button id="connexion" class="button is-success mr-3" @click="getProfiles">Update</button>
                            <button id="annuler" class="button is-light" @click="this.$router.push('/')">Cancel</button>
                            <button id="supprimer" class="button is-danger" @click="modal">Delete Profile</button>
                        </div>
                    </div>

                    <!-- Modal for delete confirmation -->
                    <div class="modal" :class="{ 'is-active': format }" role="dialog"
                        aria-describedby="modal-description">
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">WARNING!</p>
                                <button class="delete" aria-label="close" @click="modalX"></button>
                            </header>
                            <section class="modal-card-body">
                                <b>Are you sure you want to delete your account?</b>
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-danger" @click="DeleteProfile"
                                    aria-required="true">Yes</button>
                                <button class="button" @click="modalX">Cancel</button>
                            </footer>
                        </div>
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
    name: "ProfileView",
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
            infos: null,
            errorMessage: [],
            pwned: [],
            format: false,
        };
    },
    async mounted() {
        this.getInfos();
    },
    methods: {
        async getInfos() {
            const token = this.store.token;
            if (!token) {
                this.$router.push("/login");
            } else {
                const bearerToken = `bearer ${token}`;
                const response = await fetch(`${svrURL}/user`, {
                    method: "GET",
                    headers: { authorization: bearerToken },
                });
                this.infos = await response.json();
                this.username = this.infos.username;
                this.email = this.infos.email;
            }
        },
        async getProfiles() {
            let valid = true;
            this.errorMessage = [];
            const emailRegex = /^.+@.+$/;
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/;
            const passwordRegex = /^.{8,30}$/;

            if (!emailRegex.test(this.email)) {
                this.errorMessage.push("The email must contain an '@'.");
                valid = false;
            }
            if (!usernameRegex.test(this.username)) {
                this.errorMessage.push("The username must be between 5 and 20 characters.");
                valid = false;
            }
            if (!passwordRegex.test(this.password)) {
                this.errorMessage.push("The password must be between 8 and 30 characters.");
                valid = false;
            }
            if (this.password !== this.password_match) {
                this.errorMessage.push("The confirmation password must match the password.");
                valid = false;
            }
            if (valid) {
                const token = this.store.token;
                const bearerToken = `bearer ${token}`;
                const response = await fetch(`${svrURL}/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: bearerToken,
                    },
                    method: "POST",
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    }),
                });
                if (response.ok) {
                    this.$router.push("/");
                } else {
                    this.errorMessage.push("An error occurred. Please try again later.");
                }
            }
        },
        modal() {
            this.format = true;
        },
        modalX() {
            this.format = false;
        },
        async DeleteProfile() {
            const token = this.store.token;
            const bearerToken = `bearer ${token}`;
            const response = await fetch(`${svrURL}/user`, {
                method: "DELETE",
                headers: { authorization: bearerToken },
            });
            if (response.ok) {
                this.store.token = "";
                this.$router.push("/");
            } else {
                this.errorMessage.push("An error occurred. Please try again later.");
            }
        },
    },
};
</script>

<style scoped>
.container {
    margin-top: 40px;
}

/* Box for form fields */
.box {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Error Message Styling */
.notification.is-danger {
    background-color: #ff3860;
    color: white;
    padding: 15px;
    border-radius: 8px;
}

/* Modal Styling */
.modal-card {
    border-radius: 8px;
}

.modal-card-foot {
    justify-content: flex-end;
}

.button.is-danger {
    background-color: #ff3860;
    border-color: transparent;
    color: white;
}

.button.is-light {
    background-color: #f5f5f5;
}
</style>
