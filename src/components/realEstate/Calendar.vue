<template>
	<div>
		 <v-container grid-list-lg>
      	
		<v-layout class="ma-3" row wrap>
		
		<v-flex xs12 md9 class="mb-3">
      		
      				<v-date-picker v-model="picker" color="primary" landscape full-width locale="fr" @input="onSelectCalendarDate($event)"
      				:allowed-dates="getAllowedDates()"></v-date-picker>
      		
      		</v-flex>
      		
      		<v-flex xs3>
      		
      			<v-card>
					<v-subheader>Jours bloqués</v-subheader>
					
					<v-data-iterator :items="selectedCalendar.lockedDays" content-tag="v-list" :content-props="{dense: true}" column wrap>
					
			            <v-list-tile slot="item" slot-scope="props">
			              <v-list-tile-content>{{ props.item }}</v-list-tile-content>
			              <v-spacer></v-spacer>
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
	},
	data: function() {
    return {
    	selectedCalendar: null,
		picker : null,
		addForbiddenDate: {
			show: false,
			date: null,
		},
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
			this.selectedCalendar.lockedDays.push(this.addForbiddenDate.date);
			this.addForbiddenDate.show = false;
		},
		getAllowedDates() {
			var vue = this;
			return function() {
				return val => vue.selectedCalendar.lockedDays.contains(val);
			}
		}
  },
};

</script>

<style scoped>
</style>
