<template>
  <div :class="`${ns}`">
    <DetailsCard :detailsData="titleData.items[0]" />
    <v-row class="pt-100" v-if="showDescriptionAndForm">
      <v-col cols="12" sm="7" class="pr-sm-5">
        <DescriptionPanel
          :title="descriptionData.title"
          :listItems="descriptionData.items"
        />
      </v-col>
    </v-row>
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
    <div class="panel-overlap" v-if="compareData && compareData.items && compareData.items.length > 0">
      <Compare
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :topImage="getCardImage(compareData.items[0])"
        :alt="compareData.items[0].imgAlt1"
        :is-banx="true"
      >
        <template v-slot:bottom>
          <div class="px-3 pb-2">
            <Button
              :text="'Abre una cuenta'"
              :color="'bm-light'"
              :onClick="openCyco"
            />
          </div>
          <div class="px-3">
            <Button
              :color="'bm-sky-blue'"
              :text="compareData.items[0].buttonName"
              :onClick="goToHref"
              :data="compareData.items[0]"
            />
          </div>
        </template>
      </Compare>
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
import {BENEFITS, DETAILS_PANEL, TITLE, TITLE_PANEL, COMPARE, DESCRIPTION} from "~/cardListKeys/accountDetailsBanx";
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
      ns: "account-details-banx",
      accountKey: "", //DO NOT ERASE THIS
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
    this.accountKey = this.$route.query.key;
    //console.log('Loading account: ',this.accountKey);
  },
  async mounted() {
    await this.loadAccountDetailsData();
  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["accountDetailsBanx/getList"](TITLE)
      }
      //console.log(TITLE, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["accountDetailsBanx/getList"](BENEFITS);
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
        items: this.$store.getters["accountDetailsBanx/getList"](TITLE_PANEL)
      }
      //console.log(TITLE_PANEL, res);
      return res.items[0];
    },
    linksListData: function () {
      let res = {
        items : this.$store.getters["accountDetailsBanx/getList"](DETAILS_PANEL)
      }
      // needed fallback
      if (res.items.length === 0) res = this.informationConfig;
      let aux = processInformationPanelData(res);
      //console.log(DETAILS_PANEL,aux)
      return aux;
    },
    requirementsListData: function () {
      let res = {
        items: this.$store.getters["accountDetailsBanx/getList"](DETAILS_PANEL)
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
    compareData: function () {
      let res = {
        items: this.$store.getters["accountDetailsBanx/getList"](COMPARE)
      }

      //console.log(COMPARE, res);
      return res;
    },
    showDescriptionAndForm: function () {
      return this.$store.getters["accountDetailsBanx/getList"](DESCRIPTION).length !== 0;
    },
    descriptionData: function () {
      let res = {
        items: this.$store.getters["accountDetailsBanx/getList"](DESCRIPTION)
      }
      if (res.items.length > 0 && res.items[0].description) {
        res.title = res.items[0].title;
        res.items = res.items[0].description ? res.items[0].description.split("$") : [];
      }
      //console.log(DESCRIPTION, res);
      return res;
    },
    formData: function () {
      let res = {
        items: this.$store.getters["accountDetails/getList"](FORM)
      }
      if (res.items.length === 0) res = this.formData2;
      //console.log(FORM, res);
      return res;
    },
    relatedPanelMap: function () {
      switch (this.accountKey) {
        case 'super-mackrocuenta-detalle':
          return [
            {
              title: "Makro Planilla",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=makro-planilla-detalle"
            },
            {
              title: "Rendibanx",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-rendimax-plus-detalle"
            },
            {
              title: "Rendimax Plus",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=rendimax-plus-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver préstamos",
              route: "/banx/AccountsBanx"
            }
          ];
        case 'makro-planilla-detalle':
          return [
            {
              title: "Makro cuenta",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-mackrocuenta-detalle"
            },
            {
              title: "Rendibanx",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-rendimax-plus-detalle"
            },
            {
              title: "Rendimax Plus",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=rendimax-plus-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver préstamos",
              route: "/banx/AccountsBanx"
            }
          ];
        case 'super-rendimax-plus-detalle':
          return [
            {
              title: "Makro Planilla",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=makro-planilla-detalle"
            },
            {
              title: "Makro cuenta",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-mackrocuenta-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver opciones",
              route: "/banx/AccountsBanx"
            },
            {
              title: "Rendimax Plus",
              subTitle: "Ver préstamos",
              route: "/accountDetails?key=rendimax-plus-detalle"
            }
          ];
        case 'rendimax-plus-detalle':
          return [
            {
              title: "Rendibanx",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-rendimax-plus-detalle"
            },
            {
              title: "Makro Planilla",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=makro-planilla-detalle"
            },
            {
              title: "Makro cuenta",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-mackrocuenta-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver préstamos",
              route: "/banx/AccountsBanx"
            }
          ];
        case 'cuenta-corriente-detalle':
          return [
            {
              title: "Makro cuenta",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-mackrocuenta-detalle"
            },
            {
              title: "Rendibanx",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-rendimax-plus-detalle"
            },
            {
              title: "Rendimax Plus",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=rendimax-plus-detalle"
            },
            {
              title: "Makro Planilla",
              subTitle: "Ver préstamos",
              route: "/accountDetails?key=makro-planilla-detalle"
            }
          ];

        case 'makrobanx-detalle':
          return [
            {
              title: "Makro planilla BANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=makro-planilla-banx-detalle"
            },
            {
              title: "Súper RendiBANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=super-rendibanx-detalle"
            },
            {
              title: "RendiBANX Plus",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=rendibanx-plus-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver opciones",
              route: "/banx/AccountsBanx"
            }
          ];
        case 'super-rendibanx-detalle':
          return [
            {
              title: "RendiBANX Plus",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=rendibanx-plus-detalle"
            },
            {
              title: "Makro planilla BANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=makro-planilla-banx-detalle"
            },
            {
              title: "Makro BANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=makrobanx-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver opciones",
              route: "/banx/AccountsBanx"
            }
          ];
        case 'rendibanx-plus-detalle':
          return [
            {
              title: "Makro planilla BANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=makro-planilla-banx-detalle"
            },
            {
              title: "Makro BANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=makrobanx-detalle"
            },
            {
              title: "Súper RendiBANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=super-rendibanx-detalle"
            },
            {
              title: "RendiBANX Plus",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=rendibanx-plus-detalle"
            }
          ];
        case 'makro-planilla-banx-detalle':
          return [
            {
              title: "Makro BANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=makrobanx-detalle"
            },
            {
              title: "RendiBANX Plus",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=rendibanx-plus-detalle"
            },
            {
              title: "Súper RendiBANX",
              subTitle: "Ver opciones",
              route: "/banx/AccountDetailsBanx?key=super-rendibanx-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver opciones",
              route: "/banx/AccountsBanx"
            }
          ];
          default:
          return [];
      }
    }
  },
  methods: {
    async loadAccountDetailsData() {
      await this.$store.dispatch(`accountDetailsBanx/${UPDATE_STATE_ACTION}`,[this.accountKey,TITLE, this]);
      await this.$store.dispatch(`accountDetailsBanx/${UPDATE_STATE_ACTION}`,[this.accountKey,BENEFITS, this]);
      await this.$store.dispatch(`accountDetailsBanx/${UPDATE_STATE_ACTION}`,[this.accountKey,TITLE_PANEL, this]);
      await this.$store.dispatch(`accountDetailsBanx/${UPDATE_STATE_ACTION}`,[this.accountKey,DETAILS_PANEL, this]);
      await this.$store.dispatch(`accountDetailsBanx/${UPDATE_STATE_ACTION}`,[this.accountKey,COMPARE, this]);
      await this.$store.dispatch(`accountDetailsBanx/${UPDATE_STATE_ACTION}`,[this.accountKey,DESCRIPTION, this]);
    },
    accountComparison() {
      this.$router.push({
        path: "AccountComparison"
      });
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
      this.accountKey = key;
      this.loadAccountDetailsData();
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
