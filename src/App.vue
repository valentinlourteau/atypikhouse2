<template>
  <v-app>
    
    <sidenav-bar></sidenav-bar>
    <ah-header></ah-header>
    
    <v-content>
    
    <router-view></router-view>
    
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import AhHeader from './components/structure/AhHeader';
import AhFooter from './components/structure/AhFooter';
import sidenavBar from './components/structure/SidenavBar';

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App',
  components: {
	  AhHeader,
	  AhFooter,
	  sidenavBar,
  }
}
</script>
