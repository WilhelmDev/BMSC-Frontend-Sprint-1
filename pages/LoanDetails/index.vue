<template>
  <div>
    <DetailsCard :detailsData="titleData.items[0]" />
    <v-row class="px-8 py-5">
      <v-col cols="12" sm="7" class="pr-sm-5">
        <DescriptionPanel
          :title="descriptionData.title"
          :listItems="descriptionData.items"
        />
      </v-col>
      <!-- <v-col class="px-8">
        <AccountCuponsPanel />
      </v-col> -->
    </v-row>
    <div class="py-12">
      <BenefitsPanel
        v-bind="benefitsData"
      />
    </div>
    <div>
      <InformationPanel
        v-bind="informationPanelData"
      >
        <template v-slot:content>
          <v-row class="panel-overlaped">
            <v-col cols="12" md="6">
              <CheckedList :items="informationPanelData.data.tabs[0].requirements" />
            </v-col>
            <v-col cols="12" md="6" class="pl-0 pl-md-14 py-8 py-md-12">
              <LinksList :items="informationPanelData.data.tabs[0].links" />
            </v-col>
          </v-row>
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
          <!--
            <Button
              :text="'Ir al simulador'"
              :color="'bm-medium'"
            />
            -->
          </div>
          <div class="px-3">
            <Button
              :text="compareData.items[0].buttonName"
              :onClick="goToHref"
              :data="compareData.items[0]"
              :color="'bm-light'"
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
import BenefitsPanel from "@/components/BenefitsPanel";
import InformationPanel from "@/components/InformationPanel";
import Compare from "@/components/Compare.vue";
import Button from "@/components/Button.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import CheckedList from "@/components/CheckedList";
import LinksList from "@/components/LinksList";
import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {BENEFITS, DESCRIPTION, IMAGE, INFORMATION_PANEL, INTERESTS_RATE, TITLE, COMPARE} from "~/cardListKeys/loanDetails";
import {DISPLAY_PANEL, FORM} from "~/cardListKeys/loanDetails";
import { processInformationPanelDataLoanDetail, generateEmptyModels } from "@/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    DetailsCard,
    DescriptionPanel,
    AccountCuponsPanel,
    BenefitsPanel,
    InformationPanel,
    Compare,
    Button,
    RelatedPanel,
    MoreInfo,
    CheckedList,
    LinksList
  },
  data() {
    return {
      getCardImage,
      loanKey: "",
      titleData2: {
        items: [
          {
            title: "Préstamo de vivienda",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            buttonName: "Solicitar préstamo",
            buttonType: "bm-light",
            mainImageUrl: require("@/assets/images/img-card1.png")
          }
        ]
      },
      descriptionData2: {
        items: [
          {
            title: "¿Cómo funciona?",
            description:
              "Te financiamos hasta el 80% del valor de la garantía.$" +
              "Podrás pagar este préstamo hasta en 20 años.$" +
              "Te prestaremos desde Bs. 80.000 para la compra o Bs. 40.000 para la construcción, ampliación o remodelación de tu vivienda.$" +
              "Incluye seguro de Desgravamen, seguro Todo Riesgo y seguro Todo Construcción."
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
            title: "Ahora puedes solicitar un préstamo",
            subTitle: "100% online",
            smallText: "Y con pocos requisitos"
          },
          {
            title: "Documentación vigente",
            subTitle: `<ul class="pl-3" style="list-style-type:'- '" ><li>Cédula de identidad.</li> <li>Cédula de identidad de extranjero o documento especial de identificación (carnet diplomático, credencial, o credencial consular).</li>`,
            description:
              "Las personas extranjeras deben incluir además un respaldo de actividad económica como independiente o fotocopia de boleta de pago como dependiente.",
            tags: "regular"
          },
          {
            title: "En moneda nacional",
            subTitle: "El monto mínimo es de Bs. 0",
            tags: "regular"
          },
          {
            title: "Documentación vigente",
            subTitle: "El monto mínimo es de $us. 1.000",
            tags: "regular"
          },
          {
            title: "Descargar PDF de requisitos",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular"
          },
          {
            title: "Bases y condiciones",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular"
          },
          {
            title: "Tarifario",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular"
          },
          {
            title: "Reglamento para cuentas de ahorro",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "regular"
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
            buttonName:"Comparar"
          }
        ]
      },
      listItems: [
        {
          title: "Ser mayor de 18 años."
        },
        {
          title: "Documento de identidad vigente."
        },
        {
          title: "Respaldo de ingresos",
          content:
            "Personas dependientes deben presentar las últimas 3 boletas de pago y extracto de cuenta AFP; y personas independientes, respaldo de compras o ventas de los últimos 3 meses."
        },
        {
          title: "Una cuenta de ahorro o  corriente en el BMSC",
          content: "para recibir el desembolso."
        },
        {
          title: "Avalúo de la vivienda que comprarás",
          content:
            "(para esto tendrás el asesoramiento de tu Ejecutivo de Cuenta)."
        },
        {
          title: "Fotocopias de los documentos de la vivienda."
        }
      ],
      linksList: [
        "Descargar PDF de requisitos",
        "Bases y condiciones",
        "Tarifario",
        "Reglamento"
      ],
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
    this.loanKey = this.$route.query.key;
    //console.log('Loading insurance: ',this.loanKey);
  },
  async mounted() {
    try {
      await this.loadLoanDetailsData();
    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information.');
    }
  },
  methods: {
    accountComparison() {
      this.$router.push({
        path: "AccountComparison"
      });
    },
    async loadLoanDetailsData() {
      await this.$store.dispatch(`loanDetails/${UPDATE_STATE_ACTION}`,[this.loanKey,TITLE, this]);
      await this.$store.dispatch(`loanDetails/${UPDATE_STATE_ACTION}`,[this.loanKey,INTERESTS_RATE, this]);
      await this.$store.dispatch(`loanDetails/${UPDATE_STATE_ACTION}`,[this.loanKey,DESCRIPTION, this]);
      await this.$store.dispatch(`loanDetails/${UPDATE_STATE_ACTION}`,[this.loanKey,BENEFITS, this]);
      await this.$store.dispatch(`loanDetails/${UPDATE_STATE_ACTION}`,[this.loanKey,INFORMATION_PANEL, this]);
      await this.$store.dispatch(`loanDetails/${UPDATE_STATE_ACTION}`,[this.loanKey,COMPARE, this]);
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
      const accountId = this.$route.query.accountId;
      const data = _.filter(
        this.cardItems,
        item => item.id === accountId
      );
      data[0]['buttonLabel'] = "Solicitar préstamo";
      return data[0];
    },
    titleData: function () {
      let res = {
        items: this.$store.getters["loanDetails/getList"](TITLE)
      }
      // console.log("prueba", res)
      if (res.items.length > 0) {
        res.items[0].onCardClick = () => this.$router.push("/");
      }
      //console.log(TITLE, res);
      return res;
    },
    interestsRateData: function () {
      let res = {
        items: this.$store.getters["loanDetails/getList"](INTERESTS_RATE)
      }
      // console.log(INTERESTS_RATE, res);
      return res;
    },
    descriptionData: function () {
      let res = {
        items: this.$store.getters["loanDetails/getList"](DESCRIPTION)
      }
      if (res.items.length === 0) res = this.descriptionData2;
      if (res.items.length > 0 && res.items[0].description) {
        res.title = res.items[0].title;
        res.items = res.items[0].description ? res.items[0].description.split("$") : [];
      }
      // console.log(DESCRIPTION, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["loanDetails/getList"](BENEFITS);
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
      // console.log(BENEFITS, res);
      return res;
    },
    informationPanelData: function () {
      let res = {
        items: this.$store.getters["loanDetails/getList"](INFORMATION_PANEL)
      }
      // needed fallback
      if (res.items.length === 0) res = this.informationConfig;
      
      // console.log("Infor", res)
      // console.log("infor2", processInformationPanelDataLoanDetail(res))

      return processInformationPanelDataLoanDetail(res);
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["loanDetails/getList"](COMPARE)
      }

      console.log(COMPARE, res);
      return res;
    },
    relatedPanelMap: function () {
      switch (this.loanKey) {
        case 'compra-vivienda-detalle':
          return [
            {
              title: "Credito de vivienda social",
              subTitle: "Ver productos",
              route: "/loanDetails?key=vivienda-social-detalle"
            },
            {
              title: "Credito vehicular",
              subTitle: "Ver productos",
              route: "/loanDetails?key=compra-vehiculo-detalle"
            },
            {
              title: "Credito de consumo",
              subTitle: "Ver productos",
              route: "/loanDetails?key=prestamo-consumo-detalle"
            },
            {
              title: "Credito consumo planilla",
              subTitle: "Ver productos",
              route: "/loanDetails?key=consumo-planilla-detalle"
            }
          ];
        case 'vivienda-social-detalle':
          return [
            {
              title: "Credito de vivienda",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=compra-vivienda-detalle"
            },
            {
              title: "Credito vehicular",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=compra-vehiculo-detalle"
            },
            {
              title: "Credito de consumo",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=prestamo-consumo-detalle"
            },
            {
              title: "Credito consumo planilla",
              subTitle: "Ver préstamos",
              route: "/loanDetails?key=consumo-planilla-detalle"
            }
          ];
        case 'compra-vehiculo-detalle':
          return [
            {
              title: "Credito de vivienda social",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=vivienda-social-detalle"
            },
            {
              title: "Credito de vivienda",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=compra-vivienda-detalle"
            },
            {
              title: "Credito de consumo",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=prestamo-consumo-detalle"
            },
            {
              title: "Credito consumo planilla",
              subTitle: "Ver préstamos",
              route: "/loanDetails?key=consumo-planilla-detalle"
            }
          ];
        case 'consumo-planilla-detalle':
          return [
            {
              title: "Credito consumo planilla",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=consumo-planilla-detalle"
            },
            {
              title: "Credito vehicular",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=compra-vehiculo-detalle"
            },
            {
              title: "Credito de vivienda social",
              subTitle: "Ver opciones",
              route: "/loanDetails?key=vivienda-social-detalle"
            },
            {
              title: "Credito de vivienda",
              subTitle: "Ver préstamos",
              route: "/loanDetails?key=compra-vivienda-detalle"
            }
          ];
        case 'Emp-Capital-de-operaciones-detalle':
          return [
            {
              title: "Crédito de Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Emp-Capital-inversion-detalle"
            }
          ];
        case 'Emp-Capital-inversion-detalle':
          return [
            {
              title: "Crédito de Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Emp-Capital-de-operaciones-detalle"
            }
          ];
        case 'Capital-de-operaciones-detalle':
          return [
            {
              title: "Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-inversion-detalle"
            },
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
            },
            {
              title: "Crédito Agropecuario",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-agropecuario-detalle"
            },
            {
              title: "Línea de Crédito",
              subTitle: "Ver préstamos",
              route: "/LoanDetails?key=Linea-credito-detalle"
            }
          ];
        case 'Capital-inversion-detalle':
          return [
            {
              title: "Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-de-operaciones-detalle"
            },
            {
              title: "Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-inversion-detalle"
            },
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
            },
            {
              title: "Crédito Agropecuario",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-agropecuario-detalle"
            }
          ];
        case 'Credito-simple-detalle':
          return [
            {
              title: "Línea de Crédito",
              subTitle: "Ver préstamos",
              route: "/LoanDetails?key=Linea-credito-detalle"
            },
            {
              title: "Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-de-operaciones-detalle"
            },
            {
              title: "Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-inversion-detalle"
            },
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
            }
          ];
        case 'Credito-agropecuario-detalle':
          return [
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
            },
            {
              title: "Línea de Crédito",
              subTitle: "Ver préstamos",
              route: "/LoanDetails?key=Linea-credito-detalle"
            },
            {
              title: "Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-de-operaciones-detalle"
            },
            {
              title: "Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-inversion-detalle"
            }
          ];
        case 'Linea-credito-detalle':
          return [
            {
              title: "Crédito Agropecuario",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-agropecuario-detalle"
            },
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
            },
            {
              title: "Línea de Crédito",
              subTitle: "Ver préstamos",
              route: "/LoanDetails?key=Linea-credito-detalle"
            },
            {
              title: "Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-de-operaciones-detalle"
            }
          ];
        case 'Credito-garantia-auto-liquidable-detalle':
          return [
            {
              title: "Crédito con Garantía Warrant",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-garantia-Warrant-detalle"
            },
            {
              title: "Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-de-operaciones-detalle"
            },
            {
              title: "Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-inversion-detalle"
            },
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
            }
          ];
        case 'Credito-garantia-Warrant-detalle':
          return [
            {
              title: "Crédito Garantía Auto-liquidable",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-garantia-auto-liquidable-detalle"
            },
            {
              title: "Capital de Operaciones",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-de-operaciones-detalle"
            },
            {
              title: "Capital de Inversión",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Capital-inversion-detalle"
            },
            {
              title: "Crédito Simple",
              subTitle: "Ver opciones",
              route: "/LoanDetails?key=Credito-simple-detalle"
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
      this.loanKey = key;
      this.loadLoanDetailsData();
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
