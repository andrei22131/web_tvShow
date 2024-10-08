<template>
    <div class="section episode-details-section">
        <div id="app" class="container" v-if="animes !== null">
            <div class="columns is-centered">
                <h1 class="title is-2 episode-title" role="heading">
                    {{ animes.tvshowTitle }}
                </h1>
            </div>

            <div class="columns is-centered">
                <h2 class="subtitle is-4 season-title" role="heading">
                    Saison {{ animes.seasonNumber }} - Episode {{ animes.number }} - {{ animes.title }}
                </h2>
            </div>

            <div class="columns is-centered">
                <div class="column is-6 has-text-centered episode-info">
                    <p class="runtime" role="status">
                        Duration : {{ animes.runtime }} minutes
                    </p>
                    <p class="tv-guideline">
                        Classification : {{ animes.tvParentalGuideline }}
                    </p>
                </div>
            </div>

            <div class="columns is-centered">
                <router-link :to="{ name: 'JouerEpisodeView', params: { episodeId: animes.episodeId } }"
                    class="play-button">
                    <div class="image-container">
                        <img v-bind:src="animes.imgURL" v-bind:alt="animes.title" role="img" class="episode-image" />
                        <div class="play-overlay">
                            <span class="play-icon"></span>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="columns is-centered">
                <div class="column is-8">
                    <p class="plot-description" aria-describedby="plot-description">
                        <b>Description: </b>{{ animes.plot }}
                    </p>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { svrURL } from "@/constants";
export default {
    name: "DetailsEpisodeView",
    data() {
        return {
            animes: null,
        };
    },

    async mounted() {
        this.getAnimes();
    },
    methods: {
        async getAnimes() {
            const response = await fetch(`${svrURL}/episode?episodeId=${this.$route.params.episodeId}`);
            if (response.ok) {
                this.animes = await response.json();
            } else {
                console.error("API DOWN, TRY AGAIN LATER");
            }
        },
    },
};
</script>

<style scoped>
.episode-details-section {
    padding-top: 30px;
}

.episode-title {
    font-weight: 700;
    color: #363636;
    margin-bottom: 15px;
}

.season-title {
    font-weight: 600;
    color: #4a4a4a;
}

.episode-info {
    margin-top: 20px;
}

.runtime,
.tv-guideline {
    font-size: 1.1rem;
    color: #6b6b6b;
    margin-bottom: 10px;
}

.plot-description {
    font-size: 1.15rem;
    line-height: 1.6;
    text-align: justify;
    color: #444;
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.play-button {
    display: inline-block;
    margin-top: 30px;
    text-align: center;
}

.image-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    /* Increased max-width for a bigger image */
}

.episode-image {
    border-radius: 15px;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
}

.play-icon {
    width: 60px;
    height: 60px;
    background-color: white;
    clip-path: polygon(25% 20%, 75% 50%, 25% 80%);
}
</style>
