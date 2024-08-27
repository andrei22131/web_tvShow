<template>
    <div class="section" role="main">
        <div id="app" class="container" v-if="animes !== null">
            <div class="columns is-centered">
                <h1 class="title is-1" role="heading">
                    History
                </h1>
            </div>

            <br><br><br>

            <div class="row columns is-multiline is-mobile ">
                <div class="column is-4-desktop is-4-tablet is-6-mobile" v-for="e in animesFiltres"
                    v-bind:key="e.episodeId">
                    <div class="card ">
                        <router-link v-bind:to="{
            name: 'JouerEpisodeView',
            params: { episodeId: e.episodeId }
        }">
                            <div class="card-image">
                                <figure class="image">
                                    <img v-bind:src="e.imgURL" v-bind:alt="e.episodeTitle" />
                                </figure>
                            </div>
                        </router-link>
                        <div class="card-content ">
                            <div class="media">
                                <div class="media-content">
                                    <router-link v-bind:to="{
            name: 'DetailsView',
            params: { animesId: e.tvshowId }
        }">
                                        <p class="title is-4 no-padding has-text-centered has-text-link"> {{
            e.tvshowTitle }}</p>
                                    </router-link>
                                    <router-link v-bind:to="{
            name: 'SeasonEpisodesView',
            params: { seasonId: e.seasonId }
        }">
                                        <p class="title is-4 no-padding has-text-centered has-text-link">Season {{
            e.seasonNumber }}</p>
                                    </router-link>
                                    <router-link v-bind:to="{
            name: 'DetailsEpisodeView',
            params: { episodeId: e.episodeId }
        }">
                                        <p class="title is-4 no-padding has-text-centered has-text-link">{{
            e.episodeTitle }}</p>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <nav class="pagination" role="navigation" aria-label="pagination">
                <a v-bind:class="pageCourante == 1 ? 'pagination-previous is-disabled' : 'pagination-previous'"
                    v-on:click="previous" role="button" tabindex="0"><i class="fa fa-arrow-left"></i></a>
                <a v-bind:class="pageCourante >= (animes.length / nbAnimesParPage) ? 'pagination-next is-disabled' : 'pagination-next'"
                    v-on:click="next" role="button" tabindex="0"><i class="fa fa-arrow-right"></i></a>
                <ul class="pagination-list">
                    <li v-for="p in nbPages" v-bind:key="p.id">
                        <a v-bind:class="p == pageCourante ? 'pagination-link is-current' : 'pagination-link'"
                            aria-label="Page 1" aria-current="page" role="button" tabindex="0"
                            v-on:click="getNbPage(p)">{{ p }}</a>
                    </li>
                </ul>
            </nav>


        </div>
    </div>
</template>

<script>
import { svrURL } from "@/constants";
import { HistoryStore } from "@/stores/counter";
import { myStore } from "@/stores/counter";

export default {
    name: "HistoryView",
    setup() {
        const storeHistory = HistoryStore();
        const store = myStore();
        return { storeHistory, store };
    },
    data() {
        return {
            animes: null,

            nbAnimesParPage: 6,
            pageCourante: 1,
        };
    },
    computed: {

        animesFiltres() {
            let animesFiltres = this.animes;
            const debut = (this.pageCourante - 1) * Number(this.nbAnimesParPage);
            const fin = debut + Number(this.nbAnimesParPage);
            animesFiltres = this.animes.slice(debut, fin);
            return animesFiltres;
        },

        nbPages() {
            return Math.ceil(this.animes.length / this.nbAnimesParPage);
        },

        animesPagines() {
            const debut = (this.pageCourante - 1) * Number(this.nbAnimesParPage);
            const fin = debut + Number(this.nbAnimesParPage);
            return this.animes.slice(debut, fin);
        },
    },

    async mounted() {
        this.getAnimes();
    },
    methods: {
        async getAnimes() {
            const token = this.store.token;
            const bearerToken = `bearer ${token}`;
            const response = await fetch(`${svrURL}/user/history`,
                {
                    method: "GET",
                    headers: { authorization: bearerToken },
                });
            if (response.ok) {
                this.animes = await response.json();
                this.storeHistory.history = this.animes;
            } else {
                console.error("API DOWN, TRY AGAIN LATER");
            }
        },

        async getNbPage(x) {
            return this.pageCourante = x;
        },
        async previous() {
            if (this.pageCourante > 1) {
                return this.pageCourante -= 1;
            }
        },
        async next() {
            if (this.pageCourante < this.animes.length / this.nbAnimesParPage) {
                return this.pageCourante += 1;
            }
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