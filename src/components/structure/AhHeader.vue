<template>
<div >
 <!--<nav>
     <div class="nav-wrapper" style="display:flex;">
    
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <form style="flex:1;">
        <div class="input-field" style="padding:6px;box-sizing:border-box;">
          <input id="search" type="search" style="border-radius:2px;"  v-on:keyup="onSearchNewHome">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
      <ul id="nav-mobile" class="right">
      
      	<li><router-link v-bind:to="'/discover'">Voyager</router-link></li>
        <li v-if="this.$store.state.user == null"><a @click="showModalAuthenticate = true">Connexion</a></li>
      </ul>
    </div>
  </nav>-->
  
  <v-toolbar class="primary">
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn @click="$router.push('/discover')" flat>Voyager</v-btn>
      <v-btn v-if="this.$store.state.user == null" flat>Connexion</v-btn>
    </v-toolbar-items>
  </v-toolbar>

<authenticate :showModal="showModalAuthenticate" @close="showModalAuthenticate = false" @createAccount="showModalCreateAccount = true"></authenticate>
<createAccount :showModal="showModalCreateAccount" @close="showModalCreateAccount = false"></createAccount>

</div>
</template>

<script type="text/javascript">
import Authenticate from '../Authenticate';
import CreateAccount from '../CreateAccount';

export default {
	mounted: function() {
	},
	data: function() {
		return {
			showModalAuthenticate: false,
			showModalCreateAccount: false,
		}
	},
	components: {
		Authenticate,
		CreateAccount,
	},
	methods: {
		openModal() {
		},
		onSearchNewHome(e) {
			if (e.keyCode === 13) {
				//a implementer
		        this.$router.push('discover');
		      }
		},
	},
};

</script>

<style>
</style>
