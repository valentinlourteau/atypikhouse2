<template>
<div >
  
	<v-toolbar class="primary">
	    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
	    <v-toolbar-title>AtypikHouse</v-toolbar-title>
	    <v-spacer></v-spacer>
	    <v-toolbar-items class="hidden-sm-and-down">
	      <v-btn @click="$router.push('/discover')" flat>Voyager</v-btn>
	      <v-btn v-if="this.$store.state.user == null" flat @click="showModalAuthenticate = true">Connexion</v-btn>
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
