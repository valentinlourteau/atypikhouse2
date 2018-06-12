<template>

  <modal :dialog="showModal" @close="$emit('close')">
  
        <div slot="header" class="left-align">
        	<h4>Contact</h4>
        </div>
        
        <div slot="body">

			<v-text-field v-model="message" label="Message" :counter="300" data-vv-name="message" data-vv-validate="message" v-validate="'required|max:300'"
			:error-messages="errors.collect('message')" required multi-line></v-text-field>
       
  		</div>
    
    <div slot="footer" class="right-align">
        <v-btn v-on:click="$emit('close')" flat>Annuler</v-btn>
        <v-btn v-on:click="onSendMessage()" color="secondary" flat>Envoyer</v-btn>
      </div>
  	
 </modal>
</template>

<script>
import Modal from './Modal';

export default {
	data: function () {
		return {
			sender: this.$store.state.user.id,
			message: "",
		}
	},
	props: ["showModal", "receiverProp"],
	components: {
		Modal,
	},
	methods: {
		//Envoi d'un message
		onSendMessage() {
			var vue = this;
			this.$validator.validateAll().then(validate => {
				if (validate) 
					vue.$http.post("message", {
						sender: vue.sender,
						receiver: vue.receiverProp,
						message: vue.message
					}).then(response => {
						if (response.status == 200) {
							vue.$store.commit("snackbar", "Message envoyé");
						}
					})
					this.$emit('close');
				})
			},
		},
};
</script>

<style></style>
