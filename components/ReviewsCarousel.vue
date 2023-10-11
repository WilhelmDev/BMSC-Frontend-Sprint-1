<template>
  <v-carousel
    v-model="model"
    hide-delimiter-background
    :show-arrows="false"
    light
    class="px-4 smooth-green-bg review-carousel"
    delimiter-icon="mdi-circle-outline"
    height="500"
  >
    <v-carousel-item v-for="(review, index) in reviews" :key="index" class="px-md-10 px-sm-0">
      <div class="text-center review-content">
        <v-img
          :src="require(`@/assets/images/review-icon.png`)"
          class="centered-icon"
        ></v-img>
        <h3 class="green-text mb-4">{{review.gradientText}}</h3>
        <div class="big-text mb-4">{{review.description}}</div>
        <div class="d-flex justify-center align-center">
          <v-avatar clas class="mr-4">
            <img :src="review.mainImageUrl" :alt="review.imgAlt1"/>
          </v-avatar>
          <div>
            <h6 class="black-text"><span v-html="review.title"></span></h6>
            <div class="small-text"><span v-html="review.subTitle"></span></div>
          </div>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  props: {
    reviews: Array
  },
  data() {
    return {
      model: 0
    };
  }
};
</script>
