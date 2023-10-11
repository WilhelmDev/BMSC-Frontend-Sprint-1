<template>
  <div class="bm-compare text-center py-10 mt-16">
    <div class="top-image mx-auto mb-4" v-if="topImage">
      <v-img :src="topImage" :alt="alt"></v-img>
    </div>
    <!-- since image has to be provided from service, maybe the below part can be removed --->
    <v-row v-if="isBanx && creditCardArray.length>0" class="justify-center">
      <v-col v-for="(creditCard, i) in creditCardArray" :key="i" class="col-auto pa-0">
        <v-img class="credit-card-banx" :src="require(`@/assets/images/${creditCard}`)"/>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col class="">
        <h2 v-if="!isBanx" class="compare-title px-3" v-html="compareTitle"></h2>
        <BracketBanx
          v-else
          class="compare-bracket-banx px-8"
          :text1="compareTitle"
          :text2="''"
          :bracket-color="'#0281CA'"
        />
      </v-col>
    </v-row>
    <v-row class="compare-content">
      <v-col class="">
        <span class="big-text" v-html="compareContent"></span>
      </v-col>
    </v-row>
    <v-row class="justify-center bottom pt-sm-4">
      <slot name="bottom">
        <v-col class="">
          <Button
            class="button-compare"
            v-bind:text="buttonLabel"
            v-bind:color="buttonColor"
            v-bind:onClick="onButtonClick || executeButtonRouteAction"
            v-bind:data="data"
          />
        </v-col>
      </slot>
    </v-row>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
import BracketBanx from "~/components/BracketBanx";
import {checkValidUrl} from "@/utils/urlUtil";

export default {
  name: "Compare",
  components: {
    BracketBanx,
    Button
  },
  props: {
    isBanx: Boolean,
    compareTitle: String,
    compareContent: String,
    buttonName: String,
    buttonHref: String,
    onButtonClick: Function,
    topImage: String,
    alt: String,
    data: Object
  },
  data() {
    return {
      buttonLabel: this.buttonName,
      buttonColor: "bm-medium",
      creditCardArray: ["T-BANX-AZUL.png","T-BANX-ROJO.png","T-BANX-AMARILLO.png"]
    };
  },
  methods: {
    executeButtonRouteAction() {
      if (checkValidUrl(this.buttonHref)) {
        window.open(this.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: this.buttonHref
        });
      }
    }
  }
};
</script>
