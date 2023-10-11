<template>
  <div>
    <DescriptionCardCarousel :carouselData="carouselData.items" />
    <v-row class="d-none d-sm-flex" no-gutters>
      <v-col cols="12">
        <ListedProducts :productList="listedProductsData.items" class=""/>
      </v-col>
    </v-row>
    <ListedProductsMobile :productList="listedProductsData.items" class="d-sm-none"/>
    <ReviewsCarousel v-if="reviewsCarouselData.items.length > 0" :reviews="reviewsCarouselData.items"/>
    <Benefits v-bind:benefitsData="benefitsData"/>
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
    <NewsHomeContainer :news="newsData"/>
    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems.items" />
    </div>
    <v-container><v-divider></v-divider></v-container>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import ListedProducts from "@/components/ListedProducts.vue";
import Card from "@/components/Card.vue";
import Programs from "@/components/Programs.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import DescriptionCardCarousel from "@/components/DescriptionCardCarousel.vue";
import ReviewsCarousel from "@/components/ReviewsCarousel.vue";
import {UPDATE_CARD_DATA_ACTION, UPDATE_STATE_ACTION, UPDATE_STATE_NEWS_ACTION} from "~/constants_actions";
import {
  HOME_BENEFITS, HOME_BENEFITS_2,
  HOME_CAROUSEL,
  HOME_LISTED_PRODUCTS, HOME_MORE_INFO, HOME_NEWS,
  HOME_PROGRAMS, HOME_RELATED_ITEMS,
  HOME_REVIEWS_CAROUSEL, NEWS_LIST
} from "~/cardListKeys/pyme";
import NewsHomeContainer from "~/components/NewsHomeContainer";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    NewsHomeContainer,
    DescriptionCardCarousel,
    MoreInfo,
    Card,
    Programs,
    ListedProducts,
    RelatedPanel,
    ReviewsCarousel
  },
  data() {
    return {
      carousel: {
        items: [
          {
            title: "Lorem ipsum dolor sit amet",
            description:
              "At rebum diam consetetur gubergren invidunt dolores clita et lorem labore. Ipsum sadipscing sit dolore erat eirmod, aliquyam rebum sit consetetur et at aliquyam est sea duo, accusam consetetur duo justo rebum dolores amet takimata, at nonumy magna duo rebum.",
            mainImageUrl: "img-card3.png",
            buttonLabel: "Abre una cuenta",
            buttonStyle: "bm-dark"
          },
          {
            title: "Lorem ipsum dolor sit amet",
            content:
              "At rebum diam consetetur gubergren invidunt dolores clita et lorem labore. Ipsum sadipscing sit dolore erat eirmod, aliquyam rebum sit consetetur et at aliquyam est sea duo, accusam consetetur duo justo rebum dolores amet takimata, at nonumy magna duo rebum.",
            image: "img-card3.png",
            buttonLabel: "Abre una cuenta",
            buttonStyle: "bm-dark"
          },
          {
            title: "Lorem ipsum dolor sit amet",
            content:
              "At rebum diam consetetur gubergren invidunt dolores clita et lorem labore. Ipsum sadipscing sit dolore erat eirmod, aliquyam rebum sit consetetur et at aliquyam est sea duo, accusam consetetur duo justo rebum dolores amet takimata, at nonumy magna duo rebum.",
            image: "img-card3.png",
            buttonLabel: "Abre una cuenta",
            buttonStyle: "bm-dark"
          }
        ]
      },
      productList: [
        {
          imgSrc: "account.svg",
          title: "Cuentas de ahorro",
          path: "",
          description:
            "¡Multiplica tus ahorros! Obtén una caja de ahorros con posibilidades de ganar dinero en efectivo o con una tasa del 3.5%"
        },
        {
          imgSrc: "card.svg",
          title: "Tarjetas de crédito",
          path: "",
          description:
            "Obtén una tarjeta a tu medida y empieza a disfrutar los beneficios que te brinda ser un cliente del BMSC"
        },
        {
          imgSrc: "loan.svg",
          title: "Créditos",
          path: "",
          description:
            "Las mejores condiciones para acceder a tu sueño de una casa propia, simple de sacar, fácil de pagar"
        },
        {
          imgSrc: "card.svg",
          title: "Giros de dinero",
          path: "",
          description:
            "¡Envía y recibe dinero desde cualquier lugar y en cualquier momento!"
        }
      ],
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
      ],
      benefitsConfig: {
        labelUp: "Beneficios del BMSC",
        labelMiddle: "de la banca PYME",
        labelDown: "Gubergren stet justo ea ut"
      },
      programs: {
        items: [
          {
            title: "Boletas de garantía",
            subTitle:"sd",
            description: "",
            mainImageUrl: require("@/assets/images/phonePhoto.png"),
            changeOrder: true
          },
          {
            title: "Seguros de protección",
            subTitle:
              "Para el BMSC lo más importante es tu seguridad. Por eso te brindamos diferentes seguros para que siempre estés protegido. Con nosotros ¡estás cubierto!",
            description: "Ver Seguros",
            mainImageUrl: require("@/assets/images/services.png"),
            background: "green",
            onClickLink: this.goToInsurance
          },
          {
            title: "Asesoramos tus Cobranzas",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "",
            changeOrder: true,
            mainImageUrl: require("@/assets/images/card-hand.png"),
            background: "blurred",
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
      news: {
        title: "Lee noticias sobre Banca PYME",
        description: "Mantente informado lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cardItems: [
          {
            blogType: "Empresas",
            blogTitle: "Lorem ipsum dolor sit amet, consectetur consectetur.",
            cardImage: "img-card3"
          },
          {
            blogType: "Gobierno",
            blogTitle: "Lorem ipsum dolor sit amet, consectetur consectetur.",
            cardImage: "numbers-sheet"
          },
          {
            blogType: "Negocio",
            blogTitle: "Lorem ipsum dolor sit amet, consectetur consectetur.",
            cardImage: "currentAccount"
          }
        ]
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
      moreInfoConfig: {
        moreInfoTitle: "¿Cómo podemos ayudarte?",
        cardIcon1: "icon-bank",
        cardLabel1: "Agencias y cajeros",
        cardIcon2: "icon-help",
        cardLabel2: "Preguntas frecuentes",
        cardIcon3: "icon-reclamo",
        cardLabel3: "Punto de reclamo"
      }
    };
  },
  async mounted() {

  },
  computed: {
    carouselData: function () {
      let res = {
        items: this.$store.getters["pyme/getList"](HOME_CAROUSEL)
      }
      //console.log(HOME_CAROUSEL, res);
      return res;
    },
    listedProductsData: function () {
      let res = {
        items: this.$store.getters["pyme/getList"](HOME_LISTED_PRODUCTS)
      }
      //console.log(HOME_LISTED_PRODUCTS, res);
      return res;
    },
    reviewsCarouselData: function () {
      let res = {
        items: this.$store.getters["pyme/getList"](HOME_REVIEWS_CAROUSEL)
      }
      //console.log(HOME_REVIEWS_CAROUSEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["pyme/getList"](HOME_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(HOME_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["pyme/getList"](HOME_PROGRAMS);

      let res = {
        items: sectionList
      }
      //console.log(HOME_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["pyme/getList"](HOME_BENEFITS_2);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));
      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
      benefits2Config['mainImageUrl'] = sectionList[0]['mainImageUrl'];

      let res = {
        items: [benefits2Config]
      };
      //console.log(HOME_BENEFITS_2, res);
      return res;
    },
    newsData: function () {
      let newsHomeListData = this.$store.getters["pyme/getList"](HOME_NEWS).length > 0 ?
        this.$store.getters["pyme/getList"](HOME_NEWS)[0] : generateEmptyModels(1);
      let res = {
        items: this.$store.getters["pyme/getList"](NEWS_LIST),
        title: newsHomeListData['title'],
        description: newsHomeListData['subTitle']
      }
      //console.log(NEWS_LIST, res);
      //console.log(HOME_NEWS, res);
      return res;
    }
  },
  methods: {
    goToInsurance() {
      this.$router.push({
        path: "/Pyme/Insurance"
      });
    },
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_CAROUSEL);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_LISTED_PRODUCTS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_REVIEWS_CAROUSEL);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_BENEFITS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_PROGRAMS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_BENEFITS_2);
    await context.store.dispatch(`pyme/${UPDATE_STATE_ACTION}`,HOME_NEWS);
    await context.store.dispatch(`pyme/${UPDATE_STATE_NEWS_ACTION}`);
    return header;
  },
  head () {return this.headData}
};
</script>
