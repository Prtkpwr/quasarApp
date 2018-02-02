<template>
<div>
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
   <q-pagination @click="paginationAction" v-model="page" :min="minPages" :max="maxPages" />
   </div>
</template>

<script>
import _ from 'lodash';

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
  QVideo,
  Loading,
  QSpinnerGears,
  QPagination,
  QChip
} from "quasar";
export default {
  components: {
    QCard,
    QChip,
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
    QVideo,
    Loading,
    QSpinnerGears,
    QPagination
  },

  mounted() {
    this.getHttp();
  },

  data() {
    return {
      page: 1,
      minPages: 1,
      maxPages: 19,
      temp: "wola",
      movieData: {},
      rounds: [],
      stars: 3,
      pageLimit: 2,
      totalPages: 0,
      secondLastPage: 0,
      team:[],

      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {

    tableData () {
     return _.map(this.employees, (employee) => {
       return {id: employee.id, name: employee.name, bossName: employee.boss.name}
     })
  },
    logoutAction() {
      this.$router.push("/");
    },
    getHttp() {
      let options = {
        method: "GET",
        url:
          "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      axios(options)
        .then(res => {
          this.movieData = res.data;
          this.rounds = res.data.rounds;
          for(let x in res.data.rounds){
            for(let z in res.data.rounds[x].matches){
              // console.log()
              // res.data.rounds[x].matches[z].team1.name = this.team1;
              // res.data.rounds[x].matches[z].team2.name = this.team2;
              // res.data.rounds[x].matches[z].date = this.date;
              this.team.push({
                team1:res.data.rounds[x].matches[z].team1.name,
                team2:res.data.rounds[x].matches[z].team2.name,
                date:res.data.rounds[x].matches[z].date
              })
// 
            }
          }
          console.log(this.team)
          // this.totalPages = Math.ceil(this.rounds.length / this.pageLimit);
          // this.maxPages = this.totalPages;
          // this.secondLastPage = Math.floor(this.rounds.length / this.pageLimit);
          // console.log(this.totalPages, this.secondLastPage);
          
        })
        .catch(err => {
          console.log(err);
        });
    },

    paginationAction() {
      console.log('hello')
    }
  }
};
</script>

<style lang="stylus">
@import '~variables';

.logout {
  position: fixed;
  right: 10px;
  top: 5px;
}

.card-examples {
  .q-card {
    width: 300px;
  }

  .bigger {
    width: 450px;
  }

  @media (max-width: $breakpoint-xs-max) {
    .q-card {
      width: 100%;
    }
  }
}
</style>