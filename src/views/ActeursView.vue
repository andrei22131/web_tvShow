<template>
    <div class="columns is-mobile scrollmenu" v-if="acteur !== null" role="list">
        <div class="column is-one-fifth" v-for="a in acteur.roles" v-bind:key="a.roleId">
            <div class="card">
                <div class="card-image">
                    <figure class="image">
                        <img v-bind:src="a.imgURL" v-bind:alt="a.name" />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4 no-padding has-text-centered">{{ a.name }}</p>
                            <p class="title is-4 no-padding has-text-centered">{{ a.character }}</p>
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