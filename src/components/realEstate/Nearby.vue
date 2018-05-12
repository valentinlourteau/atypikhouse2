<template>
	<div>
	
	<v-layout row wrap>
			
		<v-flex v-for="nearby in nearbyList" :key="nearby._id" xs12 sm4 lg4 xl3 class="pa-2">
		
			<v-card>
			
			</v-card>
		
		</v-flex>
		
	</v-layout>
	
	<v-btn color="primary" @click="onAddNewNearby()" fab fixed right bottom>
		<v-icon color="black">add</v-icon>
	</v-btn>
	
	<v-dialog v-model="showDialogAddNearby" max-width="500px">
		
		<v-card>
			<v-subheader>Ajout d'une activité</v-subheader>
			
			<v-card-text>
				<v-form ref="newNearbyForm">
				
					<v-text-field v-model="nearby.name" label="Nom de l'activité"></v-text-field>
					<v-text-field v-model="nearby.description" label="Description de l'activité" multi-line></v-text-field>
					<v-text-field v-model="nearby.price" label="prix indicatif"></v-text-field>
					<v-text-field v-model="nearby.range" label="Distance du bien"></v-text-field>
					<v-text-field v-model="nearby.phone" label="Numéro"></v-text-field>
					<v-text-field v-model="nearby.website" label="Site web"></v-text-field>
				
				</v-form>
			</v-card-text>
			
			<v-card-actions>
				<v-btn flat @click="showDialogAddNearby = false;">Annuler</v-btn>
				<v-btn flat color="primary" @click="onSaveNearby()">Ajouter</v-btn>
			</v-card-actions>
		</v-card>
		
	</v-dialog>
	
	</div>
</template>

<script type="text/javascript">
import Nearby from '../../class/entities/Nearby'

export default {
	components: {
	},
	props: [],
	created: function () {
	},
	data: function() {
   		return {
   			nearby: new Nearby(),
   			nearbyList: [],
   			showDialogAddNearby: false,
    	}
  	},
  	methods: {
  		onAddNewNearby() {
  			this.showDialogAddNearby = true;
  		},
  		onSaveNearby() {
  			if (this.$refs.newNearbyForm.validate()) {
  	  			this.showDialogAddNearby = false;
  	  			this.nearbyList.push(this.nearby);
  	  			//TODO Appel HTTP pour save un nearby
  			}
  		},
  	},
};

</script>

<style scoped scss>
</style>
