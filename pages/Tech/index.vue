<template>
  <div>
    <Banner v-bind:bannerData="bannerData" class="mt-12 mt-sm-0"/>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="i%2 === 0"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <EspecialProgram v-bind:apiMarketData="apiMarketData"/>
    <MoreInfo
      v-bind="moreInfoConfig"
      class="py-16"
    />
  </div>
</template>
<script>
import Programs from "@/components/Programs.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {TECH_API_MARKET, TECH_BANNER, TECH_PROGRAMS} from "~/cardListKeys/tech";
import {generateEmptyModels} from "~/utils/cardsUtil";
import Banner from "~/components/Banner";
import EspecialProgram from "~/components/EspecialProgram";
import {getHeader} from "~/utils/seo";
export default {
  components: {
    EspecialProgram,
    Banner,
    Programs,
    MoreInfo
  },
  data() {
    return {
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      programs: {
        items: [
          {
            title: "Banca móvil",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Ver tecnología",
            mainImageUrl: require("@/assets/images/phone-travel.png"),
            changeOrder: true
          },
          {
            title: "Banca por internet",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Conocer más",
            mainImageUrl: require("@/assets/images/ebank.png"),
            background: "green"
          },
          {
            title: "Amplia red de Cajeros automáticos",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Ver cajeros automáticos",
            mainImageUrl: require("@/assets/images/atms.png"),
            changeOrder: true
          },
          {
            title: "Plataformas de autoservicio",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Ver más",
            mainImageUrl: require("@/assets/images/autoservice.png"),
            background: "blurred"
          }
        ]
      },
      programsLinkFunctions: [
        this.goToMobileBank,
        this.goToInternetBank,
        this.goToATMS,
        this.goToAutoservice
      ]
    };
  },
  async mounted() {

  },
  computed: {
    bannerData: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["tech/getList"](TECH_BANNER)));
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(TECH_BANNER, res);
      return res;
    },
    programsData: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["tech/getList"](TECH_PROGRAMS)));

      let res = {
        items: sectionList
      }
      //console.log(TECH_PROGRAMS, res);
      return res;
    },
    apiMarketData: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["tech/getList"](TECH_API_MARKET)));
      if(sectionList.length === 0) {
        sectionList = generateEmptyModels(1);
      } else {
        sectionList[0]['onClickLink'] = this.goToApiMarket;
      }

      let res = {
        items: sectionList
      }
      //console.log(TECH_API_MARKET, res);
      return res;
    }
  },
  methods: {
    goToApiMarket() {
      this.$router.push({
        path: "tech/apiMarket"
      });
    },
    goToMobileBank() {
      this.$router.push({
        path: "tech/mobileBank"
      });
    },
    goToInternetBank() {
      this.$router.push({
        path: "tech/internetBank"
      });
    },
    goToATMS() {
      this.$router.push({
        path: "tech/atms"
      });
    },
    goToAutoservice() {
      this.$router.push({
        path: "tech/autoservice"
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`,TECH_BANNER);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`,TECH_PROGRAMS);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`,TECH_API_MARKET);
    return header;
  },
  head () {return this.headData}
};
</script>
