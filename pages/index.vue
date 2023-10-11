<template>
  <div>
    <CommunicationModal :showModal="showComModal" v-on:hideModal="comModalState=true"/>
    <DescriptionCardCarousel :carouselData="carouselData.items" class="pb-16"/>
    <v-row class="d-none d-sm-flex" no-gutters>
      <v-col cols="12">
        <ListedProducts :productList="listedProductsData.items" class=""/>
      </v-col>
    </v-row>
    <ListedProductsMobile :productList="listedProductsData.items" class="d-sm-none"/>
    <v-row no-gutters>
      <v-col v-for="(card, i) in cardsData.items"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        class="pa-0 px-sm-1"
      >
        <v-row justify="center" style="height: 100%" no-gutters>
          <Card
            :cardTitle="card.title"
            :cardContent="card.subTitle"
            :cardImage="card.mainImageUrl"
            :alt="card.imgAlt1"
            :message="card.description"
            :buttonLabel="card.buttonName"
            :buttonColor="card.buttonType"
            :cardButtonHref="card.buttonHref"
            :cardId="card.id"
            :tags="card.tags"
            class="light-green-bg"
            :squareImages="true"
          />
        </v-row>
      </v-col>
    </v-row>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'grey' : ''"
      :isImageInLeft="i % 2 == 0"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <BankAd v-bind:bankData="bankData" class="my-sm-16 py-16"/>
    <MoreInfo
      v-bind="moreInfoConfig"
      class="my-sm-16"
    />
  </div>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import ListedProducts from "@/components/ListedProducts.vue";
import Card from "@/components/Card.vue";
import Programs from "@/components/Programs.vue";
import Assets from "@/components/Asset.vue";
import DescriptionCardCarousel from "@/components/DescriptionCardCarousel.vue";
import _ from "lodash"
import CommunicationModal from "@/components/defaultComponents/CommunicationModal.vue";

import {
  HOME_CAROUSEL,
  HOME_LISTED_PRODUCTS,
  HOME_CARDS,
  HOME_PROGRAMS,
  HOME_BANK
} from "~/cardListKeys/client";
import { UPDATE_STATE_ACTION } from "~/constants_actions";
import BankAd from "~/components/BankAd";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "index",
  components: {
    BankAd,
    DescriptionCardCarousel,
    MoreInfo,
    Card,
    Programs,
    ListedProducts,
    Assets,
    CommunicationModal
  },
  middleware ({ $gtm }) {
    $gtm.push({ 'varName': 'value' })
  },
  async mounted() {
  },
  computed: {
    carouselData: function () {
      let res = {
        items: this.$store.getters["client/getList"](HOME_CAROUSEL)
      }
      //console.log(HOME_CAROUSEL, res);
      return res;
    },
    listedProductsData: function () {
      let res = {
        items: this.$store.getters["client/getList"](HOME_LISTED_PRODUCTS)
      }
      // console.log(HOME_LISTED_PRODUCTS)
      // console.log(HOME_LISTED_PRODUCTS, res);
      return res;
    },
    cardsData: function () {
      let sectionList = this.$store.getters["client/getList"](HOME_CARDS);
      let items = _.map(sectionList, (item) => {
        return {
          title: _.get(item, 'title'),
          subTitle: _.get(item, 'subTitle'),
          description: _.get(item, 'description'),
          mainImageUrl: _.get(item, 'mainImageUrl'),
          buttonName: _.get(item, 'buttonName'),
          buttonType: _.get(item, 'buttonType'),
          buttonHref: _.get(item, 'buttonHref')
        }
      });
      let res = {
        items: items
      }
      // console.log(HOME_CARDS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["client/getList"](HOME_PROGRAMS);
      let items = _.map(sectionList, (item) => {
        return {
          title: _.get(item, 'title'),
          subTitle: _.get(item, 'subTitle'),
          description: _.get(item, 'description'),
          mainImageUrl: _.get(item, 'mainImageUrl'),
          secondImageUrl: _.get(item, 'secondImageUrl'),
          buttonHref: _.get(item, 'buttonHref')
        }
      });
      let res = {
        items: items
      }
      //console.log(HOME_PROGRAMS, res);
      return res;
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
        image: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 81),1)
      }
      //console.log(HOME_BANK, res);
      return res;
    },
    showComModal() {
      return this.comModalState === false;
    }
  },
  data() {
    return {
      moreInfoConfig: {
        moreInfoTitle: "¿Cómo podemos ayudarte?",
        cardIcon1: "icon-bank",
        cardLabel1: "Agencias y cajeros",
        cardIcon2: "icon-help",
        cardLabel2: "Preguntas frecuentes",
        cardIcon3: "icon-reclamo",
        cardLabel3: "Punto de reclamo"
      },
      comModalState: false
    };
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, HOME_CAROUSEL);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, HOME_LISTED_PRODUCTS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, HOME_CARDS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, HOME_PROGRAMS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, HOME_BANK);
    return header;
  },
  head () {return this.headData}
};
</script>
