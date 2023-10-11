<template>
  <div>
    <v-container class="bm-loans mx-auto">
      <main-title v-if="titleData.items.length > 0" :pageTitle="titleData.items[0]"></main-title>
      <v-row v-if="titleData.items.length > 0">
        <v-col cols="12" sm="8" style="text-align: justify;text-justify: inter-word;">
          <span class="big-text" v-html="titleData.items[0].description"></span>
        </v-col>
      </v-row>
      <v-row class="d-none d-sm-flex">
        <v-col
          v-for="(card, i) in cardsData.items"
          :key="i"
          cols="6"
          lg="4"
          xl="3"
        >
          <Card
            :cardTitle="card.title"
            :cardContent="card.subTitle"
            :cardImage="card.mainImageUrl"
            :alt="card.imgAlt1"
            :message="card.description"
            :buttonLabel="card.buttonName"
            :buttonColor="card.buttonType"
            :onButtonClick="guaranteeDetails"
            :cardId="card.id"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="cardsData.items"
        :onButtonClick="guaranteeDetails"
        class="d-sm-none my-8"
      />
    </v-container>
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

    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems.items" />
    </div>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";
import Programs from "@/components/Programs.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  CARDS, PROGRAMS,
  TITLE
} from "~/cardListKeys/guarantee";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    Card,
    Programs,
    MoreInfo,
    RelatedPanel,
    CardSliderMobile
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
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["guarantee/getList"](TITLE)
      }
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["guarantee/getList"](CARDS)
      }
      return res;
    },
    programsData: function () {
      let programs = this.$store.getters["guarantee/getList"](PROGRAMS);

      let res = {
        items: programs
      }
      return res;
    },
  },
  methods: {
    guaranteeDetails(card) {
      this.$router.push({
        path: `/GuaranteeDetails?key=${card.tags}`
      });
    },
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`guarantee/${UPDATE_STATE_ACTION}`,TITLE);
    await context.store.dispatch(`guarantee/${UPDATE_STATE_ACTION}`,CARDS);
    await context.store.dispatch(`guarantee/${UPDATE_STATE_ACTION}`,PROGRAMS);
    return header;
  },
  head () {return this.headData}
};
</script>
<style scoped></style>
