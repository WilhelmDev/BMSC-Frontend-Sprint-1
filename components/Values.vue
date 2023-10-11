<template>
  <div class="values pa-0 pa-md-4">
    <h4 class="text-center">Con un importante sistema de valores</h4>
    <v-container>
      <v-slide-group multiple show-arrows class="pa-5" next-icon="icon-right-arrow" prev-icon="icon-left-arrow">
        <v-slide-item v-for="(value, index) in valuesList" :key="index">
          <v-card class="product-card ma-3">
            <v-img :src="value.mainImageUrl" :alt="value.imgAlt1"></v-img>
            <h6 class="black-text" v-html="value.title"></h6>
            <div class="regular-text" v-html="value.description"></div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    valuesList: Array
  }
};
</script>
