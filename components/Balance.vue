<template>
  <div class="balance text-center my-8" v-if="balanceData && balanceData.items">
    <h2 v-html="balanceData.items[0].title"></h2>
    <v-row justify="center" align="center">
      <v-col
        v-for="(document, index) in getReportsOfPage"
        :key="index"
        :class="{
          'download-badge': !$vuetify.breakpoint.xsOnly,
          'card': $vuetify.breakpoint.xsOnly,
          'd-flex cursor-pointer':true
        }"
        @click="document.onClick(document)"
        cols="10" sm="3"
      >
        <v-icon class="icon-book green-md-text pr-4"></v-icon>
        <div class="my-auto">
          <div class="strong-regular-text green-text" v-html="document.title"></div>
          <div v-html="document.subTitle"></div>
        </div>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      no-gutters
      :class="`${ns}__pagination`"
    >
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-pagination
          v-model="page"
          :length="reportsData.items ? Math.ceil(reportsData.items.length/3) : 1"
          color="#296140"
          light
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props:{
    balanceData: Object
  },
  data() {
    return {
      ns: "balance",
      reportLinkText: "Ver más",
      page: 1,
      pageSize: 3,
      numberOfPages: 0
    };
  },
  computed: {
    reportsData() {
      return this.balanceData.items[0];
    },
    getReportsOfPage() {
      let end = this.page * 3;
      //console.log('END: ',end);
      //console.log('REPORTS TO SHOW: ',this.reportsData.items.slice(end - 3, end));
      return this.reportsData.items.slice(end - 3, end);
    }
  }
}
</script>
