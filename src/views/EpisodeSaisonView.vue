<template>
    <div class="column is-3-desktop is-4-tablet is-6-mobile" v-for="e in animesFiltres" :key="e.episodeId" :class="{
        card: !isEpisodeWatched(e.episodeId),
        disable: isEpisodeWatched(e.episodeId)
    }">
        <router-link :to="{ name: 'DetailsEpisodeView', params: { episodeId: e.episodeId } }" role="link">
            <div class="card-image">
                <figure class="image">
                    <img :src="e.imgURL" :alt="e.title" role="img" />
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4 no-padding has-text-centered" role="heading">
                            {{ e.title }}
                        </p>
                        <p class="subtitle is-6 no-padding has-text-centered" role="subtitle">
                            {{ e.number }}
                        </p>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "EpisodeSaisonView",
    props: {
        animesFiltres: Array,
        storeHistory: Object
    },
    methods: {
        isEpisodeWatched(episodeId) {
            return !!this.storeHistory.history.find(
                h => h.episodeId === episodeId
            );
        }
    }
};
</script>

<style scoped>
.disable {
    background-color: #dbdbdb;
    border-color: #dbdbdb;
    box-shadow: none;
    color: #7a7a7a;
    opacity: 0.5;
}
</style>