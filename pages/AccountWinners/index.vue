<template>
  <div :class="`${ns} px-4 px-sm-16`">
    <v-breadcrumbs
      :items="breadcrumbs"
      divider=">"
      class="px-0"
    ></v-breadcrumbs>
    <h2 class="black-text">Ganadores de la Súper Makro Cuenta</h2>
    <div class="search-input py-8">
      <v-icon class="icon-search"></v-icon>
      <input
        type="text"
        v-model="searchText"
        class="w-50"
        placeholder="Buscar"
        @keyup="loadPageData"
      />
    </div>
    <v-data-table
      :headers="tableHeaders"
      :items="peopleData"
      :search="searchText"
      hide-default-footer
      v-data-table
    >
      <template slot="no-data">
        No hay información
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <span class="font-weight-bold">{{ item.name }}</span>
      </template>
    </v-data-table>

    <v-row :justify="paginationJustify" class="mt-5 mb-5 mr-15 ml-10">
      <v-col cols="4" v-if="this.page !== 1">
        <v-row justify="start">
          <v-icon left class="icon-left-arrow"></v-icon>
          <div
            :class="`${ns}__pagination`"
            @click="goToPreviousPage"
          >Del {{indexFirstPersonPrevious}} al {{indexLastPersonPrevious}}</div>
        </v-row>
      </v-col>
      <v-col cols="4" v-if="isNextButtonDisabled">
        <v-row justify="end">
          <div
            :class="`${ns}__pagination`"
            @click="goToNextPage"
          >Del {{indexFirstPersonNext}} al {{indexLastPersonNext}}</div>
          <v-icon right class="icon-right-arrow"></v-icon>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {TECH_API_MARKET, TECH_BANNER, TECH_PROGRAMS} from "~/cardListKeys/tech";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {PEOPLE} from "~/cardListKeys/accountWinners";
import moment from "moment";
import {getHeader} from "~/utils/seo";

export default {
  data() {
    return {
      ns:"accountWinners",
      breadcrumbs: [
        {
          text: "Súper Makro Cuenta",
          disabled: false
        },
        {
          text: "Lista de ganadores",
          disabled: true
        }
      ],
      page: 1,
      limit: 20,
      searchText: "",
      tableHeaders: [
        {
          text: "Fecha",
          value: "date",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Nombre del ganador",
          value: "name",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Cupón",
          value: "coupon",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Monto",
          value: "amount",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        }
      ]
    };
  },
  async mounted() {
    await this.loadPageData();
  },
  computed: {
    peopleData: function () {
      let dataList = this.$store.getters["accountWinners/getList"](PEOPLE);
      //console.log('datalist: ',dataList);

      const formatNumber = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    let arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join(','): arr[0];
  }

      if(!dataList['meta'] || dataList['meta']['itemCount'] === 0) {
        return [];
      }
      let sectionList = dataList['items'];
      if (sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = sectionList.map(people => {
        return {
          ...people,
          date: moment(people['date']).format('DD/MM/YYYY'),
          amount: people['amount']+" "+people['currencyAmount']
        }
      })
      res = res.map (e => {
        let amount = formatNumber(e.amount)
        return {...e, amount}
      })
      console.log(res)
      return res;
    },
    metaData: function () {
      return this.$store.getters["accountWinners/getList"](PEOPLE)['meta'];
    },
    isNextButtonDisabled() {
      return !(this.metaData['totalPages'] === this.page);
    },
    indexFirstPersonPrevious: function () {
      return this.indexLastPersonPrevious - this.limit + 1;
    },
    indexLastPersonPrevious: function () {
      return this.indexFirstPersonNext - 1;
    },
    indexFirstPersonNext: function () {
      return (this.page * this.limit) - this.limit + 1;
    },
    indexLastPersonNext: function () {
      return this.page * this.limit;
    },
    paginationJustify: function () {
      return this.page === 1 ? "end" : "space-between"
    }
  },
  methods: {
    async loadPageData() {
      await this.$store.dispatch
      (`accountWinners/${UPDATE_STATE_ACTION}`,[this.page,this.limit,this.searchText,this]);
    },
    goToPreviousPage() {
      this.page = this.page - 1;
      this.loadPageData();
    },
    goToNextPage() {
      this.page = this.page + 1;
      this.loadPageData();
    },
    setPageToFirst() {
      this.page = 1;
      this.loadPageData();
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
};
</script>
