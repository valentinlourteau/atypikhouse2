/* La page de crï¿½ation d'un nouveau bien ... */
<template>
<div>
	<div class="container">
		
		 <v-stepper v-model="stepIndex">
		 
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepIndex > 1" editable>Préambule</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepIndex > 2" editable>Pour démarrer</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="stepIndex > 3" editable>L'essentiel</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="stepIndex > 4" editable>Equipements</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5" :complete="stepIndex > 5" editable>Espaces accessibles</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="6" :complete="stepIndex > 6" editable>Avant de finir</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="7" :complete="stepIndex > 7" editable>Le mot de la fin</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="8" :complete="stepIndex > 8" editable>Pour accueillir</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="9" :complete="stepIndex > 9" editable>Réglement</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="10" :complete="stepIndex > 10" editable>Qui peut réserver ?</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="11" :complete="stepIndex > 11" editable>Calendrier</v-stepper-step>
      </v-stepper-header>
      
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5">
          	<p>Ici, quelques infos du site sur l'intérêt et les engagements relatifs ï¿½ la publication d'un hï¿½bergement. le fait que chaque ï¿½tape validï¿½e enregistre la rï¿½servation pour la continuer plus tard si besoin
          	est</p>
          	<p>Bienvenue sur la création d'un bien atypique. 
          	<p>Vous allez contribuer à l'expension de notre offre et à la promotion des logements atypiques.</p>
          	Nous sommes fier de vous permettre de promouvoir notre passion pour la découverte, le voyage, et nous pensons que les logements atypiques contribuent à ces valeurs.
          	Nous vous assisterons tout au long du processus de création de votre bien sur le site. Et vous apporterons, nous l'ésperons,  toutes les précisions nécessaires pour mener à bien le processus de création.
          	</p>
          	<p>Dans le cas ou vous ne pourriez pas valider toutes les étapes, nous les sauvegardons automatiquement pour vos prochaines connexions.</p>
          	
          	<p>Voila, vous savez tous ! On commence ?</p>
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 2;initMap();">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-5">
          
          
          <v-text-field id="location-input" label="Adresse du bien" class="controls" type="text"
        	placeholder="Sélectionnez votre adresse"></v-text-field>
          <div id="map" style="height:300px;"></div>
          
          </br>
          
          <v-text-field label="Appartement, bâtiment, résidence (facultatif)" v-model="accomodation.complementAdresse"></v-text-field>
              
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-5">Quelques informations essentielles, le nombre de voyageurs possible, nombre et configuration des lits
          
          <!-- Type de bien -->
          <v-select :items="typeOfAccomodationList" v-model="accomodation.type" label="Type de bien" multi-line bottom></v-select>
          
          <v-layout row wrap>
          
          <!-- Capacité d'accueil -->
          <v-flex xs12>
          <v-subheader>Capacité d'accueil</v-subheader>
          </v-flex>
          
          <v-flex xs9>
         <v-slider v-model="accomodation.maximumPeopleCount" min="1" max="20"></v-slider>
         </v-flex>
         <v-flex xs3>
            <v-text-field v-model="accomodation.maximumPeopleCount" type="number"></v-text-field>
          </v-flex>
         
         <!-- Nombre de lits -->
         <v-flex xs12>
         	<v-subheader>Nombre de couchages</v-subheader>
         </v-flex>
         <v-flex xs9>
         	<v-slider v-model="accomodation.numberOfBeds" min="1" max="20" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.numberOfBeds" type="number"></v-text-field>
          </v-flex>
          
          </v-layout>
          
          </v-card>
     
          <v-btn color="primary" @click.native="stepIndex = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="mb-5">
          La liste des équipements proposés par le bien
          <v-layout row wrap>
          <v-flex v-for="equipment in listOfEquipments" xs4>
          	<v-switch v-model="listOfEquipementsChoosen" :label="equipment.label" :value="equipment.value"></v-switch>       
          </v-flex>
          </v-layout>
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 5">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-card color="grey lighten-1" class="mb-5" height="200px">L'ensemble des espaces disponibles pour l'utilisateur au sein de la propriï¿½tï¿½, jardin, cuisine, jaccuzi, etc ..</v-card>
          <v-btn color="primary" @click.native="stepIndex = 6">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="6" >
        <v-jumbotron>
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
		
		<v-layout row wrap>
		  	<v-flex xs12 lg4 xl3 v-for="picture in accomodationPictures">
			  	<v-card :key="picture.file.name" class="ma-3">
			  		
			  	<v-card-media :src="picture.url" height="200px"></v-card-media>
			  	
			  	<v-card-actions class="blue">
			  	  <div class="cut-text white--text">{{picture.file.name}}</div>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon color="white">star</v-icon>
                  </v-btn>
                  <v-btn icon @click="onDeleteImg(picture)">
                    <v-icon color="white" >delete</v-icon>
                  </v-btn>
                </v-card-actions>
			  		
			  	</v-card>
		       </v-flex>
	    </v-layout>
          
          
          <v-btn color="primary" @click.native="stepIndex = 7">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="7">
          <div>
          Ici, le titre de l'annonce. Donner une description personnalisée, du bien, ce qui le rend atypique, '
          <v-text-field label="Titre de l'annonce"></v-text-field>
          <v-text-field label="Description" multi-line></v-text-field>
          
          
          
          
          </div>
          <v-btn color="primary" @click.native="stepIndex = 8">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="8">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Explications gï¿½nï¿½rales (explications plus prï¿½cises sur les pages concernï¿½es) sur la tarification, calendrier, comment accueillir le visiteur. Explications sur les obligations ï¿½ remplir par
          le visiteur pour pouvoir louer le bien, typiquement numï¿½ro de tï¿½lï¿½phone vï¿½rifiï¿½, informations de payement, carte d'identitï¿½... Possiblitï¿½ d'ajotuer des contrainte supplï¿½mentaires, ID, Recommandations ..
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 9">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="9">
          <v-card class="mb-5" height="200px">
          Quelles rï¿½gles appliquer, adaptï¿½ aux bï¿½bï¿½s, fumeur ... Et ï¿½galement les infos ï¿½ connaitre sur le logement ,zone inondable, animaux dangereux, armes etc
          
          <v-layout>
          	<v-flex xs6 v-for="rule in availableRules">
          		<v-switch v-model="selectedRules" :value="rule.value" :label="rule.label" ></v-switch>
          	</v-flex>
          </v-layout>
          
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 10">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="10">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Rï¿½capitulatif sur qui peut rï¿½server et comment, infos en plus...
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 11">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="11">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Explications dï¿½taillï¿½es sur le calendrier
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 12">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
      
    </v-stepper>
    
    <!-- Chaque step peut disposer d'une v-card d'aide, d'informations supplï¿½mentaires, voir airbnb -->
		
		
	</div>
	
</div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
import Accomodation from '../../../class/entities/accomodation';
import FileUpload from '../../utility/fileUpload';

export default {
	components: {
		FileUpload,
	},
	data: function() {
		return {
			accomodation : new Accomodation(),
			stepIndex: 1,
			accomodationPictures : new Array(),
			typeOfAccomodationList: [
				{text:"dick"},
				{text:"zizi"},
			],
			goodsAvailableForGuestList: [
				{text:"douche"},
				{text:"animaux acceptés"},
			],
			listOfEquipments : [
				{label: "lave linge", value: "lave-linge"},
				{label: "télévision", value: "television"},
			],
			listOfEquipementsChoosen :[],
			availableRules : [
				{label: "fumeurs autorisés", value: "smoke"},
				{label: "animaux autorisés", value: "animals"},
			],
			selectedRules : [],
		}
	},
	methods: {
		onDeleteImg(picture) {
			this.accomodationPictures.splice(this.accomodationPictures.indexOf(picture), 1);
		},
		onChooseImg(files) {
			var reader = new FileReader();
			var accomodRef = this.accomodationPictures;
			reader.onload = function (e) {
				accomodRef.push({
					file: files.get('data'),
					url: e.target.result,
				});
            };
            reader.readAsDataURL(files.get('data'));
		},
		//Déplacer ça dans un composant
		initMap() {
				var map;
				GoogleMapsLoader.load(function(google) {
				    map = new google.maps.Map(document.getElementById('map'), {
				          center: {lat: -34.397, lng: 150.644},
				          zoom: 8
				        });
				    console.log("map " + map)
				    
					var input = /** @type {!HTMLInputElement} */(
				            document.getElementById('location-input'));
					console.log("input " + input)
					var autocomplete = new google.maps.places.Autocomplete(input);
					console.log("autocomplete " + autocomplete)

					var infowindow = new google.maps.InfoWindow();
					console.log("infowindow " + infowindow)

			        var marker = new google.maps.Marker({
			          map: map,
			          anchorPoint: new google.maps.Point(0, -29)
			        });
					console.log("marker " + marker)
			        
			        autocomplete.addListener('place_changed', function() {
			            infowindow.close();
			            marker.setVisible(false);
			            var place = autocomplete.getPlace();
			            if (!place.geometry) {
			              // User entered the name of a Place that was not suggested and
			              // pressed the Enter key, or the Place Details request failed.
			              window.alert("No details available for input: '" + place.name + "'");
			              return;
			            }

			            // If the place has a geometry, then present it on a map.
			            if (place.geometry.viewport) {
			              map.fitBounds(place.geometry.viewport);
			            } else {
			              map.setCenter(place.geometry.location);
			              map.setZoom(17);  // Why 17? Because it looks good.
			            }
			            marker.setIcon(/** @type {google.maps.Icon} */({
			              url: place.icon,
			              size: new google.maps.Size(71, 71),
			              origin: new google.maps.Point(0, 0),
			              anchor: new google.maps.Point(17, 34),
			              scaledSize: new google.maps.Size(35, 35)
			            }));
			            marker.setPosition(place.geometry.location);
			            marker.setVisible(true);

			            var address = '';
			            if (place.address_components) {
			              address = [
			                (place.address_components[0] && place.address_components[0].short_name || ''),
			                (place.address_components[1] && place.address_components[1].short_name || ''),
			                (place.address_components[2] && place.address_components[2].short_name || '')
			              ].join(' ');
			            }

			            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			            infowindow.open(map, marker);
			          });
					
// 					google.maps.event.addListener(map,'bounds_changed', function() {
// 						console.log("listener bounds changed map : " + map)
// 						  autocomplete.bindTo(map, 'bounds');
// 						});
			        
			        
				});
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
</style>
