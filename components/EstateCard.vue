<template>
  <div class="bm-estate-card">
    <div class="featured mr-4 mt-4" v-if="data['destacado']">
      <div class="strong-small-text green-md-text px-2"> Destacado </div>
    </div>
    <v-img
      :src="cardImage"
      class="image cursor-pointer"
      @click="goToDetails(data.id)"
    ></v-img>
    <v-row class="py-4 px-8 d-block cursor-pointer" @click="goToDetails(data.id)">
      <div class="big-text pb-2"> {{data['nombre']}} </div>
      <div class="strong-regular-text"> {{getCurrencySymbol(data['monedaBien'])+" "+new Intl.NumberFormat('de-DE').format(data['precioBien'])}} </div>
      <div class="small-text green-text pb-2"> Código: {{data['codigo']}} </div>
      <div class="small-text pb-2"> {{totalArea}}
      </div>
      <div> {{location}} </div>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    data: Object
  },
  data() {
    return {
    };
  },
  methods: {
    goToDetails(id) {
      this.$router.push({
        path: "/additionalInfo/estateDetails",
        query: { estateId: id }
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
      if(this.data['superficieConstruccion'] < 0) {
        return '';
      }
      return `${this.data['superficieConstruccion']} m2`;
    },
    groundArea() {
      if(this.data['superficieTerreno'] < 0) {
        return '';
      }
      return `${this.data['superficieTerreno']} m2`;
    },
    totalArea() {
      if(this.constructionArea.length === 0 && this.groundArea.length === 0) return '';
      if(this.groundArea.length === 0) return 'Sup. construida:' + this.constructionArea;
      if(this.constructionArea.length === 0) return 'Sup. terreno:' + this.constructionArea;
      return 'Sup. terreno:' + this.groundArea + '|sup. construida:' + this.constructionArea;
    },
    location() {
      if(this.data['zona'].length === 0 && this.data['ciudad'].length === 0) {
        return '';
      }
      if(this.data['zona'].length === 0) {
        return this.data['ciudad'];
      }
      if(this.data['ciudad'].length === 0) {
        return this.data['zona'];
      }
      return this.data['zona']+', '+this.data['ciudad'];
    },
    cardImage() {
      return this.data['mainImageUrl'].length === 0? require("@/assets/images/missingEstateImage.png") : this.data['mainImageUrl'];
    }
  }
};
</script>
