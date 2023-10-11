<template>
  <div>
    <v-container class="mx-auto bm-loans">
      <main-title v-if="titleData.items.length > 0" :pageTitle="titleData.items[0]"></main-title>
      <v-row v-if="titleData.items.length > 0">
        <v-col cols="12" sm="7" style="text-align: justify;text-justify: inter-word;">
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
            :onButtonClick="loanDetails"
            :cardId="card.id"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="cardsData.items"
        :onButtonClick="loanDetails"
        class="d-sm-none my-8"
      />
      <Compare
        v-if="compareData && compareData.items && compareData.items.length > 0"
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :buttonName="compareData.items[0].buttonName"
        :onButtonClick="goToHref"
        :data="compareData.items[0]"
      />
      <div class="simulator-cta-ctn" style="display: none">
        <SimulatorCTA/>
      </div>
      <Benefits v-bind:benefitsData="benefitsData"/>
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
    <Benefits2
      v-bind:benefits2Data = "benefits2Data"
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
import Compare from "@/components/Compare.vue";
import Benefits from "@/components/Benefits.vue";
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import SimulatorCTA from "@/components/SimulatorCTA.vue";
import Card from "@/components/Card.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  LOANS_BENEFITS,
  LOANS_BENEFITS_2,
  LOANS_CARDS,
  LOANS_PROGRAMS,
  LOANS_TITLE,
  LOANS_COMPARE
} from "~/cardListKeys/pyme";
import {generateEmptyModels} from "~/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "Loans",
  components: {
    Compare,
    Benefits,
    Programs,
    Benefits2,
    MoreInfo,
    SimulatorCTA,
    RelatedPanel,
    Card,
    CardSliderMobile
  },
  data: () => ({
    getCardImage,
    pageTitle: {
      items: {
        mainImageUrl: require("@/assets/images/loan.svg"),
        title: "Prestamos que te hacen crecer",
        description: "¡Te ayudamos a hacer realidad tus sueños! Compra la casa que siempre quisiste o el auto que tanto necesitas."
      }
    },
    compareConfig: {
      items: [
        {
          title: "Compara los tipos de préstamos",
          description:
            "¡Te ayudamos a elegir! Utiliza nuestro comparador de cuentas para poder tomar una decisión bien informada.",
          buttonName: "Comparar prestamos",
          buttonHref: "/loanComparison"
        }
      ]
    },
    benefitsConfig: {
      labelUp: "Beneficios del BMSC",
      labelMiddle: "Incluidos en tu cuenta",
      labelDown: "Sin importar la que elijas"
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
          title: "Sueldo plus regular people",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          description: "Ver Sueldo Plus",
          mainImageUrl: require("@/assets/images/program2.png"),
          background: "green"
        },
        {
          title: "Heading two for programa de millas",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          description: "Ver Programa de millas",
          mainImageUrl: require("@/assets/images/credit-card.png"),
          changeOrder: true
        },
        {
          title: "Forma parte de nuestro Club de puntos",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          description: "Conoce el Club",
          mainImageUrl: require("@/assets/images/program2.png"),
          background: "blurred",
          secondImageUrl: require("@/assets/images/phone.png")
        }
      ]
    },
    benefits2Config: {
      title: "Amplia red",
      subtitle: "de agencias y cajeros",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      buttonName: "Ver agencias y cajeros",
      linkUrl: "/help/agencies"
    },
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
    cardItems: {
      items: [
        {
          title: "Préstamo de vivienda",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          mainImageUrl: require("@/assets/images/img-card1.png"),
          buttonName: "Más información",
          buttonType: "bm-light",
          id: "1"
        },
        {
          title: "Préstamo de vehículo",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          mainImageUrl: require("@/assets/images/img-card2.png"),
          buttonName: "Más información",
          buttonType: "bm-light",
          id: "2"
        },
        {
          title: "Préstamo de consumo",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          mainImageUrl: require("@/assets/images/img-card3.png"),
          buttonName: "Más información",
          buttonType: "bm-light",
          id: "3"
        }
      ]
    }
  }),
  async mounted() {
    try {

    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information.');
    }
  },
  computed: {
    titleData: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["pyme/getList"](LOANS_TITLE)))
      }
      //console.log(LOANS_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["pyme/getList"](LOANS_CARDS)))
      }
      //console.log(LOANS_CARDS, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["pyme/getList"](LOANS_BENEFITS)));
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(LOANS_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["pyme/getList"](LOANS_PROGRAMS)));

      let res = {
        items: sectionList
      }
      //console.log(LOANS_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["pyme/getList"](LOANS_BENEFITS_2)));
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);

      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));

      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
      benefits2Config['mainImageUrl'] = sectionList[0]['mainImageUrl'];

      let res = {
        items: [benefits2Config]
      };
      //console.log(LOANS_BENEFITS_2, res);
      return res;
    },
    compareData: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["pyme/getList"](LOANS_COMPARE)))
      }

      //console.log(LOANS_COMPARE, res);
      return res;
    }
  },
  methods: {
    loanComparison() {
      this.$router.push({
        path: "/LoanComparison"
      });
    },
    loanDetails(card) {
      this.$router.push({
        path: `/LoanDetails?key=${card.tags}`
      });
    },
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
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,LOANS_TITLE);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,LOANS_CARDS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,LOANS_BENEFITS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,LOANS_PROGRAMS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,LOANS_BENEFITS_2);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,LOANS_COMPARE);
    return header;
  },
  head () {return this.headData}
};
</script>
