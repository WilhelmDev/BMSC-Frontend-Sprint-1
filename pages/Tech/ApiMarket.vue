<template>
  <div>
    <v-container class="text-center">
      <OptionsPanel :data="titleData.items[0]">
        <template v-slot:title>
          <h2
            class="green-text"
            v-html="titleData.items[0].title"
          ></h2>
        </template>
        <template v-slot:message>
          <div class="d-flex justify-center">
            <FilterButtons :buttonsConfig="filterButtonsConfig" class="pt-10" buttonsColor="green"/>
          </div>
        </template>
      </OptionsPanel>
    </v-container>
    <v-row class="px-sm-16 pb-sm-8 d-none d-sm-flex">
      <v-col
        v-for="(card, i) in cardsData.items"
        :key="i"
        cols="6"
        lg="4"
      >
        <Card
          :cardTitle="card.title"
          :cardContent="card.subTitle"
          :cardImage="card.mainImageUrl"
          :alt="card.imgAlt1"
          :message="card.description"
          :buttonLabel="card.buttonName"
          :buttonColor="card.buttonType"
          :onButtonClick="() => {}"
          :cardId="card.id"
          :tags="card.tags"
        />
      </v-col>
    </v-row>
    <CardSliderMobile
      :cardsData="cardsData.items"
      :onButtonClick="() => {}"
      class="d-sm-none my-8"
    />
    <DetailsCard :detailsData="sandBoxData.items[0]" class="my-16"/>
    <Compare
      v-if="compareData && compareData.items && compareData.items.length > 0"
      :compareTitle="compareData.items[0].title"
      :compareContent="compareData.items[0].description"
      :buttonName="compareData.items[0].buttonName"
      :onButtonClick="goToHref"
      :data="compareData.items[0]"
      class="py-16"
    />
    <MoreInfo
      v-bind="moreInfoConfig"
      class="py-16"
    />
  </div>
</template>
<script>
import OptionsPanel from "@/components/OptionsPanel.vue";
import FilterButtons from "@/components/FilterButtons.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import Compare from "@/components/Compare.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  TECH_API_MARKET_TITLE,
  TECH_API_MARKET_CARDS,
  TECH_API_MARKET_SANDBOX,
  TECH_API_MARKET_COMPARE
} from "~/cardListKeys/tech";
import {generateEmptyModels} from "~/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    OptionsPanel,
    FilterButtons,
    DetailsCard,
    Compare,
    MoreInfo,
    CardSliderMobile
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
        items: this.$store.getters["tech/getList"](TECH_API_MARKET_TITLE)
      }
      //console.log(TECH_API_MARKET_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["tech/getList"](TECH_API_MARKET_CARDS)
      }
      //console.log(TECH_API_MARKET_CARDS, res);
      return res;
    },
    sandBoxData: function () {
      let res = {
        items: this.$store.getters["tech/getList"](TECH_API_MARKET_SANDBOX)
      }
      //console.log(TECH_API_MARKET_SANDBOX, res);
      return res;
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["tech/getList"](TECH_API_MARKET_COMPARE)
      }

      //console.log(TECH_API_MARKET_COMPARE, res);
      return res;
    }
  },
  data() {
    return {
      getCardImage,
      filterButtonsConfig: [
        {
          text: "Todos",
          // onClick: this.onSelectSecondOption,
          tags: "client,company"
        },
        {
          text: "Personas",
          // onClick: this.onSelectSecondOption,
          tags: "client"
        },
        {
          text: "Empresas",
          // onClick: this.onSelectSecondOption,
          tags: "company"
        }
      ],
      compareConfig: {
        items: [
          {
            title: "¿Estás interesado?",
            description:
              "Ponte en contacto con nosotros para acceder a nuestras APIs.",
            buttonName: "Ir a contacto",
            buttonHref: "/tech/contactForm"
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
    goToHref(item) {
      if (checkValidUrl(item.buttonHref)) {
        window.open(item.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: item.buttonHref
        });
      }
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_API_MARKET_TITLE);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_API_MARKET_CARDS);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_API_MARKET_SANDBOX);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_API_MARKET_COMPARE);
    return header;
  },
  head () {return this.headData}
}
</script>
