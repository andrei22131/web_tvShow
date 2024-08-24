<template>
    <div class="column is-3-desktop is-4-tablet is-6-mobile" v-if="anime !== null">
        <router-link v-bind:to="{
        name: 'DetailsView',
        params: { animesId: anime.tvshowId }
    }" role="link">
            <div class="card large" role="presentation">
                <div class="card-image">
                    <figure class="image">
                        <img v-bind:src="anime.imgURL" v-bind:alt="anime.title" />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4 no-padding has-text-centered">{{ anime.title }}</p>
                            <br>
                            <p class="subtitle is-6 has-text-centered"><b>Studio: </b> {{ anime.studio.name }}
                                <br>
                                <b>Genres: </b>{{ anime.genres.map((e) => e.name).join(", ") }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
        <div role="alert" v-if="error" tabindex="0" ref="errorContainer"
            :aria-describedby="error ? 'error-message' : null">
            <p id="error-message">{{ error }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "AnimeView",
    props: {
        anime: Object,
        error: String,
    },
};
</script>