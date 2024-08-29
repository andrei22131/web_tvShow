<template>
    <div class="section">
        <div id="app" class="container" v-if="animes !== null" role="main">
            <div class="columns is-centered">
                <h1 class="title is-1">{{ animes.tvshowTitle }}</h1>
            </div>
            <br /><br />
            <div class="columns is-centered">
                <h1 class="title is-1">{{ animes.seasonNumber }}</h1>
            </div>

            <br /><br /><br />

            <div class="row columns is-multiline is-mobile" role="list">
                <EpisodeSaisonView v-for="anime in animesFiltres" :key="anime.episodeId" :animesFiltres="[anime]"
                    :storeHistory="storeHistory" />
            </div>

            <nav class="pagination" role="navigation" aria-label="pagination">
                <a v-bind:class="pageCourante === 1 ? 'pagination-previous is-disabled' : 'pagination-previous'"
                    v-on:click="previous" role="button" tabindex="0">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <a v-bind:class="pageCourante === nbPages ? 'pagination-next is-disabled' : 'pagination-next'"
                    v-on:click="next" role="button" tabindex="0">
                    <i class="fa fa-arrow-right"></i>
                </a>
                <ul class="pagination-list">
                    <li v-for="p in nbPages" :key="p.id">
                        <a v-bind:class="p === pageCourante ? 'pagination-link is-current' : 'pagination-link'"
                            aria-label="Page 1" aria-current="page" v-on:click="getNbPage(p)" role="button"
                            tabindex="0">
                            {{ p }}
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="columns has-text-centered is-centered" role="contentinfo">
                <div class="field is-horizontal" style="padding-left: 20px">
                    <div class="field-label is-normal">
                        <label class="label" for="taillePage" style="min-width: 150px">
                            Animes par page
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from "@/constants";
import { HistoryStore } from "@/stores/counter";
import { myStore } from "@/stores/counter";
import EpisodeSaisonView from "@/views/EpisodeSaisonView.vue";

export default {
    name: "SeasonEpisodesView",
    components: { EpisodeSaisonView },
    setup() {
        const storeHistory = HistoryStore();
        const store = myStore();
        return { storeHistory, store };
    },
    data() {
        return {
            animes: null,
            anime: null,
            nbAnimesParPage: 8,
            pageCourante: 1,
        };
    },

    computed: {

        animesFiltres() {
            const debut = (this.pageCourante - 1) * Number(this.nbAnimesParPage);
            const fin = debut + Number(this.nbAnimesParPage);
            const animesFiltres = this.animes && this.animes.episodes
                ? this.animes.episodes.slice(debut, fin)
                : [];
            return animesFiltres;
        },

        nbPages() {
            return Math.ceil(
                (this.animes && this.animes.episodes.length) / this.nbAnimesParPage
            );
        },

        watchedEpisodes() {
            return this.storeHistory.history.map((item) => item.episodeId);
        },
    },

    async mounted() {
        await this.getAnimes();
        await this.getHistory();
    },

    methods: {
        async getHistory() {
            const token = sessionStorage.getItem("token");
            if (token !== "" || token !== null) {
                const bearerToken = `bearer ${token}`;
                const response = await fetch(`${svrURL}/user/history`, {
                    method: "GET",
                    headers: { authorization: bearerToken },
                });
                if (response.ok) {
                    this.storeHistory.history = await response.json();
                } else {
                    console.log("NOT LOGGED IN => NO HISTORY");
                }
            }
        },

        async getAnimes() {
            const response = await fetch(
                `${svrURL}/episodes?seasonId=${this.$route.params.seasonId}`
            );
            if (response.ok) {
                this.animes = await response.json();
            } else {
                console.error("API DOWN, TRY AGAIN LATER");
            }
        },

        async getNbPage(x) {
            this.pageCourante = x;
        },

        async previous() {
            if (this.pageCourante > 1) {
                this.pageCourante -= 1;
            }
        },

        async next() {
            if (this.pageCourante < this.nbPages) {
                this.pageCourante += 1;
            }
        },
    },
};
</script>

<style scoped>
/* Styles for SeasonEpisodesView component */
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

.disable {
    background-color: #dbdbdb;
    border-color: #dbdbdb;
    box-shadow: none;
    color: #7a7a7a;
    opacity: 0.5;
}
</style>
