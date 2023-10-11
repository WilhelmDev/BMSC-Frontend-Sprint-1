<template>
  <div>
    <Banner v-bind:bannerData="bannerData"/>
    <Programs
      v-for="(program, i) in programs.items"
      :key="i"
      :programContent="program.description"
      :programLink="program.buttonName"
      :isImageInLeft="i%2===0"
      :isBanx="true"
      :onClickLink="program.buttonHref"

      :text1="program.title"
      :text2="program.subTitle"
      :bracketColor="'#56C1FF'"
      :newLine="true"

      :className="program.gradient"
      :xBox="'blue'"
      :label="program.gradientText"
      :image="program.mainImageUrl"
      :alt="program.imgAlt1"
      :direction="directionBoxOnPrograms(i)"
    />
    <EspecialProgram v-bind:apiMarketData="apiMarketData"/>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>
<script>
import Programs from "@/components/Programs.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {TECH_PROGRAMS, TECH_BANNER, TECH_API_MARKET} from "@/cardListKeys/tech";
import {directionBoxOnPrograms, generateEmptyModels} from "@/utils/cardsUtil";
import Banner from "@/components/Banner";
import EspecialProgram from "@/components/EspecialProgram";
import {getHeader} from "~/utils/seo";
export default {
  components: {
    EspecialProgram,
    Banner,
    Programs,
    MoreInfo
  },
  async mounted() {

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
  computed:{
    bannerData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_BANNER);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(TECH_BANNER, res);
      return res;
    },
    programs: function () {
      let res = {
        items: this.$store.getters["banx/getList"](TECH_PROGRAMS)
      }
      if (res.items < 1) {
        let programs = [...this.programsHardcode.items];
        res = {
          items: programs
        }
      }
      //console.log(TECH_PROGRAMS, res.items);
      return res;
    },
    apiMarketData: function () {
      let sectionList = this.$store.getters["banx/getList"](TECH_API_MARKET);
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
  data() {
    return {
      directionBoxOnPrograms: directionBoxOnPrograms,
      programsLinkFunctions: [
        this.goToMobileBank,
        this.goToInternetBank,
        this.goToATMS,
        this.goToAutoservice
      ],
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      programsHardcode: {
        items: [
          {
            title: "Banca",
            subTitle: "móvil",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/phone-travel.png"),
            changeOrder: true,
            gradientText: "texto destacado",
            gradient: "linear-gradient-purple-fuchsia",
            buttonName: "Ver tecnología"
          },
          {
            title: "Banca por",
            subTitle: "internet",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/ebank.png"),
            background: "green",
            gradientText: "texto destacado",
            gradient: "linear-gradient-purple-fuchsia",
            buttonName: "Conocer más"
          },
          {
            title: "Amplia red de",
            subTitle: "Cajeros automáticos",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/atms.png"),
            changeOrder: true,
            gradientText: "texto destacado",
            gradient: "linear-gradient-purple-fuchsia",
            buttonName: "Ver cajeros automáticos"

          },
          {
            title: "Plataformas de autoservicio",
            subTitle: "autoservicio",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/autoservice.png"),
            background: "blurred",
            gradientText: "texto destacado",
            gradient: "linear-gradient-purple-fuchsia",
            buttonName: "Ver Sueldo Plus"
          }
        ]
      },
    };
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,TECH_BANNER);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,TECH_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,TECH_API_MARKET);
    return header;
  },
  head () {return this.headData}
};
</script>
