<template>
  <v-container fluid class="bm-simulator-cta">
    <v-row justify="center" align="center">
      <v-col lg="6">
        <div class="main-area">
          <v-img
            v-if="simulatorAdData.logos[0].mainImageUrl !== ''"
            :src="simulatorAdData.logos[0].mainImageUrl"
            :alt="simulatorAdData.logos[0].imgAlt1"
            class="calc-icon mx-auto ml-lg-0"
          ></v-img>
          <h2 class="mb-6"><span v-html="simulatorAdData.description[0].title"></span></h2>
          <div class="big-text mb-10">
            {{ simulatorAdData.description[0].description }}
          </div>
          <!-- <Button :onClick="goToSimulator" text="Ir al simulador" color="bm-light" /> -->
        </div>
      </v-col>
      <v-col lg="6">
        <v-row justify="center" align="center">
          <v-img :src="simulatorAdData.description[0].mainImageUrl" :alt="simulatorAdData.description[0].imgAlt1"></v-img>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Button from "@/components/Button.vue";
import PriceLabel from "@/components/PriceLabel.vue";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {LOANS_BENEFITS, LOANS_BENEFITS_2, LOANS_CARDS, LOANS_PROGRAMS, LOANS_TITLE} from "~/cardListKeys/companies";
import {AD} from "~/cardListKeys/simulator";
import {generateEmptyModels} from "~/utils/cardsUtil";
export default {
  components: {
    Button,
    PriceLabel
  },
  async mounted() {
    await this.$store.dispatch(`simulator/${UPDATE_STATE_ACTION}`,[AD, this]);
  },
  computed: {
    simulatorAdData: function () {
      let sectionList = this.$store.getters["simulator/getList"](AD);
      /*
        Category 87 - Simulator ad
        Category 83 - Logo
      */
      function processList(list,size) {
        if(list.length === 0) return generateEmptyModels(size);
        return list;
      }
      let res = {
        logos: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 83),1),
        description: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 87),1),
      }
      //console.log(AD, res);
      return res;
    }
  },
  methods: {
    goToSimulator() {
      this.$router.push({
        path: "/loanSimulator"
      });
    }
  }
};
</script>
