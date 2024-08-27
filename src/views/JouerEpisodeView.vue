<template>
    <div id="app" class="container" v-if="infosVideo !== null" role="main">
        <div>
            <div class="video-container" role="region">
                <video controls autoplay :src="infosVideo.videoURL" alt="Vidéo en cours de lecture"></video>
            </div>
        </div>
    </div>


    <div v-if="errorMessage.length !== 0" class="block" role="alert">
        <div class="title is-3 boiteRouge" tabindex="0" role="alert" id="errorDiv" ref="errorDiv"
            aria-describedby="errorDescription">
            <span v-for="error in errorMessage" v-bind:key="error">
                {{ error }}
                <br />

                <div class="columns is-centered">
                    <router-link v-bind:to="{
                        name: 'LoginView'
                    }">
                        <button aria-required="true"> se connecter </button>
                    </router-link>
                </div>
            </span>
        </div>
    </div>
</template>



<script>
import { svrURL } from "@/constants";
import { myStore } from "@/stores/counter";


export default {
    name: "JouerEpisodeView",
    setup() {
        const store = myStore();
        return { store };
    },
    data() {
        return {
            infosVideo: null,
            errorMessage: [],
        };
    },
    async mounted() {
        this.getVideo();
    },
    methods: {
        async getVideo() {
            const token = this.store.token;
            this.errorMessage = [];


            if (token === "" || token === null) {
                this.errorMessage.push("Vous devez etre connecté pour acceder à cette page");
            }
            else {
                const bearerToken = `bearer ${token}`;
                const response = await fetch(`${svrURL}/viewepisode?episodeId=${this.$route.params.episodeId}`,
                    {
                        method: "GET",
                        headers: { authorization: bearerToken },
                    });
                if (response.ok) {
                    this.infosVideo = await response.json();
                } else {
                    console.error("API DOWN, TRY AGAIN LATER");
                    this.$nextTick(() => {
                        this.$refs.errorDiv.focus();
                    });
                }
            }
        },

    },

};
</script>


<style>
.video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

video {
    width: 80%;
    height: auto;
}


.boiteRouge {
    border: 2px solid red;
}
</style>