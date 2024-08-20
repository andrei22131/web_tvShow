import { defineStore } from "pinia";

export const myStore = defineStore("myStore", {
  state() {
    return {
      token: "",
      username: "",

      animes: [],
    };
  },
  getters: {

  },
  actions: {
    ajoutToken(token) {
      this.token = token;
    },
    removeToken() {
      this.token = "";
    },
  },

});

export const HistoryStore = defineStore("HistoryStore", {
  state() {
    return {
      history: [],
    };
  },
  getters: {
  },
  actions: {
  },
});
