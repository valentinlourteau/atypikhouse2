<template>
	<div>
		<v-alert class="ma-3" :value="true" type="info">Vous pouvez renseigner ici les activités à proximité de votre bien, elles permettront aux voyageurs de se projetter dans votre bien. Ajouter des informations précises et les maintenir à jour est un gage de sérieux pour le voyageur. N'hésitez pas à y mettre vos meilleurs clichés et pourquoi pas une petite anecdote !</v-alert>
		<v-alert class="ma-3" :value="nearbyList.filter(nearby => nearby.oldInformations).length > 0" type="warning">Une ou plusieurs activités à proximité n'ont pas été mises à jours depuis longtemps !</v-alert>
		<v-layout row wrap class="mx-2">
			<v-flex v-for="nearby in nearbyList" :key="nearby._id" xs12 sm4 lg3 xl3 class="pa-2">
				<v-card>
					<v-card-media :src="nearby.images[0] == null ? '/static/images/no_bkg_state.svg' : nearby.images[0].data" height="200px"></v-card-media>
					<v-card-title primary-title>
						<div>
							<div class="headline">{{ nearby.name }}</div>
							<span :class="nearby.oldInformations ? 'orange--text' : 'grey--text'">Mis à jour le : {{ getFormattedDate(nearby.majDate) }}</span>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-btn :color="nearby.oldInformations ? 'orange' : 'secondary'" @click="onEditNearby(nearby)" flat>
							<span style="order:2" :class="nearby.oldInformations ? 'orange--text' : ''">METTRE A JOUR</span>
							<v-icon v-if="nearby.oldInformations" style="order:1" class="mr-2 orange--text">warning</v-icon>
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn @click="onDeleteNearby(nearby)" icon>
							<v-icon>delete</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
		<v-btn color="primary" @click="onAddNewNearby()" fab fixed right bottom>
			<v-icon color="black">add</v-icon>
		</v-btn>
		<v-dialog v-model="showDialogAddNearby" max-width="500px" persistent>
			<v-card>
				<form @submit.prevent="handleSubmit">
					<v-subheader>Activité</v-subheader>
					<v-card-text>
						<v-text-field v-model="nearby.name" v-validate="'required'" :error-messages="errors.collect('name')" data-vv-name="name" label="Nom de l'activité" required></v-text-field>
						<v-text-field v-model="nearby.description" v-validate="'required'" :error-messages="errors.collect('description')" data-vv-name="description" label="Description de l'activité" multi-line required></v-text-field>
						<v-text-field v-model="nearby.price" label="prix indicatif"></v-text-field>
						<v-text-field v-model="nearby.distance" label="Distance depuis le bien"></v-text-field>
						<v-text-field v-model="nearby.phone" label="Numéro"></v-text-field>
						<v-text-field v-model="nearby.website" label="Site web"></v-text-field>
						<file-upload accept="image/*" @formData="onChooseImg($event)"></file-upload>
						<!-- TODO A ENLEVER A LA FIN CAR CEST UNE VALEUR GEREE PAR L'OUTIL -->
<!-- 						<v-text-field v-model="nearby.majDate" label="Date de mise à jour"></v-text-field> -->

					</v-card-text>

					<v-card-actions>
						<v-btn flat @click="showDialogAddNearby = false;">Annuler</v-btn>
						<v-btn flat color="primary" @click="onSaveNearby()">Valider</v-btn>
					</v-card-actions>
				</form>
			</v-card>
		</v-dialog>
	</div>
</template>
<script type="text/javascript">
	import Nearby from "../../class/entities/Nearby";
	import FileUpload from "../utility/FileUpload";
	import moment from "moment";
	export default {
	  components: {
	    FileUpload
	  },
	  props: ["accomodationId"],
	  data: function() {
	    return {
	      nearby: new Nearby(),
	      nearbyList: [],
	      showDialogAddNearby: false
	    };
	  },
	  watch: {
	    accomodationId: function(newVal, oldVal) {
	      var vue = this;
	      this.$http.get("activity/" + newVal).then(response => {
	        if (response.status == 200) {
	          vue.nearbyList = response.body.activities;
	          for (var nearby in vue.nearbyList) {
	            vue.nearbyList[nearby].oldInformations = vue.areInformationOlds(
	              vue.nearbyList[nearby]
	            );
	          }
	        }
	      });
	    }
	  },
	  methods: {
	    onAddNewNearby() {
	      this.showDialogAddNearby = true;
	      this.nearby = new Nearby();
	    },
	    onSaveNearby() {
	      this.$validator.validateAll().then(result => {
	        //TODO A REMETTRE
	        //this.nearby.majDate = new Date();
	        this.nearby.accomodation = this.accomodationId;
	        if (result) {
	          if (this.nearby._id == null) {
	            this.$http.post("activity", this.nearby).then(response => {
	              if (response.status == 200) {
	                this.$store.commit("snackbar", "Modifications enregistrées");
	                response.body.activity.oldInformations = this.areInformationOlds(
	                  response.body.activity
	                );
	                console.log(response.body.activity);
	                this.nearbyList.push(response.body.activity);
	              }
	            });
	          } else {
	            this.$http
	              .put("activity/" + this.nearby._id, this.nearby)
	              .then(response => {
	                if (response.status == 200) {
	                  this.nearby = response.body.activity;
	                  this.nearby.oldInformations = this.areInformationOlds(
	                    this.nearby
	                  );
	                  this.$store.commit("snackbar", "Modifications enregistrées");
	                }
	              });
	          }
	          this.showDialogAddNearby = false;
	        }
	      });
	    },
	    areInformationOlds(nearby) {
	      var infoDate = moment(nearby.majDate);
	      var today = moment(new Date());
	      console.log(today.diff(infoDate, "days"));
	      return today.diff(infoDate, "days") > 180 ? true : false;
	    },
	    getFormattedDate(date) {
	      return moment(date).format("DD/MM/YYYY");
	    },
	    onEditNearby(nearby) {
	      this.nearby = nearby;
	      this.showDialogAddNearby = true;
	    },
	    onDeleteNearby(nearby) {
	      this.$http.delete("activity/" + nearby._id).then(response => {
	        if (response.status == 200) {
	          this.$store.commit("snackbar", "Activité supprimée");
	          this.nearbyList.splice(nearby);
	        }
	      });
	      //TODO Appel HTTP DELETE
	    },
	    onChooseImg(files) {
	      var reader = new FileReader();
	      //on fait une variable tampon pour pouvoir l'utiliser dans le onload
	      //car je n'arrive pas à utiliser directement la variable de data dans la callback
	      var accomodRef = this.nearby.images;
	      reader.onload = function(e) {
	        let isMain = false;
	        let imgName = files.get("data").name;
	        //si l'image est la première alors isMain = true;
	        if (accomodRef.length == 0) isMain = true;
	        accomodRef.push({
	          fileName: imgName,
	          data: e.target.result,
	          isMain: isMain
	        });
	      };
	      reader.readAsDataURL(files.get("data"));
	    }
	  }
	};
</script>
<style scoped scss>
</style>