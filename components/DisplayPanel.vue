<template>
  <div class="display-panel py-8">
    <h4 class="text-center pb-2 pb-sm-8" v-html="title"></h4>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" class="text-center" cols="12" :sm="numberOfCols">
        <h3 class="green-md-text" v-html="item.text"></h3>
        <div class="big-text">{{ item.smallText }}</div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    items: Array
  },
  computed: {
    numberOfCols() {
      const itemsLength = this.items.length;
      const numberOfCols = Math.floor(12 / itemsLength);
      return numberOfCols > 3 ? numberOfCols.toString() : "4";
    }
  }
};
</script>
