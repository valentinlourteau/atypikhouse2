<template>
  <modal v-if="showModal" @close="$emit('close')">
  
  
        <div slot="header" class="left-align">
        <h4 v-if="isUserAskingANewPassword">Mot de passe oublié</h4>
        <h4 v-else>Connexion</h4>
        </div>
      <div slot="body">

        <div class="row">
          <div class="input-field col s12">
            <input name="email" id="email" v-model="user.email" type="email" class="validate" v-validate="'required|email'">
            <label for="email">Email</label>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
          </div>
        </div>

        <div v-if="!isUserAskingANewPassword" class="row">
        <div class="input-field col s12">
          <input id="password" v-model="user.password" type="password" v-validate="{ required: true }">
          <label for="password">{{ 'password' | translate }}</label>
        </div>
      </div>
      
      <div class="row">
      	<a href="#" v-if="!isUserAskingANewPassword" v-on:click="isUserAskingANewPassword = true">Mot de passe oublié ?</a>
      	<a href="#" v-else v-on:click="isUserAskingANewPassword = false;">Oups, je me rappelle de mon mot de passe !</a>
      	</br>
      	<a href="#" v-if="!isUserAskingANewPassword" v-on:click="onClickCreateAccount()">Créer un compte</a>
      </div>
    </div>
    
    <div slot="footer" class="right-align">
        <a class="btn-flat waves-effect" href="#" v-on:click="$emit('close')">Annuler</a>
        <a class="btn-flat waves-effect" href="#" v-if="isUserAskingANewPassword">Demander</a>
        <a class="btn-flat waves-effect" href="#"  v-on:click="onClickQueryAuthenticate()" v-else>Valider</a>
      </div>
  	
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
    	this.$http.post("auth/login", {
    		"email": this.user.email,
    		"password": this.user.password,
    	}).then(response => {
    		if (response.status === 200) {
    			this.$store.commit("onSetToken", response.body.token);
    			this.$store.commit("onSetUser", new TD(response.body.token).data);
         		this.$emit("close");
    			M.toast({html: 'Vous êtes bien connecté'});
    		}
    		else {
    		}
    	}, response => {
    		
   	});
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
.is-danger {
	font-size:smaller;
	color: red;
}
.invalid {
	margin-bottom:0 !important;
}
</style>
