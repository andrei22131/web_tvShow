<template>
    <div class="section">
        <div id="app" class="container" v-if="animes !== null">
            <div class="columns is-centered">
                <h1 class="title is-2" role="heading">
                    {{ animes.tvshowTitle }}
                </h1>
            </div>
            <br><br>
            <div class="columns is-centered">
                <h1 class="title is-2" role="heading">
                    {{ animes.seasonNumber }}
                    -
                    {{ animes.number }}
                    -
                    {{ animes.title }}

                </h1>
            </div>

            <br><br><br>

            <p role="status">
                {{ animes.runtime }} mins
            </p>
            <p>
                {{ animes.tvParentalGuideline }}
            </p>
            <p aria-describedby="plot-description">
                {{ animes.plot }}
            </p>
            <br>
            <br>
            <router-link v-bind:to="{
                name: 'JouerEpisodeView',
                params: { episodeId: animes.episodeId }
            }">
                <div class="columns is-centered">
                    <img v-bind:src="animes.imgURL" v-bind:alt="animes.title" role="img" with="500" height="600" />
                </div>
            </router-link>
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
h1 {
    text-align: center;
}
</style>