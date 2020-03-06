<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm4 xl3 offset-sm1>
          <v-card>
            <v-card-title>
              <span class="headline">Conversations</span>
            </v-card-title>
            <v-list two-line>
              <template v-for="(item, index) in conversations">
                <v-divider :key="index"></v-divider>
                <v-list-tile :key="item.receiver._id" @click="onViewDetail(item)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{item.receiver.firstname}} {{item.receiver.lastname}}</v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.messages[0].message"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>

        <!-- Les messages -->
        <v-flex xs12 sm7>
          <v-card>
            <v-card-title>
              <span class="headline">Messages</span>
            </v-card-title>
            <v-list two-line v-if="selectedConv != null">
              <template v-for="(message, index) in selectedConv.messages">
                <v-list-tile :key="index" avatar>
                  <v-list-tile-avatar>
                    <!-- TODO METTRE L'IMAGE DU SENDER -->
                    <img src="/static/images/background.jpg">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ message.sender.firstname }} {{ message.sender.lastname }}</v-list-tile-title>
                    <v-list-tile-sub-title v-html="message.message"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
              <v-list-tile>
                <v-list-tile-content>
                  <v-text-field v-model="newMessage.message" label="Votre message"></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-alert type="info" :value="true" v-else>Sélectionnez une conversation pour voir les messages</v-alert>

            <v-card-actions v-if="selectedConv != null">
              <v-btn @click="sendMessage();" :disabled="newMessage.message == ''" flat>ENVOYER</v-btn>
            </v-card-actions>

          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  export default {
    created: function() {
      var vue = this;
      this.$http.get("message").then(response => {
          
        if (response.status == 200) {
          console.log("je recupere les messages");
          vue.messages = response.body.messages;
          var receivers = vue.lodash.uniqBy(
            vue.lodash.map(vue.messages, "receiver"),
            "_id"
          );
          receivers.forEach(function(receiver) {
            vue.conversations.push({
              messages: vue.lodash.filter(vue.messages, { receiver: receiver }),
              receiver: receiver
            });
          });
        }
      });
    },
    data: function() {
      return {
        messages: [],
        newMessage: {
         
          message: "",
          sender: this.$store.state.user.id,
          receiver: null
        },
        conversations: [],
        selectedConv: null
      };
    },
    methods: {
      onViewDetail(conv) {
        this.selectedConv = conv;
        this.newMessage.receiver = conv.receiver._id;
      },
      sendMessage() {
        var conv = this.selectedConv;
        this.$http.post("message", this.newMessage).then(response => {
          if (response.status == 200) {
            //TODO voir pour populate la réponse
            conv.messages.push(response.body.message);
            this.$store.commit("snackbar", "Message envoyé");
          }
        })
      }
    }
  };
</script>
<style>
</style>