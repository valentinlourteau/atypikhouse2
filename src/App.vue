<template>
  <v-app>
    
    <sidenav-bar :display="displayDrawer"></sidenav-bar>
    <ah-header @onClickSwitchDrawer="displayDrawer = !displayDrawer"></ah-header>
    
    <v-content class="blue lighten-5">
    
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
      }
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
