<template>
    <div class="column is-3-desktop is-4-tablet is-6-mobile" v-for="e in animesFiltres" :key="e.episodeId" :class="{
        'card-container': true,
        'watched-card': isEpisodeWatched(e.episodeId)
    }">
        <router-link :to="{ name: 'DetailsEpisodeView', params: { episodeId: e.episodeId } }" role="link">
            <div class="card episode-card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img :src="e.imgURL" :alt="e.title" role="img" />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-5 has-text-centered" role="heading">
                                {{ e.title }}
                            </p>
                            <p class="subtitle is-6 has-text-centered" role="subtitle">
                                Episode {{ e.number }}
                            </p>
                        </div>
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
.card-container {
    margin-bottom: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.episode-card {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.episode-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-image img {
    object-fit: cover;
    border-bottom: 3px solid #00d1b2;
}

.watched-card {
    background-color: #f0f0f0;
    border-color: #f0f0f0;
    box-shadow: none;
    opacity: 0.7;
}

.title {
    font-weight: bold;
    color: #363636;
}

.subtitle {
    color: #4a4a4a;
}

.card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
</style>
