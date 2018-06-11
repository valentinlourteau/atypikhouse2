<template>
	<div>

		<section class="header">

			<v-carousel>
				<v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
			</v-carousel>

		</section>

		<v-container>
			<v-layout row wrap>
				<v-flex xs12 md6 offset-md3>
					<v-card>

						<v-card-text>

							<div v-if="!editMode" v-html="content"></div>
							<quill-editor v-model="content" v-else></quill-editor>

						</v-card-text>

						<v-card-actions v-if="editMode">
							<v-btn @click="onCancelEdit()" flat>ANNULER</v-btn>
							<v-btn @click="onSaveContent();" color="secondary" flat>ENREGISTRER</v-btn>
						</v-card-actions>

					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<v-footer height="auto" color="primary">
			<v-layout row wrap justify-center>
				<v-btn v-for="link in links" :key="link.title" color="white" flat>
					<v-list-tile v-if="link.links == null" :to="link.link" class="black--text" active-class="yellow--text black">
						{{link.title }}
					</v-list-tile>
				</v-btn>
				<v-flex xs12 py-3 text-xs-center black--text> &copy;2018 —
					<strong>Tous droits réservés © De AtypikHouse - Réseau des hébergements insolite </strong>
				</v-flex>
			</v-layout>
		</v-footer>

		<v-btn v-if="$store.state.user.admin" v-on:click="editMode = true;" fab color="primary" fixed right bottom>
			<v-icon class="black--text">edit</v-icon>
		</v-btn>

	</div>
</template>

<script>
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import { quillEditor } from 'vue-quill-editor'

	export default {
	  components: {
	    quillEditor
	  },
	  created: function() {
	    this.$http.get("misc/aboutUs").then(response => {
	      if (response.status == 200) this.content = response.body.html;
	    });
	  },
	  data() {
	    return {
	      content: "",
	      contentCopy: "",
	      editMode: false,
	      items: [
	        {
	          src: "/static/images/image7.jpg"
	        },
	        {
	          src: "/static/images/image2.jpg"
	        },
	        {
	          src: "/static/images/image3.png"
	        },
	        {
	          src: "/static/images/image4.jpg"
	        }
	      ],
	      links: [
	        {
	          title: "CGV",
	          link: "/cgv"
	        },
	        {
	          title: "Contact",
	          link: "/contact"
	        },
	        {
	          title: "Plan du site",
	          link: "/plansite"
	        },
	        {
	          title: "CGU",
	          link: "/cgu"
	        },
	        {
	          title: "Mentions legales",
	          link: "/mentionlegale"
	        }
	      ]
	    };
	  },
	  methods: {
	    onEditContent() {
	      this.contentCopy = content;
	      this.editMode = true;
	    },
	    onCancelEdit() {
	      this.content = contentCopy;
	      this.editMode = false;
	    },
	    onSaveContent() {
	      this.$http
	        .post("misc/aboutUs", { aboutUsContent: this.content })
	        .then(response => {
	          if (response.status == 200) {
							this.content = response.body.html;
							this.editMode = false;
	          }
	        });
	    }
	  }
	};
</script>