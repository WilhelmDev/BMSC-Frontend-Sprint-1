<template>
  <div>
    <DetailsCard :detailsData="titleData.items[0]"/>
    <v-container>
      <v-row class="pt-100" v-if="showDescriptionAndForm">
        <v-col cols="12" sm="7" class="pr-sm-5">
          <DescriptionPanel
            :title="descriptionData.title"
            :listItems="descriptionData.items"
          />
        </v-col>
        <!-- <v-col class="px-0 px-sm-8" v-if="formData.items.length > 0"> -->
        <v-col class="px-0 px-sm-8" v-if="$route.query.key.indexOf('super-mackrocuenta') !== -1">
          <AccountCuponsPanel
            v-bind="formData.items[0]"
          />
          <div
            class="strong-regular-text green-text cursor-pointer pt-6 mx-3"
            @click="$router.push({ path: 'AccountWinners' })"
          >
            Ver lista de ganadores
            <span class="icon-btn-arrow"></span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="py-12 px-4 px-sm-16" v-if="displayPanelData.items.length > 0">
      <DisplayPanel v-bind="displayPanelData" />
    </div>
    <div class="py-12">
      <BenefitsPanel
        v-bind="benefitsData"
      />
    </div>
    <div>
      <InformationPanel
        v-bind="informationPanelData"
      >
        <template v-slot:content="{ data }">
          <div class="panel-overlaped">
            <OpenAccountInfo :data="data" />
          </div>
        </template>
      </InformationPanel>
    </div>
    <div class="panel-overlap">
      <Compare
        v-if="compareData && compareData.items && compareData.items.length > 0"
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :topImage="getCardImage(compareData.items[0])"
        :alt="compareData.items[0].imgAlt1"
      >
        <template v-slot:bottom>
          <div class="px-3 pb-2">
            <Button
              :color="'bm-medium'"
              :text="compareData.items[0].buttonName"
              :onClick="goToHref"
              :data="compareData.items[0]"
            />
          </div>
          <div class="px-3">
            <Button
              :text="'Abre una cuenta'"
              :color="'bm-light'"
              :onClick="goToCyco"
            />
          </div>
        </template>
      </Compare>
    </div>
    <div class="py-sm-4 py-md-16">
      <RelatedPanel :items="relatedPanelMap" />
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
import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  BENEFITS,
  DESCRIPTION,
  DISPLAY_PANEL,
  FORM,
  IMAGE,
  INFORMATION_PANEL,
  TITLE,
  COMPARE
} from "~/cardListKeys/accountDetails";
import {HOME_CAROUSEL} from "~/cardListKeys/companies";
import { processInformationPanelData, generateEmptyModels } from "@/utils/cardsUtil";
import {CYCO_URL} from "~/constants_routes";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
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
      getCardImage,
      accountKey: '',
      titleData2: {
        items: [
          {
            title: "Súper Makro Cuenta",
            description:
              "¿Te gustaría ganar Bs. 50.000? La Súper Makro Cuenta te permite participar de sorteos diarios y semanales. ¡Tú puedes ser el próximo ganador!",
            buttonName: "Más información",
            buttonType: "bm-light",
            buttonClarification: "Te enviamos tu tarjeta GRATIS!",
            mainImageUrl: require("@/assets/images/img-card1.png"),
            id: "1"
          }
        ]
      },
      descriptionData2: {
        items: [{
          title: "¿Cómo funciona el sorteo?",
          description:
            "La Súper Makro Cuenta regala todos los viernes Bs. 50.000 y todos los días, de lunes a jueves, Bs. 10.000.$" +
            "Por cada $us 100 o su equivalente en bolivianos en tu Súper Makro Cuenta, tienes una posibilidad para ganar.$" +
            "Mientras más dinero tengas en tu cuenta el día anterior al sorteo, más posibilidades tendrás de ser un ganador."
        }]
      },
      formData2: {
        items: [
          {
            title: "Calcula cuántos cupones tienes",
            buttonClarification: "Continuar"
          }
        ]
      },
      displayPanelData2: {
        items: [
          {
            title: "50.000,00 BS",
            subTitle: "12 de octubre",
            description: "Próximos sorteos",
          },
          {
            title: "10.000,00 BS",
            subTitle: "22 de octubre",
            description: "Próximos sorteos",
          },
          {
            title: "10.000,00 BS",
            subTitle: "28 de octubre",
            description: "Próximos sorteos",
          }
        ]
      },
      benefits: {
        items: [
          {
            title: "Seguros",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Información de seguros"
          },
          {
            title: "Tecnología",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Sección de tecnología"
          },
          {
            title: "Seguros",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Información de seguros"
          },
          {
            title: "Tecnología",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Sección de tecnologías"
          }
        ]
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
      },
      compareConfig: {
        items: [
          {
            title:
              "¿Estás listo para tener tu <span class='green-md-text'>Súper Makro Cuenta</span>?",
            description:
              "Abre tu Súper Makro Cuenta y conviértete en el próximo beneficiado.",
            buttonName:"Compara pe"
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
      }
    };
  },
  created() {
    this.accountKey = this.$route.query.key;
    //console.log('Loading account: ',this.accountKey);
  },
  async mounted() {
    try {
      await this.loadAccountDetailsData();
    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information');
    }

  },
  methods: {
    accountComparison() {
      this.$router.push({
        path: "AccountComparison"
      });
    },
    goToCyco() {
      window.location.href = CYCO_URL;
    },
    async loadAccountDetailsData() {
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,TITLE,this,this]);
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,DESCRIPTION,this]);
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,FORM,this]);
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,DISPLAY_PANEL,this]);
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,BENEFITS,this]);
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,INFORMATION_PANEL,this]);
      await this.$store.dispatch(`accountDetails/${UPDATE_STATE_ACTION}`,[this.accountKey,COMPARE,this]);
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
  computed: {
    detailsData() {
      const accountKey = this.$route.query.accountKey;
      const data = _.filter(
        this.cardItems,
        item => item.id === accountKey
      );
      data[0]['buttonLabel'] = "Abre una cuenta";
      data[0]['buttonMessage'] = "¡Te enviamos tu tarjeta GRATIS!";
      return data[0];
    },
    titleData: function () {
      let res = {
        items: this.$store.getters["accountDetails/getList"](TITLE)
      }

      if (res.items.length > 0) {
        res.items[0].onCardClick = () => this.$router.push("/")
      }
      //console.log(TITLE, res);
      return res;
    },
    showDescriptionAndForm: function () {
      return this.$store.getters["accountDetails/getList"](DESCRIPTION).length !== 0;
    },
    descriptionData: function () {
      let res = {
        items: this.$store.getters["accountDetails/getList"](DESCRIPTION)
      }
      if (res.items.length === 0) res = this.descriptionData2;
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
    displayPanelData: function () {
      let sectionList = this.$store.getters["accountDetails/getList"](DISPLAY_PANEL);
      if (sectionList.length === 0) return {
        items: [],
        title: ""
      }
      //console.log('sections liste: ',sectionList);
      let res = {
        items: sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] !== 111).map(item => {
          return {
            text: item.title,
            smallText: item.description
          }
        }),
        title: sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 111).length > 0 ?
          sectionList.filter(card => card['cardCategory']['id'] === 111)[0]['title'] : ""
      }
      //console.log(DISPLAY_PANEL, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["accountDetails/getList"](BENEFITS);
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
    informationPanelData: function () {
      let res = {
        items: this.$store.getters["accountDetails/getList"](INFORMATION_PANEL)
      }
      // needed fallback
      if (res.items.length === 0) res = this.informationConfig;
      return processInformationPanelData(res);
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["accountDetails/getList"](COMPARE)
      }

      //console.log(COMPARE, res);
      return res;
    },
    relatedPanelMap: function () {
      switch (this.accountKey) {
        case 'super-mackrocuenta-detalle':
          return [
            {
              title: "Makro Planilla",
              subTitle: "Ver productos",
              route: "/accountDetails?key=makro-planilla-detalle"
            },
            {
              title: "Rendibanx",
              subTitle: "Ver productos",
              route: "/accountDetails?key=super-rendimax-plus-detalle"
            },
            {
              title: "Rendimax Plus",
              subTitle: "Ver productos",
              route: "/accountDetails?key=rendimax-plus-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver productos",
              route: "/banx/AccountsBanx"
            }
          ];
        case 'Cuenta-de-ahorro-detalle':
          return [
            {
              title: "Makro cuenta",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=super-mackrocuenta-detalle"
            },
            {
              title: "Cuenta Corriente",
              subTitle: "Ver opciones",
              route: "/accountDetails?key=cuenta-corriente-detalle"
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
              subTitle: "Ver productos",
              route: "/accountDetails?key=makro-planilla-detalle"
            },
            {
              title: "Makro cuenta",
              subTitle: "Ver productos",
              route: "/accountDetails?key=super-mackrocuenta-detalle"
            },
            {
              title: "Banx para jovenes",
              subTitle: "Ver productos",
              route: "/banx/AccountsBanx"
            },
            {
              title: "Rendimax Plus",
              subTitle: "Ver productos",
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
        default:
          return this.relatedItems.items;
      }
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
  async asyncData(context) {return await getHeader(context)},
  head () {return this.headData}
};
</script>
