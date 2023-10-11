<template>
  <div>
    <v-container :class="`${ns} mx-auto`">
      <v-row v-if="titleData.items.length > 0" :class="`${ns}__white-background mx-0 mx-sm-16`">
        <v-col class="text-sm-center">
          <v-img :class="`${ns}__img mb-5 ma-sm-auto`" style="width: 100px;"  :src="require(`@/assets/images/card.svg`)"></v-img>
          <BracketBanx
            :text1="titleData.items[0].title"
            :text2="titleData.items[0].subTitle"
            :bracket-color="'#A7D342'"
            :newLine="true"
          />
          <div class="my-6">
            {{titleData.items[0].description}}
          </div>
        </v-col>
      </v-row>
      <v-row class="d-none d-sm-flex">
        <v-col v-for="(card, i) in cardsData.items" :key="i" cols="6" lg="4" xl="3">
          <Card
            :cardTitle="card.title"
            :cardContent="card.subTitle"
            :message="card.description"
            :isBanx="true"
            :cardImage="card.mainImageUrl"
            :alt="card.imgAlt1"
            :className="card.gradient"
            :label="card.gradientText"
            :cardId="card.id"
            :tags="card.tags"
            :buttonLabel="card.buttonName"
            :buttonColor="card.buttonType"
            :onButtonClick="creditCardDetails"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="cardsData.items"
        :onButtonClick="creditCardDetails"
        :isBanx="true"
        class="d-sm-none my-8"
      />
      <v-row :class="`${ns}__white-background mx-sm-16 mt-6 bm-compare__banx`">
        <v-col class="text-center">
          <BracketBanx
            :text1="'Compara las tarjetas'"
            :text2="'de crédito'"
            :bracket-color="'#56C1FF'"
            :newLine="true"
          />
          <div class="my-5 px-5">
            ¡Te ayudamos a elegir! Utiliza nuestro comparador de cuentas para poder tomar una decisión bien informada.
          </div>
          <Button
            :text="'Comparar tarjetas'"
            :color="'bm-sky-blue'"
            :onClick="cardsComparison"
          />
        </v-col>
      </v-row>
      <ReviewsCarousel v-if="reviewsData.items.length > 0" :reviews="reviewsData.items" class="py-8"/>
      <Benefits v-bind:benefitsData="benefitsData"/>
    </v-container>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
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
      :background="program.background"
      :direction="directionBoxOnPrograms(i)"
      :onClickLink="program.buttonHref"
    />
    <Benefits2
      v-bind:benefits2Data = "benefits2Data"
    />
    <div class="py-sm-4 py-md-16">
      <RelatedPanel :items="relatedItems.items" :isBanx="true" style="display: none"/>
    </div>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import Compare from "@/components/Compare.vue";
import Benefits from "@/components/Benefits.vue";
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import ReviewsCarousel from "@/components/ReviewsCarousel.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import {generateEmptyModels, directionBoxOnPrograms} from "~/utils/cardsUtil";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  CREDIT_CARD_BENEFITS,
  CREDIT_CARD_BENEFITS_2,
  CREDIT_CARD_CARDS,
  CREDIT_CARD_PROGRAMS,
  CREDIT_CARD_TITLE,
  CREDIT_CARD_REVIEWS_CAROUSEL
} from "@/cardListKeys/banx";
import BracketBanx from "@/components/BracketBanx";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    BracketBanx,
    Card,
    Compare,
    Benefits,
    Programs,
    Benefits2,
    MoreInfo,
    RelatedPanel,
    ReviewsCarousel,
    CardSliderMobile
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](CREDIT_CARD_TITLE)
      }
      //console.log(CREDIT_CARD_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](CREDIT_CARD_CARDS)
      }
      //console.log(CREDIT_CARD_CARDS, res);
      return res;
    },
    reviewsData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](CREDIT_CARD_REVIEWS_CAROUSEL)
      }
      //console.log(CREDIT_CARD_REVIEWS_CAROUSEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["banx/getList"](CREDIT_CARD_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(CREDIT_CARD_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["banx/getList"](CREDIT_CARD_PROGRAMS);
      for(let i in sectionList) {
        if(i % 2 !== 0) {
          sectionList[i]['background'] = "gradient-light-blue"
        }
      }
      let res = {
        items: sectionList
      }
      //console.log(CREDIT_CARD_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["banx/getList"](CREDIT_CARD_BENEFITS_2);
      if(sectionList.length === 0) {
        sectionList = generateEmptyModels(1);
      } else {
        sectionList[0]['linkUrl'] = "/help/agencies";
      }
      let res = {
        items: sectionList
      };
      //console.log(CREDIT_CARD_BENEFITS_2, res);
      return res;
    }
  },
  data() {
    return {
      directionBoxOnPrograms: directionBoxOnPrograms,
      ns: "credit-card-banx",
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
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
    };
  },
  methods: {
    cardsComparison() {
      this.$router.push({
        path: "CardsComparison"
      });
    },
    creditCardDetails(card) {
      this.$router.push({
        path: `CreditCardDetails?key=${card['tags']}`
      });
    },
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, CREDIT_CARD_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, CREDIT_CARD_CARDS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, CREDIT_CARD_REVIEWS_CAROUSEL);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, CREDIT_CARD_BENEFITS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, CREDIT_CARD_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, CREDIT_CARD_BENEFITS_2);
    return header;
  },
  head () {return this.headData}
};
</script>
