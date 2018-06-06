<template>
  <div>
    <v-layout>
      <v-flex xs4>
        <v-subheader> Date debut alerte</v-subheader>

        <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="date1" lazy transition="scale-transition" offset-y full-width min-width="290px">

          <v-text-field slot="activator" v-model="date1" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="date1" @input="$refs.menu1.save(date1)"></v-date-picker>

        </v-menu>
      </v-flex>

    </v-layout>
    <v-layout>
      <v-flex xs4>
        <v-subheader> Date fin alerte</v-subheader>

        <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="date2" lazy transition="scale-transition" offset-y full-width min-width="290px">
          <v-text-field slot="activator" v-model="date2" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="date2" @input="$refs.menu2.save(date2)"></v-date-picker>

        </v-menu>
      </v-flex>
    </v-layout>

    <container fluid>
      <v-layout>
        <v-flex xs4>
          <v-subheader> Titre d'alerte</v-subheader>
          <v-text-field id="text" name="input" label="Alerte"></v-text-field>
        </v-flex>
      </v-layout>
    </container>
    <v-container>
      <v-subheader> Type alerte</v-subheader>

      <v-layout row wrap>
        <v-flex xs12 sm4 md4>
          <v-switch v-model="ex11" label="error" color="error" value="error" hide-details></v-switch>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-switch v-model="ex11" label="Warning" color="Warning" value="Warning" hide-details></v-switch>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-switch v-model="ex11" label="Info" color="Info" value="Info" hide-details></v-switch>
        </v-flex>
      </v-layout>
    </v-container>
    </v-layout>
    <v-card-text>
      <v-sbheader>Description alerte</v-sbheader>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-text-field name="text" label="Ma description" textarea>
            </v-text-field>

          </v-flex>
        </v-layout>

      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  export default {
    data: () => ({
      date1: null,
      date2: null,
      menu1: false,
      menu2: false
    })

    // todo warning buttom
  };
</script>
<style>
</style>