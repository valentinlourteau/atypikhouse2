<template>
	<div>
		 <v-container grid-list-lg>
		 
		 <v-alert :value="true" type="info">Le calendrier vous permet de gérer les disponibilités de votre bien. Nous considérons par défaut que votre bien est disponible tous les jours. Vous pouvez ainsi
		 bloquer des dates pour empêcher de futures réservations. Si une réservation a déjà été faite à cette date, vous devrez contacter vous même le locataire si vous souhaitez annuler.
		 Cliquez sur une date pour la bloquer.</v-alert>
      	
		<v-layout row wrap>
		
		<v-flex xs12 md9>
      		
      				<v-date-picker v-model="picker" color="primary" landscape full-width locale="fr" @input="onSelectCalendarDate($event)"
      				:allowed-dates="getAllowedDates"></v-date-picker>
      		
      		</v-flex>
      		
      		<v-flex xs3>
      		
      			<!-- Activation du calendrier -->
      			<v-card class="mb-3">
      				<v-subheader>Activation du calendrier</v-subheader>
      				
      				<v-card-text>
      				<v-switch
      				:label="selectedCalendar.active ? 'Oui' : 'Non'"
      				v-model="selectedCalendar.active"></v-switch>
      				</v-card-text>
      			
      			</v-card>
      		
      			<!-- Liste des jours bloqués -->
      			<v-card>
					<v-subheader>Jours bloqués</v-subheader>
					
					<v-data-iterator :items="selectedCalendar.lockedDays" content-tag="v-list" :content-props="{dense: true}" no-data-text="Aucune date bloquée" column wrap>
					
			            <v-list-tile slot="item" slot-scope="props">
			              <v-list-tile-content>{{ props.item }}</v-list-tile-content>
			              <v-spacer></v-spacer>
				          <v-btn @click="onDeleteDate(props.item)" icon>
				            <v-icon>delete</v-icon>
				          </v-btn>
			            </v-list-tile>
					
					</v-data-iterator>
					
				</v-card>
      		
      		</v-flex>
    		
    		</v-layout>
     </v-container>
     
     <v-btn color="primary" @click="onSaveCalendar()" fab fixed right bottom>
     	<v-icon color="black">save</v-icon>
     </v-btn>
      		
      		<v-dialog v-model="addForbiddenDate.show" width="400px">
    
		    	<v-card>
		    	
		    	<v-card-title>
		    		<span class="title">Ajout d'un jour interdit</span>
		    	</v-card-title>
		    	
		    	<v-card-text>
		    		Voulez vous ajouter le {{ addForbiddenDate.date }} aux jours bloqués ?
		    		Si une réservation existe à cette date,	vous devrez contacter vous même le locataire.
		    	</v-card-text>
		    	
		    	<v-card-actions>
		    		<v-btn flat @click="addForbiddenDate.show = false;">ANNULER</v-btn>
		    		<v-btn flat color="primary" @click="onLockDay()">BLOQUER</v-btn>
		    	</v-card-actions>
		    	
		    	</v-card>
    	
    		</v-dialog>
		
		
	</div>
</template>

<script type="text/javascript">
import moment from 'moment';
export default {
	components: {
	},
	props: ["calendar"],
	created: function () {
		this.selectedCalendar = this.calendar;
		if (typeof this.selectedCalendar == 'undefined') {
			this.selectedCalendar = {
					active: true,
					lockedDays: [],
			};
		}
		else {
			//la on vérifie si c'est un calendrier de type user ou de type accomodation : global / local
		}
	},
	data: function() {
    return {
    	selectedCalendar: null,
		picker : null,
		addForbiddenDate: {
			show: false,
			date: null,
		},
		getAllowedDates: val => !this.selectedCalendar.lockedDays.includes(moment(val).format('DD/MM/YYYY')) && new Date(val) > new Date(),
    }
  },
  methods: {
		onSelectCalendarDate($event) {
			//ajout d'un nouveau jour interdit
			this.addForbiddenDate.show = true;
			this.addForbiddenDate.date = $event;
		},
		onLockDay() {
			//ajout d'un jour bloqué
			this.selectedCalendar.lockedDays.push(moment(this.addForbiddenDate.date).format('DD/MM/YYYY'));
			this.selectedCalendar.lockedDays.sort()
			this.addForbiddenDate.show = false;
		},
		onDeleteDate(date) {
			console.log(date)
			this.selectedCalendar.lockedDays.splice(date);
		},
		onSaveCalendar() {
			//TODO
			//Requête HTTP pour save le calendar
			this.$store.commit("snackbar", "Calendrier enregistré");
		},
  },
};

</script>

<style scoped scss>
</style>
