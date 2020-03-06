/* Le détail d'une annonce ... */
<template>
	<div>
		<v-tabs v-model="activeTab" color="yellow" dark slider-color="black" centered @input="onChangeTab($event)">
			<v-tab v-for="tab in tabs" :key="tab.text" ripple>
				<span class="black--text">{{ tab.text }}</span>
			</v-tab>
			<!-- Information générales -->
			<v-tab-item>
				<v-container>
					<v-layout row wrap>
						<v-flex xs12 sm8 offset-sm2>
							<v-card class="mb-4">
								<v-form ref="generalInformationsForm">
									<v-card-title>
										<v-subheader>Informations générales</v-subheader>
									</v-card-title>
									<v-card-text>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.name" label="Nom" :rules="[v => !!v || 'Le nom est requis',
	      	v => v.length < 20 || 'Le nom doit être inférieur à 20 caractères']"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.description" label="Description" :rules="[v => !!v || 'La description est requise']"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.type" label="Type de bien"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.priceNight" label="Prix à la nuit" :rules="[v => !!v || 'Le prix à la nuit est requis']"></read-write-field>
										<label class="label"></label>

										<v-divider></v-divider>

										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.guests" label="Capacité d'accueil"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.bedrooms" label="Nombre de chambres à coucher"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.beds" label="Nombre de lits"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.bathrooms" label="Nombre de salles de bain"></read-write-field>
										<v-divider></v-divider>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.durationmin" label="Nombre de jours minimum"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.durationmax" label="Nombre de jours maximum"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.arrival" label="Heure d'arrivée maximale"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.departure" label="Heure de départ maximale"></read-write-field>

										<v-divider></v-divider>

										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.city" label="Ville"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.zipcode" label="Code postal"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.street" label="Rue"></read-write-field>
										<read-write-field :read="generalInformationsReadMode" v-model="accomodation.apartment" label="Appartement"></read-write-field>

										<v-divider></v-divider>

									</v-card-text>

									<v-card-actions>
										<v-btn v-if="generalInformationsReadMode" class="black--text" @click="generalInformationsReadMode = false" flat>Editer</v-btn>
										<v-btn v-if="generalInformationsReadMode" class="black--text" @click="$router.push('/realEstate/new/' + accomodation._id)" flat>Editer</v-btn>
										<v-btn v-if="!generalInformationsReadMode" class="black--text" @click="onCancelGeneralInformations()" flat>Annuler</v-btn>
										<v-btn v-if="!generalInformationsReadMode" class="black--text" @click="onSaveGeneralInformations()" color="blue" flat>Enregistrer</v-btn>
									</v-card-actions>
								</v-form>
							</v-card>
							<v-card>
								<v-subheader>Photos</v-subheader>
								<!-- LISTE DES PHOTOS -->
								<v-layout row wrap>
									<v-flex xs12 lg6 xl4 v-for="picture in accomodation.images" :key="picture.fileName">
										<v-card class="ma-3">
											<v-card-media :src="picture.data" height="200px"></v-card-media>
											<v-card-actions class="blue">
												<div class="cut-text white--text">{{picture.fileName}}</div>
												<v-spacer></v-spacer>
												<v-btn @click="onSetPictureIsMain(picture)" icon>
													<v-icon :color="picture.isMain ? 'yellow' : 'white'">star</v-icon>
												</v-btn>
												<v-btn @click="onDeleteImg(picture)" icon>
													<v-icon color="white">delete</v-icon>
												</v-btn>
											</v-card-actions>
										</v-card>
									</v-flex>
								</v-layout>
								<file-upload accept="image/*" @formData="onChooseImg($event)"></file-upload>
								<v-card-actions>
									<v-btn class="black--text" @click="onSavePhotos()" color="blue" flat>Enregistrer</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-tab-item>
			<!-- Calendrier -->
			<v-tab-item>
				<calendar :accomodationId="accomodation._id" />
			</v-tab-item>
			<!-- Réservations -->
			<v-tab-item>
				<reservations :accomodationId="accomodation._id" />
			</v-tab-item>
			<!-- A proximité -->
			<v-tab-item>
				<nearby :accomodationId="accomodation._id" />
			</v-tab-item>
		</v-tabs>
	</div>
</template>
<script>
	import Calendar from "../../realEstate/Calendar";
	import Nearby from "../../realEstate/Nearby";
	import Accomodation from "../../../class/entities/Accomodation";
	import ReadWriteField from "../../utility/ReadWriteField";
	import FileUpload from "../../utility/FileUpload";
	import Reservations from "../../realEstate/Reservations";
	export default {
	  components: {
	    ReadWriteField,
	    FileUpload,
	    Calendar,
	    Nearby,
	    Reservations
	  },
	  data: function() {
	    return {
	      generalInformationsReadMode: true,
	      accomodation: new Accomodation(),
	      initialAccomodation: null,
	      activeTab: null,
	      tabs: [
	        { text: "Information générales" },
	        { text: "Calendrier" },
	        { text: "Réservations" },
	        { text: "A proximité" }
	      ]
	    };
	  },
	  created: function() {
	    this.activeTab = this.$route.query.tab;
	    this.$http
	      .get("accomodation/" + this.$route.query.accomodationId)
	      .then(response => {
	        if (response.status == 200) {
	          this.accomodation = response.body.accomodation;
	          this.initialAccomodation = Object.assign(
	            {},
	            response.body.accomodation
	          );
	        }
	      });
	  },
	  methods: {
	    onSaveGeneralInformations() {
	      var comp = null;
	      comp = this.$refs.generalInformationsForm;
	      if (this.$refs.generalInformationsForm.validate()) {
	        this.$http
	          .put("accomodation/" + this.accomodation._id, this.accomodation)
	          .then(response => {
	            if (response.status == 200) {
	              this.$store.commit("snackbar", "Modifications enregistrées");
	            }
	          });
	        this.generalInformationsReadMode = true;
	      } else {
	        this.$store.commit("snackbar", "Erreurs de validation");
	      }
	    },
	    onCancelGeneralInformations() {
	      generalInformationsReadMode = true;
	      accomodation = Object.assign({}, initialAccomodation);
	    },
	    onSavePhotos() {
	      if (this.$refs.generalInformationsForm.validate()) {
	        this.$http
	          .put("accomodation/" + this.accomodation._id, this.accomodation)
	          .then(response => {
	            if (response.status == 200) {
	              this.$store.commit("snackbar", "Modifications enregistrées");
	            }
	          });
	      }
	    },
	    onDeleteImg(picture) {
	      this.accomodation.images.splice(
	        this.accomodation.images.indexOf(picture),
	        1
	      );
	    },
	    onSetPictureIsMain(picture) {
	      for (let picture of this.accomodation.images) {
	        picture.isMain = false;
	      }
	      picture.isMain = true;
	    },
	    onChooseImg(files) {
	      var reader = new FileReader();
	      //on fait une variable tampon pour pouvoir l'utiliser dans le onload
	      //car je n'arrive pas à utiliser directement la variable de data dans la callback
	      var accomodRef = this.accomodation.images;
	      reader.onload = function(e) {
	        let isMain = false;
	        let imgName = files.get("data").name;
	        console.log(imgName);
	        //si l'image est la première alors isMain = true;
	        if (accomodRef.length == 0) isMain = true;
	        accomodRef.push({
	          fileName: imgName,
	          data: e.target.result,
	          isMain: isMain
	        });
	      };
	      reader.readAsDataURL(files.get("data"));
	    },
	    onChangeTab(event) {
	      if (this.accomodation._id != null)
	        this.$router.push({
	          path: "/realEstate/detail",
	          query: { accomodationId: this.accomodation._id, tab: event }
	        });
	    }
	  }
	};
</script>
<style scoped>
	.date-picker-title__year .picker__title__btn {
	  color: black !important;
	  font-size: 40px !important;
	}
</style>