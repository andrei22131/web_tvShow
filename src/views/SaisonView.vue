<template>
    <div class="columns is-mobile scrollmenu" v-if="anime !== null">
        <div class="column is-one-fifth" v-for="a in anime.seasons" v-bind:key="a.seasonId" role="listitem">
            <div class="card" role="presentation">
                <router-link v-bind:to="{
        name: 'SeasonEpisodesView',
        params: { seasonId: a.seasonId }
    }" role="link">
                    <div class="card-image">
                        <figure class="image">
                            <img v-bind:src="a.imgURL" v-bind:alt="a.name" />
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4 no-padding has-text-centered" role="heading">Season {{ a.number }}
                                </p>
                                <br>
                                <p class="subtitle is-6 no-padding has-text-centered" role="status">{{ a.episodeCount }}
                                    épisodes</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
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