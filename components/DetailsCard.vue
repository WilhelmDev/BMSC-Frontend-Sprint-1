<template>
  <v-row v-if="detailsData" class="d-block d-md-flex align-center details-card" align="center">
    <div v-if="detailsData && detailsData.htmlString" class="py-6 px-16" v-html="detailsData.htmlString"/>
    <v-col cols="12" sm="6" v-else class="left-container py-6 px-6 pl-md-8 px-lg-16">
      <BracketBanx
        v-if="detailsData.isBanx"
        :text1="detailsData.title"
        :text2="detailsData.subTitle"
        :bracketColor="'#A7D342'"
        :newLine="true"
      />
      <div v-else>
        <h1 v-html="detailsData.title"/>
        <h3 v-html="detailsData.subTitle"/>
      </div>
      <div class="big-text pr-md-16" style="text-align: justify">
        {{ detailsData.description }}
      </div>
      <div v-if="detailsData.buttonName" class="d-block d-lg-inline-flex mt-8">
        <v-btn depressed :color="normalizedOptions.buttonType" @click="executeClickLink(detailsData)">
          {{ detailsData.buttonName }}
          <v-icon right class="icon-btn-arrow"></v-icon>
        </v-btn>
        <div v-if="!detailsData.isBanx" class="mt-4 font-weight-bold pl-lg-5 my-lg-auto" width="50%">
          {{ detailsData.gradientText }}
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="6" class="px-6 pr-lg-16 image-container pb-3">
      <BoxAndImage
        v-if="detailsData.isBanx"
        :className="detailsData.gradient"
        :label="detailsData.gradientText"
        :image="detailsData.mainImageUrl"
        :alt="detailsData.imgAlt1"
        :direction="'bottom-left'"
        :xBox="'red'"
      />
      <div v-else style="min-height: 250px">
        <v-img
          :src="detailsData.mainImageUrl"
          :alt="detailsData.imgAlt1"
        />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import BoxAndImage from "~/components/BoxAndImage";
import BracketBanx from "~/components/BracketBanx";
import {checkValidUrl} from "@/utils/urlUtil";

export default {
  components: {BracketBanx, BoxAndImage},
  props: {
    detailsData: {
      type: Object,
      default() {
        return {
          buttonMessage: "",
          buttonType: "bm-light"
        }
      }
    }
  },
  computed: {
    normalizedOptions() {
      return Object.assign({
        buttonMessage: "",
        buttonType: "bm-light"
      }, this.detailsData);
    }
  },
  methods: {
    executeClickLink(item) {
      if (checkValidUrl(item.buttonHref)) {
        window.open(item.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: item.buttonHref
        });
      }
    }
  }
};
</script>
