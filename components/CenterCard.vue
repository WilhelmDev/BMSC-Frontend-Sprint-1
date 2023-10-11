<template>
  <v-container class="text-center center-card">
    <h2 class="mx-6"><span v-html="titleData.items[0].title"></span></h2>
    <div class="big-text my-4 mx-6">{{titleData.items[0].description}}</div>
    <v-img :src="getCardImage(titleData.items[0])" :alt="titleData.items[0].imgAlt1" class="my-6"></v-img>
    <div class="strong-huge green-text pt-8 mx-6"><span v-html="titleData.items[0].subTitle"></span></div>
  </v-container>
</template>
<script>
import {
  getCardImage
} from "@/utils/imageUtil";
export default {
  props: {
    titleData: Object
  },
  data() {
    return {
      getCardImage: getCardImage
    }
  }
}
</script>
