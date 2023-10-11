<template>
  <div>
    <DescriptionCardCarousel :carouselData="carouselData.items" />
    <v-row class="d-none d-sm-flex" no-gutters>
      <v-col cols="12">
        <ListedProducts :productList="listedProductsData.items" class=""/>
      </v-col>
    </v-row>
    <ListedProductsMobile :productList="listedProductsData.items" class="d-sm-none"/>
    <ReviewsCarousel v-if="reviewsData.items.length > 0" :reviews="reviewsData.items"/>
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
    <div class="pb-16">
      <MoreInfo
        v-bind="moreInfoConfig"
      />
    </div>
  </div>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import ListedProducts from "@/components/ListedProducts.vue";
import Programs from "@/components/Programs.vue";
import Benefits from "@/components/Benefits.vue";
import Benefits2 from "@/components/Benefits2.vue";
import DescriptionCardCarousel from "@/components/DescriptionCardCarousel.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import ReviewsCarousel from "@/components/ReviewsCarousel.vue";
import {UPDATE_STATE_ACTION, UPDATE_STATE_NEWS_ACTION} from "~/constants_actions";
import {
  HOME_BENEFITS, HOME_BENEFITS_2,
  HOME_CAROUSEL,
  HOME_LISTED_PRODUCTS,
  HOME_PROGRAMS,
  HOME_REVIEWS_CAROUSEL,
  NEWS_LIST,
  HOME_NEWS
} from "~/cardListKeys/companies";
import {generateEmptyModels} from "~/utils/cardsUtil";
import NewsHomeContainer from "~/components/NewsHomeContainer";
import {getHeader} from "~/utils/seo";

export default {
  name: "index",
  components: {
    NewsHomeContainer,
    MoreInfo,
    Programs,
    ListedProducts,
    Benefits,
    Benefits2,
    DescriptionCardCarousel,
    RelatedPanel,
    ReviewsCarousel
  },
  data() {
    return {
      detailsData: {
        title: "Lorem ipsum dolor sit amet",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
        buttonLabel: "Abre una cuenta",
        image: "img-card3.png"
      },
      productList: {
        items: [
          {
            mainImageUrl: require("@/assets/images/card.svg"),
            title: "Cuentas Empresa",
            path: "",
            description:
              "¡Multiplica tus ahorros! Obtén una caja de ahorros con posibilidades de ganar dinero en efectivo o con una tasa del 3.5%"
          },
          {
            mainImageUrl: require("@/assets/images/card.svg"),
            title: "Tarjetas de crédito",
            path: "",
            description:
              "Obtén una tarjeta a tu medida y empieza a disfrutar los beneficios que te brinda ser un cliente del BMSC"
          },
          {
            mainImageUrl: require("@/assets/images/loan.svg"),
            title: "Créditos",
            path: "",
            description:
              "Las mejores condiciones para acceder a tu sueño de una casa propia, simple de sacar, fácil de pagar"
          },
          {
            mainImageUrl: require("@/assets/images/card.svg"),
            title: "Giros de dinero",
            path: "",
            description:
              "¡Envía y recibe dinero desde cualquier lugar y en cualquier momento!"
          }
        ]
      },
      programs: {
        items: [
          {
            title: "Seguros de protección",
            subtitle:
              "Para el BMSC lo más importante es tu seguridad. Por eso te brindamos diferentes seguros para que siempre estés protegido. Con nosotros ¡estás cubierto!",
            description: "Ver todos los seguros",
            mainImageUrl: require("@/assets/images/autoservice.png"),
            changeOrder: true,
            onClickLink: this.goToInsurance
          },
          {
            title: "Servicios de intermediación financiera",
            subtitle:
              "¿Necesitas servicios de intermediación financiera para operaciones de comercio exterior? El BMSC te brinda asesoramiento e intermediación para manejar tus operaciones con el exterior.",
            description: "Ver Comercio exterior",
            mainImageUrl: require("@/assets/images/program2.png"),
            background: "green"
          },
          {
            title: "Envíos y recepción de dinero",
            subtitle:
              "¿Necesitas enviar y recibir dinero dentro o fuera del país? Tenemos diferentes opciones para que puedas seguir conectado con las personas que más te importan, de forma ágil y segura.",
            description: "Ver Giros",
            mainImageUrl: require("@/assets/images/card-hand.png"),
            changeOrder: true,
            background: "blurred",
            secondImageUrl: require("@/assets/images/phone.png"),
            onClickLink: this.goToTransfer
          }
        ]
      },
      carouselData2: {
        items: [
          {
            title: "¡Vuelven los sorteos diarios de la Makro!",
            description:
              "De lunes a jueves Bs. 10.000 y todos los viernes Bs. 50.000 Abre tu Súper Makro Cuenta sin salir de casa y participa ahorrando.",
            mainImageUrl: require("@/assets/images/bmsc-card.svg"),
            buttonName: "Abre una cuenta",
            buttonType: "bm-light",
            buttonClarification: "¡Te enviamos tu tarjeta GRATIS!"
          },
          {
            title: "¡Vuelven los sorteos diarios de la Makro!",
            description:
              "De lunes a jueves Bs. 10.000 y todos los viernes Bs. 50.000 Abre tu Súper Makro Cuenta sin salir de casa y participa ahorrando.",
            mainImageUrl: require("@/assets/images/bmsc-card.svg"),
            buttonName: "Abre una cuenta",
            buttonType: "bm-light",
            buttonClarification: "¡Te enviamos tu tarjeta GRATIS!"
          },
          {
            title: "¡Vuelven los sorteos diarios de la Makro!",
            description:
              "De lunes a jueves Bs. 10.000 y todos los viernes Bs. 50.000 Abre tu Súper Makro Cuenta sin salir de casa y participa ahorrando.",
            mainImageUrl: require("@/assets/images/bmsc-card.svg"),
            buttonName: "Abre una cuenta",
            buttonType: "bm-light",
            buttonClarification: "¡Te enviamos tu tarjeta GRATIS!"
          }
        ]
      },
      benefitsConfig: {
        items: {
          title: "Beneficios del BMSC",
          subtitle: "De la banca Empresas",
          description: "Lorem ipsum dolor sit amet"
        }
      },
      benefits2Config: {
        title: "Amplia red",
        subtitle: "de agencias y cajeros",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        buttonName: "Ver agencias y cajeros",
        linkUrl: "/help/agencies"
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
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-bank",
        cardLabel2: "Agencias y cajeros",
        cardIcon3: "icon-reclamo",
        cardLabel3: "Consulta a un ejecutivo"
      },
      reviews: {
        items: [
          {
            gradientText: '"Tuve una experiencia muy buena"',
            description: "Takimata takimata dolor sit dolores takimata amet ut. Eirmod eos accusam sed amet at at, et diam kasd vero est lorem diam dolore sed, sit sea stet et et, est clita no vero nonumy stet et dolores, elitr vero vero.",
            title: "Nombre Apellido",
            subtitle: "CEO de empresa",
            mainImageUrl: "https://cdn.vuetifyjs.com/images/john.jpg"
          },
          {
            gradientText: '"Tuve una experiencia muy buena"',
            description: "Takimata takimata dolor sit dolores takimata amet ut. Eirmod eos accusam sed amet at at, et diam kasd vero est lorem diam dolore sed, sit sea stet et et, est clita no vero nonumy stet et dolores, elitr vero vero.",
            title: "Nombre Apellido",
            subtitle: "CEO de empresa",
            mainImageUrl: "https://cdn.vuetifyjs.com/images/john.jpg"
          },
          {
            gradientText: '"Tuve una experiencia muy buena"',
            description: "Takimata takimata dolor sit dolores takimata amet ut. Eirmod eos accusam sed amet at at, et diam kasd vero est lorem diam dolore sed, sit sea stet et et, est clita no vero nonumy stet et dolores, elitr vero vero.",
            title: "Nombre Apellido",
            subtitle: "CEO de empresa",
            mainImageUrl: "https://cdn.vuetifyjs.com/images/john.jpg"
          }
        ]
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
      }
    };
  },
  async mounted() {

  },
  computed: {
    carouselData: function () {
      let res = {
        items: this.$store.getters["companies/getList"](HOME_CAROUSEL)
      }
      //console.log(HOME_CAROUSEL, res);
      return res;
    },
    listedProductsData: function () {
      let res = {
        items: this.$store.getters["companies/getList"](HOME_LISTED_PRODUCTS)
      }
      //console.log(HOME_LISTED_PRODUCTS, res);
      return res;
    },
    reviewsData: function () {
      let res = {
        items: this.$store.getters["companies/getList"](HOME_REVIEWS_CAROUSEL)
      }
      //console.log(HOME_REVIEWS_CAROUSEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["companies/getList"](HOME_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(HOME_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["companies/getList"](HOME_PROGRAMS);

      let res = {
        items: sectionList
      }
      //console.log(HOME_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["companies/getList"](HOME_BENEFITS_2);
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
      let newsHomeListData = this.$store.getters["companies/getList"](HOME_NEWS).length > 0 ?
        this.$store.getters["companies/getList"](HOME_NEWS)[0] : generateEmptyModels(1);
      let res = {
        items: this.$store.getters["companies/getList"](NEWS_LIST),
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
        path: "/Companies/Insurance"
      });
    },
    goToTransfer() {
      this.$router.push({
        path: "/Transfer"
      });
    },
    goToTech() {
      this.$router.push({
        path: "/Tech"
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_CAROUSEL);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_LISTED_PRODUCTS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_REVIEWS_CAROUSEL);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_BENEFITS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_PROGRAMS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_BENEFITS_2);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,HOME_NEWS);
    await context.store.dispatch(`companies/${UPDATE_STATE_NEWS_ACTION}`);
    return header;
  },
  head () {return this.headData}
};
</script>
