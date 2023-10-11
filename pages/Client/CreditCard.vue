<template>
  <div>
    <v-container class="mx-auto">
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
            :onButtonClick="creditCardDetails"
            :cardId="card.id"
            :tags="card.tags"
            class="credit-card"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="selectedCards"
        :onButtonClick="creditCardDetails"
        class="d-sm-none my-8"
      />
      <Compare
        v-if="compareData && compareData.items && compareData.items.length > 0"
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :buttonName="compareData.items[0].buttonName"
        :buttonHref="compareData.items[0].buttonHref"
      />
      <ReviewsCarousel v-if="reviewsData.items.length > 0" :reviews="reviewsData.items"/>
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
import Card from "@/components/Card.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";
import Compare from "@/components/Compare.vue";
import Benefits from "@/components/Benefits.vue";
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import ReviewsCarousel from "@/components/ReviewsCarousel.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  CREDIT_CARD_TITLE,
  CREDIT_CARD_CARDS,
  CREDIT_CARD_REVIEWS_CAROUSEL,
  CREDIT_CARD_BENEFITS,
  CREDIT_CARD_PROGRAMS,
  CREDIT_CARD_BENEFITS_2,
  CREDIT_CARD_COMPARE
} from "~/cardListKeys/client";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    Card,
    CardSliderMobile,
    Compare,
    Benefits,
    Programs,
    Benefits2,
    MoreInfo,
    RelatedPanel,
    ReviewsCarousel
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["client/getList"](CREDIT_CARD_TITLE)
      }
      //console.log(CREDIT_CARD_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["client/getList"](CREDIT_CARD_CARDS)
      }
      //console.log(CREDIT_CARD_CARDS, res);
      return res;
    },
    selectedCards() {
      const cards = this.cardsData.items.filter(card => {
        return card.gradientText.indexOf(this.filterOption) !== -1;
      });
      return cards;
    },
    reviewsData: function () {
      let res = {
        items: this.$store.getters["client/getList"](CREDIT_CARD_REVIEWS_CAROUSEL)
      }
      //console.log(CREDIT_CARD_REVIEWS_CAROUSEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["client/getList"](CREDIT_CARD_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(CREDIT_CARD_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["client/getList"](CREDIT_CARD_PROGRAMS);

      let res = {
        items: sectionList
      }
      //console.log(CREDIT_CARD_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["client/getList"](CREDIT_CARD_BENEFITS_2);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));
      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
      benefits2Config['mainImageUrl'] = sectionList[0]['mainImageUrl'];

      let res = {
        items: [benefits2Config]
      };
      //console.log(CREDIT_CARD_BENEFITS_2, res);
      return res;
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["client/getList"](CREDIT_CARD_COMPARE)
      }
      //console.log(CREDIT_CARD_COMPARE, res);
      return res;
    },
  },
  data() {
    return {
      filterOption: "Visa",
      filterButtonsConfig: [
        {
          text: "Visa",
          onClick: this.onSelectFilterOption,
          tags: "Visa"
        },
        {
          text: "Mastercard",
          onClick: this.onSelectFilterOption,
          tags: "Mastercard"
        }
      ],
      cardItems: [
        {
          title: "Mastercard Black",
          content:
            "¿Te gustaría ganar Bs. 50.000? La Súper Makro Cuenta te permite participar de sorteos diarios y semanales. ¡Tú puedes ser el próximo ganador!",
          message: "Con opción de Makro planilla para recibir tus sueldos.",
          image: "mastercard-black.png",
          id: "1"
        },
        {
          title: "Mastercard Platinum",
          content:
            "¿Quieres una cuenta que te dé más? La tasa de interés más beneficiosa para tus ahorros te la da la Súper Rendimax Plus: 3.5% de interés anual que hará que tu dinero se multiplique.",
          image: "mastercard-platinum.png",
          id: "2"
        },
        {
          title: "Mastercard Gold",
          content:
            "¿Quieres una cuenta que te dé más? La Rendimax Plus del BMSC es la cuenta de ahorros que te da mayor rendimiento, con una tasa de interés del 3% anual para maximizar tus ahorros.",
          image: "mastercard-gold.png",
          id: "3"
        }
      ],
      cardButtonConfig: {
        label: "Abre una cuenta",
        message: "¡Te enviamos tu tarjeta GRATIS!"
      },
      compareConfig: {
        items: {
          title: "Compara las tarjetas de crédito",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          buttonName: "Comparar tarjetas"
        }
      },
      benefitsConfig: {
        labelUp: "Beneficios del BMSC",
        labelMiddle: "Incluidos en tus tarjetas de crédito",
        labelDown: "Sin importar la que elijas"
      },
      programs: {
        items: [
          {
            title: "Banca móvil",
            description: "Ver tecnología",
            mainImageUrl: require("@/assets/images/phone-travel.png"),
            changeOrder: true,
            onClickLink: this.goToTech
          },
          {
            title: "Sueldo plus regular people",
            description: "Ver Sueldo Plus",
            mainImageUrl: require("@/assets/images/program2.png"),
            background: "green"
          },
          {
            title: "Heading two for programa de millas",
            description: "Ver Programa de millas",
            mainImageUrl: require("@/assets/images/credit-card.png"),
            changeOrder: true
          },
          {
            title: "Forma parte de nuestro Club de puntos",
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
      reviews: [
        {
          mainReview: '"Tuve una experiencia muy buena"',
          fullReview: "Takimata takimata dolor sit dolores takimata amet ut. Eirmod eos accusam sed amet at at, et diam kasd vero est lorem diam dolore sed, sit sea stet et et, est clita no vero nonumy stet et dolores, elitr vero vero.",
          owner: "Nombre Apellido",
          ownerPosition: "CEO de empresa"
        },
        {
          mainReview: '"Tuve una experiencia muy buena"',
          fullReview: "Takimata takimata dolor sit dolores takimata amet ut. Eirmod eos accusam sed amet at at, et diam kasd vero est lorem diam dolore sed, sit sea stet et et, est clita no vero nonumy stet et dolores, elitr vero vero.",
          owner: "Nombre Apellido",
          ownerPosition: "CEO de empresa"
        },
        {
          mainReview: '"Tuve una experiencia muy buena"',
          fullReview: "Takimata takimata dolor sit dolores takimata amet ut. Eirmod eos accusam sed amet at at, et diam kasd vero est lorem diam dolore sed, sit sea stet et et, est clita no vero nonumy stet et dolores, elitr vero vero.",
          owner: "Nombre Apellido",
          ownerPosition: "CEO de empresa"
        }
      ]
    };
  },
  methods: {
    goToTech() {
      this.$router.push({
        path: "/Tech"
      });
    },
    creditCardDetails(card) {
      this.$router.push({
        path: `/client/creditCardDetails?key=${card['tags']}`
      });
    },
    cardsComparison() {
      this.$router.push({
        path: "cardsComparison"
      });
    },
    onSelectFilterOption(button) {
      this.filterOption = button.tags;
      //console.log('clicked filter option', button.tags);
    },
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_TITLE);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_CARDS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_REVIEWS_CAROUSEL);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_BENEFITS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_PROGRAMS);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_BENEFITS_2);
    await context.store.dispatch(`client/${UPDATE_STATE_ACTION}`, CREDIT_CARD_COMPARE);
    return header;
  },
  head () {return this.headData}
};
</script>
