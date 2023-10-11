<template>
  <div>
    <v-container class="bm-loans mx-auto">
      <main-title v-if="titleData.items.length > 0" :pageTitle="titleData.items[0]"></main-title>
      <v-row v-if="titleData.items.length > 0">
        <v-col cols="12" sm="8" style="text-align: justify;text-justify: inter-word;">
          <span class="big-text" v-html="titleData.items[0].description"></span>
        </v-col>
      </v-row>
      <FilterButtons :buttonsConfig="filterButtonsConfig" class="py-10" buttonsColor="green" />
      <v-row class="d-none d-sm-flex">
        <v-col
          v-for="(card, i) in selectedCards"
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
            :onButtonClick="insuranceDetails"
            :cardId="card.id"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="selectedCards"
        :onButtonClick="insuranceDetails"
        class="d-sm-none my-8"
      />
      <Compare
        v-if="compareData && compareData.items && compareData.items.length > 0"
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :buttonName="compareData.items[0].buttonName"
        :buttonHref="compareData.items[0].buttonHref"
        :topImage="getCardImage(compareData.items[0])"
        :alt="compareData.items[0].imgAlt1"
      />
      <Benefits v-bind:benefitsData="benefitsData" v-if="benefitsSwitch"/>
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
import Card from "@/components/Card.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";
import Compare from "@/components/Compare.vue";
import Benefits from "@/components/Benefits.vue";
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import FilterButtons from "@/components/FilterButtons.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  INSURANCE_BENEFITS,
  INSURANCE_BENEFITS_2,
  INSURANCE_CARDS,
  INSURANCE_PROGRAMS,
  INSURANCE_REVIEWS_CAROUSEL,
  INSURANCE_TITLE,
  INSURANCE_COMPARE
} from "~/cardListKeys/client";
import {generateEmptyModels} from "~/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    Card,
    Compare,
    Benefits,
    Programs,
    Benefits2,
    MoreInfo,
    RelatedPanel,
    FilterButtons,
    CardSliderMobile
  },
  data() {
    return {
      getCardImage: getCardImage,
      pageTitle: {
        items: {
          mainImageUrl: require("@/assets/images/insurance.svg"),
          title: "Una seguro para cada estilo de vida",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <span class='green-md-text'>dolore magna aliqua.</span>"
        }
      },
      filterButtonsConfig: [
        {
          text: "Para mis tarjetas",
          onClick: this.onSelectFilterOption,
          tags: "tarjeta"
        },
        {
          text: "Para mi préstamo",
          onClick: this.onSelectFilterOption,
          tags: "prestamo"
        }
      ],
      filterOption: "tarjeta",
      cardItems: {
        items: [
          {
            title: "Seguro de tarjetas",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/img-card1.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "1"
          },
          {
            title: "Seguro dos",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/img-card2.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "2"
          },
          {
            title: "Seguro tres",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mainImageUrl: require("@/assets/images/img-card3.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "3"
          }
        ]
      },
      benefitsConfig: {
        items: {
          title: "Beneficios del BMSC",
          subtitle: "Incluidos en tu seguro",
          description: "Sin importar el que elijas"
        }
      },
      programs: {
        items: [
          {
            title: "Banca móvil",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Ver tecnología",
            mainImageUrl: require("@/assets/images/phone-travel.png"),
            changeOrder: true,
            onClickLink: this.goToTech
          },
          {
            title: "Descuentos al pagar con tu tarjeta",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Ver Descuentos",
            mainImageUrl: require("@/assets/images/program2.png"),
            background: "green"
          },
          {
            title: "Forma parte de nuestro Club de puntos",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Conoce el club",
            mainImageUrl: require("@/assets/images/card-hand.png"),
            changeOrder: true
          },
          {
            title: "Beneficios extras para Sueldo Plus",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Ver Sueldo Plus",
            mainImageUrl: require("@/assets/images/numbers-sheet.png"),
            background: "blurred",
            programImage2: "phone.png"
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
    };
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["client/getList"](INSURANCE_TITLE)
      }
      //console.log(INSURANCE_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["client/getList"](INSURANCE_CARDS)
      }
      //console.log(INSURANCE_CARDS, res);
      return res;
    },
    reviewsData: function () {
      let res = {
        items: this.$store.getters["client/getList"](INSURANCE_REVIEWS_CAROUSEL)
      }
      //console.log(INSURANCE_REVIEWS_CAROUSEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["client/getList"](INSURANCE_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(INSURANCE_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["client/getList"](INSURANCE_PROGRAMS);

      let res = {
        items: sectionList
      }
      //console.log(INSURANCE_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["client/getList"](INSURANCE_BENEFITS_2);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));
      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
      benefits2Config['mainImageUrl'] = sectionList[0]['mainImageUrl'];

      let res = {
        items: [benefits2Config]
      };
      //console.log(INSURANCE_BENEFITS_2, res);
      return res;
    },
    selectedCards() {
      const cards = this.cardsData.items.filter(card => {
        return card.tags.indexOf(this.filterOption) !== -1;
      });
      return cards;
    },
    compareData: function () {
      return {
        items: this.$store.getters["client/getList"](INSURANCE_COMPARE)
      }
    },
    benefitsSwitch: function () {
      let sectionList = this.$store.getters["client/getList"](INSURANCE_BENEFITS);
      return sectionList.length !== 0;
    }
  },
  methods: {
    goToTech() {
      this.$router.push({
        path: "/Tech"
      });
    },
    insuranceDetails(card) {
      this.$router.push({
        path: `/insuranceDetails?key=${card.tags}`
      });
    },
    onSelectFilterOption(button) {
      this.filterOption = button.tags;
      //console.log('clicked filter option', button.tags);
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,INSURANCE_TITLE);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,INSURANCE_CARDS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,INSURANCE_REVIEWS_CAROUSEL);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,INSURANCE_BENEFITS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,INSURANCE_PROGRAMS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`,INSURANCE_BENEFITS_2);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, INSURANCE_COMPARE);
    return header;
  },
  head () {return this.headData}
};
</script>
<style scoped></style>
