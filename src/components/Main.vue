<template>
   <q-layout
      ref="layout"
      view="lHh Lpr fff"
      :left-class="{'bg-grey-2': true}"
      >
      <q-toolbar slot="header" class="glossy">
         <q-btn
            flat
            @click="$refs.layout.toggleLeft()"
            >
            <q-icon name="menu" />
         </q-btn>
         <q-toolbar-title>
            Quasar App
            <div slot="subtitle">
               Running on Quasar v{{$q.version}}
               <q-btn slot="right" class="logout" @click=logoutAction>Logout</q-btn>
            </div>
         </q-toolbar-title>
      </q-toolbar>
      <div slot="left">
         <!--
            Use <q-side-link> component
            instead of <q-item> for
            internal vue-router navigation
            -->
         <q-list no-border link inset-delimiter>
            <q-list-header>Essential Links</q-list-header>
            <q-item @click="launch('http://quasar-framework.org')">
               <q-item-side icon="school" />
               <q-item-main label="Docs" sublabel="quasar-framework.org" />
            </q-item>
            <q-item @click="launch('http://forum.quasar-framework.org')">
               <q-item-side icon="record_voice_over" />
               <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
            </q-item>
            <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
               <q-item-side icon="chat" />
               <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
            </q-item>
            <q-item @click="launch('https://twitter.com/quasarframework')">
               <q-item-side icon="rss feed" />
               <q-item-main label="Twitter" sublabel="@quasarframework" />
            </q-item>
         </q-list>
      </div>
      <div class="layout-padding logo-container non-selectable no-pointer-events">
         <div>
            <div class="layout-padding card-examples row items-start">
               <div v-for="round in rounds">
                  <q-card inline class="bigger">
                     <q-card-title >
                        {{round.name}} 
                        <q-rating slot="subtitle" v-model="stars" :max="5" />
                     </q-card-title>
                     <q-card-main v-for="item in round.matches">
                        <div slot="subtitle" class="row items-center">
                           {{item.date}}
                        </div>
                        <p>{{item.team1.name}} vs {{item.team2.name}}</p>
                     </q-card-main>
                     <q-card-separator />
                  </q-card>
               </div>
            </div>
         </div>
      </div>
   </q-layout>
</template>

<script>
import axios from "axios";
import {
  QCard,
  QToolbar,
  QListHeader,
  QToolbarTitle,
  QCardTitle,
  QLayout,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QList,
  QItem,
  QItemMain,
  QItemSide,
  QItemTile,
  QCollapsible,
  QRating,
  QBtn,
  QParallax,
  QIcon,
  QPopover,
  QVideo
} from 'quasar'
export default {
  
  mounted() {
    this.getHttp();
  },
  components: {
    QCard,
    QCardTitle,
    QListHeader,
    QToolbar,
    QToolbarTitle,
    QLayout,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QCollapsible,
    QRating,
    QBtn,
    QParallax,
    QIcon,
    QPopover,
    QVideo
  },
  data() {
    return {
      temp: "wola",
      movieData : {},
      rounds: [],
      stars: 3,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
   
    };
  },
  methods: {
    logoutAction(){
        this.$router.push('/')
    },
    getHttp() {
      let options = {
        method : "GET",
        url: "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      };
      axios(options)
        .then(res => {
          this.movieData = res.data
          this.rounds = res.data.rounds
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus">
@import '~variables'
.logout
   position:fixed;
   right:10px;
   top:5px;

.card-examples
  .q-card
    width 300px
  .bigger
    width 450px
  @media (max-width $breakpoint-xs-max)
    .q-card
      width 100%
</style>