/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>

		<v-container>
		
		<v-layout row wrap>
			
			<v-flex v-for="accomodation in accomodations" :key="accomodation._id" xs12 sm6 lg4 xl3>
			
				<v-card >
			        <v-card-media :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodations.images[0].data" height="200px">
			        </v-card-media>
			        <v-card-title primary-title>
			          <div>
			            <h3 class="headline mb-0">{{accomodation.name != null ? accomodation.name : $t('accomodation.default.name') }}</h3>
			            <div>{{accomodation.description != null ? accomodation.description : $t('accomodation.default.description') }}</div>
			          </div>
			        </v-card-title>
			        <v-card-actions>
			          <v-btn flat color="blue" @click="onAddNewEstate()">DETAIL</v-btn>
			          <v-btn flat color="blue" @click="onAddNewEstate()">REPRENDRE LA CREATION</v-btn>
			          <v-spacer></v-spacer>
			          <v-icon>{{ accomodation.actif ? 'visibility' : 'visibility_off' }}</v-icon>
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
import AccomodationService from '../../../class/services/AccomodationService';

export default {
	mounted: function () {
		AccomodationService.findAll(this.accomodations);
	},
	data: function() {
		return {
			accomodations : [],
		}
	},
	computed: {
	},
 	methods: {
		onAddNewEstate() {
			this.$router.push('/realEstate/new');
		},
		onViewDetail(accomodation) {
			this.$route.push({path: '/realEstate/detail', query: { accomodationId: accomodation._id }})
		}
	},
};
</script>

<style>
</style>
