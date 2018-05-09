
/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>

		
		<v-tabs v-model="activeTab" color="yellow" dark slider-color="black" centered>
		
      <v-tab v-for="tab in tabs" :key="tab.text" ripple>
       <span class="black--text">{{ tab.text }}</span>
      </v-tab>
      
      <!-- Mes biens -->
      <v-tab-item>
        
        <v-layout row wrap>
			
			<v-flex  v-for="accomodation in accomodations" :key="accomodation._id" xs12 sm4 lg4 xl3 class="pa-2">
			
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
			          <v-spacer></v-spacer>
			          <v-btn :disabled="!accomodation.complete" @click="setAccomodationActive(accomodation)" icon>
			          	<v-icon>{{ accomodation.actif ? 'visibility' : 'visibility_off' }}</v-icon>
			          </v-btn>
			        </v-card-actions>
      			</v-card>
			
			</v-flex>
			
		</v-layout>

		<v-btn v-on:click="onAddNewEstate();" fab color="secondary" fixed right bottom><v-icon class="black--text">add</v-icon></v-btn>
        
      </v-tab-item>
      
      <!-- Calendrier global -->
      <v-tab-item>
        
        <v-container grid-list-lg>
      
      	<v-layout class="ma-3" row wrap>
      	
      		<v-flex xs12>
      			<v-alert type="info" :value="true">
      				Vous pouvez renseigner ici un calendrier qui sera utilisé par défaut pour tos vos biens.
      				Le calendrier global ne s'applique pas si un bien définit son propre calendrier.
      			</v-alert>
      		</v-flex>
      
      		<v-flex xs12 md9 class="mb-3">
      		
      				<v-date-picker v-model="picker" color="primary" landscape full-width locale="fr" @input="onSelectCalendarDate($event)"
      				></v-date-picker>
      		
      		</v-flex>
      		
      		<v-flex xs3>
      		
      			<v-card>
					<v-subheader>Jours non autorisés</v-subheader>
					
					<v-data-iterator :items="items" content-tag="v-list" :content-props="{dense: true}" column wrap loading="primary">
					
			            <v-list-tile slot="item" slot-scope="props">
			              <v-list-tile-content>{{ props.item }}</v-list-tile-content>
			              <v-spacer></v-spacer>
				          <v-btn icon>
				            <v-icon>search</v-icon>
				          </v-btn>
				          <v-btn icon>
				            <v-icon>delete</v-icon>
				          </v-btn>
			            </v-list-tile>
					
					</v-data-iterator>
					
					<v-card-actions>
						<v-btn flat color="primary">Ajouter</v-btn>
					</v-card-actions>
					
				</v-card>
      		
      		</v-flex>
      		
      	</v-layout>
      	
     </v-container>
        
      </v-tab-item>
      
    </v-tabs>
    
    <v-dialog v-model="addForbiddenDate.show">
    
    	<v-card>
    	
    	<v-card-title>
    		Ajout d'un jour interdit
    	</v-card-title>
    	
    	<v-card-text>
    		Voulez vous ajouter le {{ addForbiddenDate.date }} aux jours bloqués, personne ne pourra réserver. Si une réservation existe à cette date,
    		vous devrez contacter vous même le locataire.
    	</v-card-text>
    	
    	</v-card>
    	
    </v-dialog>
    
		
</div>
</template>

<script>
import Accomodation from '../../../class/entities/Accomodation';
import AccomodationService from '../../../class/services/AccomodationService';

export default {
	created: function () {
// 		AccomodationService.findAll(this.accomodations);

		this.$http.get("accomodation").then(response => {
			if (response.status === 200) {
				this.accomodations = response.body.accomodations;
			}
		});

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
			picker : null,
			addForbiddenDate: {
				show: false,
				date: null,
			},
			items : [
				"29/01/2012",
				"29/01/2013",
				"29/01/2014",
				"29/01/2015",
				"29/01/2015",
				"29/01/2015",
				"29/01/2015",
				"29/01/2015",
				"29/01/2015",
				"29/01/2011",
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
		onSelectCalendarDate($event) {
			//ajout d'un nouveau jour interdit
			this.addForbiddenDate.show = true;
			this.addForbiddenDate.date = $event;
		},
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
