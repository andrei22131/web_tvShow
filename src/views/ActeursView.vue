<template>
    <div class="columns is-mobile scrollmenu actor-cards-container" v-if="acteur !== null" role="list">
        <div class="column is-one-fifth actor-card-column" v-for="a in acteur.roles" v-bind:key="a.roleId">
            <div class="card actor-card">
                <div class="card-image">
                    <figure class="image actor-image">
                        <img v-bind:src="a.imgURL" v-bind:alt="a.name" />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-5 has-text-centered actor-name">{{ a.name }}</p>
                            <p class="subtitle is-6 has-text-centered actor-character">{{ a.character }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActeursView",
    props: {
        acteur: Object,
    },
};
</script>

<style scoped>
.actor-card-column {
    margin-bottom: 20px;
}

.actor-card {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.actor-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.actor-image img {
    object-fit: cover;
    border-bottom: 2px solid #00d1b2;

}

.actor-name {
    font-weight: 700;
    color: #363636;
}

.actor-character {
    color: #4a4a4a;
    font-style: italic;
}
</style>