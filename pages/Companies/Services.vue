<template>
  <div>
    <CenterCard v-bind:titleData="titleData"/>
    <v-container>
      <BenefitsPanel
        v-bind:title="benefitsTitleData"
        v-bind:items="benefitsData"
      />
    </v-container>
    <div>
      <InformationPanel
        :header="informationConfig.header"
        :data="informationConfig.data"
      >
        <template v-slot:content>
          <v-row>
            <v-col cols="12" md="6">
              <CheckedList v-bind:items="informationPanelData.items" />
            </v-col>
            <v-col cols="12" md="6" class="pl-0 pl-md-14 py-8 py-md-12">
              <LinksList v-bind:items="informationPanelData.documents" />
            </v-col>
          </v-row>
        </template>
      </InformationPanel>
    </div>
    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems" />
    </div>
    <div class="pb-16">
      <MoreInfo
        v-bind="moreInfoConfig"
      />
    </div>
  </div>
</template>
<script>
import CenterCard from "@/components/CenterCard.vue";
import BenefitsPanel from "@/components/BenefitsPanel";
import InformationPanel from "@/components/InformationPanel";
import MoreInfo from "@/components/MoreInfo.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  LOANS_BENEFITS,
  LOANS_BENEFITS_2,
  LOANS_CARDS,
  LOANS_PROGRAMS,
  LOANS_TITLE, SERVICES_BENEFITS, SERVICES_INFORMATION_PANEL,
  SERVICES_TITLE
} from "~/cardListKeys/pyme";
import {generateEmptyModels, generateReportFileUrlFromId} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    CenterCard,
    BenefitsPanel,
    InformationPanel,
    RelatedPanel,
    MoreInfo
  },
  data() {
    return {
      benefits: [
        {
          title: "Cartas de Crédito de Exportación",
          text:
            "- Aviso/ Notificación - Confirmación - Diferimiento - Descuento de letras - Financiamiento de Pre y Post embarque",
          link: {
            text: "",
            route: ""
          },
          icon: "icon-shield"
        },
        {
          title: "Cartas de Crédito de Importación",
          text:
            "Apertura o emisión Diferimiento Financiamiento Pago",
          link: {
            text: "",
            route: ""
          },
          icon: "icon-shield"
        },
        {
          title: "Cartas de Crédito Standby",
          text:
            "- Facilita y garantiza tus operaciones de compra-venta en el país",
          link: {
            text: "",
            route: ""
          },
          icon: "icon-shield"
        },
        {
          title: "Cartas de crédito pre-pagadas",
          text:
            "",
          link: {
            text: "",
            route: ""
          },
          icon: "icon-shield"
        }
      ],
      informationConfig: {
        header: {
           title: "Muchos beneficios para tu negocio:",
          subtitle: "cartas de crédito",
          smallText: "Y con pocos requisitos"
        }
      },
      relatedItems: [
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
      ],
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        route1: "/help/questions",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      }
    };
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let sectionList = this.$store.getters["companies/getList"](SERVICES_TITLE);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(SERVICES_TITLE, res);
      return res;
    },
    benefitsTitleData: function () {
      let sectionList = this.$store.getters["companies/getList"](SERVICES_BENEFITS);
      let res = sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 111);
      if(res.length === 0) res = generateEmptyModels(1);
      res = res[0]['title'];
      //console.log(SERVICES_BENEFITS+"-title", res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["companies/getList"](SERVICES_BENEFITS);
      let res = sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] !== 111).map(card => {
        return {
          title: card['title'],
          text: card['description'],
          link: {
            text: "",
            route: ""
          },
          icon: "icon-shield"
        };
      });
      //console.log(SERVICES_BENEFITS, res);
      return res;
    },
    informationPanelData: function () {
      let sectionList = this.$store.getters["companies/getList"](SERVICES_INFORMATION_PANEL);
      /*
         Category 108 Service documents
         Category 109 Item panel de información
      */
      function processList(list,size) {
        if(list.length === 0) return generateEmptyModels(size);
        return list;
      }
      let res = {
        documents: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 108),0).map(card => {
          return {
            ...card,
            fileUrl: generateReportFileUrlFromId(card['description']),
          }
        }),
        items: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 109),0)
      }
      //console.log(SERVICES_INFORMATION_PANEL, res);
      return res;
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,SERVICES_TITLE);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,SERVICES_BENEFITS);
    await context.store.dispatch(`companies/${UPDATE_STATE_ACTION}`,SERVICES_INFORMATION_PANEL);
    return header;
  },
  head () {return this.headData}
};
</script>
