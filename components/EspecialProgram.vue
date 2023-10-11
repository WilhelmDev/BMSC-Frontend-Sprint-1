<template>
  <div :class="`${ns}`">
    <v-row justify="center" align="center" class="d-none d-sm-flex">
      <v-col cols="12" sm="6" :class="`${ns}__image-ctn pb-0`">
        <v-img :src="apiMarketData.items[0].mainImageUrl" class="mx-auto"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 px-6 py-sm-3 text-left text-sm-center">
        <h2><span v-html="apiMarketData.items[0].title"></span></h2>
      </v-col>
    </v-row>
    <v-row class="justify-sm-center">
      <v-col cols="12" sm="8" md="4" lg="4" xl="2" class="py-0 px-6 py-sm-3 text-left text-sm-center">
        {{apiMarketData.items[0].description}}
      </v-col>
    </v-row>
    <v-row :class="`${ns}__subTitle text-left text-sm-center justify-sm-center`">
      <v-col sm="10" class="px-6">
        <div><span v-html="apiMarketData.items[0].subTitle"></span></div>
      </v-col>
    </v-row>
    <v-row class="text-left text-sm-center" v-if="apiMarketData.items[0]">
      <v-col class="px-6">
        <v-row justify="center" v-if="apiMarketData.items[0].buttonName.length !== 0">
          <div class="cursor-pointer" @click="executeClickLink">
            <h6>{{apiMarketData.items[0].buttonName}}</h6>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="d-sm-none">
      <v-col cols="12" sm="6" :class="`${ns}__image-ctn pb-0`">
        <v-img :src="apiMarketData.items[0].mainImageUrl" class="mx-auto"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {checkValidUrl} from "~/utils/urlUtil";

export default {
  name: "EspecialProgram",
  data() {
    return {
      ns: "especialProgram"
    };
  },
  props: {
    apiMarketData: Object
  },
  methods: {
    executeClickLink() {
      let item = this.apiMarketData.items[0];
      //console.log('item: ',item);
      if (checkValidUrl(item.buttonHref)) {
        window.open(item.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: item.buttonHref
        });
      }
    }
  }
}
</script>
