<template>
  <v-container class="bm-more-info text-center py-4">
    <h4 class="py-6">{{ moreInfoTitle }}</h4>
    <div class="info-container">
      <v-card class="cursor-pointer" @click="onClickFn(cardLabel1)">
        <v-icon :class="cardIcon1" />
        <span class="regular-text bold-font">{{
          cardLabel1
        }}</span>
      </v-card>
      <v-card class="cursor-pointer" @click="onClickFn(cardLabel2)" v-if="cardLabel2">
        <v-icon :class="cardIcon2" />
        <span class="regular-text bold-font">{{
          cardLabel2
        }}</span>
      </v-card>
      <v-card class="cursor-pointer" @click="onClickFn(cardLabel3)" v-if="cardLabel3">
        <v-icon :class="cardIcon3" />
        <span class="regular-text bold-font">{{
          cardLabel3
        }}</span>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import {siteRouteMapping} from "@/utils/siteUtils";

export default {
  name: "MoreInfo",
  props: {
    moreInfoTitle: String,
    cardIcon1: String,
    cardLabel1: String,
    cardIcon2: String,
    cardLabel2: String,
    cardIcon3: String,
    cardLabel3: String,
    onClickFn: {
      type: Function,
      default: function(label) {
        //console.log("inside moreInfo", siteRouteMapping[label]);
        const route = siteRouteMapping[label];
        if (route) {
          this.$router.push({
            path: route
          });
        }
      }
    }
  }
};
</script>
