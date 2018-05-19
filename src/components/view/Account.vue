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
      
      <v-tab-item>
      
       <v-container fluid>
      <v-card>
      <v-card-text>
    <v-layout row wrap>
    
      <v-flex xs12>
        <v-text-field
          v-model="user.lastname"
          name="input-1"
          label="Mon nom"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="user.firstname"
          name="input-1"
          label="Mon prenom"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="user.email"
          name="input-1"
          label="Adresse mail"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="password"
          :append-icon="viewPassword ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (viewPassword = !viewPassword)"
          :type="viewPassword ? 'password' : 'text'"
          name="input-10-1"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          counter
        ></v-text-field>
      </v-flex>
    </v-layout>
    </v-card-text>
    
    <v-card-actions>
    <v-btn  flat>Modifier</v-btn>
    <v-btn @click="onUpdateUser()" color="secondary" flat>Enregistrer</v-btn>
    </v-card-actions>
    
    </v-card>
    </v-container>
    <v-layout align-center>
    <v-flex xs12 sm1 text-xs-center>
      <div>
        
      </div>
      </v-flex>
        <v-flex xs12 sm1 text-xs-center>
      <div>
        
      </div>
      </v-flex>
      </v-layout>
        
      </v-tab-item>
      
    </v-tabs>

     
</div>
</template>

<script>
import User from '../../class/entities/User';
import ReadWriteField from '../utility/ReadWriteField';

export default {
	components: {
		ReadWriteField,
	},
	data: function() {
		return {
			user: Object.assign({}, this.$store.state.user),
			active: null,
			viewPassword : false,
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
		},
		onUpdateUser() {
			this.$http.put("users", this.user).then(response => {
				if (response.status == 200)
					console.log("premier");
				this.$store.commit("snackbar", "Modifications effectuées");
			})
			console.log("deuxieme");
		},
	}
	
};
</script>

<style scoped>
</style>
