<template>
  <div :class="`${ns}`">
    <div :class="`${ns}__card-info py-10`">
      <v-row :class="`${ns} mx-0 mx-sm-16`">
        <v-col class="text-sm-center">
          <v-img :class="`${ns}__img mb-5`" :src="accountIntro.mainImageUrl" :alt="accountIntro.imgAlt1"></v-img>
          <BracketBanx
            :text1="accountIntro.title"
            :text2="accountIntro.subTitle"
            :bracket-color="'#A7D342'"
            :newLine="true"
          />
          <div class="my-6" v-html="accountIntro.description"/>
        </v-col>
      </v-row>
      <v-row :class="`${ns} mx-16 d-none d-sm-flex`">
        <v-col v-for="(card, i) in cardItems.items" :key="i" cols="6" lg="4" xl="3">
          <Card
            :cardTitle="card.title"
            :cardContent="card.subTitle"
            :message="card.description"
            :isBanx="true"
            :cardImage="card.mainImageUrl"
            :alt="card.imgAlt1"
            :className="card.gradient"
            :label="card.gradientText"
            :onButtonClick="accountDetails"
            :cardId="card.id"
            :buttonLabel="card.buttonName"
            :buttonColor="card.buttonType"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="cardItems.items"
        :onButtonClick="accountDetails"
        :isBanx="true"
        class="d-sm-none my-8"
      />
      <v-row :class="`${ns}__white-background mx-sm-16 mt-6 bm-compare__banx`">
        <v-col class="text-center py-8">
          <BracketBanx
            :text1="compare.title"
            :text2="compare.subTitle"
            :bracket-color="'#56C1FF'"
            :newLine="true"
          />
          <div class="my-5 px-5">
            {{ compare.description }}
          </div>
          <Button
            :text="compare.buttonName"
            :color="compare.buttonType"
            :onClick="goToHref"
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
      :alt="adBanx.imgAlt1"
      :content="adBanx.description"
      :text1BracketBanx="adBanx.title"
      :text2BracketBanx="adBanx.subTitle"
      :bracketColor="'#A7D342'"
      :labelBox="adBanx.gradientText"
      :className="adBanx.gradient"
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
import BlogCard from "@/components/BlogCard.vue";
import BoxAndText from "@/components/BoxAndText";
import BracketBanx from "@/components/BracketBanx";
import BoxAndImage from "@/components/BoxAndImage";
import Programs from "~/components/Programs";
import AdBanx from "~/components/adBanx";
import ListedProducts from "~/components/ListedProducts";
import DescriptionCardCarousel from "~/components/DescriptionCardCarousel";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  ACCOUNT_MORE_INFO,
  ACCOUNT_RELATED_PANEL, ACCOUNTS_CARDS,
  ACCOUNTS_CARDS_LIST, ACCOUNTS_COMPARE, ACCOUNTS_PROGRAMS,
  ACCOUNTS_TITLE
} from "@/cardListKeys/banx";
import {directionBoxOnPrograms} from "@/utils/cardsUtil";
import {checkValidUrl} from "~/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "AccountsBanx",
  components: {
    Card,
    Button,
    DescriptionCardCarousel,
    ListedProducts,
    AdBanx,
    Programs,
    BoxAndImage,
    BracketBanx,
    BoxAndText,
    Box,
    RelatedPanel,
    MoreInfo,
    BlogCard,
    CardSliderMobile
  },
  data() {
    return {
      directionBoxOnPrograms: directionBoxOnPrograms,
      ns: "accounts-banx",
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
  async mounted() {

  },
  computed: {
    accountIntro: function () {
      let res = {
        items: this.$store.getters["banx/getList"](ACCOUNTS_TITLE)
      }
      //console.log(ACCOUNTS_TITLE, res.items);
      return res.items[0];
    },
    compare: function () {
      let res = {
        items: this.$store.getters["banx/getList"](ACCOUNTS_COMPARE)
      }
      //console.log(ACCOUNTS_COMPARE, res.items);
      return res.items[0];
    },
    cardItems:function () {
      let res = {
        items: this.$store.getters["banx/getList"](ACCOUNTS_CARDS_LIST)
      }
      //console.log(ACCOUNTS_CARDS_LIST, res.items);
      return res;
    },
    programs: function () {
      let res = {
        items: this.$store.getters["banx/getList"](ACCOUNTS_PROGRAMS)
      }
      //console.log(ACCOUNTS_PROGRAMS, res.items);
      return res;
    },
    adBanx: function () {
      let res = {
        items: this.$store.getters["banx/getList"](ACCOUNTS_CARDS)
      }
      //console.log(ACCOUNTS_CARDS, res.items);
      return res.items[0];
    },
  },
  methods: {
    accountDetails(card) {

      //console.log("card")
      //console.log(card)
      this.$router.push({
        path: `AccountDetailsBanx?key=${card['tags']}`
      });
    },
    goToHref() {
      let item = '/AccountComparison?key=comparadora-de-cuentas'
      this.$router.push({
        path: item
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNTS_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNTS_CARDS_LIST);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNTS_COMPARE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNTS_CARDS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNTS_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNT_RELATED_PANEL);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,ACCOUNT_MORE_INFO);
    return header;
  },
  head () {return this.headData}
};
</script>
