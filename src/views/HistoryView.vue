<template>
    <div class="section history-section" role="main">
        <div id="app" class="container" v-if="animes !== null">
            <div class="columns is-centered">
                <h1 class="title is-1 history-title" role="heading">
                    History
                </h1>
            </div>

            <div class="row columns is-multiline is-mobile anime-grid">
                <div class="column is-4-desktop is-4-tablet is-6-mobile" v-for="e in animesFiltres" :key="e.episodeId">
                    <div class="card anime-card">
                        <router-link :to="{ name: 'JouerEpisodeView', params: { episodeId: e.episodeId } }">
                            <div class="card-image">
                                <figure class="image">
                                    <img :src="e.imgURL" :alt="e.episodeTitle" class="anime-image" />
                                </figure>
                            </div>
                        </router-link>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <router-link :to="{ name: 'DetailsView', params: { animesId: e.tvshowId } }">
                                        <p class="title is-5 has-text-centered has-text-link">{{ e.tvshowTitle }}</p>
                                    </router-link>
                                    <router-link :to="{ name: 'SeasonEpisodesView', params: { seasonId: e.seasonId } }">
                                        <p class="subtitle is-6 has-text-centered has-text-link">Season {{
            e.seasonNumber }}</p>
                                    </router-link>
                                    <router-link
                                        :to="{ name: 'DetailsEpisodeView', params: { episodeId: e.episodeId } }">
                                        <p class="subtitle is-6 has-text-centered has-text-link">{{ e.episodeTitle }}
                                        </p>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a :class="pageCourante === 1 ? 'pagination-previous is-disabled' : 'pagination-previous'"
                    @click="previous" role="button" tabindex="0">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <a :class="pageCourante >= (animes.length / nbAnimesParPage) ? 'pagination-next is-disabled' : 'pagination-next'"
                    @click="next" role="button" tabindex="0">
                    <i class="fa fa-arrow-right"></i>
                </a>
                <ul class="pagination-list">
                    <li v-for="p in nbPages" :key="p">
                        <a :class="p === pageCourante ? 'pagination-link is-current' : 'pagination-link'"
                            @click="getNbPage(p)" role="button" tabindex="0">{{ p }}</a>
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
            const debut = (this.pageCourante - 1) * this.nbAnimesParPage;
            const fin = debut + this.nbAnimesParPage;
            return this.animes.slice(debut, fin);
        },
        nbPages() {
            return Math.ceil(this.animes.length / this.nbAnimesParPage);
        }
    },
    async mounted() {
        this.getAnimes();
    },
    methods: {
        async getAnimes() {
            const token = this.store.token;
            const bearerToken = `bearer ${token}`;
            const response = await fetch(`${svrURL}/user/history`, {
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
        getNbPage(x) {
            this.pageCourante = x;
        },
        previous() {
            if (this.pageCourante > 1) {
                this.pageCourante -= 1;
            }
        },
        next() {
            if (this.pageCourante < this.animes.length / this.nbAnimesParPage) {
                this.pageCourante += 1;
            }
        }
    }
};
</script>

<style scoped>
.history-section {
    padding-top: 40px;
}

.history-title {
    font-weight: 700;
    color: #363636;
}

.anime-grid {
    margin-top: 30px;
}

.anime-card {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.anime-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.anime-image {
    border-radius: 10px 10px 0 0;
    height: 250px;
    object-fit: cover;
}

.pagination {
    margin-top: 40px;
}

.pagination-list li a {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
