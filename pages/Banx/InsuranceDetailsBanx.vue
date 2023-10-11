<template>
  <div :class="`${ns}`">
    <DetailsCard :detailsData="titleData.items[0]" />
    <BenefitsPanel
      :title="benefitsData.title"
      :items="benefitsData.items"
      :message="''"
    />
    <div>
      <InformationPanel
        :header="titlePanelData"
        :isBanx="true"
        v-bind="linksListData"
      >
        <template v-slot:content="{ data }">
          <div class="panel-overlaped">
            <OpenAccountInfo :data="data" />
          </div>
        </template>
      </InformationPanel>
    </div>
    <div class="py-sm-4 py-md-16">
      <RelatedPanel :items="relatedPanelMap" :isBanx="true" />
    </div>
    <div class="pb-16">
      <MoreInfo
        v-bind="moreInfoConfig"
      />
    </div>
  </div>
</template>
<script>
import DetailsCard from "@/components/DetailsCard";
import DescriptionPanel from "@/components/DescriptionPanel";
import AccountCuponsPanel from "@/components/AccountCuponsPanel";
import OpenAccountInfo from "@/components/OpenAccountInfo";
import DisplayPanel from "@/components/DisplayPanel";
import BenefitsPanel from "@/components/BenefitsPanel";
import InformationPanel from "@/components/InformationPanel";
import Compare from "@/components/Compare.vue";
import Button from "@/components/Button.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {BENEFITS, DETAILS_PANEL, TITLE, TITLE_PANEL} from "~/cardListKeys/accountDetailsBanx";
import {
  generateReportFileUrlFromId,
  hasOnlyDigits,
  generateEmptyModels,
  processInformationPanelData
} from "@/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import {FORM} from "~/cardListKeys/accountDetails";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    DetailsCard,
    DescriptionPanel,
    AccountCuponsPanel,
    DisplayPanel,
    BenefitsPanel,
    InformationPanel,
    OpenAccountInfo,
    Compare,
    Button,
    RelatedPanel,
    MoreInfo
  },
  data() {
    return {
      ns: "insurance-details-banx",
      insuranceKey: "", //DO NOT ERASE THIS
      hasOnlyDigits: hasOnlyDigits,
      getCardImage,
      compareConfig: {
        items: [
          {
            title:
              "¿Estás listo para tener tu <span class='green-md-text'>Súper Makro Cuenta</span>?",
            description:
              "Abre tu Súper Makro Cuenta y conviértete en el próximo beneficiado.",
            buttonName: "Comparar cuentas"
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
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      informationConfig: {
        items: [
          {
            title: "Ahora puedes abrir tu cuenta",
            subTitle: "100% online",
            smallText: "Y con pocos requisitos",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Documentación vigente",
            subTitle: `<ul class="pl-3" style="list-style-type:'- '" ><li>Cédula de identidad.</li> <li>Cédula de identidad de extranjero o documento especial de identificación (carnet diplomático, credencial, o credencial consular).</li>`,
            description:
              "Las personas extranjeras deben incluir además un respaldo de actividad económica como independiente o fotocopia de boleta de pago como dependiente.",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "En moneda nacional",
            subTitle: "El monto mínimo es de Bs. 0",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Documentación vigente",
            subTitle: "El monto mínimo es de $us. 1.000",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Documentación vigente (menores)",
            subTitle: `<ul class="pl-3" style="list-style-type:'- '" ><li>Cédula de identidad.</li> <li>Cédula de identidad de extranjero o documento especial de identificación (carnet diplomático, credencial, o credencial consular).</li>`,
            smallText:
              "Las personas extranjeras deben incluir además un respaldo de actividad económica como independiente o fotocopia de boleta de pago como dependiente.",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "En moneda nacional (menores)",
            subTitle: "El monto mínimo es de Bs. 0",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Documentación vigente (menores)",
            subTitle: "El monto mínimo es de $us. 1.000",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Descargar PDF de requisitos",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Bases y condiciones",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Tarifario",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Reglamento para cuentas de ahorro",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Descargar PDF de requisitos (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Bases y condiciones (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Tarifario (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          },
          {
            title: "Reglamento para cuentas de ahorro (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad",
            cardCategory: {id: -1, name: "", description: ""}
          }
        ]
      }
    };
  },
  created() {
    this.insuranceKey = this.$route.query.key;
    //console.log('Loading account: ',this.insuranceKey);
  },
  async mounted() {
    await this.loadInsuranceDetailsData();
  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["insuranceDetailsBanx/getList"](TITLE)
      }
      //console.log(TITLE, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["insuranceDetailsBanx/getList"](BENEFITS);
      let items = sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] !== 111).map(card => {
        return {
          title: card['title'],
          text: card['subTitle'],
          link: {
            text: card['description'],
            route: card['buttonHref']
          },
          icon: "icon-shield"
        };
      });
      let titleItems = sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 111);
      if(titleItems.length === 0) titleItems = generateEmptyModels(1);
      let title = titleItems[0]['title'];

      let res = { items, title };
      //console.log(BENEFITS, res);
      return res;
    },
    titlePanelData: function () {
      let res = {
        items: this.$store.getters["insuranceDetailsBanx/getList"](TITLE_PANEL)
      }
      //console.log(TITLE_PANEL, res);
      return res.items[0];
    },
    linksListData: function () {
      let res = {
        items : this.$store.getters["insuranceDetailsBanx/getList"](DETAILS_PANEL)
      }
      // needed fallback
      if (res.items.length === 0) res = this.informationConfig;
      let aux = processInformationPanelData(res);
      //console.log(DETAILS_PANEL,aux)
      return aux;
    },
    requirementsListData: function () {
      let res = {
        items: this.$store.getters["insuranceDetailsBanx/getList"](DETAILS_PANEL)
      }
      const list = res.items.filter(item => {
        return !hasOnlyDigits(item.description);
      });

      res = {
        items : list.map(card => {
          return {
            title: card['title'],
            subTitle: card['subTitle'],
            description: card['description']
          }
        })
      }
      //console.log(res.items)
      return res.items;
    },
    relatedPanelMap: function () {
      switch (this.insuranceKey) {
        case 'Tarjeta-Debito-detalle':
          return [
            {
              title: "Seguro TC",
              subTitle: "Ver opciones",
              route: "/banx/insuranceDetailsBanx?key=Tarjeta-Credito-detalle"
            }
          ];
        case 'Tarjeta-Credito-detalle':
          return [
            {
              title: "Seguro TD",
              subTitle: "Ver opciones",
              route: "/banx/InsuranceDetailsBanx?key=Tarjeta-Debito-detalle"
            }
          ];
        case 'Desgravamen-detalle':
          return [
            {
              title: "Seguro de Cesantia",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-Cesantia-detalle"
            },
            {
              title: "Seguro Todo Riesgo",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Todo-Riesgo-detalle"
            },
            {
              title: "Seguro Automotor",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-automotor-detalle"
            },
            {
              title: "Seguro DIMA",
              subTitle: "Ver préstamos",
              route: "/insuranceDetails?key=Seguro-DIMA-detalle"
            }
          ];
        case 'Seguro-Cesantia-detalle':
          return [
            {
              title: "Seguro Todo Riesgo",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Todo-Riesgo-detalle"
            },
            {
              title: "Seguro Automotor",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-automotor-detalle"
            },
            {
              title: "Seguro DIMA",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-DIMA-detalle"
            },
            {
              title: "Seguro Desgravamen",
              subTitle: "Ver préstamos",
              route: "/insuranceDetails?key=Desgravamen-detalle"
            }
          ];
        case 'Todo-Riesgo-detalle':
          return [
            {
              title: "Seguro Automotor",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-automotor-detalle"
            },
            {
              title: "Seguro DIMA",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-DIMA-detalle"
            },
            {
              title: "Seguro Desgravamen",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Desgravamen-detalle"
            },
            {
              title: "Seguro de Cesantia",
              subTitle: "Ver préstamos",
              route: "/insuranceDetails?key=Seguro-Cesantia-detalle"
            }
          ];
        case 'Seguro-automotor-detalle':
          return [
            {
              title: "Seguro DIMA",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-DIMA-detalle"
            },
            {
              title: "Seguro Desgravamen",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Desgravamen-detalle"
            },
            {
              title: "Seguro de Cesantia",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-Cesantia-detalle"
            },
            {
              title: "Seguro Todo Riesgo",
              subTitle: "Ver préstamos",
              route: "/insuranceDetails?key=Todo-Riesgo-detalle"
            }
          ];
        case 'Seguro-DIMA-detalle':
          return [
            {
              title: "Seguro Automotor",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-automotor-detalle"
            },
            {
              title: "Seguro Desgravamen",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Desgravamen-detalle"
            },
            {
              title: "Seguro de Cesantia",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-Cesantia-detalle"
            },
            {
              title: "Seguro Todo Riesgo",
              subTitle: "Ver préstamos",
              route: "/insuranceDetails?key=Todo-Riesgo-detalle"
            }
          ];
        case 'Seguro-equipos-maquinarias-detalle':
          return [
            {
              title: "Seguro Automotor",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Seguro-automotor-detalle"
            },
            {
              title: "Seguro Desgravamen",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Desgravamen-detalle"
            },
            {
              title: "Seguro de Cesantia",
              subTitle: "Ver préstamos",
              route: "/insuranceDetails?key=Seguro-Cesantia-detalle"
            },
            {
              title: "Seguro Todo Riesgo",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Todo-Riesgo-detalle"
            }
          ];
        default:
          return [];
      }
    }

  },
  methods: {
    async loadInsuranceDetailsData() {
      await this.$store.dispatch(`insuranceDetailsBanx/${UPDATE_STATE_ACTION}`,[this.insuranceKey,TITLE, this]);
      await this.$store.dispatch(`insuranceDetailsBanx/${UPDATE_STATE_ACTION}`,[this.insuranceKey,BENEFITS, this]);
      await this.$store.dispatch(`insuranceDetailsBanx/${UPDATE_STATE_ACTION}`,[this.insuranceKey,TITLE_PANEL, this]);
      await this.$store.dispatch(`insuranceDetailsBanx/${UPDATE_STATE_ACTION}`,[this.insuranceKey,DETAILS_PANEL, this]);
    },
    openCyco(){
        window.open('https://cyco.bmsc.com.bo/', '_blank')
    },
    goToHref(item) {
      if (checkValidUrl(item.buttonHref)) {
        window.open(item.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: item.buttonHref
        });
      }
    },
    scrollToTop: function () {
      window.scrollTo(0,0);
    }
  },
  watch: {
    $route (to, from){
      let key = to.query.key;
      this.insuranceKey = key;
      this.loadInsuranceDetailsData();
      this.scrollToTop();
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
};
</script>
