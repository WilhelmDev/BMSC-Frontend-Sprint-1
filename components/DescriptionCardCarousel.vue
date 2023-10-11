<template>
  <v-carousel
    v-model="model"
    hide-delimiter-background
    light
    class="description-carousel px-sm-4 gradient-bg-grey"
    next-icon="icon-right-arrow"
    prev-icon="icon-left-arrow"
    delimiter-icon="mdi-circle-outline"
    :cycle= "true"
    interval="5000"
    v-if="show"
  >
    <slot name="content">
      <v-carousel-item v-for="(card, index) in carouselData" :key="index" class="px-sm-10">
        <EstateDetailsCard :detailsData="card" v-if="cardType === 'estate'" />
        <DetailsCard :detailsData="card" v-else />
      </v-carousel-item>
    </slot>
  </v-carousel>
</template>
<script>
import DetailsCard from "@/components/DetailsCard.vue";
import EstateDetailsCard from "@/components/EstateDetailsCard.vue";

export default {
  props: {
    carouselData: Array,
    cardType: String
  },
  components: {
    DetailsCard,
    EstateDetailsCard
  },
  data() {
    return {
      model: 0
    };
  },
  computed: {
    show() {
      let res = true;
      if(Array.isArray(this.carouselData) && this.carouselData.length === 0) {
        res = false;
      }
      return res;
    }
  }
};
</script>
