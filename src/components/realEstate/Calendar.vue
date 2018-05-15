<template>
	<div>
		 <v-container grid-list-lg>
		 
		 <v-alert :value="true" type="info">Le calendrier vous permet de gérer les disponibilités de votre bien. Nous considérons par défaut que votre bien est disponible tous les jours. Vous pouvez ainsi
		 bloquer des dates pour empêcher de futures réservations. Si une réservation a déjà été faite à cette date, vous devrez contacter vous même le locataire si vous souhaitez annuler.
		 Cliquez sur une date pour la bloquer.</v-alert>
      	
		<v-layout row wrap>
		
		<v-flex xs12>
      		
      				<v-date-picker v-model="picker" color="primary" landscape full-width locale="fr" @input="onSelectCalendarDate($event)"
      				:allowed-dates="getAllowedDates"></v-date-picker>
      		
      		</v-flex>
      		
      			<v-flex xs4>
      		
      			<!-- Liste des dates bloqués -->
      			<v-card class="mb-3">
					<v-subheader>Jours récurrents bloqués</v-subheader>
					
					<v-menu offset-y>
					    <v-btn slot="activator" color="primary" flat>Ajouter</v-btn>
					    
					    <v-list>
						    <v-list-tile v-for="item in days" v-if="!selectedCalendar.lockedDays.includes(item)" :key="item" @click="onAddDay(item)">
						    	<v-list-tile-title>{{ item }}</v-list-tile-title>
						    </v-list-tile>
					    </v-list>
					    
    				</v-menu>
					
					<v-card-text>
						<div class="text-xs-center">
							<v-chip v-for="day in selectedCalendar.lockedDays" close>{{ day }}</v-chip>
						</div>
					</v-card-text>
					
				</v-card>
				
				</v-flex>
				
				<v-flex xs4>
      			
      			<!-- Liste des date bloqués -->
      			<v-card>
					<v-subheader>Dates bloqués</v-subheader>
					
					<v-data-iterator :items="selectedCalendar.lockedDates" content-tag="v-list" :content-props="{dense: true}" no-data-text="Aucune date bloquée" column wrap>
					
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
	props: ["accomodationId"],
	created: function () {
		this.selectedCalendar = {
				lockedDays: [],
				lockedDates: [],
		};
	},
	data: function() {
    return {
    	selectedCalendar: null,
		picker : null,
		addForbiddenDate: {
			show: false,
			date: null,
		},
		getAllowedDates: val => !this.selectedCalendar.lockedDates.includes(moment(val).format('DD/MM/YYYY')) && new Date(val) > new Date(),
		days: [
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
			"Dimanche",
		],
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
			this.selectedCalendar.lockedDates.push(moment(this.addForbiddenDate.date).format('DD/MM/YYYY'));
			this.selectedCalendar.lockedDates.sort()
			this.addForbiddenDate.show = false;
		},
		onAddDay(day) {
			this.selectedCalendar.lockedDays.push(day);
		},
		onDeleteDate(date) {
			console.log(date)
			this.selectedCalendar.lockedDates.splice(date);
		},
		onSaveCalendar() {
			//TODO
			//Requête HTTP pour save le calendar
			
			if (typeof this.accomodationId == 'undefined') {
				this.selectedCalendar.global = true;
			} else {
				this.selectedCalendar.global = false;
				this.selectedCalendar.accomodation = this.accomodationId;
			}
			console.log(this.selectedCalendar)
			this.$http.put("calendar", {
				
			}).then(response => {
				if (response.status == 200) {
					this.$store.commit("snackbar", "Calendrier enregistré");
				}
			})
		},
  },
};

</script>

<style scoped scss>
</style>
