import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailsView from "../views/DetailsView.vue";
import SeasonEpisodesView from "../views/SeasonEpisodesView.vue";
import DetailsEpisodeView from "../views/DetailsEpisodeView.vue";
import LoginView from "../views/LoginView.vue";
import SignUp from "../views/SignUp.vue";
import ProfileView from "../views/ProfileView.vue";
import JouerEpisodeView from "../views/JouerEpisodeView.vue";
import HistoryView from "../views/HistoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/details/:animesId",
      name: "DetailsView",
      component: DetailsView
    },
    {
      path: "/seasonEpisodes/:seasonId",
      name: "SeasonEpisodesView",
      component: SeasonEpisodesView
    },
    {
      path: "/episode/:episodeId",
      name: "DetailsEpisodeView",
      component: DetailsEpisodeView
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/profile",
      name: "ProfileView",
      component: ProfileView
    },
    {
      path: "/jouerEpisode/:episodeId",
      name: "JouerEpisodeView",
      component: JouerEpisodeView
    },
    {
      path: "/history",
      name: "HistoryView",
      component: HistoryView
    }
  ]
});

export default router;
