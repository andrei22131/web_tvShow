<template>
    <div class="columns is-mobile scrollmenu" v-if="anime !== null">
        <div class="column is-one-fifth season-card-column" v-for="a in anime.seasons" v-bind:key="a.seasonId"
            role="listitem">
            <router-link v-bind:to="{
        name: 'SeasonEpisodesView',
        params: { seasonId: a.seasonId }
    }" role="link">
                <div class="card season-card" role="presentation">
                    <div class="card-image">
                        <figure class="image season-image">
                            <img v-bind:src="a.imgURL" v-bind:alt="a.name" />
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-5 has-text-centered season-title" role="heading">Season {{ a.number
                                    }}</p>
                                <p class="subtitle is-6 has-text-centered season-episodes" role="status">{{
                                    a.episodeCount }} episodes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "SaisonView",
    props: {
        anime: Object,
    },
};
</script>

<style scoped>
.season-card-column {
    margin-bottom: 20px;
}

.season-card {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.season-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.season-image img {
    object-fit: cover;
    border-bottom: 2px solid #00d1b2;
}

.season-title {
    font-weight: 700;
    color: #363636;
}

.season-episodes {
    color: #4a4a4a;
    font-style: italic;
}
</style>