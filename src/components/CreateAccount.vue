<template>

  <modal :dialog="showModal" @close="$emit('close')">
  
        <div slot="header" class="left-align">
        <h4>Inscription</h4>
        </div>
        
      <div slot="body">

        <v-text-field v-model="newUser.email" type="email" class="validate" required="required" label="Email" />
      <v-text-field  v-model="newUser.firstname" type="text" class="validate" required="required" label="Prénom"/>
        <v-text-field v-model="newUser.lastname" type="text" class="validate" required="required" label="Nom"/>
      
      <v-text-field
          slot="activator"
          label="Date de naissance"
          v-model="selectedDate"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="selectedDate" no-title scrollable actions></v-date-picker>
      
      <v-alert value="true" color="success">{{ equalsPasswordSeverity === 'warning' ? 'Les deux mots de passe doivent être égaux' : 'Mot de passe confirmé' }}</v-alert>
      
      <v-text-field v-validate="{ required: true, regex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})' }" 
      name="password1" id="password" v-model="newUser.password" type="password" required="required" />
      
      <v-text-field v-on:keyup="checkPasswordsAreEquals()" v-validate="{ required: true, regex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})' }" 
      name="password2" id="passwordVerif" v-model="verifPassword" type="password" required="required" />
      
  </div>

    
    <div slot="footer" class="right-align">
        <v-btn v-on:click="$emit('close')" flat>Annuler</v-btn>
        <v-btn v-on:click="queryCreateNewUser()" flat>Valider</v-btn>
      </div>
  	
 </modal>
</template>

<script>
import Modal from './Modal';
import User from '../class/entities/User';
export default {
	data: function () {
		return {
			isUserTooYoung: false,
			selectedDate: null,
			newUser: new User(),
			verifPassword: "",
			equalsPasswordSeverity: 'warning',
		}
	},
	props: ["showModal"],
	components: {
		Modal,
	},
	watch: { 
    },
	methods: {
		//Permet de v�rifier que les mots de passe saisis respectent une s�curit� minimale
		checkPasswordsAreEquals() {
			if (this.verifPassword === this.newUser.password) {
				console.log("je change l'icone");
				this.equalsPasswordSeverity = 'success';
			}
			else if (this.verifPassword !== this.newUser.password && this.equalsPasswordSeverity)
				this.equalsPasswordSeverity = 'warning';
		},
		//Permet de cr�er un nouvel utilisateur
		queryCreateNewUser() {
			//this.$validator.validateAll();
	        //if (!this.errors.any()) {
			this.$http.post("users", {
				email: this.newUser.email,
				password: this.newUser.password,
				firstname: this.newUser.firstname,
				lastname: this.newUser.lastname,
			}).then(response => {
				if (response.status == 200) {
					console.log("user well created");
					this.$emit("close");
// 					M.toast( { html: 'Bienvenue parmis nous ' + this.newUser.firstname + ' !' } )
					setTimeout(function () {
// 						M.toast(  { html: 'Ton compte a bien �t� cr�e' } );
					}, 2000);
				}
				else
					console.log("a problem happened")
			})
			
	        //}
		},
	},
};
</script>

<style></style>
