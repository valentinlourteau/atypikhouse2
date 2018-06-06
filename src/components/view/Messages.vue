<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
          <v-card>

            <v-card-title>
                <span class="headline">Messagerie</span>
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
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  created: function() {
    //TODO faire l'appel à l'API ici
    for (var i = 0; i < 10; i++) {
      this.messages.push({
        message: "Salut Val, c'est notre " + i + " message",
        sender: {
          _id: "5b12738bafa79e00c4869235",
          email: "oliber@gmail.com",
          firstname: "olivier",
          lastname: "roger",
          admin: false,
          host: false,
          __v: 0
        },
        receiver: {
          _id: "5afeff594e9c3b2ae03c85c2",
          email: "valentinlourteau@gmail.com",
          firstname: "valentin",
          lastname: "lourteau",
          admin: false,
          host: false
        }
      });
    }
    var receivers = this.lodash.uniqBy(this.lodash.map(this.messages, "receiver"), '_id');
    console.log(receivers.length)
    var vue = this;
    receivers.forEach(function(receiver) {
      vue.conversations.push({
        messages: vue.lodash.filter(vue.messages, { receiver: receiver }),
        receiver: receiver
      });
    });
  },
  data: function() {
    return {
      messages: [],
      conversations: []
    };
  },
  methods: {
    onViewDetail(conv) {

    },
  },
};
</script>
<style>
</style>
