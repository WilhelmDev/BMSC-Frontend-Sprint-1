<template>
  <div>
    <div
      :class="`${ns} d-flex justify-center align-center `"
      :style="{background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${getYoutubeLink(homeIntro['subTitle'])}')`}"
    >
      <div :class="`${ns}__background`">
        <v-img :src="require(`@/assets/images/welcomeTo.png`)" :class="`${ns}__welcome-to mb-5`"/>
        <v-img :src="require(`@/assets/images/logoBanx.png`)" :class="`${ns}__logo mb-12`"/>
        <v-img :src="require(`@/assets/images/playIcon.png`)" :class="`${ns}__play-icon`" @click="showModal = true"/>
      </div>
      <modal v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <v-btn class="modal-default-button mb-1" :color="'bm-light'" @click="showModal = false">
                  Cerrar
                </v-btn>
                <iframe :src="getYoutubeLink(homeIntro['title'])"/>
              </div>
            </div>
          </div>
        </transition>
      </modal>
    </div>
    <div :class="`${ns}__what-is text-center mt-n16 mb-16 px-3`">
      <v-row class="mb-n7">
        <Box
          :x="'red'"
          :class="`${ns}__what-is__box`"
          :label="homeIntro.gradientText"
          :className="homeIntro.gradient"
        />
      </v-row>
      <div :class="`${ns}__what-is__content text-center pt-16 pb-12 px-12`" v-html="homeIntro.description"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {HOME_INTRODUCTION} from "@/cardListKeys/banx";
import {generateEmptyModels, getRawHTMLText} from "@/utils/cardsUtil";

export default {
  name: "VideoBanx",
  components: {Button},
  async mounted() {
    await this.$store.dispatch(`banx/${UPDATE_STATE_ACTION}`, HOME_INTRODUCTION);
  },
  computed: {
    homeIntro: function () {
      let sectionList = this.$store.getters["banx/getList"](HOME_INTRODUCTION);
      if(sectionList.length === 0) sectionList =  generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(HOME_INTRODUCTION, res.items[0]);
      return res.items[0];
    }
  },
  methods: {
    getYoutubeLink(url){
      return getRawHTMLText(url);
    }
  },
  data() {
    return {
      ns: "video-banx",
      showModal: false
    };
  }
};
</script>
