<template>
    <div id="app" class="container" v-if="infos !== null">
        <div class="container">
            <div class="section">
                <div class="content">
                    <div class="columns is-centered">
                        <h1 class="title is-2" role="heading">
                            Profile
                        </h1>
                    </div>
                    <div v-if="errorMessage.length !== 0" class="block">
                        <div class="title is-3 boiteRouge" tabindex="0" role="alert" id="errorDiv" ref="errorDiv">
                            <span v-for="error in errorMessage" v-bind:key="error">
                                {{ error }}
                                <br />
                            </span>
                        </div>
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
                            <input id="username" type="username" placeholder="e1234567" class="input"
                                autocomplete="username" required v-model="username" aria-required="true">
                            <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                        </div>
                    </div>

                    <div class="field">
                        <label for="password" class="label">Mot de passe</label>
                        <div class="control has-icons-left">
                            <input id="password" type="password" placeholder="*******" class="input" autocomplete="password"
                                required v-model="password" aria-required="true">
                            <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                        </div>
                    </div>

                    <div class="field">
                        <label for="password" class="label">Confirmer mot de passe</label>
                        <div class="control has-icons-left">
                            <input id="password_match" type="password" placeholder="*******" class="input" autocomplete="password"
                                required v-model="password_match" aria-required="true">
                            <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                        </div>
                    </div>


                    <div class="field">
                        <label class="label">
                            <div class="control">
                                <button id="connexion" class="button is-success" v-on:click="getProfiles">Update</button>
                                <button id="annuler" class="button is-danger"
                                    v-on:click="this.$router.push('/')">Annuler</button>
                            </div>
                        </label>
                        <label class="label">
                            <div class="control">
                                <button id="supprimer" class="button is-danger" v-on:click="modal">DELETE
                                    PROFILE</button>
                            </div>
                        </label>


                        <div class="modal is-active" v-if="this.format == true" role="dialog"
                            aria-describedby="modal-description">
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">ATTENTION !</p>
                                    <button class="delete" aria-label="close" v-on:click="modalX"></button>
                                </header>
                                <section class="modal-card-body">
                                    <b>Voulez-vous vraiment supprimer votre compte ¬_¬</b>
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-danger" v-on:click="DeleteProfile"
                                        aria-required="true">Oui</button>
                                    <button class="button" v-on:click="modalX">Cancel</button>
                                </footer>
                            </div>
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

            if (token === "" || token === null) {
                this.$router.push("/login");
            }
            else {
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
            let valide = true;
            this.errorMessage = [];

            const r1 = /^.+@.+$/;
            if (!r1.test(this.email)) {
                this.errorMessage.push("Le courriel doit contenir un '@'.");
                valide = false;
            }
            const r2 = /^.{5,50}$/;
            if (!r2.test(this.email)) {
                this.errorMessage.push("Le courriel doit contenir entre 5 et 50 caractères.");
                valide = false;
            }
            const r3 = /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/;
            if (!r3.test(this.username)) {
                this.errorMessage.push("Le username doit commencer par une lettre, contenir entre 5 et 20 caractères et doit être composé de lettres majuscules, minuscule, de chiffre et/ou du caractère souligné (_).");
                valide = false;
            }
            const r4 = /^.{8,30}$/;
            if (!r4.test(this.password)) {
                this.errorMessage.push("Le mot de passe doit contenir entre 8 et 30 caractères.");
                valide = false;
            }
            if (this.password !== this.password_match) {
                this.errorMessage.push("Le mot de passe de confirmation doit être identique au mot de passe.");
                valide = false;
            }
            let a = await this.sha1(this.password);
            let b = a.slice(0, 5);

            await this.getPwned(b);
            for (let i = 0; i < this.pwned.length; i++) {
                console.log(this.pwned[i].sha1);
                if (a.toUpperCase() === this.pwned[i].sha1) {
                    valide = false;
                    this.errorMessage.push("Le mot de passe est comprementant, veuillez changer.");
                    break;
                }
            }
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
            if (response.ok && valide == true) {
                this.$router.push("/");
            }
            else {
                console.error("API DOWN, TRY AGAIN LATER");
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
            } else {
                console.error("API DOWN, TRY AGAIN LATER");
            }
        },

        async modal() {
            this.format = true;
        },
        async modalX() {
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
            }
            else {
                console.error("API DOWN, TRY AGAIN LATER");
                this.$nextTick(() => {
                    this.$refs.errorDiv.focus();
                });
            }
        },
    },
};



</script>