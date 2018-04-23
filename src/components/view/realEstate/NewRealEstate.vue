/* La page de création d'un nouveau bien ... */
<template>
<div>
	<div class="container">
		
	<v-stepper v-model="stepIndex">
		 
      <v-stepper-header>
        <v-stepper-step step="1" :complete="maxStep > 0" :editable="maxStep > 0">{{$t('accomodation.stepper.step.1')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="maxStep > 1" :editable="maxStep > 1">{{$t('accomodation.stepper.step.2')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="maxStep > 2" :editable="maxStep > 2">{{$t('accomodation.stepper.step.3')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="maxStep > 3" :editable="maxStep > 3">{{$t('accomodation.stepper.step.4')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5" :complete="maxStep > 4" :editable="maxStep > 4">{{$t('accomodation.stepper.step.5')}}s</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="6" :complete="maxStep > 5" :editable="maxStep > 5">{{$t('accomodation.stepper.step.6')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="7" :complete="maxStep > 6" :editable="maxStep > 6">{{$t('accomodation.stepper.step.7')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="8" :complete="maxStep > 7" :editable="maxStep > 7">{{$t('accomodation.stepper.step.8')}}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="9" :complete="maxStep > 8" :editable="maxStep > 8">{{$t('accomodation.stepper.step.9')}}</v-stepper-step>
      </v-stepper-header>
      
      <v-stepper-items>
      
        <v-stepper-content step="1">
          	<h1 class="display-2">Bienvenue sur la création d'un bien atypique.</h1>
          	<h2 class="display-1">Vous allez contribuer à l'enrichissement de notre offre, nous vous en remercions.</h2>
          	<v-divider></v-divider>
          	<p>Nous sommes fier de vous permettre de promouvoir notre passion pour la découverte, le voyage, et nous pensons que les logements atypiques contribuent à ces valeurs.
          	Nous vous assisterons tout au long du processus de création de votre bien sur le site. Et vous apporterons, nous l'ésperons,  toutes les précisions nécessaires pour mener à bien le processus de création.
          	</p>
          	<p>Pour votre confort, nous enregistrons automatiquement votre annonce au fur et à mesure que vous complétez les étapes, de sorte à pouvoir reprendre la saisie si vous ne pouvez pas tout faire en une fois.</p>          	
          	<p>Voila, vous savez tous ! On commence ?</p>
          <v-btn color="primary" @click.native="changeIndex(2);">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
        <v-stepper-content step="2">   
          <gmaps ref="gmaps" @onChooseAddress="onPickAdress($event)"></gmaps>      
          </br>
<!--           <v-text-field label="Appartement, bâtiment, résidence (facultatif)" v-model="accomodation.complementAdresse"></v-text-field> -->
          <v-btn color="primary" @click.native="changeIndex(3)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
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
          
          <v-layout row wrap>         
          <!-- Capacité d'accueil -->
          <v-flex xs12>
          <v-subheader>Capacité d'accueil</v-subheader>
          </v-flex>   
          <v-flex xs9>
         <v-slider v-model="accomodation.guests" min="1" max="20"></v-slider>
         </v-flex>
         <v-flex xs3>
            <v-text-field v-model="accomodation.guests" type="number"></v-text-field>
          </v-flex>      
         <!-- Nombre de lits -->
         <v-flex xs12>
         	<v-subheader>Nombre de couchages (un fauteuil une place, ça ne compte pas !)</v-subheader>
         </v-flex>
         <v-flex xs9>
         	<v-slider v-model="accomodation.beds" min="1" max="20" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.beds" type="number"></v-text-field>
          </v-flex>
          <!-- Nombre de chambres --> 
          <v-flex xs12>
         	<v-subheader>Nombre de chambres</v-subheader>
         </v-flex>
         <v-flex xs9>
         	<v-slider v-model="accomodation.bedrooms" min="1" max="20" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.bedrooms" type="number"></v-text-field>
          </v-flex>  
          <!-- Nombre de salles de bains -->
          <v-flex xs12>
         	<v-subheader>Nombre de salles de bains</v-subheader>
         </v-flex>
         <v-flex xs9>
         	<v-slider v-model="accomodation.bathrooms" min="1" max="20" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.bathrooms" type="number"></v-text-field>
          </v-flex>  
                 
          </v-layout> 
          <v-btn color="primary" @click.native="changeIndex(4)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
        <v-stepper-content step="4">
          EQUIPEMENTS
          <v-layout row wrap>
          <v-flex v-for="equipment in listOfEquipments" :key="equipment._id" xs4>
          	<v-checkbox v-model="accomodation.equipments" :label="equipment.frname" :value="equipment._id"></v-checkbox>       
          </v-flex>
          </v-layout>
          <v-btn color="primary" @click.native="changeIndex(5)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
        <v-stepper-content step="5">
          ESPACES ACCESSIBLES
          <v-layout row wrap>
          <v-flex v-for="space in listOfAvailableSpaces" :key="space._id" xs4>
          	<v-checkbox v-model="accomodation.spaces" :label="space.frname" :value="space._id"></v-checkbox>       
          </v-flex>
          </v-layout>
          <v-btn color="primary" @click.native="changeIndex(6)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
        <v-stepper-content step="6" >
        <v-jumbotron height="400px">
		    <v-container fill-height>
		      <v-layout align-center>
		        <v-flex>
		          <h3 class="display-3">Votre bien mérite les plus belles photos</h3>
		          <span class="subheading">Vous allez pouvoir ajouter ici les photos qui vont rendre votre bien unique, nous en sommes persuadé. N'hésitez pas à prendre des photos de jour, mettant votre bien en valeur. La popularité qu'aura votre bien en dépend largement.</span>
		          <v-divider class="my-3"></v-divider>
		          <div class="title mb-3">Vendez leur du rêve !</div>
		          <file-upload @formData="onChooseImg($event)"></file-upload>
		        </v-flex>
		      </v-layout>
		    </v-container>		
  		</v-jumbotron>
  		
  		<!-- LISTE DES PHOTOS -->	
		<v-layout row wrap>
		  	<v-flex xs6 lg4 xl3 v-for="picture in accomodation.pictures" :key="picture.fileName">
			  	<v-card class="ma-3">		  		
			  	<v-card-media :src="picture.data" height="200px"></v-card-media>			  	
			  	<v-card-actions class="blue">
			  	  <div class="cut-text white--text">{{picture.fileName}}</div>
                  <v-spacer></v-spacer>
                  <v-btn @click="onSetPictureIsMain(picture)" icon>
                    <v-icon :color="picture.isMain ? 'yellow' : 'white'">star</v-icon>
                  </v-btn>
                  <v-btn @click="onDeleteImg(picture)" icon>
                    <v-icon color="white" >delete</v-icon>
                  </v-btn>
                </v-card-actions>	
			  	</v-card>
		       </v-flex>
	    </v-layout>     
	        
          <v-btn color="primary" @click.native="changeIndex(7)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
         <v-stepper-content step="7">
          <div>
          	<v-text-field v-model="accomodation.name" label="Titre de l'annonce"></v-text-field>
          	<v-text-field v-model="accomodation.description" label="Description" multi-line></v-text-field>   
          </div>
          <v-btn color="primary" @click.native="changeIndex(8)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
         <v-stepper-content step="8">
			<v-subheader>Règlement</v-subheader>
          <v-layout row wrap>
	      	<v-flex v-for="rule in listOfAvailableRules" :key="rule._id" xs4>
	        	<v-checkbox v-model="accomodation.requirements" :label="rule.frname" :value="rule._id"></v-checkbox>           
	        </v-flex>
          </v-layout>
          <v-btn color="primary" @click.native="changeIndex(9)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
         <v-stepper-content step="9">
          
          <v-layout row wrap>

          <!-- Durée minimale de séjour -->
          <v-flex xs12>
         	<v-subheader>Durée minimale de séjour (jours)</v-subheader>
         	</v-flex>
          <v-flex xs9>
         	<v-slider v-model="accomodation.durationmin" min="1" max="360" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.durationmin" type="number"></v-text-field>
          </v-flex>
          
          <!-- Durée maximale de séjour -->
          <v-flex xs12>
         	<v-subheader>Durée maximale de séjour (jours)</v-subheader>
         	</v-flex>
          <v-flex xs9>
         	<v-slider v-model="accomodation.durationmax" min="1" max="360" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.durationmax" type="number"></v-text-field>
          </v-flex>
          
          <!-- Heure d'arrivée -->
          <v-flex xs6>
         	<v-subheader>Heure limite d'arrivée</v-subheader>
          	<v-time-picker v-model="accomodation.arrival"></v-time-picker>
          </v-flex>  
          
          <!-- Heure de départ -->
          <v-flex xs6>
         	<v-subheader>Heure limite de départ</v-subheader>
          	<v-time-picker v-model="accomodation.departure"></v-time-picker>
          </v-flex>  
          
          </v-layout>
          
          <br/>
          
          <v-btn color="primary" @click="onValidate()">Valider</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        
      </v-stepper-items>
      
    </v-stepper>
		
	</div>
	
	<!-- Le dialog de récupération du bien déjà commencé mais pas fini (si il y en a un) -->
	
	<v-dialog v-model="restoreAccomodation" max-width="500px">
        <v-card>
          <v-card-title>
            REPRENDRE LA CREATION DU BIEN
          </v-card-title>
          <v-card-text>
          	Vous aviez déjà commencé la création d'un bien, voulez vous reprendre la ou vous en étiez ?
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="onRestoreAccomodation(false)" flat>NON</v-btn>
            <v-btn color="primary" @click="onRestoreAccomodation(true)" flat>OUI</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-snackbar
      :timeout="6000"
      v-model="snackbar.show"
      right
      bottom
    >
      {{ snackbar.text }}
      <v-btn flat color="blue" @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
	
	
</div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
import Accomodation from '../../../class/entities/Accomodation';
import FileUpload from '../../utility/fileUpload';
import Gmaps from '../../utility/Gmaps';
import ListService from '../../../class/services/ListService';

export default {
	components: {
		FileUpload,
		Gmaps,
	},
	mounted: function () {
		//On récupère l'accomodation stockée
		if (this.$ls.get("accomodation") != null && this.$ls.get('user').id == this.$ls.get("accomodation")._userId)
			this.restoreAccomodation = true;
		else
			this.accomodation._userId = this.$ls.get("user").id;
		
		console.log(this.accomodation)
		
		//Chargement des combo
		ListService.fetchList("accomodationTypes", this.listOfAccomodationTypes);
		ListService.fetchList("accomodationEquipements", this.listOfEquipments);
		ListService.fetchList("accomodationAvailableSpaces", this.listOfAvailableSpaces);
		ListService.fetchList("accomodationRules", this.listOfAvailableRules);
	},
	data: function() {
		return {
			loading: false,
			search: null,
	        select: '',
			accomodation : new Accomodation(),
			stepIndex : 1,
			maxStep : 1,
			listOfRoomsMode : [
				{code: "acomodation.room.mode.full", value: 'full'},
				{code: "acomodation.room.mode.room", value: 'room'},
			],
			listOfAccomodationTypes : [],
			listOfEquipments : [],
			listOfAvailableSpaces : [],
			listOfAvailableRules : [],
			restoreAccomodation : false,
			snackbar : {
				show : false,
				text : "default",
			},
		}
	},
	methods: {
		onValidate() {
			var vue = this;
			this.$ls.set("accomodation", this.accomodation);
			this.$http.post("accomodation",	 {
				"host" : this.accomodation._userId,
				"type" : this.accomodation.type,
				"equipments" : this.accomodation.equipments,
				"requirements" : this.accomodation.requirements,
				"arrival" : this.accomodation.arrival,
				"departure" : this.accomodation.departure,
				"name" : this.accomodation.name,
				"room" : this.accomodation.room,
				"description" : this.accomodation.description,
				"city" : this.accomodation.city,
				"street" : this.accomodation.street,
				"apartment" : this.accomodation.apartment,
				"zipcode" : this.accomodation.zipcode,
				"durationmax" : this.accomodation.durationmax,
				"durationmin" : this.accomodation.durationmin,
				"guests" : this.accomodation.guests,
				"bedrooms" : this.accomodation.bedrooms,
				"bathrooms" : this.accomodation.bathrooms,
				"beds" : this.accomodation.beds,
				"images" : this.accomodation.pictures,
			}).then(response => {
				if (response.status === 200) {
					this.snackbar.text = "Modifications enregistrées";
					this.snackbar.show = true;
					this.$ls.remove("accomodation");
					setTimeout(function () {
						vue.snackbar.text = "Nous allons vous rediriger vers le détail";
						vue.snackbar.show = true;
					}, 1500);
				}
			});
		},
		onRestoreAccomodation(restore) {
			if (restore) {
				this.accomodation = this.$ls.get("accomodation");
				this.maxStep = this.accomodation.currentStep;
				this.stepIndex = this.accomodation.currentStep;
			}
			else {
				this.$ls.remove("accomodation");
				this.accomodation = new Accomodation();
				this.accomodation._userId = this.$ls.get("user").id;
			}
			//pour fermer la popup
			this.restoreAccomodation = false;
		},
		onDeleteImg(picture) {
			this.accomodation.pictures.splice(this.accomodation.pictures.indexOf(picture), 1);
		},
		onSetPictureIsMain(picture) {
			for (let picture of this.accomodation.pictures) {
				picture.isMain = false;
			};
			picture.isMain = true;
		},
		changeIndex(index) {
			this.stepIndex = index;
			if (index > this.maxStep)
				this.maxStep = index;
			if (index == 2) {
				this.$refs.gmaps.initMap();
			}
			this.accomodation.currentStep = index;
			//a chaque changement d'étape on fourre l'accomodation dans le localstorage
			console.log(this.accomodation.pictures.length)
			this.$ls.set("accomodation", this.accomodation);
		},
		onChooseImg(files) {
			var reader = new FileReader();
			//on fait une variable tampon pour pouvoir l'utiliser dans le onload 
			//car je n'arrive pas à utiliser directement la variable de data dans la callback
			var accomodRef = this.accomodation.pictures;
			reader.onload = function (e) {
				let isMain = false;
				let imgName = files.get('data').name;
				console.log(imgName)
				//si l'image est la première alors isMain = true;
				if (accomodRef.length == 0)
					isMain = true;
				accomodRef.push({
					fileName: imgName,
					data: e.target.result,
					isMain: isMain,
				});
            };
            reader.readAsDataURL(files.get('data'));
		},
		onPickAdress(adress) {
				var comps = Array.from(adress);
				
	 			var filterArray = comps.filter(comp => comp.types.includes('postal_code'));
	 			if (filterArray.length > 0)
	 				this.accomodation.zipcode = filterArray[0].long_name;
	 			else
	 				this.accomodation.zipcode = "";
	 			
	 			filterArray = comps.filter(comp => comp.types.includes('locality'));
	 			if (filterArray.length > 0)
	 				this.accomodation.city = filterArray[0].long_name;
	 			else
	 				this.accomodation.city = "";
	 			
	 			filterArray = comps.filter(comp => comp.types.includes('street_number'));
	 			if (filterArray.length > 0)
	 				this.accomodation.street = filterArray[0].long_name;
	 			else
	 				this.accomodation.street = "";
	 			
	 			filterArray = comps.filter(comp => comp.types.includes('route'));
	 			if (filterArray.length > 0)
	 				this.accomodation.street += (" " + filterArray[0].long_name);
		},
	},
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
