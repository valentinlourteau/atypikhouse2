/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>

		
	<v-tabs v-model="activeTab" color="yellow" dark slider-color="black" centered @input="onChangeTab($event)">
		
      <v-tab v-for="tab in tabs" :key="tab.text" ripple>
       <span class="black--text">{{ tab.text }}</span>
      </v-tab>
      
      <!-- Mes biens -->
      <v-tab-item>
        
        <v-layout row wrap class="mx-2">
			
			<v-flex v-for="accomodation in accomodations" :key="accomodation._id" xs12 sm4 lg4 xl3 class="pa-2">
			
				<v-card >
			        <v-card-media :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodation.images[0].data" height="200px">
			        </v-card-media>
			        <v-card-title primary-title>
			        	<div style="width:100%">
			        		<h3 class="headline mb-0">{{accomodation.name != null ? accomodation.name : $t('accomodation.default.name') }}</h3>
			        	</div>
			        	<div class="grey--text">{{ getTruncatedDescription(accomodation) }}</div>
			        </v-card-title>
			        <v-card-actions>
			          <v-btn v-if="accomodation.complete" flat color="blue" @click="onViewDetail(accomodation)">GERER</v-btn>
			          <v-btn v-if="!accomodation.complete" flat color="blue" @click="onResumeCreation(accomodation)">REPRENDRE LA CREATION</v-btn>
			          <!-- <v-spacer></v-spacer>
			          <v-btn :disabled="!accomodation.complete" @click="setAccomodationActive(accomodation)" icon>
			          	<v-icon>{{ accomodation.actif ? 'visibility' : 'visibility_off' }}</v-icon>
			          </v-btn> -->
			        </v-card-actions>
      			</v-card>
			
			</v-flex>
			
		</v-layout>

		<v-btn v-on:click="onAddNewEstate();" fab color="primary" fixed right bottom><v-icon class="black--text">add</v-icon></v-btn>
        
      </v-tab-item>
      
      <!-- Calendrier global -->
      <v-tab-item>
        
      	<calendar></calendar>
        
      </v-tab-item>
      
    </v-tabs>
    
		
</div>
</template>

<script>
import Accomodation from '../../../class/entities/Accomodation';
import Calendar from '../../realEstate/Calendar';
import AccomodationService from '../../../class/services/AccomodationService';

export default {
	components: {
		Calendar,
	},
	created: function () {
// 		AccomodationService.findAll(this.accomodations);

		this.$http.get("accomodation").then(response => {
			if (response.status === 200) {
				this.accomodations = response.body.accomodations;
			}
		});
		this.activeTab = this.$route.query.tab;

	},
	data: function() {
		return {
			activeTab: null,
			accomodations : [],
			tabs: [
				{text : "Mes biens"},
				{text : "Calendrier global"},
// 				{text : "Statistiques"},
			],
		}
	},
	computed: {
	},
 	methods: {
		onAddNewEstate() {
			this.$router.push('/realEstate/new');
		},
		onResumeCreation(accomodation) {
			this.$router.push('/realEstate/new/' + accomodation._id);
		},
		onViewDetail(accomodation) {
			this.$router.push({path: '/realEstate/detail', query: {accomodationId: accomodation._id, tab: 0}});
		},
		getTruncatedDescription(accomodation) {
			length = 86;
			if (accomodation.description == null)
				return "";
			else if (accomodation.description.length > length)
				return accomodation.description.substring(0, length) + " ...";
			else
				return accomodation.description.substring(0, length);
		},
		setAccomodationActive(accomodation) {
			//TODO
		},
		onChangeTab(event) {
			this.$router.push({path: '/realEstate/home', query: {tab: event}});
		}
	},
};
</script>

<style>
.truncate {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
