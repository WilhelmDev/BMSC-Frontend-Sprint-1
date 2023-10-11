<template>
  <div>
    <v-container class="text-center">
      <OptionsPanel :data="titleData.items[0]">
        <template v-slot:image>
          <v-img class="w-50 mx-auto" :src="titleData.items[0].mainImageUrl" :alt="titleData.items[0].imgAlt1"></v-img>
        </template>
        <template v-slot:message>
          <div v-html="titleData.items[0].description" class="regular-text green-text"></div>
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
    <Benefits2
      v-bind:benefits2Data = "benefits2Data"
    />
    <div class="gray-bg mt-12">
      <Benefits v-bind:benefitsData = "videoHeaderData" class="pb-0"/>
      <ListedTutorials v-bind:tutorialsList = "videosData" />
    </div>
    <!-- <div>
      <InformationPanel
        v-bind="informationPanelData"
      >
        <template v-slot:content="{ data }">
          <OpenAccountInfo :data="data" />
        </template>
      </InformationPanel>
    </div>     -->
    <MoreInfo
      v-bind="moreInfoConfig"
      class="py-16"
    />
  </div>
</template>
<script>
import OptionsPanel from "@/components/OptionsPanel.vue";
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import Benefits from "@/components/Benefits.vue";
import ListedTutorials from "@/components/ListedTutorials";
import InformationPanel from "@/components/InformationPanel";
import MoreInfo from "@/components/MoreInfo.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  TECH_INTERNET_BANK_TITLE,
  TECH_INTERNET_BANK_PROGRAMS,
  TECH_INTERNET_BANK_BENEFITS_2,
  TECH_INTERNET_BANK_VIDEO_HEADER,
  TECH_INTERNET_BANK_VIDEO_CARDS,
  TECH_INTERNET_BANK_INFORMATION_PANEL
} from "~/cardListKeys/tech";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    OptionsPanel,
    Programs,
    Benefits2,
    Benefits,
    ListedTutorials,
    InformationPanel,
    MoreInfo
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](TECH_INTERNET_BANK_TITLE)
      }
      if (!res.items[0]['mainImageUrl']) {
        res.items[0]['mainImageUrl'] = require("@/assets/images/laptop.svg");
      }
      //console.log(TECH_INTERNET_BANK_TITLE, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_INTERNET_BANK_PROGRAMS);
      let res = {
        items: sectionList
      }
      //console.log(TECH_INTERNET_BANK_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_INTERNET_BANK_BENEFITS_2);
      if(sectionList.length === 0) {
        sectionList = generateEmptyModels(1);
      }
      let res = {
        items: sectionList
      };
      //console.log(TECH_INTERNET_BANK_VIDEO_CARDS, res);
      return res;
    },
    videoHeaderData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_INTERNET_BANK_VIDEO_HEADER);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(TECH_INTERNET_BANK_VIDEO_HEADER, res);
      return res;
    },
    videosData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_INTERNET_BANK_VIDEO_CARDS);
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
      //console.log(TECH_INTERNET_BANK_VIDEO_CARDS, res);
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
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_INTERNET_BANK_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_INTERNET_BANK_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_INTERNET_BANK_BENEFITS_2);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_INTERNET_BANK_VIDEO_HEADER);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_INTERNET_BANK_VIDEO_CARDS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, TECH_INTERNET_BANK_INFORMATION_PANEL);
    return header;
  },
  head () {return this.headData}
}
</script>
