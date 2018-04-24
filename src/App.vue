<template>
  <v-app id="zdededex">
    
    <sidenav-bar :display="displayDrawer"></sidenav-bar>
    <ah-header @onClickSwitchDrawer="displayDrawer = !displayDrawer"></ah-header>
    
    <v-content class="blue lighten-5">
    
    <router-view></router-view>
    
    </v-content>
    
  </v-app>
</template>

<script>
import AhHeader from './components/structure/AhHeader';
import AhFooter from './components/structure/AhFooter';
import sidenavBar from './components/structure/SidenavBar';

export default {
  data : function() {
    return {
    	displayDrawer: true,
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
