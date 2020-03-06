<template>
  <v-app>  
    <sidenav-bar :display="displayDrawer"></sidenav-bar>
    <ah-header @onClickSwitchDrawer="displayDrawer = !displayDrawer"></ah-header>  
    <v-content class="white">
      <router-view></router-view>
      <v-snackbar
      :timeout="6000"
      v-model="snackbar.show"
      right
      bottom
      >
      {{ snackbar.text }}
      <v-btn flat color="blue" @click.native="snackbar.show = false">Fermer</v-btn>
    </v-snackbar>  
  </v-content>
  <v-footer height="auto" color="primary">
    <v-layout row wrap justify-center>
      <v-btn v-for="link in links" :key="link.title" color="white" flat>
        <v-list-tile v-if="link.links == null" :to="link.link" class="black--text" active-class="yellow--text black">
          {{link.title }}
        </v-list-tile>
      </v-btn>
      <v-flex xs12 py-3 text-xs-center black--text> &copy;2020 —
        <strong>Tous droits réservés © De PrestaApp - Réseau des hébergements insolite </strong>
      </v-flex>
    </v-layout>
  </v-footer>    
</v-app>
</template>
<script>
import AhHeader from "./components/structure/AhHeader";
import AhFooter from "./components/structure/AhFooter";
import sidenavBar from "./components/structure/SidenavBar";

export default {
  mounted: function() {
    this.$store.watch(
      store => {
        this.snackbar.show = false;
        return this.$store.state.snackbar;
      },
      (newValue, oldValue) => {
        this.snackbar.text = newValue.toString();
        this.snackbar.show = true;
      }
      );
  },
  data: function() {
    return {
      displayDrawer: true,
      snackbar: {
        show: false,
        text: ""
      },
      links: [
      {
        title: "CGV",
        link: "/cgv"
      },
      {
        title: "Contact",
        link: "/contact"
      },
      {
        title: "Plan du site",
        link: "/plansite"
      },
      {
        title: "CGU",
        link: "/cgu"
      },
      {
        title: "Mentions legales",
        link: "/mentionlegale"
      }
      ]
    };
  },
  methods: {},
  name: "App",
  components: {
    AhHeader,
    AhFooter,
    sidenavBar
  }
};
</script>
<style>

</style>