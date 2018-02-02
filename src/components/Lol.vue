<template>
<div>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <!-- <q-card>
        <q-card-title>
          Configure
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-field
            label="Separators"
            :label-width="6"
            style="margin-top: 0"
          >
            <q-option-group
              v-model="separator"
              inline
              type="radio"
              :options="[
                {value: 'none', label: 'No separator'},
                {value: 'horizontal', label: 'Horizontal separator'},
                {value: 'vertical', label: 'Vertical separator'},
                {value: 'cell', label: 'Cell separator'}
              ]"
            />
          </q-field>

          <q-field
            label="Stripes"
            :label-width="6"
          >
            <q-option-group
              v-model="stripe"
              inline
              type="radio"
              :options="[
                {value: 'none', label: 'No Stripe'},
                {value: 'odd', label: 'Striped Odd'},
                {value: 'even', label: 'Striped Even'}
              ]"
            />
          </q-field>

          <q-field
            label="Layout Type"
            :label-width="6"
          >
            <q-option-group
              v-model="type"
              inline
              type="radio"
              :options="[
                {value: 'none', label: 'Standard'},
                {value: 'flipped', label: 'Flipped'},
                {value: 'responsive', label: 'Responsive'}
              ]"
            />
          </q-field>

          <q-field
            label="Gutter"
            :label-width="4"
          >
            <q-option-group
              v-model="gutter"
              inline
              type="radio"
              :options="[
                {value: 'none', label: 'Standard'},
                {value: 'compact', label: 'Compact'},
                {value: 'loose', label: 'Loose'}
              ]"
            />
          </q-field>

          <q-field
            label="Misc"
            :label-width="4"
          >
            <q-option-group
              v-model="misc"
              inline
              type="checkbox"
              :options="[
                {value: 'bordered', label: 'Bordered'},
                {value: 'highlight', label: 'Highlight'}
              ]"
            />
          </q-field>

          <template v-if="computedClasses.length > 0">
            <q-card-separator style="margin-top: 16px; margin-bottom: 16px;" />

            <q-field
              label="Applying CSS classes"
              :label-width="4"
            >
              <div class="group" style="margin: -5px">
                <q-chip
                  v-for="cls in computedClasses"
                  :key="cls"
                  color="secondary"
                  square
                >
                  {{cls}}
                </q-chip>
              </div>
            </q-field>
          </template>
        </q-card-main>
      </q-card> -->

      <div class="row justify-center">
        <table id="customers" style="margin-top: 30px;" class="q-table" :class="computedClasses">
          <thead>
            <tr>
              <th v-for="y in Object.keys(this.movieData[0])" class="text-left">{{y}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="x in this.movieData">
              <td v-for="y in Object.keys(x)" data-th="Name" class="text-left">{{x[y]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div id="pagination">
<q-btn color="secondary" class="btn btn-primary" @click="refresh()">Refresh</q-btn>
<q-btn color="secondary" class="btn btn-default" @click="prev()">Prev</q-btn>
<q-btn color="secondary" class="btn btn-default" @click="next()">Next</q-btn>
<q-btn color="secondary" class="btn btn-default" @click="prevChunk()">Prev Chunk</q-btn>
<q-btn color="secondary" class="btn btn-default" @click="nextChunk()">Next Chunk</q-btn>
<div >
Records:
<input type="text" @keyup="refresh()" v-model="records">
Per Page:
<input type="text" @keyup="refresh()" v-model="perpage">
</div>


  <pagination v-ref:table for="table" :per-page="PerPage" :records="Records"></pagination>
  <p v-if="!Records">No records</p>
  
<p class="note">
Check out the <a href="https://jsfiddle.net/matfish2/f5h8xwgn/" target="_blank">vue-tables</a> package, now using this pagination component.</p>
</div>
  </div>
</template>

<script>
import table from '@/matches.json'
import {
  QCheckbox,
  QOptionGroup,
  QChip,
  QField,
  QCard,
  QCardTitle,
  QCardMain,
  QCardSeparator,
  QBtn
} from 'quasar'
import axios from 'axios'
export default {
  components: {
    QCheckbox,
    QOptionGroup,
    QChip,
    QField,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QBtn
  },
  data () {
    return {
      styles: [
        '',
        'bordered',
        'horizontal-separator',
        'vertical-separator',
        'cell-separator',
        'striped-odd',
        'striped-even',
        'highlight',
        'compact',
        'loose',
        'flipped'
      ],
      misc: [],
      separator: 'none',
      stripe: 'none',
      type: 'none',
      gutter: 'none',
      rounds:[],
      movieData:[],
      table1Page:1,
    table2Page:1,
    code:'table1',
    records:100,
    perpage:10
    }
  },
  methods:{

      onPagination(e) {
			if (e) {
				this.getItems(e.page);
			} else {
				const { moviePaging } = this.$store.getters;
				// console.log('kjdkd', this.$store.getters)
				if (Object.keys(moviePaging).length > 0) {
					const { next, current, end, total } = moviePaging;
					this.options.maxResult = total;
					this.options.current = current;
					this.options.end = this.options.limit[this.helper.selectedLimitIndex];
				}
			}
		},


  	refresh: function() {
    	this.$refs.table.setPage(1);
    },
     prev: function() {
    	return this.$refs.table.prev();
    },
    next: function() {
        console.log('next', this.$refs.table.next())
    	return this.$refs.table.next();
    },
    prevChunk: function() {
    	return this.$refs.table.prevChunk();
    },
    nextChunk: function() {
    	return this.$refs.table.nextChunk();
    },
      getHttp() {
      let options = {
        method: "GET",
        url:
          "https://jsonplaceholder.typicode.com/comments",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      axios(options)
        .then(res => {
          this.movieData = res.data;
          
          console.log(this.movieData)
          
//           for(let x in res.data.rounds){
//             for(let z in res.data.rounds[x].matches){
//               // console.log()
//               // res.data.rounds[x].matches[z].team1.name = this.team1;
//               // res.data.rounds[x].matches[z].team2.name = this.team2;
//               // res.data.rounds[x].matches[z].date = this.date;
//               this.team.push({
//                 team1:res.data.rounds[x].matches[z].team1.name,
//                 team2:res.data.rounds[x].matches[z].team2.name,
//                 date:res.data.rounds[x].matches[z].date
//               })
// // 
//             }
//           }
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
  },
  ready: function() {
  	this.$on('vue-pagination::table', function(page) {
    	this.table1Page = page;	
    });
  },
  mounted() {
    this.getHttp();
  },
  computed: {

  	PerPage: function() {
    return this.perpage?parseInt(this.perpage):25;
    },
    Records: function() {
    return this.records?parseInt(this.records):0;
    },
    totalPages: function() {
    return this.$refs.table.totalPages;
    },
    computedClasses () {
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    }
  }
}
</script>
<style>
#customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: rgb(17, 240, 192);
    color: white;
}

</style>