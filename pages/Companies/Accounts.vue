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
            :onButtonClick="accountDetails"
            :cardId="card.id"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="cardsData.items"
        :onButtonClick="accountDetails"
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
      :isImageInLeft="program.changeOrder"
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
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  ACCOUNTS_BENEFITS,
  ACCOUNTS_BENEFITS_2,
  ACCOUNTS_CARDS,
  ACCOUNTS_PROGRAMS,
  ACCOUNTS_TITLE,
  ACCOUNTS_COMPARE,
} from "~/cardListKeys/companies";
import {generateEmptyModels} from "~/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
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
    RelatedPanel
  },
  data() {
    return {
      getCardImage: getCardImage,
      pageTitle: {
        items: {
          mainImageUrl: require("@/assets/images/account.svg"),
          title: "Lorem ipsum dolor sit amet consectetur",
          description: "Te ayudamos a cuidar tus ahorros con las mejores tasas de interés y <span class='green-md-text'>beneficios increíbles.</span>"
        }
      },
      cardItems: {
        items: [
          {
            title: "Súper Makro Cuenta",
            subtitle:
              "¿Te gustaría ganar Bs. 50.000? La Súper Makro Cuenta te permite participar de sorteos diarios y semanales. ¡Tú puedes ser el próximo ganador!",
            description: "Con opción de Makro planilla para recibir tus sueldos.",
            mainImageUrl: require("@/assets/images/img-card1.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "1"
          },
          {
            title: "Súper Rendimax Plus",
            subtitle:
              "¿Quieres una cuenta que te dé más? La tasa de interés más beneficiosa para tus ahorros te la da la Súper Rendimax Plus: 3.5% de interés anual que hará que tu dinero se multiplique.",
            mainImageUrl: require("@/assets/images/img-card2.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "2"
          },
          {
            title: "Rendimax Plus",
            subtitle:
              "¿Quieres una cuenta que te dé más? La Rendimax Plus del BMSC es la cuenta de ahorros que te da mayor rendimiento, con una tasa de interés del 3% anual para maximizar tus ahorros.",
            mainImageUrl: require("@/assets/images/img-card3.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "3"
          },
          {
            title: "Cuenta corriente",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            mainImageUrl: require("@/assets/images/currentAccount.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "4"
          },
          {
            title: "Cuentas para jóvenes",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            mainImageUrl: require("@/assets/images/youngAccount.png"),
            buttonName: "Más información",
            buttonType: "bm-light",
            id: "5"
          }
        ]
      },
      benefitsConfig: {
        items: {
          title: "Beneficios del BMSC",
          subtitle: "Incluidos en tu cuenta",
          description: "Sin importar la que elijas"
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
            changeOrder: true
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
        route1: "/help/questions",
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
      }
    };
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["companies/getList"](ACCOUNTS_TITLE)
      }
      //console.log(ACCOUNTS_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["companies/getList"](ACCOUNTS_CARDS)
      }
      //console.log(ACCOUNTS_CARDS, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["companies/getList"](ACCOUNTS_BENEFITS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      };
      //console.log(ACCOUNTS_BENEFITS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["companies/getList"](ACCOUNTS_PROGRAMS);
      //console.log('programs Sections list: ',sectionList);


      let res = {
        items: sectionList
      }
      //console.log(ACCOUNTS_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["companies/getList"](ACCOUNTS_BENEFITS_2);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));
      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
      benefits2Config['mainImageUrl'] = sectionList[0]['mainImageUrl'];

      let res = {
        items: [benefits2Config]
      };
      //console.log(ACCOUNTS_BENEFITS_2, res);
      return res;
    },
    compareData: function () {
      return {
        items: this.$store.getters["companies/getList"](ACCOUNTS_COMPARE)
      }
    },
  },
  methods: {
    accountDetails(card) {
      this.$router.push({
        path: `/accountDetails?key=${card['tags']}`,
        params: { detailsData: card }
      });
    },
    accountComparison() {
      this.$router.push({
        path: "/AccountComparison"
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,ACCOUNTS_TITLE);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,ACCOUNTS_CARDS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,ACCOUNTS_BENEFITS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,ACCOUNTS_PROGRAMS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,ACCOUNTS_BENEFITS_2);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`, ACCOUNTS_COMPARE);
    return header;
  },
  head () {return this.headData}
};
</script>
<style scoped></style>
