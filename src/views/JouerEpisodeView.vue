<template>
    <div id="app" class="container" v-if="infosVideo !== null" role="main">
        <div class="video-section">
            <div class="video-container" role="region">
                <video controls autoplay :src="infosVideo.videoURL" alt="Vidéo en cours de lecture"></video>
            </div>
        </div>
    </div>

    <div v-if="errorMessage.length !== 0" class="notification is-danger" role="alert">
        <div class="title is-4" tabindex="0" role="alert" id="errorDiv" ref="errorDiv"
            aria-describedby="errorDescription">
            <span v-for="error in errorMessage" :key="error">
                {{ error }}
                <br />
                <div class="columns is-centered mt-3">
                    <router-link :to="{ name: 'LoginView' }">
                        <button class="button is-danger is-light" aria-required="true">Login</button>
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

            if (!token) {
                this.errorMessage.push("You need to be logged in to access the video");
            } else {
                const bearerToken = `bearer ${token}`;
                const response = await fetch(`${svrURL}/viewepisode?episodeId=${this.$route.params.episodeId}`, {
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

<style scoped>
/* Video Section */
.video-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
    background-color: #f4f4f9;
    padding: 20px;
}

.video-container {
    width: 100%;
    max-width: 900px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    background-color: white;
}

video {
    width: 100%;
    height: auto;
    border-radius: 12px;
}

/* Error Notification */
.notification.is-danger {
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
    background-color: #f14668;
    color: white;
    border-radius: 8px;
}

.notification.is-danger .title {
    font-weight: bold;
}

.button.is-danger.is-light {
    background-color: #ffe5e5;
    color: #f14668;
    border: 1px solid #f14668;
    transition: background-color 0.3s ease;
}

.button.is-danger.is-light:hover {
    background-color: #f14668;
    color: white;
}
</style>