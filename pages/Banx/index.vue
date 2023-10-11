<template>
  <div :class="`${ns}`">
    <VideoBanx/>
    <DescriptionCardCarousel :carouselData="carouselData.items" />
    <v-row class="d-none d-sm-flex" no-gutters>
      <v-col cols="12">
        <ListedProducts :productList="productList.items" class=""/>
      </v-col>
    </v-row>
    <ListedProductsMobile :productList="productList.items" class="d-sm-none"/>
    <Programs
      v-for="(program, i) in programs.items.slice(0,2)"
      :key="i+'programs-1'"
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
      :key="i+'programs-2'"
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
    <BankAd v-bind:bankData="bankData"/>
    <BlogCardBanx
      :labelBox="newsTitle.gradientText"
      :className="newsTitle.gradient"
      :text="newsTitle.description"
      :cardItems="newsData.items"
    />
    <RelatedPanel :items="relatedItems.items" :isBanx="true" style="display: none"/>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
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
import BlogCardBanx from "~/components/BlogCardBanx";
import BankAd from "~/components/BankAd";
import {UPDATE_STATE_ACTION, UPDATE_STATE_NEWS_ACTION} from "@/constants_actions";
import {
  HOME_CAROUSEL, HOME_LISTED_PRODUCTS, HOME_CARDS,HOME_PROGRAMS, HOME_NEWS_TITLE, HOME_NEWS, HOME_RELATED_ITEMS, HOME_MORE_INFO
} from "~/cardListKeys/banx";
import {HOME_BANK} from "@/cardListKeys/client";
import {NEWS_LIST} from "~/cardListKeys/companies";
import {generateEmptyModels, directionBoxOnPrograms} from "@/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "index",
  components: {
    BankAd,
    BlogCardBanx,
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
  data() {
    return {
      directionBoxOnPrograms: directionBoxOnPrograms,
      ns: "index-banx",
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
        moreInfoTitle: "Centro de ayuda",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-bank",
        cardLabel2: "Agencias y cajeros",
        cardIcon3: "icon-chat",
        cardLabel3: "Consulta a un ejecutivo"
      }
    };
  },
  async mounted() {

  },
 computed: {
   carouselData: function () {
     let res = {
       items: this.$store.getters["banx/getList"](HOME_CAROUSEL)
     }
     //console.log(HOME_CAROUSEL, res.items);
     return res;
   },
   productList: function () {
     let res = {
       items: this.$store.getters["banx/getList"](HOME_LISTED_PRODUCTS)
     }
     //console.log(HOME_CAROUSEL, res.items);
     return res;
   },
   programs: function () {
     let res = {
       items: this.$store.getters["banx/getList"](HOME_PROGRAMS)
     }
     //console.log(HOME_PROGRAMS, res.items);
     return res;
   },
   newsTitle: function () {
     let sectionList = this.$store.getters["banx/getList"](HOME_NEWS_TITLE);
     if(sectionList.length === 0) sectionList = generateEmptyModels(1);
     let res = {
       items: sectionList
     }
     //console.log(HOME_NEWS_TITLE, res.items);
     return res.items[0];
   },
   adBanx: function () {
     let sectionList = this.$store.getters["banx/getList"](HOME_CARDS);
     if(sectionList.length === 0) sectionList = generateEmptyModels(1);
     let res = {
       items: sectionList
     }
     //console.log(HOME_CARDS, res.items);
     return res.items[0];
   },
   bankData: function () {
     let sectionList = this.$store.getters["client/getList"](HOME_BANK);
     /*
       Category 81 - Image
       Category 83 - Logo
       Category 82 - Description
     */
     function processList(list,size) {
       if(list.length === 0) return generateEmptyModels(size);
       return list;
     }
     let res = {
       logos: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 83),3),
       subSections: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 82),2),
       image: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 81),1),
       isBanx: true
     }
     //console.log(HOME_BANK, res);
     return res;
   },
   newsData: function () {
     let res = {
       items: this.$store.getters["banx/getList"](NEWS_LIST)
     }
     //console.log(NEWS_LIST, res);
     return res;
   }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_CAROUSEL);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_LISTED_PRODUCTS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_CARDS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_NEWS_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_NEWS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_RELATED_ITEMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,HOME_MORE_INFO);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,HOME_BANK);
    await context.store.dispatch(`banx/${UPDATE_STATE_NEWS_ACTION}`);
    return header;
  },
  head () {return this.headData}
};
</script>
