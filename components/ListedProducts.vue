<template>
  <div class="listed-products pa-0 pa-sm-4">
    <h2 class="text-center pt-4 pt-md-12" v-if="showTitle">¿Qué necesitas hoy?</h2>
    <div class="pb-8">
      <v-slide-group multiple show-arrows class="pa-5" next-icon="icon-right-arrow" prev-icon="icon-left-arrow">
        <v-slide-item v-for="(product, index) in productList" :key="index">
          <v-card class="product-card ma-4" @click="executeClickLink(product)">
            <v-img :src="product.mainImageUrl" :alt="product.imgAlt1"></v-img>
            <h5 v-html="product.title" style="margin-top: 5px"/>
            <div class="regular-text" style="margin-top: 6px">{{ product.description }}</div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>
<script>
import {checkValidUrl} from "@/utils/urlUtil";
export default {
  props: {
    productList: Array,
    showTitle: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    executeClickLink(item) {
    // console.log(checkValidUrl(item.buttonHref))
      if (checkValidUrl(item.buttonHref)) {
        window.open(item.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: item.buttonHref
        });
      }
    }
  }
};
</script>
