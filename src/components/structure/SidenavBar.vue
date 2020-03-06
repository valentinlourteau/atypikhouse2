<template>
  <div>
    <portal class="margin-left:none;" v-if="$store.state.user != null" to="headerToolbarIcon">
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
            <span style="height: 28px;" class="white--text">{{ this.$store.state.user.firstname == null ? 'John Doe' : this.$store.state.user.firstname }}</span>
            <span style="height: 28px;" class="white--text">{{ this.$store.state.user.lastname == null ? 'John Doe' : this.$store.state.user.lastname }}</span>
            <br>
            <span style="height: 28px;" class="white--text">{{ this.$store.state.user.email == null ? 'johndoe@void.com' : this.$store.state.user.email }}</span>
          </div>
        </div>
      </div>
      <v-list>
        <div v-if="item.if" v-for="item in items" :key="item.title">
          <v-list-tile v-if="item.items == null" :to="item.link" active-class="yellow--text black">
            <v-list-tile-action v-if="item.badge == null">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-action v-else>
              <v-badge color="secondary" right>
                <span slot="badge" class="black--text">6</span>
                <v-icon>{{ item.icon }}</v-icon>
              </v-badge>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group v-else-if="$store.state.user != null && $store.state.user.admin" sub-group no-action value="true">
            <v-list-tile slot="activator">
              <v-list-tile-title>Administration</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-for="(admin, i) in item.items" :key="i" :to="admin.link" active-class="yellow--text black">
              <v-list-tile-title v-text="admin.title"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-divider v-if="item.divider"></v-divider>
        </div>
        <v-list-tile v-if="$store.state.user != null" @click="onClickDisconnect">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Déconnexion</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script type="text/javascript">
  export default {
    mounted: function() {},
    props: ["display"],
    data: function() {
      return {
        items: [
          {
            title: "Mon compte",
            icon: "account_circle",
            link: "/account",
            if: !this.$store.state.admin,
            divider: false
          },
          {
            title: "Mes biens atypiques",
            icon: "home",
            link: "/realEstate/home",
            if: !this.$store.state.admin,
            divider: false
          },
          {
            title: "Mes voyages",
            icon: "flight_takeoff",
            link: "/mytrips",
            if: !this.$store.state.admin,
            divider: true
          },
          {
            title: "Messages",
            icon: "message",
            link: "/messages",
            if: !this.$store.state.admin,
            divider: false
          },
       
//           {
//             title: "Notifications",
//             icon: "notification_important",
//             link: "/notifications",
//             if: !this.$store.state.admin,
//             badge: 6,
//             divider: true
//           },
          {
            title: "Administrateur",
            icon: "",
            link: "/manager",
            //TODO remettre admin à true pour voir ça
            if: !this.$store.state.admin,
            items: [
              {
                title: "Utilisateurs",
                icon: "supervised_user_circle",
                link: "/manageUsers"
              },
              {
                title: "Etat des services",
                icon: "power",
                link: "/admin/health-check"
              },
              {
                title: "Paramètres d'un bien",
                icon: "input",
                link: "/admin/inputs"
              }
            ]
          }
        ],
        displayDrawer: true,
        avatarSize: "64px"
      };
    },
    components: {},
    methods: {
      onClickDisconnect() {
        console.log("je me deco");
        this.$store.commit("onSetUser", null);
        this.$router.push("/");
      },
      redirectHome() {
        this.$router.push("/");
      }
    }
  };
</script>
<style scss>
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
  .list__tile--active .icon {
    color: #ffeb3b !important;
  }
</style>