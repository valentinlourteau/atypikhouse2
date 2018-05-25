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
			sender: null,
			receiver: null,
			message: "",
		}
	},
	watch: {
		"senderProp" : function(newVal, oldVal) {
			this.sender = newVal;
		},
		"receiverProp" : function(newVal, oldVal) {
			this.receiver = newVal;
		},
	},
	props: {
		showModal: Boolean,
		senderProp: Object,
		receiverProp: Object,
	},
	components: {
		Modal,
	},
	methods: {
		//Envoi d'un message
		onSendMessage() {
			this.$validator.validateAll().then(validate => {
				if (validate) 
					//TODO requête API envoi de message
					this.$emit('close');
					this.$store.commit("snackbar", "Message envoyé");
				})
			},
		},
};
</script>

<style></style>
