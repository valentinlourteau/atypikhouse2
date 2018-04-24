<template>
<div>

	<portal v-if="$store.state.user != null" to="headerToolbarIcon">
  		<v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="displayDrawer = !displayDrawer"></v-toolbar-side-icon>
	</portal>

	<v-navigation-drawer v-if="$store.state.user != null" persistent v-model="displayDrawer" app>

	<div v-on:click="redirectHome()" class="user-view">
		<div class="background">
			<img src="/static/images/background.jpg" style="width: 300px;">
		</div>
		<div>
			<v-avatar :size="avatarSize" class="grey lighten-4" style="margin-bottom:8px;"> <img class="circle" src="/static/images/loup.jpg">
			</v-avatar>
			<div style="padding-bottom: 8px; height: 56px;">
				<span style="height: 28px;" class="white--text">{{ this.$store.user == null ? 'John Doe' : this.$store.user.firstname }}</span><br> <span
					style="height: 28px;" class="white--text"
				>{{ this.$store.user == null ? 'johndoe@void.com' : this.$store.user.firstname }}</span>
			</div>
		</div>
	</div>
	
	<v-list>
      <v-list-tile v-if="$store.state.user != null && item.needUserAuth || !item.needUserAuth" v-for="item in items" :key="item.title" @click="route(item.link)">
        <v-list-tile-action>
          <v-icon >{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
      <v-divider></v-divider>
      
      <v-list-tile v-if="$store.state.user != null" @click="onClickDisconnect();">
        <v-list-tile-action>
          <v-icon >exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Deconnexion</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
    </v-list>
	
	</v-navigation-drawer>

</div>
</template>

<script type="text/javascript">

export default {
	mounted: function() {
		
	},
	props: ["display"],
	data: function() {
		return {
		      items: [
		          { title: 'Mon compte', icon: 'account_circle', link: '/account', needUserAuth: false},
		          { title: 'Mes biens atypiques', icon: 'account_box', link: '/realEstate/home', needUserAuth: true},
		          { title: 'Mes voyages', icon: 'flight_takeoff', link: '/', needUserAuth: true},
		        ],
		        displayDrawer : true,
		      avatarSize: '64px',
		}
	},
	components: {
	},
	methods: {
		onClickDisconnect() {
			this.$store.commit("onSetUser", null);
			this.$router.push("/");
			//M.toast( {html: "On espère vous revoir bientôt !" } );
		},
		redirectHome() {
			this.$router.push('/');
		},
		route(link) {
			this.$router.push(link);
		}
	},
	computed: {
	},
};

</script>

<style>
.user-view {
	position: relative;
	padding: 32px 32px 0;
}

.background {
	overflow: hidden;
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: -1;
}
</style>
