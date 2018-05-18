<template>

  <modal :dialog="showModal" @close="$emit('close')">
  
        <div slot="header" class="left-align">
        <h4>Inscription</h4>
        </div>
        
      <div slot="body">

        <v-text-field v-model="newUser.email" type="email" class="validate" required="required" label="Email" />
      <v-text-field  v-model="newUser.firstname" type="text" class="validate" required="required" label="Prénom"/>
        <v-text-field v-model="newUser.lastname" type="text" class="validate" required="required" label="Nom"/>
      
      <v-alert :value="true" :type="equalsPasswordSeverity.type">{{ equalsPasswordSeverity.message }}</v-alert>
      
      <v-text-field label="Mot de passe" v-validate="{ required: true, regex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})' }" 
      name="password1" id="password" v-model="newUser.password" type="password" required="required" />
      
      <v-text-field label="Mot de passe : confirmation" v-on:keyup="checkPasswordsAreEquals()" v-validate="{ required: true, regex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})' }" 
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
import TD from '../class/utils/TokenDecrypter';

export default {
	data: function () {
		return {
			isUserTooYoung: false,
			selectedDate: null,
			newUser: new User(),
			verifPassword: "",
			equalsPasswordSeverity: {
				type: 'info',
				message: 'Veuillez valider le mot de passe',
			},
		}
	},
	props: ["showModal"],
	components: {
		Modal,
	},
	watch: { 
		"showModal": function(newVal, oldVal) {
			if (newVal) {
				this.isUserTooYoung = false;
				this.selectedDate = null;
				this.newUser = new User();
				this.verifPassword = "";
				this.equalsPasswordSeverity.type = 'info';
				this.equalsPasswordSeverity.message = 'Veuillez valider le mot de passe';
			}
		},
    },
	methods: {
		//Permet de vérifier que les mots de passe saisis respectent une sécurité minimale
		checkPasswordsAreEquals() {
			if (this.verifPassword === this.newUser.password) {
				this.equalsPasswordSeverity.message = 'Mot de passe confirmé';
				this.equalsPasswordSeverity.type = 'success';
			}
			else if (this.verifPassword !== this.newUser.password && this.equalsPasswordSeverity) {
				this.equalsPasswordSeverity.type = 'warning';
				this.equalsPasswordSeverity.message = 'Les deux mots de passe doivent être égaux';
			}
		},
		//Permet de créer un nouvel utilisateur
		queryCreateNewUser() {
	        	var vue = this;
	        	
			this.$http.post("users", {
				email: vue.newUser.email,
				password: vue.newUser.password,
				firstname: vue.newUser.firstname,
				lastname: vue.newUser.lastname,
			}).then(response => {
				if (response.status == 200) {
					console.log("user well created");
					this.$emit("close");
					this.$store.commit("snackbar", "Compte créé !")
					setTimeout(function () {

						vue.$http.post("auth/login", {
				    		"email": vue.newUser.email,
				    		"password": vue.newUser.password,
				    	}).then(response => {
				    		if (response.status === 200) {
				    			vue.$store.commit("onSetToken", response.body.token);
				    			vue.$store.commit("onSetUser", new TD(response.body.token).data);
				    			vue.$emit("close");
				         		var welcomeMessage = "Bienvenue ";
				         		var user = vue.$store.state.user.firstname == null ? "bel inconnu" : vue.$store.state.user.firstname;
				         		vue.$store.commit("snackbar", welcomeMessage + user);
				    		}
				    		else {
				    		}
				    	});
						
					}, 1500);
				}
			})
			
	        //}
		},
	},
};
</script>

<style></style>
