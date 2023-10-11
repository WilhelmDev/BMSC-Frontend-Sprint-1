<template>
  <div class="benefits3 bm-benefits text-center py-10 mt-7 mx-auto">
    <span class="benefits3__title1" v-html="benefits3Data.items[0].title"></span>
    <span class="benefits3__title2" v-html="benefits3Data.items[0].subTitle"></span>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <v-row justify="center">
          <img :src="benefits3Data.items[0]['mainImageUrl']" :alt="benefits3Data.items[0]['imgAlt1']"/>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Benefits3",
  props: {
    benefits3Data: Object
  }
};
</script>
