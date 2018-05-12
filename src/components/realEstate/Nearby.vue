<template>
	<div>
	
	<v-layout row wrap>
			
		<v-flex v-for="nearby in nearbyList" :key="nearby._id" xs12 sm4 lg4 xl3 class="pa-2">
		
			<v-card>
			
				<v-card-media src="/static/images/bulle.png" height="200px"></v-card-media>
				<v-card-title primary-title>
          			<div>
			            <div class="headline">{{ nearby.name }}</div>
			            <span :class="areInformationOlds(nearby.majDate) ? 'red--text' : 'grey--text'">{{ getFormattedDate(nearby.majDate) }}</span>
          			</div>
       			 </v-card-title>
       			 
       			  <v-card-actions>
			          <v-btn color="primary" flat>METTRE A JOUR</v-btn>
			          <v-spacer></v-spacer>
			          <v-btn icon>
			          	<v-icon>delete</v-icon>
			          </v-btn>
			          <v-btn icon @click.native="nearby.expend = !nearby.expend ">
			            <v-icon>{{ nearby.expend ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
			          </v-btn>
			        </v-card-actions>
			        <v-slide-y-transition>
			          <v-card-text v-show="nearby.expend">
			          	{{ nearby.description }}
			          </v-card-text>
        </v-slide-y-transition>
			
			</v-card>
		
		</v-flex>
		
	</v-layout>
	
	<v-btn color="primary" @click="onAddNewNearby()" fab fixed right bottom>
		<v-icon color="black">add</v-icon>
	</v-btn>
	
	<v-dialog v-model="showDialogAddNearby" max-width="500px">
		
		<v-card>
			<v-subheader>Ajout d'une activité</v-subheader>
			
			<v-card-text>
				<v-form ref="newNearbyForm">
				
					<v-text-field v-model="nearby.name" label="Nom de l'activité"></v-text-field>
					<v-text-field v-model="nearby.description" label="Description de l'activité" multi-line></v-text-field>
					<v-text-field v-model="nearby.price" label="prix indicatif"></v-text-field>
					<v-text-field v-model="nearby.range" label="Distance du bien"></v-text-field>
					<v-text-field v-model="nearby.phone" label="Numéro"></v-text-field>
					<v-text-field v-model="nearby.website" label="Site web"></v-text-field>
					
					<!-- TODO A ENLEVER A LA FIN CAR CEST UNE VALEUR GEREE PAR L'OUTIL -->
					<v-text-field v-model="nearby.majDate" label="Date de mise à jour"></v-text-field>
				
				</v-form>
			</v-card-text>
			
			<v-card-actions>
				<v-btn flat @click="showDialogAddNearby = false;">Annuler</v-btn>
				<v-btn flat color="primary" @click="onSaveNearby()">Ajouter</v-btn>
			</v-card-actions>
		</v-card>
		
	</v-dialog>
	
	</div>
</template>

<script type="text/javascript">
import Nearby from '../../class/entities/Nearby'
import moment from 'moment';

export default {
	components: {
	},
	props: [],
	created: function () {
	},
	data: function() {
   		return {
   			nearby: new Nearby(),
   			nearbyList: [],
   			showDialogAddNearby: false,
    	}
  	},
  	methods: {
  		onAddNewNearby() {
  			this.showDialogAddNearby = true;
  		},
  		onSaveNearby() {
  			if (this.$refs.newNearbyForm.validate()) {
  	  			this.showDialogAddNearby = false;
  	  			//TODO A REMETTRE
  	  			//this.nearby.majDate = new Date();
  	  			this.nearbyList.push(this.nearby);
  	  			//TODO Appel HTTP pour save un nearby
  			}
  		},
  		areInformationOlds(date) {
  			var infoDate = moment(date);
  			var today = moment(new Date());
  			return today.diff(infoDate, "days") > 90 ? true : false;
  		},
  		getFormattedDate(date) {
  			return moment(date).format('DD/MM/YYYY');
  		},
  	},
};

</script>

<style scoped scss>
</style>
