<template>
  <div class="listed-products pa-0 pa-sm-4">
    <h2 class="text-center pt-4 pt-md-12" v-if="showTitle">¿Qué necesitas hoy?</h2>
    <div class="pb-8">
      <v-carousel
        hide-delimiters
        show-arrows
        class="card-slider"
        height="250px"
        next-icon="icon-right-arrow"
        prev-icon="icon-left-arrow"
        light
      >
        <v-carousel-item v-for="(product, index) in productList" :key="index">
         <v-row justify="center">
           <v-card class="product-card ma-4" @click="redirectTo(product)">
             <v-img :src="product.mainImageUrl" :alt="product.imgAlt1"></v-img>
             <h5 v-html="product.title" style="margin-top: 5px"/>
             <div class="regular-text" style="margin-top: 6px">{{ product.description }}</div>
           </v-card>
         </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productList: Array,
    showTitle: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    redirectTo(item) {
      this.$router.push({
        path: item.buttonHref
      });
    }
  }
};
</script>
