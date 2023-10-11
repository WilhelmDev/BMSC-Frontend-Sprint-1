<template>
  <div>
    <v-container class="text-center pb-16">
      <OptionsPanel :data="titleData.items[0]">
        <template v-slot:image>
          <v-img class="w-50 mx-auto" :src="titleData.items[0].mainImageUrl" :alt="titleData.items[0].imgAlt1"></v-img>
        </template>
        <template v-slot:message>
          <div v-html="titleData.items[0].description" class="regular-text green-text"></div>
        </template>
        <template v-slot:bottom>
          <div class="d-flex justify-center">
            <Button
              class="button-compare"
              text="Buscar cajeros"
              color="bm-dark"
              v-bind:onClick="goToAgencies"
            />
          </div>
        </template>
      </OptionsPanel>
    </v-container>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="i%2 === 0 && true"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <div class="gray-bg mt-12">
      <Benefits v-bind:benefitsData = "videoHeaderData" class="pb-0"/>
      <ListedTutorials v-bind:tutorialsList = "videosData" />
    </div>
    <MoreInfo
      v-bind="moreInfoConfig"
      class="py-16"
    />
  </div>
</template>
<script>
import OptionsPanel from "@/components/OptionsPanel.vue";
import Programs from "@/components/Programs.vue";
import Benefits from "@/components/Benefits.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import Button from "@/components/Button.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  TECH_ATMS_TITLE,
  TECH_ATMS_PROGRAMS,
  TECH_ATMS_VIDEO_HEADER,
  TECH_ATMS_VIDEO_CARDS
} from "~/cardListKeys/tech";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    OptionsPanel,
    Programs,
    Benefits,
    MoreInfo,
    Button
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](TECH_ATMS_TITLE)
      }
      if (!res.items[0]['mainImageUrl']) {
        res.items[0]['mainImageUrl'] = require("@/assets/images/atm.svg");
      }
      //console.log(TECH_ATMS_TITLE, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_ATMS_PROGRAMS);
      let res = {
        items: sectionList
      }
      //console.log(TECH_ATMS_PROGRAMS, res);
      return res;
    },
    videoHeaderData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_ATMS_VIDEO_HEADER);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(TECH_ATMS_VIDEO_HEADER, res);
      return res;
    },
    videosData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_ATMS_VIDEO_CARDS);
      const fallback = [
        {
          mainImageUrl: require("@/assets/images/img-card1.png"),
          title: "Conoce los derechos de las personas con discapacidad."
        },
        {
          mainImageUrl: require("@/assets/images/img-card1.png"),
          title: "Conoce sobre las consecuencias del lavado de dinero"
        },
        {
          mainImageUrl: require("@/assets/images/img-card1.png"),
          title: "Conoce los derechos de las personas con discapacidad."
        }
      ];
      let res = {
        items: sectionList.length ? sectionList : fallback
      }
      //console.log(TECH_ATMS_VIDEO_CARDS, res);
      return res;
    }
  },
  data() {
    return {
      programsLinkFunctions: [
        this.goToTransferTutorial,
        this.goToPaymentTutorial
      ],
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      }
    }
  },
  methods: {
    goToTransferTutorial() {
      //console.log("transfer tutorial");
    },
    goToPaymentTutorial() {
      //console.log("payment tutorial");
    },
    goToAgencies() {
      this.$router.push({
        path: "/help/agencies"
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_ATMS_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_ATMS_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_ATMS_VIDEO_HEADER);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_ATMS_VIDEO_CARDS);
    return header;
  },
  head () {return this.headData}
}
</script>
