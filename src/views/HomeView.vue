<template>
  <div class="section" role="main">
    <div class="columns is-centered">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label for="titre" class="label">Title: </label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input v-model="filtreTitre" id="titre" class="input" type="text" placeholder="Titre de l'anime">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal" style="padding-left:20px">
        <div class="field-label is-normal">
          <label class="label" for="artistes">Studio: </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control" style="min-width: 200px">
              <div class="select is-fullwidth">
                <select id="artistes" v-model="filtreStudio">
                  <option></option>
                  <option v-for="s in studios" v-bind:key="s.studioId">{{ s.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section genre-panel">
    <nav class="panel genre-panel-container">
      <p class="panel-heading genre-panel-heading">
        Genres
      </p>
      <div class="columns is-variable is-multiline" v-if="genres !== null">
        <div class="column is-2-desktop genre-checkbox-container" v-for="g in genres" v-bind:key="g.genreId">
          <label class="checkbox genre-checkbox">
            <input class="dad" type="checkbox" v-model="filtresGenres" v-bind:value="g.genreId" :aria-required="true" />
            <span class="genre-label">{{ g.name }}</span>
          </label>
        </div>
      </div>
    </nav>
  </div>


  <div class="section">
    <div class="row columns is-multiline is-mobile">
      <AnimeView v-for="a in animesPagines" v-bind:key="a.animeId" v-bind:anime="a" />
    </div>


    <nav class="pagination" role="navigation" aria-label="pagination">
      <a v-bind:class="pageCourante == 1 ? 'pagination-previous is-disabled' : 'pagination-previous'"
        v-on:click="previous" tabindex="-1"><i class="fa fa-arrow-left"></i></a>
      <a v-bind:class="pageCourante == nbPages ? 'pagination-next is-disabled' : 'pagination-next'" v-on:click="next"
        tabindex="-1"><i class="fa fa-arrow-right"></i></a>
      <ul class="pagination-list">
        <li v-for="p in nbPages" v-bind:key="p.id">
          <a v-bind:class="p == pageCourante ? 'pagination-link is-current' : 'pagination-link'" aria-label="Page 1"
            aria-current="page" v-on:click="getNbPage(p)" tabindex="-1">{{ p }}</a>
        </li>
      </ul>
    </nav>
    <div class="columns has-text-centered is-centered">
      <div class="field is-horizontal" style="padding-left:20px">
        <div class="field-label is-normal">
          <label class="label" for="taillePage" style="min-width: 150px">
            Animes par page
          </label>
        </div>
        <div class="field-body" role="presentation">
          <div class="field">
            <div class="control" style="min-width: 50px">
              <div class="select is-fullwidth">
                <select id="taillePage" v-model="nbAnimesParPage">
                  <option>8</option>
                  <option>12</option>
                  <option>16</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import { svrURL } from "@/constants";
import AnimeView from "@/views/AnimeView.vue";


export default {
  name: "HomeView",
  components: { AnimeView },
  data() {
    return {
      animes: [],
      studios: [],
      genres: [],
      filtreTitre: "",
      filtreStudio: "",
      filtresGenres: [],

      nbAnimesParPage: 8,
      pageCourante: 1,
    };
  },
  watch: {
    animesFiltres(newTitre) {
      console.log(`setting token: ${newTitre}`);
      this.pageCourante = 1;
    },
  },
  computed: {
    animesFiltres() {
      let animesFiltres = this.animes;
      if (this.filtreTitre !== "") {
        animesFiltres = animesFiltres.filter(
          (p) => p.title.toLowerCase().includes(this.filtreTitre.toLowerCase()),
        );
      }
      if (this.filtreStudio !== "") {
        animesFiltres = animesFiltres.filter(
          (p) => p.studio.name === this.filtreStudio,
        );
      }
      if (this.filtresGenres.length !== 0) {
        animesFiltres = animesFiltres.filter(
          (p) => this.filtresGenres.every((fg) => p.genres.map((m) => m.genreId).includes(fg)));
      }

      return animesFiltres;
    },

    animesPagines() {
      const debut = (this.pageCourante - 1) * Number(this.nbAnimesParPage);
      const fin = debut + Number(this.nbAnimesParPage);
      const animesP = this.animesFiltres.slice(debut, fin);
      return animesP;
    },
    //filter->every->map->includes

    nbPages() {
      return Math.ceil(this.animesFiltres.length / this.nbAnimesParPage);
    },
  },
  mounted() {
    this.getStudios();
    this.getAnimes();
    this.getGenres();
  },

  methods: {
    async getStudios() {
      const rep = await fetch(`${svrURL}/studios`);
      if (rep.ok) {
        this.studios = await rep.json();
      }
    },
    async getAnimes() {
      const rep = await fetch(`${svrURL}/tvshows`);
      if (rep.ok) {
        this.animes = await rep.json();
      }
    },
    async getGenres() {
      const rep = await fetch(`${svrURL}/genres`);
      if (rep.ok) {
        this.genres = await rep.json();
      }
    },
    async getNbPage(x) {
      return this.pageCourante = x;
    },
    async previous() {
      if (this.pageCourante > 1) {
        return this.pageCourante -= 1;
      }
    },
    async next() {
      if (this.pageCourante < this.nbPages) {
        return this.pageCourante += 1;
      }
    },
  },
};
</script>

<style scoped>
.dad {
  margin: 10px;
}
</style>

<style scoped>
.genre-panel {
  padding: 20px;
}

.genre-panel-container {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.genre-panel-heading {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
  background-color: #7f7f7f;
  color: white;
  border-radius: 10px 10px 0 0;
  padding: 10px 20px;
}

.columns {
  margin-top: 10px;
}

.genre-checkbox-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
}

.genre-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.genre-checkbox input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #00d1b2;
}

.genre-label {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #4a4a4a;
  transition: color 0.3s ease;
}

.genre-checkbox input[type="checkbox"]:checked+.genre-label {
  color: #00d1b2;
  font-weight: 600;
}
</style>