/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>

		<v-container>
		
		<v-layout row wrap>
			
			<v-flex v-if="unfinishedAccomodation != null" xs12 sm6 lg4 xl3>
			
				<v-card >
			        <v-card-media :src="getUnfinishedMainPictureUrl == null ? '/static/images/no_bkg_state.svg' : getUnfinishedMainPictureUrl" height="200px">
			        </v-card-media>
			        <v-card-title primary-title>
			          <div>
			            <h3 class="headline mb-0">{{unfinishedAccomodation.name != null ? unfinishedAccomodation.name : $t('accomodation.default.name') }}</h3>
			            <div>{{unfinishedAccomodation.description != null ? unfinishedAccomodation.description : $t('accomodation.default.description') }}</div>
			          </div>
			        </v-card-title>
			        <v-card-actions>
			          <v-btn flat color="blue" @click="onAddNewEstate()">REPRENDRE LA CREATION</v-btn>
			          <v-spacer></v-spacer>
			          <v-icon>{{ unfinishedAccomodation.actif ? 'visibility' : 'visibility_off' }}</v-icon>
			        </v-card-actions>
      			</v-card>
			
			</v-flex>
			
		</v-layout>
		
		</v-container>

		<v-btn v-on:click="onAddNewEstate();" fab color="primary" fixed right bottom><v-icon>add</v-icon></v-btn>
</div>
</template>

<script>
import Accomodation from '../../../class/entities/Accomodation';

export default {
	mounted: function () {
		console.log(" ..... userId = " + this.$ls.get('user').id + " ..... et accomodation.userId= " + this.$ls.get("accomodation")._userId)
		console.log(this.$ls.get("accomodation"))
		if (this.$ls.get("accomodation") != null && this.$ls.get('user').id == this.$ls.get("accomodation")._userId)
			this.unfinishedAccomodation = this.$ls.get("accomodation");
	},
	data: function() {
		return {
			unfinishedAccomodation : null,
		}
	},
	computed: {
		getUnfinishedMainPictureUrl : function () {
			if (this.unfinishedAccomodation != null && this.unfinishedAccomodation.pictures.length >= 1) {
				//on garde uniquement l'image principale
				this.unfinishedAccomodation.pictures.filter(pic => pic.isMain);
				return this.unfinishedAccomodation.pictures[0].url;
			}
		},
	},
 	methods: {
		onAddNewEstate() {
			this.$router.push('/realEstate/new');
		},
	},
};
</script>

<style>
</style>
