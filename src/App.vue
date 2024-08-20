<template>
  <div class="container">
    <MenuView>
    </MenuView>
    <router-view />
  </div>
</template>

<script>
import MenuView from "./views/MenuView.vue";

import { myStore } from "@/stores/counter";
export default {
    name: "App",
    setup() {
        const store = myStore();
        return { store };
    },
    mounted() {
        if(sessionStorage.getItem("token")){
            this.store.ajoutToken(sessionStorage.getItem("token"));
        }
    },
    components: { MenuView }
};
</script>

<style>
@import "font-awesome/css/font-awesome.min.css";
@import "bulma/css/bulma.min.css";
</style>



