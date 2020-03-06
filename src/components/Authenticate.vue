  
<template>
  <modal :dialog="showModal" @close="$emit('close')">
  
  
       <div slot="header" class="left-align">
        <h4 v-if="isUserAskingANewPassword">Mot de passe oublié</h4>
        <h4 v-else>Connexion</h4>
        </div>
       <div slot="body">
		
       <v-text-field name="email" v-model="user.email" type="email" class="validate" label="Email" data-vv-name="email" :error-messages="errors.collect('email')" v-validate="'required|email'" />

       <v-text-field v-if="!isUserAskingANewPassword" v-model="user.password" label="password" type="password" data-vv-name="password" :error-messages="errors.collect('password')" v-validate="'required'"></v-text-field>
      
      
      	<v-btn v-if="!isUserAskingANewPassword" v-on:click="isUserAskingANewPassword = true" flat>Mot de passe oublié ?</v-btn>
      	<v-btn  v-else v-on:click="isUserAskingANewPassword = false;" flat>Oups, je me rappelle de mon mot de passe !</v-btn>
      	</br>
      	<v-btn  v-if="!isUserAskingANewPassword" v-on:click="onClickCreateAccount()" color="secondary" flat>Créer un compte</v-btn>
    </div>
    
    <div slot="footer" class="right-align">
        <v-btn v-on:click="$emit('close')" flat>Annuler</v-btn>
        <v-btn v-if="isUserAskingANewPassword" color="primary" flat>Demander</v-btn>
        <v-btn v-else v-on:click="onClickQueryAuthenticate()" color="blue" flat >Valider</v-btn>
      </div>-->
  	
 </modal>
</template>

<script type="text/javascript">
import User from '../class/entities/User';
import Modal from './Modal';
import TD from '../class/utils/TokenDecrypter';
export default {
	components: {
		Modal,
	},
	watch: {
		"showModal" : function(newVal, oldVal) {
			console.log("watch")
			if (newVal) {
				this.isUserAskingANewPassword = false;
				this.user = new User();
				this.$validator.reset();
			}
		},
	},
	props: ["showModal"],
	data: function() {
	    return {
	      user: new User(),
	      isUserAskingANewPassword: false,
	    }
  	},
	methods: {
	  //Appel� lorsque l'on tente de s'authentifier
  	onClickQueryAuthenticate() {
		  this.$validator.validate().then(result => {
			  if (result)
			  this.$http.post("auth/login", {
		    		"email": this.user.email,
		    		"password": this.user.password,
		    	}).then(response => {
		    		if (response.status === 200) {
		    			this.$store.commit("onSetToken", response.body.token);
		    			this.$store.commit("onSetUser", new TD(response.body.token).data);
		         		this.$emit("close");
		         		var welcomeMessage = "Bienvenue ";
		         		var user = this.$store.state.user.firstname == null ? "bel inconnu" : this.$store.state.user.firstname;
		    			this.$store.commit("snackbar", welcomeMessage + user);
		    		}
		    		else {
		    		}
		    	});
		  })
    	
	  },
    //Appeler lorsque l'on souhaite reset son password
    onClickQueryNewPassword() {
    	this.$http.put("//METTRE ICI LA ROUTE DE RESET PASSWORD", {headers : { Authorization: "Bearer " + this.$ls.token } }).then(response => {
    		if (response.status == 200)
    			console.log("Not implemented yet")
    	})
    },
    onClickCreateAccount() {
    	this.$emit("close");
    	this.$emit("createAccount");
    },
  },
};
</script>

<style scoped>
</style>