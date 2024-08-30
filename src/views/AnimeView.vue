<template>
    <div class="column is-3-desktop is-4-tablet is-6-mobile" v-if="anime !== null">
        <router-link :to="{ name: 'DetailsView', params: { animesId: anime.tvshowId } }" role="link"
            class="anime-card-link">
            <div class="card large anime-card" role="presentation">
                <div class="card-image">
                    <figure class="image anime-card-figure">
                        <img :src="anime.imgURL" :alt="anime.title" />
                    </figure>
                </div>
                <div class="card-content anime-card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4 no-padding has-text-centered anime-title">
                                {{ anime.title }}
                            </p>
                            <p class="subtitle is-6 has-text-centered anime-info">
                                <b>Studio:</b> {{ anime.studio.name }} <br />
                                <b>Genres:</b> {{ anime.genres.map((e) => e.name).join(", ") }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
        <div role="alert" v-if="error" tabindex="0" ref="errorContainer"
            :aria-describedby="error ? 'error-message' : null" class="error-message">
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

<style scoped>
.anime-card-link {
    display: block;
    transition: transform 0.3s ease-in-out;
}

.anime-card-link:hover {
    transform: scale(1.05);
}

.anime-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.anime-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.anime-card-figure {
    height: 250px;
    overflow: hidden;
    border-bottom: 2px solid #f5f5f5;
}

.anime-card-figure img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.anime-card-content {
    padding: 20px;
}

.anime-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}

.anime-info {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: #7a7a7a;
}

.error-message {
    margin-top: 10px;
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
}
</style>