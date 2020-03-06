<template>
<div >
  
	<v-toolbar class="primary">
		<portal-target style="margin-left:0px;" name="headerToolbarIcon"></portal-target>
	    <v-toolbar-title :class="$store.state.user != null ? 'hidden-lg-and-up' : ''" @click="$router.push('/')">AtypikHouse</v-toolbar-title>
	    <v-toolbar-title v-if="$store.state.user != null" class="hidden-md-and-down"  style="margin-left:316px;" @click="$router.push('/')">AtypikHouse</v-toolbar-title>
	    <v-spacer></v-spacer>

		<!-- La toolbar en mode desktop -->
	    <v-toolbar-items class="hidden-sm-and-down">
	    
	    
	      <v-btn @click="$router.push('/About')" flat>Qui sommes-nous?</v-btn>
	      <v-btn v-if="this.$store.state.user == null" flat @click="showModalAuthenticate = true">Connexion</v-btn>
	    </v-toolbar-items>

		<!-- La toolbar en mode mobile -->
		<v-toolbar-items class="hidden-md-and-up">
			<v-spacer></v-spacer>
			<v-btn v-if="this.$store.state.user == null" @click="showModalAuthenticate = true" icon flat><v-icon>account_box</v-icon></v-btn>
	    </v-toolbar-items>
	    
	    <v-menu :nudge-width="100">
	    
	    <v-btn icon slot="activator" dark>
              <v-icon class="black--text">whatshot</v-icon>
        </v-btn>
	    
        <v-list>
          <v-list-tile v-for="item in socialNetworks" :key="item.text" @click="redirectOnSocialNewtork(item.url);">
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
	    
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
			socialNetworks: [
				{text : "Facebook", url : "https://www.facebook.com/AtipykHouse/"},
				{text : "Twitter", url : "https://twitter.com/AtypikHouseCo"},
// 				{text : "Instagram", url : ""},
			],
		}
	},
	components: {
		Authenticate,
		CreateAccount,
	},
	methods: {
		openModal() {
		},
		redirectOnSocialNewtork(url) {
			window.open(url, '_blank');
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
