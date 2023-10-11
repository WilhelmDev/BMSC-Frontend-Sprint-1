<template>
  <v-container fluid :class="`${ns}`">
    <div class="">
    <v-row>
      <v-col class="d-flex justify-center">
        <BracketBanx
          :text1="titleData.title"
          :text2="titleData.subTitle"
          :bracket-color="'#A7D342'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div :class="`${ns}__advice big-text`">
          {{titleData.description}}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <BracketBanx
          :text1="descriptionData.title"
          :text2="descriptionData.subTitle"
          :bracket-color="'#56C1FF'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center px-0">
        <BoxAndImage
          :class="`${ns}__image`"
          :image="descriptionData.mainImageUrl"
          :alt="descriptionData.imgAlt1"
          :className="descriptionData.gradient"
          :label="descriptionData.gradientText"
          :direction="'center-left'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div :class="`${ns}__advice`" v-html="descriptionDetailsData.title"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="`${ns}__description-details-data d-flex justify-center`">
      <Box
          :label="descriptionDetailsData.gradientText"
          :className="descriptionDetailsData.gradient"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="big-text text-center" >
          {{descriptionDetailsData.description}}
        </div>
      </v-col>
    </v-row>
      <DescriptionCardCarousel :class="`${ns}__description-card-carousel`" :carouselData="carouselData" />
      <v-row class="py-sm-16">
      <v-col :class="`${ns}__benefit-box d-flex justify-center pt-8`">
      <Box
          :label="'+ Beneficios Banx'"
          :className="'linear-gradient-purple-fuchsia'"
          :x="'red'"
        />
      </v-col>
    </v-row>
    </div>
    <Programs
      v-for="(program, i) in programs.items.slice(0,2)"
      :key="program.id"
      :programContent="program.description"
      :programLink="program.buttonName"
      :isImageInLeft="i%2===0"
      :isBanx="true"

      :text1="program.title"
      :text2="program.subTitle"
      :bracketColor="'#56C1FF'"
      :newLine="true"

      :className="program.gradient"
      :xBox="'blue'"
      :label="program.gradientText"
      :image="program.mainImageUrl"
      :direction="directionBoxOnPrograms(i)"
      :onClickLink="program.buttonHref"
    />
    <adBanx
      :creditCardImage="adBanx.mainImageUrl"
      :content="adBanx.description"
      :text1BracketBanx="adBanx.title"
      :text2BracketBanx="adBanx.subTitle"
      :bracketColor="'#A7D342'"
      :labelBox="adBanx.gradientText"
      :className="adBanx.gradient"
      :alt="adBanx.imgAlt1"
    />
    <Programs
      v-for="(program, i) in programs.items.slice(2,4)"
      :key="program.id"
      :programContent="program.description"
      :programLink="program.buttonName"
      :isImageInLeft="i%2===0"
      :isBanx="true"

      :text1="program.title"
      :text2="program.subTitle"
      :bracketColor="'#56C1FF'"
      :newLine="true"

      :className="program.gradient"
      :xBox="'blue'"
      :label="program.gradientText"
      :image="program.mainImageUrl"
      :direction="directionBoxOnPrograms(i)"
      :onClickLink="program.buttonHref"
    />
    <RelatedPanel :items="relatedItems.items" :isBanx="true"/>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </v-container>
</template>

<script>
import Box from "@/components/Box";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import BoxAndText from "@/components/BoxAndText";
import BracketBanx from "@/components/BracketBanx";
import BoxAndImage from "@/components/BoxAndImage";
import Programs from "~/components/Programs";
import AdBanx from "~/components/adBanx";
import ListedProducts from "~/components/ListedProducts";
import DescriptionCardCarousel from "~/components/DescriptionCardCarousel";
import VideoBanx from "~/components/VideoBanx";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  CARDS,
  DESCRIPTION,
  CAROUSEL,
  DESCRIPTION_DETAILS,
  PROGRAMS,
  TITLE
} from "~/cardListKeys/benefitDetails";
import {directionBoxOnPrograms, generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "BenefitDetailsBanx",
  components: {
    VideoBanx,
    DescriptionCardCarousel,
    ListedProducts,
    AdBanx,
    Programs,
    BoxAndImage,
    BracketBanx,
    BoxAndText,
    Box,
    RelatedPanel,
    MoreInfo
  },
  created() {
    this.benefitKey = this.$route.query.key;
    //console.log('Loading account: ',this.benefitKey);
  },
  async mounted() {
    await this.loadBenefitsDetailsData();
  },
  methods: {
    getListSectionKey(section) {
      return this.benefitKey + '-' + section;
    },
    async loadBenefitsDetailsData() {
      await this.$store.dispatch(`benefitDetails/${UPDATE_STATE_ACTION}`,[this.benefitKey,TITLE, this]);
      await this.$store.dispatch(`benefitDetails/${UPDATE_STATE_ACTION}`,[this.benefitKey,DESCRIPTION, this]);
      await this.$store.dispatch(`benefitDetails/${UPDATE_STATE_ACTION}`,[this.benefitKey,DESCRIPTION_DETAILS, this]);
      await this.$store.dispatch(`benefitDetails/${UPDATE_STATE_ACTION}`,[this.benefitKey,CAROUSEL, this]);
      await this.$store.dispatch(`benefitDetails/${UPDATE_STATE_ACTION}`,[this.benefitKey,PROGRAMS, this]);
      await this.$store.dispatch(`benefitDetails/${UPDATE_STATE_ACTION}`,[this.benefitKey,CARDS, this]);
    }
  },
  computed: {
    detailsData() {
      const accountId = this.$route.query.accountId;
      const data = _.filter(
        this.benefits,
        item => item.id === accountId
      );
      return data[0];
    },
    titleData: function () {
      let sectionList = this.$store.getters["benefitDetails/getList"](TITLE);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(TITLE, res);
      return res.items[0];
    },
    descriptionData: function () {
      let sectionList = this.$store.getters["benefitDetails/getList"](DESCRIPTION);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(DESCRIPTION, res);
      return res.items[0];
    },
    descriptionDetailsData: function () {
      let sectionList = this.$store.getters["benefitDetails/getList"](DESCRIPTION_DETAILS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(DESCRIPTION, res);
      return res.items[0];
    },
    carouselData: function () {
      let sectionList = this.$store.getters["benefitDetails/getList"](CAROUSEL);
      let res = {
        items: sectionList
      }
      //console.log(CAROUSEL, res);
      return res.items;
    },
    programs: function () {
      let sectionList = this.$store.getters["benefitDetails/getList"](PROGRAMS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    adBanx: function () {
      let sectionList = this.$store.getters["benefitDetails/getList"](CARDS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(CARDS, res);
      return res.items[0];
    }
  },
  data() {
    return {
      directionBoxOnPrograms: directionBoxOnPrograms,
      ns: "benefit-details-banx",
      benefitKey: "",
      relatedItems: {
        items: [
          {
            title: "Cuentas BANX para jóvenes",
            subTitle: "Ver opciones",
            route: "/banx"
          },
          {
            title: "Cuentas para negocios PYME",
            subTitle: "Ver opciones",
            route: "/pyme"
          },
          {
            title: "Cuentas corporativas para tu empresa",
            subTitle: "Ver opciones",
            route: "/companies"
          },
          {
            title: "Prestamos para tu casa o vehículo",
            subTitle: "Ver préstamos",
            route: "/client/Loans"
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
    };
  },
  async asyncData(context) {
    const header = await getHeader(context);
    return header;
  },
  head () {return this.headData}
};
</script>
