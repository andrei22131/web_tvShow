<template>
    <div id="app" class="container" v-if="animes !== null" role="main">
        <div class="columns is-multiline is-mobile" role="presentation">

            <div class="column is-half-tablet is-full-mobile" role="figure">
                <figure class="image is-3by4 is-narrow">
                    <img v-bind:src="animes.imgURL" alt="image animes" />
                </figure>
            </div>
            <div class="column">
                <p class="is-size-1" role="heading">{{ animes.title }}</p>
                <br>
                <p>{{ animes.year }}</p>
                <br>

                <div class="columns is-multiline is-mobile">
                    <div class="column is-half">
                        <p>{{ animes.episodeCount }} épisodes</p>
                    </div>

                    <div class="column">{{ animes.genres.map((e) => e.name).join(", ") }}</div>
                </div>

                <div class="columns is-multiline is-mobile">
                    <div class="column is-one-fifth">
                        <p>Studio
                        </p>
                    </div>

                    <div class="column is-one-fifth">{{ animes.studio.name }}</div>
                </div>
                <p class="has-text-justified" role="description">{{ animes.plot }}</p>

            </div>
        </div>
        <br><br><br>

        <div class="row columns is-multiline is-mobile">
            <ActeursView v-bind:acteur="animes" />
        </div>


        <br><br><br>
        <div>
            <div class="columns is-mobile scrollmenu">
                <SaisonView v-bind:anime="animes" />
            </div>
        </div>




        <audio constrols autoplay>
            <source v-bind:src="animes.audioURL" v-bind:alt="animes.audioURL">
        </audio>

    </div>
</template>

<script>
import { svrURL } from "@/constants";
import ActeursView from "@/views/ActeursView.vue";
import SaisonView from "@/views/SaisonView.vue";

export default {
    name: "DetailsView",
    components: { ActeursView, SaisonView },
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
            const response = await fetch(`${svrURL}/tvshow?tvshowId=${this.$route.params.animesId}`);
            if (response.ok) {
                this.animes = await response.json();
            } else {
                console.error("API DOWN, TRY AGAIN LATER");
            }
        },
    },
    computed: {
        anime() {
            return this.animes[0];
        },
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
}

div.scrollmenu {
    overflow: hidden;
    /* Add vertical scrollbar */
    overflow-x: auto;
    /* Hide horizontal scrollbar */
    white-space: nowrap;
}

div.scrollmenu a {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px;
    text-decoration: none;
}

div.scrollmenu a:hover {
    background-color: #777;
}
</style>