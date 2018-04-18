/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>

		<v-container>
		
		<v-layout row wrap>
			
			<v-flex v-if="unfinishedAccomodation != null" xs12 sm6 lg4 xl3>
			
				<v-card >
			        <v-card-media :src="getUnfinishedMainPictureUrl()" height="200px">
			        </v-card-media>
			        <v-card-title primary-title>
			          <div>
			            <h3 class="headline mb-0">Dans ma bulle</h3>
			            <div>Située dans un jardin à l'abri des regards et de toutes pollutions sonores, notre bulle vous accueille ...</div>
			          </div>
			        </v-card-title>
			        <v-card-actions>
			          <v-btn flat color="blue">DETAIL</v-btn>
			          <v-btn flat color="blue">DISPONIBILITES</v-btn>
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
		console.log(this.$ls.get("accomodation"))
		if (this.$ls.get("accomodation") != null)
			this.unfinishedAccomodation = this.$ls.get("accomodation");
	},
	data: function() {
		return {
			unfinishedAccomodation : null,
		}
	},
	computed: {
		getUnfinishedMainPictureUrl() {
			if (this.unfinishedAccomodation != null)
				return this.unfinishedAccomodation.pictures.filter(pic => pic.isMain)[0].url;
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
