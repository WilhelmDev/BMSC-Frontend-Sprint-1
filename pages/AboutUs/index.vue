<template>
  <div>
    <Programs
      :programTitle="headerCard.items[0].title"
      :programContent="headerCard.items[0].description"
      :programImage="headerCard.items[0].mainImageUrl"
    />
    <v-container>
      <div class="d-block d-md-flex py-8">
        <SmallCard
          v-for="(goalCard, index) in goalsList.items"
          :key="index"
          :title="goalCard.title"
          :description="goalCard.description"
          :descStyle="goalCard.descStyle"
          :image="goalCard.mainImageUrl"
        />
      </div>
    </v-container>
    <Values :valuesList="valuesList.items"/>
    <HistoryPanel :historyData="historyData.items[0]" :historyVideo="videoData.items[0]" :prizesData="prizesData"/>
    <v-container>
      <h4 class="text-center mb-4" v-html="partnersCard.items[0].title"></h4>
      <div class="d-block d-md-flex py-8">
        <SmallCard
          v-for="(partnerCard, index) in partnersCard.items[0].items"
          :key="index"
          :title="partnerCard.title"
          :descStyle="partnerCard.descStyle"
          :link="partnerCard.description"
          :clickable="true"
          style="cursor: pointer"
        />
      </div>
    </v-container>
    <Programs
      v-for="(programCard, index) in programsList.items"
      :key="index"
      :programTitle="programCard.title"
      :programContent="programCard.description"
      :programLink="programCard.link"
      :programImage="programCard.mainImageUrl"
      :background="index%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="index%2 !== 0"
      :onClickLink="programCard.buttonHref"
    />
    <Benefits2
      :benefits2Data="benefitsData"
    />
    <Memories :memoriesData="memoriesData.items[0]" />
    <Memories :memoriesData="memoriesRseData.items[0]" />
    <Balance :balanceData="balanceData" />
    <Qualification :qualificationsData="risksData.items[0]" />
    <RiskPills :riskPills="riskPills" />
  </div>
</template>

<script>
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import SmallCard from "@/components/SmallCard.vue";
import Values from "@/components/Values.vue";
import HistoryPanel from '@/components/HistoryPanel.vue';
import Memories from "@/components/Memories.vue";
import Balance from "@/components/Balance.vue";
import RiskPills from "@/components/RiskPills.vue";
import Qualification from "@/components/Qualification.vue";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  INTRO,
  GOALS,
  VALUES,
  HISTORY,
  PRIZES,
  PARTNERS,
  PROGRAMS,
  MEMORIES,
  MEMORIES_RSE,
  INCOME_STATEMENTS,
  RISKS,
  RATINGS,
  VIDEO,
  BENEFITS,
  RISK_PILLS
} from "~/cardListKeys/aboutUs";
import _ from "lodash";
import { generateReportFileUrlFromId, downloadItem } from "@/utils/cardsUtil";
import {getHeader} from "~/utils/seo";
export default {
  components: {
    Programs,
    Benefits2,
    SmallCard,
    Values,
    HistoryPanel,
    Memories,
    Balance,
    RiskPills,
    Qualification
  },
  methods: {
    goToRegulations() {
      //console.log('Regulations');
    },
    goToTariffs() {
      //console.log('tariffs');
    },
    parseVideoData(videoObj) {
      return {
        url: _.get(videoObj, ['subTitle'])
      }
    },
    parseHistoryData(dataArray) {
      return this.parseArrayAsFirstChildItems(dataArray);
    },
    parsePartnersData(dataArray) {
      return this.parseArrayAsFirstChildItems(dataArray);
    },
    parseMemoriesData(dataArray) {
      return this.parseArrayAsFirstChildItems(dataArray);
    },
    parseRisksData(dataArray) {
      if (dataArray && dataArray.length > 0) {
        return [{
          ...dataArray[0],
          headers: this.parseHeaders(dataArray[1]),
          items: dataArray.slice(2)
        }]
      }
    },
    parseHeaders(dataObject) {
      return [
        {
          text: dataObject ? dataObject.title : '',
          value: 'title'
        },
        {
          text: dataObject ? dataObject.subTitle : '',
          value: 'subTitle'
        },
        {
          text: dataObject ? dataObject.description : '',
          value: 'description'
        },
      ]
    },
    parseArrayAsFirstChildItems(dataArray) {
      if (dataArray && dataArray.length > 0) {
        return [{
          ...dataArray[0],
          items: dataArray.slice(1)
        }]
      }
      return dataArray;
    },
    downloadDocument(item) {
      downloadItem(item.fileUrl, item.title);
    }
  },
  async mounted() {

  },
  computed: {
    headerCard: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](INTRO)
      }
      //console.log(INTRO, res);
      return res;
    },
    goalsList: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](GOALS)
      }
      //console.log(GOALS, res);
      return res;
    },
    valuesList: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](VALUES)
      }
      //console.log(VALUES, res);
      return res;
    },
    historyData: function () {
      let res = {
        items: this.parseHistoryData(this.$store.getters["aboutUs/getList"](HISTORY))
      }
      //console.log(HISTORY, res);
      return res;
    },
    prizesData: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](PRIZES)
      }
      //console.log(PRIZES, res);
      return res;
    },
    partnersCard: function () {
      let res = {
        items: this.parsePartnersData(this.$store.getters["aboutUs/getList"](PARTNERS))
      }
      //console.log(PARTNERS, res);
      return res;
    },
    programsList: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](PROGRAMS)
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    memoriesData: function () {
      let res = {
        items: this.parseMemoriesData(this.$store.getters["aboutUs/getList"](MEMORIES))
      }
      //console.log(MEMORIES, res);
      return res;
    },
    memoriesRseData: function () {
      let res = {
        items: this.parseMemoriesData(this.$store.getters["aboutUs/getList"](MEMORIES_RSE))
      }
      //console.log(MEMORIES_RSE, res);
      return res;
    },
    balanceData: function () {
      let sectionList = this.parseMemoriesData(this.$store.getters["aboutUs/getList"](INCOME_STATEMENTS));
      sectionList[0].items.forEach(item => {
        item.onClick = this.downloadDocument;
        item.fileUrl = generateReportFileUrlFromId(item['description'])
      });
      let res = { items: sectionList }
      //console.log(INCOME_STATEMENTS, res);
      return res;
    },
    risksData: function () {
      let res = {
        items: this.parseRisksData(this.$store.getters["aboutUs/getList"](RISKS))
      }
      //console.log(RISKS, res);
      return res;
    },
    ratingsData: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](RATINGS)
      }
      //console.log(RATINGS, res);
      return res;
    },
    videoData: function () {
      let res = {
        items: _.map(this.$store.getters["aboutUs/getList"](VIDEO), this.parseVideoData)
      }
      //console.log(VIDEO, res);
      return res;
    },
    benefitsData: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](BENEFITS)
      }
      //console.log(BENEFITS, res);
      return res;
    },
    riskPills: function () {
      let res = {
        items: this.$store.getters["aboutUs/getList"](RISK_PILLS)
      }
      res.items.forEach(item => {
        item.onClick = this.downloadDocument;
        item.fileUrl = generateReportFileUrlFromId(item['description'])
      });
      //console.log(RISK_PILLS, res);
      return res;
    },
  },
  data() {
    return {};
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, INTRO);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, GOALS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, VALUES);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, HISTORY);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, PRIZES);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, PARTNERS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, PROGRAMS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, MEMORIES);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, MEMORIES_RSE);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, INCOME_STATEMENTS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, RISKS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, RATINGS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, VIDEO);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, BENEFITS);
    await context.store.dispatch(`aboutUs/${UPDATE_STATE_ACTION}`, RISK_PILLS);
    return header;
  },
  head () {return this.headData}
};
</script>

