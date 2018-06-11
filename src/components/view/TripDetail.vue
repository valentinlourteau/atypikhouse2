<template>
  <div>
    	<v-tabs v-model="activeTab" color="yellow" dark slider-color="black" centered @input="onChangeTab($event)">		
      <v-tab v-for="tab in tabs" :key="tab.text" ripple>
       <span class="black--text">{{ tab.text }}</span>
      </v-tab>
            <!-- Resume -->
      <v-tab-item>
       <v-layout row wrap class="mx-2">
       <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
          <v-card>
            <v-card-title>
        <v-form ref="generalInformationsForm">
	      	<v-subheader>Informations générales</v-subheader>
	      <v-card-text>      
	      	<read-write-field :read="generalInformationsReadMode"  label="Nom" :rules="[v => !!v || 'Le nom est requis',
	      	v => v.length < 20 || 'Le nom doit être inférieur à 20 caractères']"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode" label="Description" :rules="[v => !!v || 'La description est requise']"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode"  label="Type de bien"></read-write-field>	      	
	      	<v-divider></v-divider>	      	
	      	<read-write-field :read="generalInformationsReadMode"  label="Capacité d'accueil"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode"  label="Nombre de chambres à coucher"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode"  label="Nombre de lits"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode" label="Nombre de salles de bain"></read-write-field>	      	
	      	<v-divider></v-divider>	      	
	      	<read-write-field :read="generalInformationsReadMode"  label="Nombre de jours minimum"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode" label="Nombre de jours maximum"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode"  label="Heure d'arrivée maximale"></read-write-field>
	      	<read-write-field :read="generalInformationsReadMode"  label="Heure de départ maximale"></read-write-field>	      	
	      	<v-divider></v-divider>	      	
	      </v-card-text>	      
	      <v-card-actions>
	      	<v-btn v-if="generalInformationsReadMode" class="black--text" @click="generalInformationsReadMode = false" flat>Editer</v-btn>
	      	<v-btn v-if="!generalInformationsReadMode" class="black--text" @click="onCancelGeneralInformations()" flat>Annuler</v-btn>
	      	<v-btn v-if="!generalInformationsReadMode" class="black--text" @click="onSaveGeneralInformations()" color="blue" flat>Enregistrer</v-btn>
	      </v-card-actions>     	      	
	      	</v-form>            
	      	</v-card-title>
            </v-card>
            </v-flex>
            </v-layout>
            </v-container>         
             </v-layout>
      </v-tab-item>      
       <!-- Calendrier global -->
      <v-tab-item>
            <v-layout row wrap >		
			<v-flex xs12 sm4 lg4 xl3 ml-4 mt-3 >
      <v-card>
        <v-card-media src="/static/images/background1.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Cabane avec piscine</h3>
            <div>Une Cabane avec une piscine extérieur en pleine nature </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" dark @click.stop="dialog = true">Ajouter des photos</v-btn>
          <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
<v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Mes photos et mes commentaires</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="dialog = false">Valider</v-btn>
             <v-btn dark flat @click.native="dialog = false">Annuler</v-btn>             
            </v-toolbar-items>
       
          </v-toolbar>
   
  		 <div>
            <div class="file-upload-form">
                Mes Souvenirs Atypikque
                <input type="file" @change="previewImage" accept="image/*">
            </div>
            <div class="image-preview" v-if="imageData.length > 0">
                <img class="preview" :src="imageData">
            </div>
        </div>
             <v-text-field textarea label="Commentaire..." v-model="comment" ></v-text-field>
              <v-btn dark color="primary" class="black--text">Commenter</v-btn>         
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>          
        </v-card-actions>
      </v-card>
    </v-flex>
		</v-layout>
      
      </v-tab-item>
      
      
      
</v-tabs>
  </div>
</template>

<script >
import Accomodation from './../../class/entities/Accomodation';
import ReadWriteField from '../utility/ReadWriteField';
import FileUpload from "./../utility/FileUpload";

  export default {
	  components: {
			ReadWriteField,
		    FileUpload,

	  },
	  
	
	data: function() {
		return {
			 dialog: false,
			generalInformationsReadMode: true,
			 imageData: "",
			 comment: '',
			activeTab: null,
			tabs: [
				{text : "Resume"},
				{text : "Avis"},
			],
		}
	},
 	methods: {
 
 		 previewImage: function(event) {
             var input = event.target;
             if (input.files && input.files[0]) {
                 var reader = new FileReader();
                 reader.onload = (e) => {
                     this.imageData = e.target.result;
                 }
                 reader.readAsDataURL(input.files[0]);
             }
         },
     
 		
 		
 		
 		
 		
 		
 		
 		
 	}
  };
</script>
<style>
.file-upload-form, .image-preview {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 20px;
}
img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
}
</style>