<template>

  <modal v-if="showModal" @close="$emit('close')">
  
        <div slot="header" class="left-align">
        <h4>Inscription</h4>
        </div>
        
      <div slot="body">

		 <div class="row">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">email</i>
          <input id="email" v-model="newUser.email" type="email" class="validate" required="required">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">face</i>
          <input id="first_name" v-model="newUser.firstname" type="text" class="validate" required="required">
          <label for="first_name">Prenom</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" v-model="newUser.lastname" type="text" class="validate" required="required">
          <label for="last_name">Nom</label>
        </div>
      </div>
      
      <div class="row">
      <div class="input-field col s12">
            <i class="material-icons prefix">date_range</i>
	      	<input id="birthdate" type="text" class="datepicker" required="required">
	      	<label for="birthdate">Date de naissance</label>
	      	</div>
      </div>
      
      <div class="alert" :class="equalsPasswordSeverity">{{ equalsPasswordSeverity === 'warning' ? 'Les deux mots de passe doivent être égaux' : 'Mot de passe confirmé' }}</div>
      
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">security</i>
          <input v-validate="{ required: true, regex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})' }" name="password1" id="password" v-model="newUser.password" type="password" required="required">
          <label for="password">Mot de passe</label>
          <span v-show="errors.has('password1')" class="help is-danger">{{ errors.first('password1') }}</span>
        </div>
      </div>
      
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">security</i>
          <input v-on:keyup="checkPasswordsAreEquals()" v-validate="{ required: true, regex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})' }" name="password2" id="passwordVerif" v-model="verifPassword" type="password" required="required">
          <label for="passwordVerif">Confirmer le mot de passe</label>
          <span v-show="errors.has('password2')" class="help is-danger">{{ errors.first('password2') }}</span>
        </div>
      </div>
      
  </div>

    	</div>
    
    <div slot="footer" class="right-align">
        <a class="btn-flat waves-effect" href="#" v-on:click="$emit('close')">Annuler</a>
        <a class="btn-flat waves-effect" href="#" v-on:click="queryCreateNewUser()">Valider</a>
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
		showModal: function(newVal, oldVal) {
	    	if (newVal == true) {
	    		this.newUser = new User();
	    		this.$nextTick(function () {
	    			var elem = this.$el.querySelector(".datepicker");
					new M.Datepicker(elem, { 
						format: 'dd/mm/yyyy',
					}, false, this.selectedDate);
	    		})
	    	}
	    	else {
	    		var elem = this.$el.querySelector(".datepicker");

	    		var instance = M.Datepicker.getInstance(elem);
	    		instance.destroy();
	    	}
	    },
    },
	methods: {
		//Permet de vérifier que les mots de passe saisis respectent une sécurité minimale
		checkPasswordsAreEquals() {
			if (this.verifPassword === this.newUser.password) {
				console.log("je change l'icone");
				this.equalsPasswordSeverity = 'success';
			}
			else if (this.verifPassword !== this.newUser.password && this.equalsPasswordSeverity)
				this.equalsPasswordSeverity = 'warning';
		},
		//Permet de créer un nouvel utilisateur
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
					M.toast( { html: 'Bienvenue parmis nous ' + this.newUser.firstname + ' !' } )
					setTimeout(function () {
						M.toast(  { html: 'Ton compte a bien été crée' } );
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
