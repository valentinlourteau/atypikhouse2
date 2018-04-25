/* Le détail d'une annonce ... */
<template>
<div>

	<v-tabs v-model="activeTab" color="yellow" dark slider-color="black" centered>
		
      <v-tab v-for="tab in tabs" :key="tab.text" ripple>
       <span class="black--text">{{ tab.text }}</span>
      </v-tab>
      
      <!-- Information générales -->
      <v-tab-item>
      </v-tab-item>
      
      <!-- Calendrier -->
      <v-tab-item>
      </v-tab-item>
      
      <!-- Réservations -->
      <v-tab-item>
      </v-tab-item>
      
      <!-- A proximité -->
      <v-tab-item>
      </v-tab-item>
      
    </v-tabs>


</div>
</template>

<script>
import Accomodation from '../../../class/entities/Accomodation';

export default {
	data: function() {
		return {
			accomodation : null,
			activeTab : null,
			tabs: [
				{text : "Information générales"},
				{text : "Calendrier"},
				{text : "Réservations"},
				{text : "A proximité"},
			],
		}
	},
	created: function () {
		this.$http.get("accomodation/" + this.$route.params.accomodationId).then(response => {
			if (response.status == 200)
				this.accomodation = response.body.accomodation;
		});
	},
 	methods: {
	},
};
</script>

<style>
</style>
