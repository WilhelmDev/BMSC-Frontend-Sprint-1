<template>
  <v-container class="chart" v-if="rankingPromoSwitch">
    <v-row class="text-center">
      <v-col>
        <BracketBanx
          :text1="'Ranking de'"
          :text2="'promos'"
          :bracket-color="'#A7D342'"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col
        v-for="(city, i) in this.getCities()"
        :key="i"
        class="col-auto"
      >
        <span class="strong-regular-text"
              style="color: #0281CA; cursor: pointer"
              @click="chooseCity(city)"
        >
          {{ city }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <client-only>
          <vueApexCharts
            width="100%"
            height="500"
            type="bar"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* Docs:
 https://codesandbox.io/embed/qzjkzmzxoj
 https://apexcharts.com/docs/vue-charts/
 */
import BracketBanx from "~/components/BracketBanx";
import Box from "@/components/Box";
import {UPDATE_STATE_ACTION_RANKING_PROMO} from "~/constants_actions";

export default {
  name: 'Chart',
  components: {
    Box,
    BracketBanx,
    vueApexCharts: () =>
      process.client ? import('vue-apexcharts') : Promise.resolve({ render: (h) => h('div') }),
  },
  async mounted() {
    // todo: enable de following dispatch when http://3.233.183.218:3000/api/bmscservices/banx is ready
    await this.$store.dispatch(`banx/${UPDATE_STATE_ACTION_RANKING_PROMO}`,[this]);
    let cities = this.getCities();
    if(cities.length > 0) {
      this.chooseCity(cities[0])
    }
  },
  computed: {
    rankingPromo() {
      const sectionList = this.$store.getters['banx/getPromoRaking'];
      return sectionList;
    },
    rankingPromoSwitch() {
      const sectionList = this.$store.getters['banx/getPromoRaking'];
      return sectionList.length !== 0;
    }
  },
  methods: {
    getCities() {
      const filteredArr = this.rankingPromo.reduce((acc, current) => {
        const x = acc.find(item => item.departamento === current.departamento);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return filteredArr.map(item => item.departamento);
    },
    chooseCity(city) {
      const schoolByCity = this.rankingPromo.filter(item => item.departamento === city);
      let schools = [];
      for (let i = 0; i < schoolByCity.length; i++) {
        schools.push({
          x: schoolByCity[i]['nombreColegio'],
          y: schoolByCity[i]['puntosAcumulados'],
          promoName: schoolByCity[i]['nombrePromocion'],
          turno: schoolByCity[i]['turno']
        });
      }
      this.series =
        [{
          name: " ",
          data: schools
        }];

    }
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'bar'
        },
        xaxis: {
          type: 'category',
          labels: {
            rotate: -50,
            minHeight: 200,
            style: {
              fontSize: '10px'
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '9px',
            fontWeight: 'bold',
          },
        },
        tooltip: {
          custom: function (opts) {
            const data = opts.ctx.w.config.series[opts.seriesIndex].data[
              opts.dataPointIndex
              ];
            return '<div class="arrow_box pa-1" style="background: linear-gradient(90.53deg, #4A3CDB -1.59%, #FF0A6C 100%); color: white">' +
              '<span> <strong> Nombre de la promo: </strong>' + data.promoName + '</span>' +
              '<br/>' + '<span><strong> Turno: </strong>' + data.turno + '</span>' +
              '<br/>' + '<span><strong> Puntos: </strong>' + data.y + '</span>' +
              '</div>';
          }
        }
      },
      series: [],

      promoRaking: [
        {
          "nombrePromocion": "IMMANENT 2018",
          "puntosAcumulados": 484766,
          "turno": "Mañana",
          "nombreColegio": "SAINT ANDREWS SCCHOOL",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "INFINITE FIRE",
          "puntosAcumulados": 382263,
          "turno": "Mañana",
          "nombreColegio": "HUGHES SCHOOLS",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "PRE PROMOCION 2019",
          "puntosAcumulados": 263900,
          "turno": "Mañana",
          "nombreColegio": "SAINT ANDREWS SCCHOOL",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "SAVIOR'S ",
          "puntosAcumulados": 235870,
          "turno": "Mañana",
          "nombreColegio": "SAGRADO CORAZON DE JESUS",
          "departamento": "CHUQUISACA"
        },
        {
          "nombrePromocion": "PRE-PROMOCION EINHAT",
          "puntosAcumulados": 197366,
          "turno": "Mañana",
          "nombreColegio": "LA SALLE",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PROMOCION EINFACH",
          "puntosAcumulados": 148339,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO JUAN PABLO II",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "GENIUS",
          "puntosAcumulados": 104020,
          "turno": "Mañana",
          "nombreColegio": "SANTA ANA",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "NATUS VINCERE",
          "puntosAcumulados": 103069,
          "turno": "Mañana",
          "nombreColegio": "LA SALLE",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PRE PROMOCION ENFFACH 2019",
          "puntosAcumulados": 88515,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO FRANCO BOLIVIANO",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "MMXIX",
          "puntosAcumulados": 87200,
          "turno": "Mañana",
          "nombreColegio": "SANTA CRUZ COOPERATIVE SCHOOL",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PRE PROMOCION MOCOS",
          "puntosAcumulados": 83208,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO HORIZONTES",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "SUEM",
          "puntosAcumulados": 76866,
          "turno": "Tarde",
          "nombreColegio": "SIMON RODRIGUEZ",
          "departamento": "CHUQUISACA"
        },
        {
          "nombrePromocion": "2018 AZUL",
          "puntosAcumulados": 53117,
          "turno": "Mañana",
          "nombreColegio": "DON BOSCO",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "PORTATORI DI CRISTO",
          "puntosAcumulados": 52133,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO SEMINARIO SAN CRISTOBAL",
          "departamento": "CHUQUISACA"
        },
        {
          "nombrePromocion": "SWAT AGUSTINA",
          "puntosAcumulados": 50590,
          "turno": "Mañana",
          "nombreColegio": "SAN AGUSTIN",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "ALESUS",
          "puntosAcumulados": 46100,
          "turno": "Mañana",
          "nombreColegio": "JUAN ENRIQUE PESTALOZZI",
          "departamento": "CHUQUISACA"
        },
        {
          "nombrePromocion": "PRE PROMOCION MONTESSORI",
          "puntosAcumulados": 45645,
          "turno": "Mañana",
          "nombreColegio": "MONTESSORI",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PROMOCION 2018",
          "puntosAcumulados": 37618,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO CUMBRE",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PROMO SHUHEF",
          "puntosAcumulados": 36150,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO FRANCO BOLIVIANO",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "ELYSIAN",
          "puntosAcumulados": 34055,
          "turno": "Mañana",
          "nombreColegio": "AMERICAN COOPERATIVE SCHOOL",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PRE- PROMOCION ENDLICH",
          "puntosAcumulados": 33647,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ALEMAN",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PRE PROMOCION - SHUEFF",
          "puntosAcumulados": 33120,
          "turno": "Mañana",
          "nombreColegio": "MAYOR SAN LORENZO",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "SHAFERS",
          "puntosAcumulados": 32038,
          "turno": "Mañana",
          "nombreColegio": "MUYURINA",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "AUGENBLICK",
          "puntosAcumulados": 31900,
          "turno": "Mañana",
          "nombreColegio": "ALEXANDER VON HUMBOLDT",
          "departamento": "CHUQUISACA"
        },
        {
          "nombrePromocion": "PRE PROMOCION COLEGIO PAULO VI",
          "puntosAcumulados": 25900,
          "turno": "Mañana",
          "nombreColegio": "PAULO VI",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "INDELEBLIS",
          "puntosAcumulados": 24300,
          "turno": "Mañana",
          "nombreColegio": "MONTESSORI",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "KAIROS 2018",
          "puntosAcumulados": 23359,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO SAN CALIXTO",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PROMOCION 2018",
          "puntosAcumulados": 22188,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ALEMAN MARISCAL BRAUN",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PROMOCION SCHAFFER",
          "puntosAcumulados": 21780,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO DON BOSCO",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "SAN JUAN PABLO II",
          "puntosAcumulados": 21445,
          "turno": "Mañana",
          "nombreColegio": "LA SALLE TARIJA",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "NATUS VINCERE",
          "puntosAcumulados": 21225,
          "turno": "Mañana",
          "nombreColegio": "JOSEFA MANUELA GANDARILLAS",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "PRE-PROMOCION",
          "puntosAcumulados": 21106,
          "turno": "Mañana",
          "nombreColegio": "ESPANA",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "SUICIDE SQUAD ",
          "puntosAcumulados": 20900,
          "turno": "Tarde",
          "nombreColegio": "LINDAURA ANZOATEGUI DE CAMPERO 1",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "SWATS",
          "puntosAcumulados": 20900,
          "turno": "Mañana",
          "nombreColegio": "BAUTISTA",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "NEXUS ",
          "puntosAcumulados": 20900,
          "turno": "Tarde",
          "nombreColegio": "MARIA LAURA JUSTINIANO 2",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "PREPROMO 2019",
          "puntosAcumulados": 18054,
          "turno": "Mañana",
          "nombreColegio": "TIQUIPAYA",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "ARTIUM",
          "puntosAcumulados": 17900,
          "turno": "Tarde",
          "nombreColegio": "COLEGIO HORIZONTES",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "DOMINIOS ILUMINATEO MEA",
          "puntosAcumulados": 15900,
          "turno": "Mañana",
          "nombreColegio": "NUESTRA SENORA DE ITATI",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "LA SALLE PRE- PROMOCION",
          "puntosAcumulados": 15002,
          "turno": "Mañana",
          "nombreColegio": "LA SALLE",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "NEXUS ",
          "puntosAcumulados": 15000,
          "turno": "Mañana",
          "nombreColegio": "NACIONAL SAN LUIS",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "PROMOCION 2019",
          "puntosAcumulados": 12001,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO INTEGRAL BOLIVIANO ACHUMANI",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PRE PROMOCION COLEGIO CUMBRE",
          "puntosAcumulados": 11378,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO CUMBRE",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "PRE PROMOCION FAREM ",
          "puntosAcumulados": 11300,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ADVENTISTA TRINIDAD",
          "departamento": "BENI"
        },
        {
          "nombrePromocion": "ALWAYS TOGETHER NEVER FORGOTTEN (ATNF)",
          "puntosAcumulados": 11140,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ISAAC ATTIE",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "PRE PROMO EINIGKEIT",
          "puntosAcumulados": 10913,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ALEMAN MARISCAL BROWN",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "SENIOR CLASS",
          "puntosAcumulados": 10900,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO EVANGELICO METODISTA JUAN WESLEY",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PROMO 2018 BOLIVIANO JAPONES",
          "puntosAcumulados": 10900,
          "turno": "Mañana",
          "nombreColegio": "BOLIVIANO JAPONES",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PROMOCION FREIHEIT ",
          "puntosAcumulados": 10900,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ALEXANDER VON HUMBOLD",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "DERSHATS",
          "puntosAcumulados": 10900,
          "turno": "Mañana",
          "nombreColegio": "SAGRADO CORAZON DE MARIA",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PROMOCION 2019",
          "puntosAcumulados": 10505,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ANGLO AMERICANO",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "LA SALLISTAS DE CORAZON 2018",
          "puntosAcumulados": 10216,
          "turno": "Tarde",
          "nombreColegio": "LA SALLE CONVENIO",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "PHYSIUS",
          "puntosAcumulados": 10201,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO BOLIVIANO ALEMÁN",
          "departamento": "CHUQUISACA"
        },
        {
          "nombrePromocion": "TEIHEN'S",
          "puntosAcumulados": 10200,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO BILINGUE DOMINGO SAVIO",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "SEINETZ",
          "puntosAcumulados": 10164,
          "turno": "Mañana",
          "nombreColegio": "SAINT GEORGE",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "TOF",
          "puntosAcumulados": 10038,
          "turno": "Tarde",
          "nombreColegio": "TERCERA ORDEN FRANCISCANA",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "HALCONES 2018",
          "puntosAcumulados": 10021,
          "turno": "Mañana",
          "nombreColegio": "SANTA TERESA",
          "departamento": "LA PAZ"
        },
        {
          "nombrePromocion": "NON EST FINIS",
          "puntosAcumulados": 10000,
          "turno": "Mañana",
          "nombreColegio": "LOYOLA",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "PROMOCION 2018 COLEGIO BELGRANO",
          "puntosAcumulados": 10000,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO BELGRANO",
          "departamento": "TARIJA"
        },
        {
          "nombrePromocion": "PRE PROMOCION ZEUTECH",
          "puntosAcumulados": 10000,
          "turno": "Mañana",
          "nombreColegio": "COLEGIO ALEXANDER VON HUMBOLD",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "ZEINHERS",
          "puntosAcumulados": 10000,
          "turno": "Mañana",
          "nombreColegio": "CRISTO REY",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "PRE PROMOCION SUANHET",
          "puntosAcumulados": 9710,
          "turno": "Mañana",
          "nombreColegio": "LYCEE FRANCAIS DE SANTA CRUZ",
          "departamento": "SANTA CRUZ"
        },
        {
          "nombrePromocion": "YOUNG AND FREE",
          "puntosAcumulados": 3006,
          "turno": "Mañana",
          "nombreColegio": "CARACHIPAMPA",
          "departamento": "COCHABAMBA"
        },
        {
          "nombrePromocion": "LEDGERS",
          "puntosAcumulados": 337,
          "turno": "Mañana",
          "nombreColegio": "MAYOR SANTO TOMAS DE AQUINO",
          "departamento": "SANTA CRUZ"
        }
      ]
    }
  },
}
</script>
