<template>
  <div class="px-4 px-sm-16">
    <v-breadcrumbs
      :items="breadcrumbs"
      divider=">"
      class="px-0"
    ></v-breadcrumbs>
    <h2 class="black-text pb-6">Lista de agencias y Cajeros Automáticos - {{city}}</h2>
    <div class="strong-regular-text py-6"> Oficina central </div>
    <v-data-table
      :headers="tableHeaders"
      :items="tableCentralData"
      hide-default-footer
      class="mb-6"
      v-data-table
    >
      <template slot="no-data">
        No hay información
      </template>
      <template v-slot:[`item.schedules`]="{ item }">
        <v-row v-for="(schedule, index) in item.schedules" :key="index" >
          <div class="pt-1">{{schedule}}</div>
        </v-row>
      </template>
    </v-data-table>
    <div class="strong-regular-text py-6 mb-6"> Oficinas secundarias </div>
    <v-data-table
      :headers="tableHeaders"
      :items="tableSecondaryData"
      :footer-props="{
        'items-per-page-text': 'Filas por página'
      }"
      v-data-table
    >
      <template slot="no-data">
        No hay información
      </template>
      <template v-slot:[`item.schedules`]="{ item }">
        <v-row v-for="(schedule, index) in item.schedules" :key="index" v-if="item.schedules.length > 0">
          <div class="pt-1">{{schedule ? schedule : ''}}</div>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {AGENCY, ATM} from "~/cardListKeys/help";
import {agencyAtmTimeToString, objectToOldFormat} from "~/utils/timeUtils";
import {getHeader} from "~/utils/seo";

export default {
  data() {
    return {
      city: "",
      departmentMap: "",
      breadcrumbs: [
        {
          text: "Agencias y cajeros",
          disabled: false
        },
        {
          text: "Lista de agencias y Cajeros Automáticos - La Paz",
          disabled: true
        }
      ],
      tableHeaders: [
        {
          text: "Zona",
          value: "location",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Dirección",
          value: "address",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Horarios",
          value: "schedules",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Teléfonos",
          value: "phone",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        }
      ]
    };
  },
  created() {
    this.city = this.$route.query.city;
    //console.log('Loading city: ',this.city);
  },
  mounted() {
    this.loadAgencyData();
  },
  computed: {
    tableCentralData: function () {
      let agencies = JSON.parse(JSON.stringify(this.$store.getters["help/getList"](AGENCY)));
      let atms = JSON.parse(JSON.stringify(this.$store.getters["help/getList"](ATM)));
      let departmentMap= {};
      agencies = agencies.filter(agency => agency['esPrincipal']).map(agency => {
        const schedules = agencyAtmTimeToString(agency['horarioAtencion']);
        return {
          location: agency['zona'],
          address: agency['direccion'],
          schedules: schedules,
          //schedules: agencyAtmTimeToString("Lun-Vie%09:00%13:00,Sab-Dom%08:00%12:00"),
          phone: agency['telefono'],
          city: agency['ciudad']
        }
      });
      let res = [...agencies].filter(item => item['city'] === this.city);

      //console.log(AGENCY+" "+ATM, res);
      return res;
    },
    tableSecondaryData: function () {
      let agencies = JSON.parse(JSON.stringify(this.$store.getters["help/getList"](AGENCY)));
      let atms = JSON.parse(JSON.stringify(this.$store.getters["help/getList"](ATM)));
      agencies = agencies.filter(agency => !agency['esPrincipal']).map(agency => {
        const schedules = agencyAtmTimeToString(agency['horarioAtencion']);
        return {
          location: agency['zona'],
          address: agency['direccion'],
          schedules: schedules,
          //schedules: agencyAtmTimeToString("Lun-Vie%09:00%13:00,Sab-Dom%08:00%12:00"),
          phone: agency['telefono'],
          city: agency['ciudad']
        }
      });
      atms = atms.map(atm => {
        const schedules = agencyAtmTimeToString(atm['horarioAtencion']);
        return {
          location: atm['zona'],
          address: atm['direccion'],
          schedules: schedules,
          //schedules: agencyAtmTimeToString("Lun-Vie%09:00%13:00,Sab-Dom%08:00%12:00"),
          phone: atm['telefono'],
          city: atm['ciudad']
        }
      });
      let res = [...agencies,...atms].filter(item => item['city'] === this.city);

      // console.log(AGENCY+" "+ATM, res);
      return res;
    }
  },
  methods: {
    async loadAgencyData(){
      await this.$store.dispatch(`help/${UPDATE_STATE_ACTION}`,[AGENCY, this]);
      await this.$store.dispatch(`help/${UPDATE_STATE_ACTION}`,[ATM, this]);
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    return header;
  },
  head () {return this.headData}
};
</script>
