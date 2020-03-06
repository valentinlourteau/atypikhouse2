/* La page de création d'un nouveau bien ... */
<template>
	<div>
		<div class="container">
			<v-stepper ref="test" v-model="accomodation.currentStep">

				<v-stepper-header>
					<v-stepper-step step="1" :complete="maxStep > 0" editable>{{$t('accomodation.stepper.step.1')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2" :complete="maxStep > 1" editable>{{$t('accomodation.stepper.step.2')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="3" :complete="maxStep > 2" editable>{{$t('accomodation.stepper.step.3')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="4" :complete="maxStep > 3" editable>{{$t('accomodation.stepper.step.4')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="5" :complete="maxStep > 4" editable>{{$t('accomodation.stepper.step.5')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="6" :complete="maxStep > 5" editable>{{$t('accomodation.stepper.step.6')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="7" :complete="maxStep > 6" editable>{{$t('accomodation.stepper.step.7')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="8" :complete="maxStep > 7" editable>{{$t('accomodation.stepper.step.8')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="9" :complete="maxStep > 8">{{$t('accomodation.stepper.step.9')}}</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="10" :complete="maxStep > 9" editable>{{$t('accomodation.stepper.step.10')}}</v-stepper-step>
				</v-stepper-header>

				<v-stepper-items>
					<v-stepper-content step="1">
						<h1 class="display-2">Bienvenue sur la création d'un bien atypique.</h1>
						<h2 class="display-1">Vous allez contribuer à l'enrichissement de notre offre, nous vous en remercions.</h2>
						<v-divider></v-divider>
						<p>Nous sommes fier de vous permettre de promouvoir notre passion pour la découverte, le voyage, et nous pensons que les logements atypiques contribuent à ces valeurs. Nous vous assisterons tout au long du processus de création de votre bien sur le site. Et vous apporterons, nous l'ésperons, toutes les précisions nécessaires pour mener à bien le processus de création.
						</p>
						<p>Pour votre confort, nous enregistrons automatiquement votre annonce au fur et à mesure que vous complétez les étapes, de sorte à pouvoir reprendre la saisie si vous ne pouvez pas tout faire en une fois.</p>
						<p>Voila, vous savez tous ! On commence ?</p>
						<v-btn color="primary" @click.native="changeIndex(2);">Continuerr</v-btn>
					</v-stepper-content>
					<v-stepper-content step="2">
						<gmaps ref="gmaps" @onChooseAddress="onPickAdress($event)" validator="required"></gmaps>
						</br>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(3)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="3">
						Bien
						<v-layout row wrap>
							<v-flex v-for="room in listOfRoomsMode" :key="room.value" xs4>
								<v-checkbox v-model="accomodation.room" :label="$t(room.code)" :value="room.value"></v-checkbox>
							</v-flex>
						</v-layout>
						<!-- Type de bien -->
						Type de bien
						<v-layout row wrap>
							<v-flex v-for="type in listOfAccomodationTypes" :key="type._id" xs4>
								<v-checkbox v-model="accomodation.type" :label="type.frname" :value="type._id"></v-checkbox>
							</v-flex>
						</v-layout>
						<v-form ref="step3">
							<v-layout row wrap>
								<!-- Capacité d'accueil -->
								<v-flex xs12>
									<v-subheader>Capacité d'accueil</v-subheader>
								</v-flex>
								<v-flex xs9>
									<v-slider v-model="accomodation.guests" min="1" max="20"></v-slider>
								</v-flex>
								<v-flex xs3>
									<v-text-field v-model="accomodation.guests" type="number" :rules="accueilRules"></v-text-field>
								</v-flex>
								<!-- Nombre de lits -->
								<v-flex xs12>
									<v-subheader>Nombre de couchages (un fauteuil une place, ça ne compte pas !)</v-subheader>
								</v-flex>
								<v-flex xs9>
									<v-slider v-model="accomodation.beds" min="1" max="20" xs9></v-slider>
								</v-flex>
								<v-flex xs3>
									<v-text-field v-model="accomodation.beds" type="number" :rules="accueilRules"></v-text-field>
								</v-flex>
								<!-- Nombre de chambres -->
								<v-flex xs12>
									<v-subheader>Nombre de chambres</v-subheader>
								</v-flex>
								<v-flex xs9>
									<v-slider v-model="accomodation.bedrooms" min="1" max="20" xs9></v-slider>
								</v-flex>
								<v-flex xs3>
									<v-text-field v-model="accomodation.bedrooms" type="number" :rules="accueilRules"></v-text-field>
								</v-flex>
								<!-- Nombre de salles de bains -->
								<v-flex xs12>
									<v-subheader>Nombre de salles de bains</v-subheader>
								</v-flex>
								<v-flex xs9>
									<v-slider v-model="accomodation.bathrooms" min="1" max="20" xs9></v-slider>
								</v-flex>
								<v-flex xs3>
									<v-text-field v-model="accomodation.bathrooms" type="number" :rules="accueilRules"></v-text-field>
								</v-flex>
							</v-layout>
						</v-form>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(4)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="4">
						EQUIPEMENTS
						<v-layout row wrap>
							<v-flex v-for="equipment in listOfEquipments" :key="equipment._id" xs4>
								<v-checkbox v-model="accomodation.equipments" :label="equipment.frname" :value="equipment._id"></v-checkbox>
							</v-flex>
						</v-layout>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(5)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="5">
						ESPACES ACCESSIBLES
						<v-layout row wrap>
							<v-flex v-for="space in listOfAvailableSpaces" :key="space._id" xs4>
								<v-checkbox v-model="accomodation.spaces" :label="space.frname" :value="space._id"></v-checkbox>
							</v-flex>
						</v-layout>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(6)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="6">
						<v-jumbotron height="400px">
							<v-container fill-height>
								<v-layout align-center>
									<v-flex>
										<h3 class="display-3">Votre bien mérite les plus belles photos</h3>
										<span class="subheading">Vous allez pouvoir ajouter ici les photos qui vont rendre votre bien unique, nous en sommes persuadé. N'hésitez pas à prendre des photos de jour, mettant votre bien en valeur. La popularité qu'aura votre bien en dépend largement.</span>
										<v-divider class="my-3"></v-divider>
										<div class="title mb-3 black--text" style="text-shadow:none;">Vendez leur du rêve !</div>
										<file-upload accept="image/*" @formData="onChooseImg($event)"></file-upload>
									</v-flex>
								</v-layout>
							</v-container>
						</v-jumbotron>
						<!-- LISTE DES PHOTOS -->
						<v-layout row wrap>
							<v-flex xs6 lg4 xl3 v-for="picture in accomodation.images" :key="picture.fileName">
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
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(7)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="7">
						<v-form ref="step7">
							<div>
								<v-text-field v-model="accomodation.name" label="Titre de l'annonce" :rules="[v => !!v || 'Le nom est requis']" counter></v-text-field>
								<v-text-field v-model="accomodation.description" label="Description" :rules="[v => !!v || 'La description est requise']" multi-line counter></v-text-field>
								<v-layout row wrap>
									<v-flex xs9>
										<v-slider :min="1" :max="1000" v-model="accomodation.priceNight" label="Prix par nuit en €"></v-slider>
									</v-flex>
									<v-flex xs3>
										<v-text-field v-model="accomodation.priceNight" type="number"></v-text-field>
									</v-flex>
								</v-layout>
							</div>
						</v-form>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(8)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="8">
						<v-subheader>Règlement</v-subheader>
						<v-layout row wrap>
							<v-flex v-for="rule in listOfAvailableRules" :key="rule._id" xs4>
								<v-checkbox v-model="accomodation.requirements" :label="rule.frname" :value="rule._id"></v-checkbox>
							</v-flex>
						</v-layout>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click.native="changeIndex(9)">Continuer</v-btn>
					</v-stepper-content>
					<v-stepper-content step="9">

						<v-form ref="step9">
							<v-layout row wrap>

								<v-subheader>Renseignements supplémentaires</v-subheader>

								<!-- Les différentes features que l'on peut ajouter -->
								<v-flex v-for="feature in listOfAvailableFeatures" :key="feature._id" xs12>
									<v-text-field v-model="feature.value" :label="feature.name" :prepend-icon="feature.icon" :type="feature.type == 'string' ? 'text' : 'number'"></v-text-field>
								</v-flex>

							</v-layout>
						</v-form>

						<br/>

						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click="changeIndex(10)">Continuer</v-btn>

					</v-stepper-content>

					<v-stepper-content step="10">

						<v-form ref="step10">
							<v-layout row wrap>

								<!-- Durée minimale de séjour -->
								<v-flex xs12>
									<v-subheader>Durée minimale de séjour (jours)</v-subheader>
								</v-flex>
								<v-flex xs9>
									<v-slider v-model="accomodation.durationmin" min="1" max="360" xs9></v-slider>
								</v-flex>
								<v-flex xs3>
								<v-text-field v-model="accomodation.durationmin" type="number" :rules="[v => v >= 1 && v <= 360 || 'Veuillez saisir une valeur comprise entre 1 et 360']"></v-text-field>
								</v-flex>
								<!-- Durée maximale de séjour -->
								<v-flex xs12>
									<v-subheader>Durée maximale de séjour (jours)</v-subheader>
								</v-flex>
								<v-flex xs9>
									<v-slider v-model="accomodation.durationmax" min="1" max="360" xs9></v-slider>
								</v-flex>
								<v-flex xs3>
								<v-text-field v-model="accomodation.durationmax" type="number" :rules="[v => v >= 1 && v <= 360 || 'Veuillez saisir une valeur comprise entre 1 et 360']"></v-text-field>
								</v-flex>
								<!-- Heure d'arrivée -->
								<v-flex xs12 md6 lg6>
									<v-subheader>Heure limite d'arrivée</v-subheader>
									<v-time-picker format="24hr" v-model="accomodation.arrival"></v-time-picker>
								</v-flex>

								<!-- Heure de départ -->
								<v-flex xs12 md6>
									<v-subheader>Heure limite de départ</v-subheader>
									<v-time-picker format="24hr" v-model="accomodation.departure"></v-time-picker>
								</v-flex>

							</v-layout>
						</v-form>
						<br/>
						<v-btn @click.native="onGoPrevious()" flat>Précédent</v-btn>
						<v-btn color="primary" @click="onValidate()">Valider</v-btn>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</div>
	</div>
</template>
<script>
	import GoogleMapsLoader from "google-maps";
	import Accomodation from "../../../class/entities/Accomodation";
	import FileUpload from "../../utility/FileUpload";
	import Gmaps from "../../utility/Gmaps";
	import ListService from "../../../class/services/ListService";
	export default {
	  components: {
	    FileUpload,
	    Gmaps
	  },
	  created: function() {
	    var vue = this;
	    this.accomodation.currentStep = 1;
	    if (this.$route.params.accomodationId != null) {
	      this.$http
	        .get("accomodation/light/" + this.$route.params.accomodationId)
	        .then(response => {
	          if (response.status == 200) {
	            //on delay car si le premier bloc du stepper n'a pas eu le temps de s'afficher alors le stepper ne voudra pas changer
	            setTimeout(function() {
	              vue.accomodation = response.body.accomodation;
	              vue.maxStep = vue.accomodation.currentStep;
	            }, 2000);
	          }
	        });
	    }
	    //Chargement des combo
	    ListService.fetchList("accomodationTypes", this.listOfAccomodationTypes);
	    ListService.fetchList("accomodationEquipements", this.listOfEquipments);
	    ListService.fetchList(
	      "accomodationAvailableSpaces",
	      this.listOfAvailableSpaces
	    );
	    ListService.fetchList("accomodationRules", this.listOfAvailableRules);
	  },
	  data: function() {
	    return {
	      loading: false,
	      search: null,
	      select: "",
	      accomodation: new Accomodation(),
	      maxStep: 1,
	      listOfRoomsMode: [
	        { code: "acomodation.room.mode.full", value: "full" },
	        { code: "acomodation.room.mode.room", value: "room" }
	      ],
	      listOfAccomodationTypes: [],
	      listOfEquipments: [],
	      listOfAvailableSpaces: [],
	      listOfAvailableRules: [],
	      listOfAvailableFeatures: [],
	      accueilRules: [
	        v => !!v || "l'item est requis",
	        v => (v <= 20 && v > 0) || "Dois être compris entre 0 et 20"
	      ]
	    };
	  },
	  methods: {
	    onValidate() {
	      var comp = null;
	      comp = this.$refs["step" + this.accomodation.currentStep];
	      if (comp == null || comp.validate()) {
	        var vue = this;
	        this.accomodation.complete = true;
	        this.$http
	          .put("accomodation/" + this.accomodation._id, this.accomodation)
	          .then(response => {
	            if (response.status === 200) {
	              this.$store.commit("snackbar", "Modifications enregistrées");
	              setTimeout(function() {
	                vue.$store.commit("snackbar", "Accès au détail");
	                setTimeout(function() {
	                  vue.$router.push({
	                    path: "/realEstate/detail",
	                    query: {
	                      accomodationId: response.body.accomodation._id,
	                      tab: event
	                    }
	                  });
	                }, 1000);
	              }, 1500);
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
	    changeIndex(index) {
	      var comp = null;
	      comp = this.$refs["step" + (index - 1)];
	      if (comp == null || comp.validate()) {
	        console.log("all inputs properly validated or no form");
	        this.accomodation.currentStep = index;
	        this.$refs.test.inputValue = this.accomodation.currentStep;
	        if (index > this.maxStep) this.maxStep = index;
	        //Validation de la première étape, je fais un POST, si je reviens en arrière je ne refais pas ça
	        if (index == 2) this.$refs.gmaps.initMap();
	        //Si je passe à l'étape des options supplémentaires alors je charge les features
	        if (index == 9) {
	          console.log("je passe aux features");
	          this.$http
	            .get("feature/" + this.accomodation.type)
	            .then(response => {
	              if (response.status == 200) {
									console.log("je récupère les features");
									this.listOfAvailableFeatures.length = 0;
	                this.listOfAvailableFeatures = this.listOfAvailableFeatures.concat(response.body.features);
	              }
	            });
	        }
	        //La je traite les features ajoutées par l'utilisateur
	        if (index == 10) {
	          this.accomodation.features = [];
	          this.listOfAvailableFeatures.forEach(feature => {
							//dans le cas ou la feature a une valeur je l'ajoute à l'accomodation
	            if (feature.value != null) {
								var featureValue = {
									ref: feature._id,
									value: feature.type == 'number' ? Number(feature.value) : feature.value
								};
								this.accomodation.features.push(featureValue)
	            }
						});
						console.log(this.accomodation.features);
	        }
	        if (this.accomodation._id == null) {
	          this.$http.post("accomodation").then(response => {
	            if (response.status == 200) {
	              this.accomodation = response.body.accomodation;
	              this.accomodation.currentStep = index;
	              //je fais un put pour enregistrer la currentStep afin de pouvoir faire un push dans le router
	              this.$http
	                .put("accomodation/" + this.accomodation._id, this.accomodation)
	                .then(response => {
	                  if (response.status == 200)
	                    console.log("etape validée et sauvegardée avec succès");
	                  this.$router.push("/realEstate/new/" + this.accomodation._id);
	                });
	            }
	          });
	        } else {
	          //Sinon je fais un put pour modifier l'accomodation
	          this.$http
	            .put("accomodation/" + this.accomodation._id, this.accomodation)
	            .then(response => {
	              if (response.status == 200)
	                console.log(response.body.accomodation);
	            });
	        }
	      } else {
	        console.log("erreur de validation");
	      }
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
	    onPickAdress(adress) {
	      var comps = Array.from(adress);
	      var filterArray = comps.filter(comp =>
	        comp.types.includes("postal_code")
	      );
	      if (filterArray.length > 0)
	        this.accomodation.zipcode = filterArray[0].long_name;
	      else this.accomodation.zipcode = "";
	      filterArray = comps.filter(comp => comp.types.includes("locality"));
	      if (filterArray.length > 0)
	        this.accomodation.city = filterArray[0].long_name;
	      else this.accomodation.city = "";
	      filterArray = comps.filter(comp => comp.types.includes("street_number"));
	      if (filterArray.length > 0)
	        this.accomodation.street = filterArray[0].long_name;
	      else this.accomodation.street = "";
	      filterArray = comps.filter(comp => comp.types.includes("route"));
	      if (filterArray.length > 0)
	        this.accomodation.street += " " + filterArray[0].long_name;
	    },
	    onValidateAllowedToChangeStep() {
	      if (this.accomodation.currentStep != null) {
	        if (typeof this.accomodation.currentStep == "string") {
	          console.log("c'est une strting");
	        }
	        this.accomodation.currentStep = parseInt(this.accomodation.currentStep);
	      }
	      // 			window.alert(typeothis.accomodation.currentStep)
	    },
	    onGoPrevious() {
	      this.accomodation.currentStep -= 1;
	      this.$refs.test.inputValue = this.accomodation.currentStep;
	      console.log(this.accomodation.currentStep);
	    }
	  }
	};
</script>
<style>
	#location-input {
	  background-color: #fff;
	  font-family: Roboto;
	  font-size: 15px;
	  font-weight: 300;
	  margin-left: 12px;
	  padding: 0 11px 0 13px;
	  text-overflow: ellipsis;
	  width: 300px;
	}
	.cut-text {
	  text-overflow: ellipsis;
	  overflow: hidden;
	  white-space: nowrap;
	}
	.stepper__header {
	  height: initial;
	}
</style>