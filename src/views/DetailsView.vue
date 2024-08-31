<template>
    <div id="app" class="container anime-details-container" v-if="animes !== null" role="main">
      <div class="columns is-variable is-8" role="presentation">
        <div class="column is-one-third" role="figure">
          <figure class="image anime-image">
            <img v-bind:src="animes.imgURL" alt="image animes" />
          </figure>
        </div>
        <div class="column anime-info">
          <h1 class="anime-title" role="heading">{{ animes.title }}</h1>
          <p class="anime-year">{{ animes.year }}</p>
          <p class="anime-episode-count">{{ animes.episodeCount }} episodes</p>
          <p class="anime-genres">{{ animes.genres.map((e) => e.name).join(", ") }}</p>
          <div class="anime-studio">
            <strong>Studio:</strong> {{ animes.studio.name }}
          </div>
          <p class="anime-plot has-text-justified" role="description">{{ animes.plot }}</p>
        </div>
        <div class="audio-section">
        <audio controls autoplay>
          <source v-bind:src="animes.audioURL" v-bind:alt="animes.audioURL">
        </audio>
      </div>
      </div>
  
      <div class="actors-section">
        <h2 class="section-title">Actors</h2>
        <div class="row columns is-multiline is-mobile">
          <ActeursView v-bind:acteur="animes" />
        </div>
      </div>
  
      <div class="seasons-section">
        <h2 class="section-title">Seasons</h2>
        <div class="columns is-mobile scrollmenu">
          <SaisonView v-bind:anime="animes" />
        </div>
      </div>
  

    </div>
  </template>
  
  <script>
  import { svrURL } from "@/constants";
  import ActeursView from "@/views/ActeursView.vue";
  import SaisonView from "@/views/SaisonView.vue";
  
  export default {
    name: "DetailsView",
    components: { ActeursView, SaisonView },
    data() {
      return {
        animes: null,
      };
    },
    async mounted() {
      this.getAnimes();
    },
    methods: {
      async getAnimes() {
        const response = await fetch(`${svrURL}/tvshow?tvshowId=${this.$route.params.animesId}`);
        if (response.ok) {
          this.animes = await response.json();
        } else {
          console.error("API DOWN, TRY AGAIN LATER");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .anime-details-container {
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .anime-image img {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 100%;
  }
  
  .anime-info {
    padding-left: 20px;
  }
  
  .anime-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  .anime-year,
  .anime-episode-count,
  .anime-genres,
  .anime-studio {
    font-size: 1.2rem;
    margin: 5px 0;
    color: #4a4a4a;
  }
  
  .anime-plot {
    margin-top: 20px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin: 20px 0;
    font-weight: 600;
    text-align: center;
  }
  
  .actors-section,
  .seasons-section {
    margin-top: 40px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .scrollmenu {
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px 0;
  }
  
  .audio-section {
    margin-top: 40px;
    text-align: center;
  }
  
  audio {
    width: 100%;
    max-width: 600px;
    margin: auto;
    outline: none;
  }
  </style>
  