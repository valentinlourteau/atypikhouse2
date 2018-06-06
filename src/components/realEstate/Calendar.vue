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
      		
      			<v-flex xs12 md6>
      		
      			<!-- Liste des jours bloqués -->
      			<v-card class="mb-3">
					<v-subheader>Jours récurrents bloqués</v-subheader>
					
					<v-menu offset-y>
					    <v-btn slot="activator" color="primary" flat>Ajouter</v-btn>
					    
					    <v-list>
						    <v-list-tile v-for="item in days" v-if="!selectedCalendar.lockedDays.includes(item)" :key="item.iso" @click="onAddDay(item)">
						    	<v-list-tile-title>{{ item.frname }}</v-list-tile-title>
						    </v-list-tile>
					    </v-list>
					    
    				</v-menu>
					
					<v-card-text>
						<div class="text-xs-center">
							<v-chip v-for="day in selectedCalendar.lockedDays" :key="day.iso" @input="onDeleteDay(day)" close>{{ day.frname }}</v-chip>
						</div>
					</v-card-text>
					
				</v-card>
				
				</v-flex>
				
				<v-flex xs12 md6>
      			
      			<!-- Liste des date bloqués -->
      			<v-card>
					<v-subheader>Dates bloqués</v-subheader>
					
					<v-data-iterator :items="selectedCalendar.lockedDates" content-tag="v-list" :content-props="{dense: true}" no-data-text="Aucune date bloquée" column wrap>
					
			            <v-list-tile slot="item" slot-scope="props">
			              <v-list-tile-content>{{ getFormattedDate(props.item) }}</v-list-tile-content>
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
	watch: {
		'accomodationId': function(newVal, oldVal) {
				this.$http.get("calendar/" + this.accomodationId).then(response => {
					if (response.status == 200) {
						this.selectedCalendar = response.body.calendar;
						//traitement des lockedDays, a voir si on remplace en BDD par le format iso
						for (var lockedDay in this.selectedCalendar.lockedDays) {
							this.selectedCalendar.lockedDays[lockedDay] = this.lodash.find(this.days, {'frname' : this.selectedCalendar.lockedDays[lockedDay]});
						}
					}
				})
		}
	},
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
		getAllowedDates: val => !this.lodash.map(this.selectedCalendar.lockedDays, 'iso').includes(moment(val).isoWeekday()) && !this.selectedCalendar.lockedDates.includes(val) && new Date(val) > new Date(),
		days: [
			{frname : "Lundi", iso : 1},
			{frname : "Mardi", iso : 2},
			{frname : "Mercredi", iso : 3},
			{frname : "jeudi", iso : 4},
			{frname : "Vendredi", iso : 5},
			{frname : "Samedi", iso : 6},
			{frname : "Dimanche", iso : 7},
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
			this.selectedCalendar.lockedDates.push(this.addForbiddenDate.date);
			this.selectedCalendar.lockedDates.sort()
			this.addForbiddenDate.show = false;
		},
		onAddDay(day) {
			this.selectedCalendar.lockedDays.push(day);
		},
		onDeleteDate(date) {
			var index = this.selectedCalendar.lockedDates.indexOf(date);
			this.selectedCalendar.lockedDates.splice(index, 1);
		},
		onDeleteDay(day) {
			var index = this.selectedCalendar.lockedDays.indexOf(day);
			this.selectedCalendar.lockedDays.splice(index, 1);
		},
		getFormattedDate(date) {
			return moment(date).format('DD/MM/YYYY');
		},
		onSaveCalendar() {			
			if (typeof this.accomodationId == 'undefined') {
				this.selectedCalendar.global = true;
			} else {
				this.selectedCalendar.accomodation = this.accomodationId;
				this.selectedCalendar.host 
			}
			console.log(this.selectedCalendar)
			this.$http.put("calendar", {
				"lockedDays" : this.lodash.map(this.selectedCalendar.lockedDays, 'frname'),
				"lockedDates" : this.selectedCalendar.lockedDates,
				"accomodation" : this.selectedCalendar.accomodation
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
