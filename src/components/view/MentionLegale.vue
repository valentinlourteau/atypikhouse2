<template>
  <div>
    <v-container fluid sm4>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>

          <v-card>
            <v-card-title>
              <h2 class="display-2"> Informations legales</h2>
            </v-card-title>

            <v-card-text>
              <div>Merci de lire attentivement les presentes modalites d utilisation du present site avant de le parcourir. En vous connectant sur ce site, vous acceptez sans reserve les presentes modalites.</div>
              <h2 class="display-1"> Editeur du site</h2>
              <div>https://www.AtypikHouse.fr</div>
              <a href="#" style="text-decoration:none">www.PrestApp.fr</a>
              <div>30 rue Orchides</div>
              <div>60350 PierreFonds</div>
              <div>France</div>
              <div>Tel: + 33 (0)7 58 51 56 584</div>
              <div>Fax: 01 48 18 37 06</div>
              <p>
                <div>AtypikHouse est une SARL au capital de 10 000 Euro</div>
                <div> RCS B 497 553 71 - SIRET : 49755371900020 - APE : 6201Z</div>
                <div> Num declaration CNIL : 1522193</div>
              </p>
              <div>
                <h2 class="display-1">Conditions d'utilisation</h2>
                <div>Le site accessible par les url suivants www.atypikhouse.fr est exploite dans le respect de la legislation fran�aise. L utilisation de ce site est regie par les presentes conditions generales. En utilisant le site, vous reconnaissez avoir pris connaissance de ces conditions et les avoir acceptees. Celles ci pourront etres modifiees a tout moment et sans preavis par la societe AtypikHouse. AtypikHouse ne saurait etre tenu pour responsable en aucune maniere d une mauvaise utilisation du service.</div>
              </div>

              <div>
                <h2 class="display-1">Hebergeur</h2>
                <div>ovh : est une entreprise francaise dans les ervices de cloud computing. Fondee en 1999 oar Octave Klaba, le groupe proposedes solutions de cloud public et prive.</div>
                <a href="#" color="blue">ww.OVH.fr</a>
              </div>

              <div>
                <h2 class="display-1">Cookies</h2>
                <div>Pour des besoins de statistiques et d affichage, le present site utilise des cookies. Il s agit de petits fichiers textes stockes sur votre disque dur afin d'enregistrer des donnees techniques sur votre navigation. Certaines parties de ce site ne peuvent etre fonctionnelle sans l acceptation de cookies</div>
              </div>

            </v-card-text>

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
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
    }
  };
</script>

<style scoped>
</style>
