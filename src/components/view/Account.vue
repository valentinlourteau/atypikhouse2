<template>
<div>


	<v-tabs
      v-model="active"
      color="yellow"
      dark
      slider-color="black"
      centered
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.text"
        ripple
      >
       <span class="black--text">{{ tab.text }}</span>
      </v-tab>
      
      <v-tab-item
        v-for="tab in tabs"
        :key="tab.text"
      >
      
      <v-container>
          
        <v-card flat>
          <v-card-text>{{ tab.text }}</v-card-text>
        </v-card>  
        
      </v-container>
        
      </v-tab-item>
      
    </v-tabs>

</div>
</template>

<script>
import User from '../../class/entities/User';

export default {
	data: function() {
		return {
			user: Object.assign({}, this.$store.state.user),
			active: null,
			tabs: [
				{text : "Informations personnelles"},
				{text : "Entreprise"},
				{text : "Modes de payements"},
			],
		}
	},
	methods: {
		resetProfilChanges() {
			this.user = this.$store.state.user;
			console.log(this.$store.state.user);
		}
	}
};
</script>

<style scoped>
</style>
