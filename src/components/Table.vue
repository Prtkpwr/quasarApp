<template>
  <div class="layout-padding">
    

    <q-data-table
      :data="table"
      :config="config"
      :columns="columns"
      @refresh="refresh"
      @selection="selection"
      @rowclick="rowClick"
    >
      <template slot="col-message" slot-scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <template slot="col-source" slot-scope="cell">
        <div v-if="cell.data === 'Audit'" class="my-label text-white bg-primary">
          Audit
          <q-tooltip>Some data</q-tooltip>
        </div>
        <div v-else class="my-label text-white bg-negative">{{cell.data}}</div>
      </template>

      <template slot="selection" slot-scope="props">
        <q-btn flat color="primary" @click="changeMessage(props)">
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
        </q-btn>
      </template>
    </q-data-table>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import {
  QDataTable,
  QField,
  QInput,
  QCheckbox,
  QSelect,
  QSlider,
  QBtn,
  QIcon,
  QTooltip,
  QCollapsible,
  clone
} from 'quasar'
// import table from '@/matches.json'
export default {
  components: {
    QDataTable,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QSlider,
    QBtn,
    QIcon,
    QTooltip,
    QCollapsible
  },
  methods: {
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
              this.table.push({
                team1:res.data.rounds[x].matches[z].team1.name,
                team2:res.data.rounds[x].matches[z].team2.name,
                date:res.data.rounds[x].matches[z].date
              })
// 
            }
          }
          console.log(this.table)
          // this.totalPages = Math.ceil(this.rounds.length / this.pageLimit);
          // this.maxPages = this.totalPages;
          // this.secondLastPage = Math.floor(this.rounds.length / this.pageLimit);
          // console.log(this.totalPages, this.secondLastPage);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeMessage (props) {
      props.rows.forEach(row => {
        row.data.message = 'Gogu'
      })
    },
    deleteRow (props) {
      props.rows.forEach(row => {
        this.table.splice(row.index, 1)
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
    },
    rowClick (row) {
      console.log('clicked on a row', row)
    }
  },
    mounted() {
    this.getHttp();
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  data () {
    return {
      table:[],
      // table,
      config: {
        title: 'Data Table',
        refresh: true,
        noHeader: false,
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50]
        },
        selection: 'multiple'
      },
      columns: [
        {
          label: 'Date',
          field: 'date',
          width: '200px',
          classes: 'bg-orange-2',
          filter: true,
          sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return new Date(value).toLocaleString()
          }
        },
        {
          label: 'Team1',
          field: 'team1',
          sort: true,
          // format (value) {
          //   if (value === 'Informational') {
          //     return '<i class="material-icons text-positive" style="font-size: 22px">info</i>'
          //   }
          //   return value
          // },
          width: '200px',
          type:'string'
        },
        {
          label: 'Team2',
          field: 'team2',
          width: '200px',
          sort: true,
          type: 'string'
        },
        {
          label: 'Message',
          field: 'message',
          filter: true,
          sort: true,
          type: 'string',
          width: '500px'
        },
        {
          label: 'Source',
          field: 'source',
          filter: true,
          sort: true,
          type: 'string',
          width: '120px'
        },
        {
          label: 'Log Number',
          field: 'log_number',
          sort: true,
          type: 'string',
          width: '100px'
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  },
  watch: {
    pagination (value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination)
        this.config.pagination = false
        return
      }
      this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
      this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
      let style = {}
      if (this.bodyHeightProp !== 'auto') {
        style[this.bodyHeightProp] = value + 'px'
      }
      this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
      let style = {}
      if (value !== 'auto') {
        style[value] = this.bodyHeight + 'px'
      }
      this.config.bodyStyle = style
    }
  }
}
</script>

<style lang="stylus">
.my-label
  padding 5px
  border-radius 3px
  display inline-block
</style>