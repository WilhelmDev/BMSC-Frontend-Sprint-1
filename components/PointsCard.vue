<template>
  <div class="d-md-flex d-block light-green-bg" v-if="pointsCard">
    <div class="mx-8 py-6 order-2">
      <h1 v-html="pointsCard.title"></h1>
      <div class="big-text" v-html="pointsCard.description"></div>
      <div class="white-box pa-4 my-2">
        <h6 class="black-text mb-2">Consulta tus puntos</h6>
        <div class="d-flex">
          <v-text-field
            v-model="documentNumber"
            label="Ingresa tu carnet de identidad: Ej.: 1234567LP"
            required
            solo
            class="mr-8 bm-text-field"
          ></v-text-field>
          <v-btn color="bm-light" @click="getPoints">Consultar <v-icon class="icon-btn-arrow"></v-icon></v-btn>
        </div>

      </div>
      <div
        class="strong-small-text green-md-text cursor-pointer my-4"
        @click="downloadItem(pointsCard.fileUrl, pointsCard.title)"
      >{{pointsCard.buttonName}}</div>
    </div>
    <v-img
      :src="pointsCard.mainImageUrl"
      :alt="pointsCard.imgAlt1"
    />
    <v-dialog
      v-model="dialog"
      max-width="600"
      style="z-index: 1001"
    >
      <v-card class="pa-8">
        <v-row justify="end">
            <img :src="require('@/assets/images/close.svg')" style="cursor: pointer; margin-top: -10px" @click="dialog=false"/>
        </v-row>
        <div class="strong-big-text green-text mb-4">
          Puntos acumulados
        </div>
        <div class="d-flex">
          <div class="pr-4 separator mb-4">
            <div class="strong-big-text grey-md-text">Nombre de cliente</div>
            <div class="regular-text">{{titleData.name}}</div>
          </div>
          <div class="pl-4">
          <div class="strong-big-text grey-md-text">Grupo</div>
            <div class="regular-text">{{titleData.group}}</div>
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :items="clubPointsData"
          :items-per-page="5"
          disable-sort
          class="points-table point-card-table"
        >
          <template slot="no-data">
            <div><p>No hay datos disponibles.</p></div>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="errorSnackbar"
      top
      light
      style="z-index: 1100"
    >
      No se pudo conectar. Por favor, vuelve a intentarlo más tarde.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#3a7652"
          text
          v-bind="attrs"
          @click="errorSnackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import {REQUEST_GET_BENEFIT_CLUB_POINTS} from "@/constants_actions";
import axios from "axios";

export default {
  props: {
    pointsCard: Object
  },
  data() {
    return {
      dialog: false,
      documentNumber: undefined,
      clubPoints: {},
      errorSnackbar: false,
      headers: [
        {
          text: 'Detalle',
          align: 'start',
          value: 'categoria',
          groupable: false,
        },
        { text: '', value: 'accion', align: 'start'},
        { text: 'Puntos', value: 'puntos', align: 'start'},
      ],
      details: [
        {
          detail: 'Total período anterior',
          description: '2020/08',
          points: '2',
        },
        {
          detail: 'Débito automático',
          description: 'Dau - pago servicios',
          points: '2',
        },
        {
          detail: 'Banca móvil',
          description: 'BM - pagar servicios',
          points: '5',
        },
        {
          detail: 'Tarjeta de débito',
          description: 'Consumo compras nacionales',
          points: '48',
        },
        {
          detail: 'Manual decisión del banco',
          description: 'Bonificación',
          points: '48',
        },
        {
          detail: 'Total a la fecha',
          description: '2020/09/21',
          points: '1493',
        },
      ]
    }
  },
  methods: {
    async getPoints() {
      await this.$store.dispatch(`benefitClub/${REQUEST_GET_BENEFIT_CLUB_POINTS}`, [{ documentNumber: this.documentNumber }, this])
      this.dialog = true;
    },
    downloadItem (url,title) {
      const element = document.getElementById('redeemAndAddPoints');
      element.scrollIntoView();
      /*let label = this.getRawValueFromCardTitle(title);
      axios.get(url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);*/
    },
    getRawValueFromCardTitle(title) {
      if(title) return title.substring(3,title.length-4);
      return "";
    }
  },
  computed: {
    clubPointsData() {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getBenefitClubPoints"]));
      return sectionList;
    },
    titleData() {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getBenefitClubPoints"]));
      if(sectionList.length === 0) {
        sectionList = [
          {
            "documentoId":"",
            "nombre":"",
            "grupo":"",
            "secuencia":0,
            "categoria":"",
            "accion":"",
            "puntos":0
          }
        ]
      }
      const res = {
        name: sectionList[0]['nombre'],
        group: sectionList[0]['grupo']
      };
      //console.log('TITLE DATA: ',res);
      return res;
    },
    benefitClubPointsError() {
      let showError = JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getBenefitClubPointsError"]));
      return showError;
    }
  },
  watch: {
    clubPointsRemote(value) {
      this.clubPoints = value;
    },
    benefitClubPointsError(value) {
      this.errorSnackbar = value;
    }
  },
  created() {
    //console.log(this.pointsCard);
  }
}
</script>
