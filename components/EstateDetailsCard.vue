<template>
  <v-row class="d-flex align-center" style="min-height: 100%;" align="center" align-content="center">
    <v-col cols="12" sm="5" class="px-6 pl-sm-16 pr-sm-4 flex-grow-1">
      <div class="strong-big-text">{{ detailsData['nombre'] }}</div>
      <h2 class="py-5 black-text">
        {{ getCurrencySymbol(detailsData['monedaBien'])+" "
      +new Intl.NumberFormat('de-DE').format(detailsData['precioBien']) }}
      </h2>
      <div>
        <div class="pb-4"> {{totalArea}}</div>
        <div> {{location}} </div>
      </div>
      <div class="pt-8">
        <v-btn depressed color="bm-medium px-10" @click="goToDetails(detailsData.id)">
          Ver m&aacute;s
          <v-icon right class="icon-btn-arrow"></v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" sm="7" class="pr-md-8" style="background-color: rgba(213,219,217,.19);">
      <v-row align="center" style="height: 450px">
        <v-col cols="12">
          <v-img :src="detailsData.mainImageUrl" class="mx-auto" style="width: fit-content;"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    detailsData: Object
  },
  methods: {
    goToDetails(id) {
      this.$router.push({
        path: `/AdditionalInfo/EstateDetails?estateId=${id}`
      });
    },
    getCurrencySymbol(currency) {
      return {
        "DÓLARES": "$us",
        "BOLIVIANOS": "Bs."
      }[currency]
    }
  },
  computed: {
    constructionArea() {
      if(this.detailsData['superficieConstruccion'] < 0) {
        return '';
      }
      return `${this.detailsData['superficieConstruccion']} m2`;
    },
    groundArea() {
      if(this.detailsData['superficieTerreno'] < 0) {
        return '';
      }
      return `${this.detailsData['superficieTerreno']} m2`;
    },
    totalArea() {
      if(this.constructionArea.length === 0 && this.groundArea.length === 0) return '';
      if(this.groundArea.length === 0) return 'Sup. construida:' + this.constructionArea;
      if(this.constructionArea.length === 0) return 'Sup. terreno:' + this.constructionArea;
      return 'Sup. terreno:' + this.groundArea + '|sup. construida:' + this.constructionArea;
    },
    location() {
      if(this.detailsData['zona'].length === 0 && this.detailsData['ciudad'].length === 0) {
        return '';
      }
      if(this.detailsData['zona'].length === 0) {
        return this.detailsData['ciudad'];
      }
      if(this.detailsData['ciudad'].length === 0) {
        return this.detailsData['zona'];
      }
      return this.detailsData['zona']+', '+this.detailsData['ciudad'];
    }
  }
};
</script>
