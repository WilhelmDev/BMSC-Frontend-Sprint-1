<template>
  <v-carousel
    v-model="model"
    hide-delimiter-background
    light
    class="estate-description-carousel px-sm-4"
    next-icon="icon-right-arrow"
    prev-icon="icon-left-arrow"
    delimiter-icon="mdi-circle-outline"
    :height="$vuetify.breakpoint.xsOnly? '650px':'500px'"
    cycle
  >
    <slot name="content">
      <v-carousel-item v-for="(card, index) in carouselData" :key="index" style="min-height: 100%;">
        <EstateDetailsCard :detailsData="card"/>
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
  }
};
</script>
