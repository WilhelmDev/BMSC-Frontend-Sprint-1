<template>
  <div :class="`${ns}`">
    <div :class="`${ns}__card-info py-10`">
      <v-row :class="`${ns} mx-0 mx-sm-16`">
        <v-col class="text-sm-center">
          <v-img :class="`${ns}__img mb-5`" :src="titleData.mainImageUrl" :alt="titleData.imgAlt1"></v-img>
          <BracketBanx
            :text1="titleData.title"
            :text2="titleData.subTitle"
            :bracket-color="'#A7D342'"
            :newLine="true"
          />
          <div class="my-6">
            {{titleData.description}}
          </div>
        </v-col>
      </v-row>
      <FilterButtons :buttonsConfig="filterButtonsConfig" class="py-10 ml-15" buttonsColor="green" />
      <v-row :class="`${ns}__white-background mx-16 d-none d-sm-flex`">
        <v-col v-for="(card, i) in selectedCards" :key="i" cols="6" lg="4" xl="3">
          <Card
            :cardTitle="card.title"
            :cardContent="card.subTitle"
            :message="card.description"
            :isBanx="true"
            :cardImage="card.mainImageUrl"
            :alt="card.imgAlt1"
            :className="card.gradient"
            :label="card.gradientText"
            :onButtonClick="insuranceDetails"
            :cardId="card.id"
            :buttonLabel="card.buttonName"
            :buttonColor="card.buttonType"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="selectedCards"
        :onButtonClick="insuranceDetails"
        :isBanx="true"
        class="d-sm-none my-8"
      />
    </div>
    <div class="py-sm-4 py-md-16">
      <RelatedPanel :items="relatedItems.items" :is-banx="true" style="display: none"/>
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
import MoreInfo from "@/components/MoreInfo.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import FilterButtons from "@/components/FilterButtons.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  INSURANCE_BENEFITS, INSURANCE_BENEFITS_2,
  INSURANCE_CARDS, INSURANCE_PROGRAMS, INSURANCE_REVIEWS_CAROUSEL,
  INSURANCE_TITLE, INSURANCE_COMPARE
} from "~/cardListKeys/client";
import {directionBoxOnPrograms, generateEmptyModels} from "~/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
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
      getCardImage,
      directionBoxOnPrograms: directionBoxOnPrograms,
      ns: "accounts-banx",
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
          text: "Para mí",
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
      compareConfig: {
        items: [{
          title: "Compara los tipos de seguros",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          buttonName: "Comparar seguros"
        }]
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
            buttonHref: "/tech"
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
    try {

    } catch(e) {
      //console.log('error fetching banx insurance list data')
    }

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](INSURANCE_TITLE)
      }
      //console.log(INSURANCE_TITLE, res);
      return res.items[0];
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](INSURANCE_CARDS)
      }
      //console.log(INSURANCE_CARDS, res);
      return res;
    },
    reviewsData: function () {
      let res = {
        items: this.$store.getters["banx/getList"](INSURANCE_REVIEWS_CAROUSEL)
      }
      //console.log(INSURANCE_REVIEWS_CAROUSEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["banx/getList"](INSURANCE_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(INSURANCE_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["banx/getList"](INSURANCE_PROGRAMS);

      let res = {
        items: sectionList
      }
      //console.log(INSURANCE_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["banx/getList"](INSURANCE_BENEFITS_2);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));
      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
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
        path: `/banx/InsuranceDetailsBanx?key=${card.tags}`
      });
    },
    insuranceComparison() {
      this.$router.push({
        path: "/insuranceComparisonBanx"
      });
    },
    onSelectFilterOption(button) {
      this.filterOption = button.tags;
      //console.log('clicked filter option', button.tags);
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
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,INSURANCE_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,INSURANCE_CARDS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,INSURANCE_REVIEWS_CAROUSEL);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,INSURANCE_BENEFITS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,INSURANCE_BENEFITS_2);
    return header;
  },
  head () {return this.headData}
};
</script>
<style scoped></style>
