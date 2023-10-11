<template>
  <div>
    <DescriptionCardCarousel :carouselData="carouselData.items" />
    <Benefits2 v-bind:benefits2Data = "benefits2Data"/>
    <Benefits v-bind:benefitsData = "benefitsData"/>
    <ListedTutorials :tutorialsList = "tutorialsList"/>
    <v-row justify="center">
      <Button text="Ver más" :onClick="goToRSEDocuments"/>
    </v-row>
    <Benefits3 v-bind:benefits3Data = "benefits3Data"/>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'grey' : ''"
      :isImageInLeft="i%2 === 0"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <Qualification :qualificationsData="qualificationsData.items[0]" />
    <h2 class="green-dark-text text-center pt-8 pb-14">
      Informes de RSE
    </h2>
    <v-row class="justify-center">
      <v-col
        v-for="(card, index) in reportsList.items"
        :key="index"
        class="px-4"
        cols="12"
        sm="6"
        md="4"
      >
        <ImageCard :cardData="card" :onButtonClick="card.onButtonClick" :downloadable="true" :clickableImage="true"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DescriptionCardCarousel from "@/components/DescriptionCardCarousel.vue";
import Benefits2 from "@/components/Benefits2.vue";
import Benefits from "@/components/Benefits.vue";
import ImageCard from "@/components/ImageCard.vue";
import ListedTutorials from "@/components/ListedTutorials";
import Programs from "@/components/Programs.vue";
import Qualification from "@/components/Qualification.vue";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  CAROUSEL,
  BENEFITS2,
  BENEFITS,
  BENEFITS3,
  TUTORIALS,
  PROGRAMS,
  QUALIFICATIONS,
  REPORTS, DOCUMENTS
} from "~/cardListKeys/rse";
import {generateReportFileUrlFromId, downloadItem, generateEmptyModels} from "@/utils/cardsUtil";
import {TECH_MOBILE_BANK_DOCUMENTS} from "~/cardListKeys/tech";
import {getHeader} from "~/utils/seo";
export default {
  components: {
    DescriptionCardCarousel,
    Benefits2,
    Benefits,
    ListedTutorials,
    Programs,
    Qualification,
    ImageCard
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, CAROUSEL);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, BENEFITS2);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, BENEFITS);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, BENEFITS3);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, TUTORIALS);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, PROGRAMS);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, QUALIFICATIONS);
    await this.$store.dispatch(`rse/${UPDATE_STATE_ACTION}`, REPORTS);
  },
  computed: {
    carouselData: function () {
      let res = {
        items: this.$store.getters["rse/getList"](CAROUSEL)
      }
      //console.log(CAROUSEL, res);
      return res;
    },
    benefits2Data: function () {
      let res = {
        items: this.$store.getters["rse/getList"](BENEFITS2)
      }
      //console.log(BENEFITS2, res);
      return res;
    },

    benefitsData: function () {
      let res = {
        items: this.$store.getters["rse/getList"](BENEFITS)
      }
      //console.log(BENEFITS, res);
      return res;
    },

    benefits3Data: function () {
      let res = {
        items: this.$store.getters["rse/getList"](BENEFITS3)
      }
      //console.log(BENEFITS3, res);
      return res;
    },

    tutorialsList: function () {
      let res = {
        items: this.$store.getters["rse/getList"](TUTORIALS)
      }
      //console.log(TUTORIALS, res);
      return res;
    },
    programsData: function () {
      let res = {
        items: this.$store.getters["rse/getList"](PROGRAMS)
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    qualificationsData: function () {
      let res = {
        items:this.parseQualificationData(this.$store.getters["rse/getList"](QUALIFICATIONS))
      }
      //console.log(QUALIFICATIONS, res);
      return res;
    },
    reportsList: function () {
      let sectionList = this.$store.getters["rse/getList"](REPORTS);

      let items = sectionList.map(item => {
        return {
          onButtonClick: this.downloadDocument,
          ...item,
          fileUrl: generateReportFileUrlFromId(item['description'])
        }
      });
      let res = { items };
      //console.log(REPORTS, res);
      return res;
    },
  },
  methods: {
    parseQualificationData(dataArray) {
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
    downloadDocument(item) {
      downloadItem(item.fileUrl, item.title);
    },
    goToRSEDocuments() {
      this.$router.push({
        path: `/AboutUs/RSEDocuments`
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, CAROUSEL);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, BENEFITS2);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, BENEFITS);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, BENEFITS3);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, TUTORIALS);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, PROGRAMS);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, QUALIFICATIONS);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, REPORTS);
    return header;
  },
  head () {return this.headData}
};
</script>
