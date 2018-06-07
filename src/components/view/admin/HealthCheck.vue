<template>
    <div>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Etat des services</span>
                        </v-card-title>
                        <v-card-text>
                            <v-switch :label="isApiWorking ? 'Accès à l API opérationnel' : 'Problème d accès à l api'" v-model="isApiWorking" :error="!isApiWorking" disabled></v-switch>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
      created: function() {
        this.$http.get("health-check")
          .then(result => {
            if (result.status == 200) {
              this.isApiWorking = true;
            } else {
              this.isApiWorking = false;
            }
          })
          .catch(err => {});
      },
      data: function() {
        return {
          isApiWorking: null,
        };
      },
      methods: {}
    };
</script>
<style>
</style>
