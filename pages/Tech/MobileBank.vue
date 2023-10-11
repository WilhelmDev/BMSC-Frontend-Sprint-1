<template>
  <div>
    <v-container class="text-center">
      <OptionsPanel :data="titleData">
        <template v-slot:image>
          <v-img class="w-50 mx-auto" :src="titleData.items[0].mainImageUrl" :alt="titleData.items[0].imgAlt1"></v-img>
        </template>
        <template v-slot:message>
          <div v-html="titleData.items[0].description" class="regular-text green-text"></div>
        </template>
        <template v-slot:bottom>
          <div class="d-flex justify-center">
            <AppStoreButton class="mx-1" />
            <GooglePlayButton class="mx-1" />
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
      <Benefits v-bind:benefitsData = "videoHeaderData" class="pb-0 pt-16"/>
      <ListedTutorials v-bind:tutorialsList = "videosData" class="pb-16"/>
    </div>
    <DocumentList v-bind:documentsData="documentsData" class="py-16 mt-8" />
    <div v-if="informationPanelData.header">
      <InformationPanel
        :header="informationPanelData.header"
        class="pb-16"
      >
        <template v-slot:content>
          <v-row class="panel-overlaped">
            <v-col cols="6">
              <CheckedList :items="informationPanelData.items" class="py-8"/>
            </v-col>
            <v-col cols="6">
              <div class="px-12 pb-12 pt-4">
                <v-img contain :src="informationPanelData.header.mainImageUrl" :alt="informationPanelData.header.imgAlt1"></v-img>
              </div>
            </v-col>
          </v-row>
        </template>
      </InformationPanel>
    </div>
    <div v-if="informationPanelData.header" class="panel-overlap">
      <Compare
        v-if="compareData && compareData.items && compareData.items.length > 0"
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :topImage="getCardImage(compareData.items[0])"
        :alt="compareData.items[0].imgAlt1"
      >
        <template v-slot:bottom>
          <div class="d-flex justify-center">
            <div class="px-1 px-sm-3">
              <AppStoreButton class="my-2" />
            </div>
            <div class="px-1 px-sm-3">
              <GooglePlayButton class="my-2" />
            </div>
          </div>
        </template>
      </Compare>
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
import Benefits2 from "@/components/Benefits2.vue";
import Benefits from "@/components/Benefits.vue";
import AppStoreButton from "@/components/AppStoreButton";
import GooglePlayButton from "@/components/GooglePlayButton";
import ListedTutorials from "@/components/ListedTutorials";
import InformationPanel from "@/components/InformationPanel";
import Compare from "@/components/Compare.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import CheckedList from "@/components/CheckedList.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  TECH_MOBILE_BANK_TITLE,
  TECH_MOBILE_BANK_PROGRAMS,
  TECH_MOBILE_BANK_BENEFITS_2,
  TECH_MOBILE_BANK_VIDEO_HEADER,
  TECH_MOBILE_BANK_VIDEO_CARDS,
  TECH_MOBILE_BANK_INFORMATION_PANEL,
  TECH_MOBILE_BANK_COMPARE, TECH_INTERNET_BANK_DOCUMENTS, TECH_MOBILE_BANK_DOCUMENTS
} from "~/cardListKeys/tech";
import {generateEmptyModels, generateReportFileUrlFromId} from "~/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    OptionsPanel,
    Programs,
    Benefits2,
    Benefits,
    AppStoreButton,
    GooglePlayButton,
    ListedTutorials,
    InformationPanel,
    Compare,
    MoreInfo,
    CheckedList
  },
  async mounted() {
    try {

    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information.');
    }
  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["tech/getList"](TECH_MOBILE_BANK_TITLE)
      }
      if (!res.items[0]['mainImageUrl']) {
        res.items[0]['mainImageUrl'] = require("@/assets/images/mobileBank.svg");
      }
      //console.log(TECH_MOBILE_BANK_TITLE, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_MOBILE_BANK_PROGRAMS);
      let res = {
        items: sectionList
      }
      //console.log(TECH_MOBILE_BANK_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_MOBILE_BANK_BENEFITS_2);
      if(sectionList.length === 0) {
        sectionList = generateEmptyModels(1);
      }
      let res = {
        items: sectionList
      };
      //console.log(TECH_MOBILE_BANK_BENEFITS_2, res);
      return res;
    },
    videoHeaderData: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_MOBILE_BANK_VIDEO_HEADER);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(TECH_MOBILE_BANK_VIDEO_HEADER, res);
      return res;
    },
    videosData: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_MOBILE_BANK_VIDEO_CARDS);
      const fallback = [
        {
          mainImageUrl: require("@/assets/images/img-card1.png"),
          title: "Conoce los derechos de las personas con discapacidad.",
          subTitle: "<p>https://www.youtube.com/embed/onp_P2EE_dE</p>"
        },
        {
          mainImageUrl: require("@/assets/images/img-card1.png"),
          title: "Conoce sobre las consecuencias del lavado de dinero",
          subTitle: "<p>https://www.youtube.com/embed/onp_P2EE_dE</p>"
        },
        {
          mainImageUrl: require("@/assets/images/img-card1.png"),
          title: "Conoce los derechos de las personas con discapacidad.",
          subTitle: "<p>https://www.youtube.com/embed/onp_P2EE_dE</p>"
        }
      ];
      let res = {
        items: sectionList.length ? sectionList : fallback
      }
      //console.log(TECH_MOBILE_BANK_VIDEO_CARDS, res);
      return res;
    },
    informationPanelData: function() {
      let sectionList = this.$store.getters["tech/getList"](TECH_MOBILE_BANK_INFORMATION_PANEL);
      let res = {};
      if(sectionList && sectionList.length > 0) {
        res = {
          header: sectionList[0],
          items: sectionList.slice(1)
        }
      }
      //console.log(TECH_MOBILE_BANK_INFORMATION_PANEL, res);
      return res;
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["tech/getList"](TECH_MOBILE_BANK_COMPARE)
      }

      //console.log(TECH_MOBILE_BANK_COMPARE, res);
      return res;
    },
    documentsData: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_MOBILE_BANK_DOCUMENTS);
      /*
       Category 1118 - Document
     */
      //console.log('Documents Section list: ',sectionList);
      let res = {
        title: [{title: 'Manuales BMSC'}],
        items: sectionList.map(card => {
          return {
            ...card,
            fileUrl: generateReportFileUrlFromId(card['description'])
          }
        }),
      }
      //console.log(TECH_MOBILE_BANK_DOCUMENTS, res);
      return res;
    },
  },
  data() {
    return {
      getCardImage,
      programsLinkFunctions: [
        this.goToTransferTutorial,
        this.goToPaymentTutorial
      ],
      compareConfig: {
        items: [
          {
            title:
              "<span class='green-md-text'>¡Obtenla ahora!</span>",
            description:
              "Descarga la aplicación de manera totalmente gratuita desde Google Play o AppStore. <span class='strong-regular-text'>Búscala como BMSC Móvil.</span>"
          }
        ]
      },
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
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_TITLE);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_PROGRAMS);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_BENEFITS_2);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_VIDEO_HEADER);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_VIDEO_CARDS);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_INFORMATION_PANEL);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_COMPARE);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_MOBILE_BANK_DOCUMENTS);
    return header;
  },
  head () {return this.headData}
}
</script>
