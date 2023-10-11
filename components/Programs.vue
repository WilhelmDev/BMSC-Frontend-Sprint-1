<template>
  <div
    :class="
      backgroundType
        ? `${backgroundType} bm-programs mb-0'`
        : 'bm-programs mb-0'
    "
  >
    <div :class="changeOrder ? 'align-center d-md-flex d-block flex-row-reverse' : 'align-center d-md-flex d-block'">
      <div
        :class="'program-info'"
      >
        <div class="program-title mb-7">
          <BracketBanx
            v-if="isBanx"
            :text1="text1"
            :text2="text2"
            :bracketColor="bracketColor"
            :newLine="newLine"
          />
          <h2 v-else class="program-title" v-html="programTitle"></h2>
        </div>
        <div class="program-content mb-7">
          <span class="big-text" v-html="programContent" style="text-align: justify"></span>
        </div>
        <div class="cursor-pointer" @click="executeClickLink(onClickLink)">
          <h6 v-html="programLink"></h6>
        </div>
      </div>
      <BoxAndImage
        v-if="isBanx"
        :className="className"
        :xBox="xBox"
        :label="label"
        :image="image"
        :direction="direction"
        :alt="alt"
      />
      <div v-else class="program-image1 py-0">
        <v-img
          :src="programImage"
          :class="
            changeOrder
              ? 'program-content-image1'
              : 'program-content-image1 float-right'
          "
        />
      </div>
    </div>
    <v-row class="">
      <v-col class="program-image2 py-0" v-if="programImage2">
        <v-img
          :src="programImage2"
          class="program-content-image2"
          :alt="alt"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BracketBanx from "~/components/BracketBanx";
import BoxAndImage from "~/components/BoxAndImage";
import {checkValidUrl} from "@/utils/urlUtil";

export default {
  name: "Programs",
  components: {BoxAndImage, BracketBanx},
  props: {
    programTitle: String,
    programContent: String,
    programLink: String,
    programImage: String,
    programImage2: String,
    isImageInLeft: Boolean,
    background: String,
    onClickLink: String,
    // BracketBanx
    text1: String,
    text2: String,
    bracketColor: String,
    newLine: Boolean,
    // BoxAndImage
    isBanx: Boolean,
    className: String,
    xBox: String,
    label:String,
    image:String,
    direction:String,
    x:String,
    y:String,
    alt: String
  },
  data() {
    let bkType = "";
    switch (this.background) {
      case "green":
        bkType = "green-background";
        break;
      case "blurred":
        bkType = "blurred-background";
        break;
      case "gradient-light-blue":
        bkType = "gradient-light-blue-background"
      case "grey":
        bkType = "grey-green-background"
      default:
        break;
    }
    //console.log(bkType);
    return {
      changeOrder: this.isImageInLeft,
      backgroundType: bkType
    };
  },
  methods: {
    executeClickLink(buttonHref) {
      //console.log('CLICK ',buttonHref);
      if (checkValidUrl(buttonHref)) {
        window.open(buttonHref, '_blank');
      } else {
        this.$router.push({
          path: buttonHref
        });
      }
    }
  }
};
</script>
