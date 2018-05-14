<template>
	<div>
	
	<v-alert class="ma-3" :value="true" type="info">Vous pouvez renseigner ici les activités à proximité de votre bien, elles permettront aux voyageurs de se projetter dans votre bien.
	Ajouter des informations précises et les maintenir à jour est un gage de sérieux pour le voyageur. N'hésitez pas à y mettre vos meilleurs clichés et pourquoi pas une petite anecdote !</v-alert>
	<v-alert class="ma-3" :value="nearbyList.filter(nearby => nearby.oldInformations).length > 0" type="warning">Une ou plusieurs activités à proximité n'ont pas été mises à jours depuis longtemps !</v-alert>
	
	<v-layout row wrap class="mx-2">
			
		<v-flex v-for="nearby in nearbyList" :key="nearby._id" xs12 sm4 lg3 xl3 class="pa-2">
		
			<v-card>
			
				<v-card-media src="/static/images/bulle.png" height="200px"></v-card-media>
				<v-card-title primary-title>
          			<div>
			            <div class="headline">{{ nearby.name }}</div>
			            <span :class="nearby.oldInformations ? 'orange--text' : 'grey--text'">Mis à jour le : {{ getFormattedDate(nearby.majDate) }}</span>
          			</div>
       			 </v-card-title>
       			 
       			  <v-card-actions>
			          <v-btn :color="nearby.oldInformations ? 'orange' : 'secondary'" @click="onEditNearby(nearby)" flat><span style="order:2" :class="nearby.oldInformations ? 'orange--text' : ''">METTRE A JOUR</span>
			          <v-icon v-if="nearby.oldInformations" style="order:1" class="mr-2 orange--text">warning</v-icon>
			          </v-btn>
			          <v-spacer></v-spacer>
			          <v-btn icon>
			          	<v-icon>delete</v-icon>
			          </v-btn>
			        </v-card-actions>
			
			</v-card>
		
		</v-flex>
		
	</v-layout>
	
	<v-btn color="primary" @click="onAddNewNearby()" fab fixed right bottom>
		<v-icon color="black">add</v-icon>
	</v-btn>
	
	<v-dialog v-model="showDialogAddNearby" max-width="500px" persistent>
		
		<v-card>
			<form @submit.prevent="handleSubmit">
				<v-subheader>Activité</v-subheader>
				
				<v-card-text>
					
						<v-text-field v-model="nearby.name" v-validate="'required'" :error-messages="errors.collect('name')" data-vv-name="name" label="Nom de l'activité" required></v-text-field>
						<v-text-field v-model="nearby.description" v-validate="'required'" :error-messages="errors.collect('description')" data-vv-name="description" label="Description de l'activité" multi-line required></v-text-field>
						<v-text-field v-model="nearby.price" label="prix indicatif"></v-text-field>
						<v-text-field v-model="nearby.distance" label="Distance depuis le bien"></v-text-field>
						<v-text-field v-model="nearby.phone" label="Numéro"></v-text-field>
						<v-text-field v-model="nearby.website" label="Site web"></v-text-field>
						
						<!-- TODO A ENLEVER A LA FIN CAR CEST UNE VALEUR GEREE PAR L'OUTIL -->
						<v-text-field v-model="nearby.majDate" label="Date de mise à jour"></v-text-field>
					
				</v-card-text>
				
				<v-card-actions>
					<v-btn flat @click="showDialogAddNearby = false;">Annuler</v-btn>
					<v-btn flat color="primary" @click="onSaveNearby()">Valider</v-btn>
				</v-card-actions>
			</form>
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
		this.nearbyList.push({
			_id: "D156645645645465456dad",
			majDate: moment("21/12/2017", "DD/MM/YYYY").toDate(),
			name: "Canoe kayak",
			description: "Une superbe activité à faire en famille, vous allez pouvoir nager et faire du boudin créole en sautant sur une plage infestée de dinosaures et de méga zgegs de poule constipée crotte de nez",
			price: "100€ par personne",
			distance: "20 km",
			phone: "06 22 98 63 95",
			website: "website.com",
			oldInformations: true,
		})
		for (var nearby in this.nearbyList) {
			this.nearbyList[nearby].oldInformations = this.areInformationOlds(this.nearbyList[nearby]);
		}
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
  			this.$validator.validateAll().then(result => {
  	  			//TODO A REMETTRE
  	  			//this.nearby.majDate = new Date();
					if (result) {
		  	  			if (this.nearby._id == null) {
		  	  				this.nearbyList.push(this.nearby);
		  	  	  			//TODO Appel HTTP pour POST un nearby
		  	  			}
		  	  			else {
		  	  	  			//TODO Appel HTTP pour PUT un nearby
		  	  				this.$store.commit("snackbar", "Modifications enregistrées");
		  	  			}
		  	  			this.nearby.oldInformations = this.areInformationOlds(this.nearby);
		  	  			this.showDialogAddNearby = false;
					}
  			})
  		},
  		areInformationOlds(nearby) {
  			var infoDate = moment(nearby.majDate);
  			var today = moment(new Date());
  			return today.diff(infoDate, "days") > 180 ? true : false;
  		},
  		getFormattedDate(date) {
  			return moment(date).format('DD/MM/YYYY');
  		},
  		onEditNearby(nearby) {
  			this.nearby = nearby;
  			this.showDialogAddNearby = true;
  		},
  		onDeleteNearby(nearby) {
  			this.nearbyList.remove(nearby);
  			//TODO Appel HTTP DELETE
  		},
  	},
};

</script>

<style scoped scss>
</style>
