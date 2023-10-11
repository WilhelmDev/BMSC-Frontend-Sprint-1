<template>
  <div>
    <DetailsCard :detailsData="titleData.items[0]" />
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
          <OpenAccountInfo :data="data" />
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
          <div class="px-3 pb-2" v-if="compareData.items[0].buttonName !== ''">
            <Button
              :color="'bm-medium'"
              :text="compareData.items[0].buttonName"
              :onClick="goToHref"
              :data="compareData.items[0]"
            />
          </div>
          <div class="px-3">
            <Button
              :text="'Ver mapa de agencias'"
              :color="'bm-light'"
              :onClick="() => {$router.push({path: '/help/agencies'})}"
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
import OpenAccountInfo from "@/components/OpenAccountInfo";
import BenefitsPanel from "@/components/BenefitsPanel";
import InformationPanel from "@/components/InformationPanel";
import Compare from "@/components/Compare.vue";
import Button from "@/components/Button.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {BENEFITS, INFORMATION_PANEL, TITLE, COMPARE} from "~/cardListKeys/investmentDetails";
import {BENEFITS_2, PROGRAMS} from "~/cardListKeys/investmentDetails";
import { processInformationPanelData, generateEmptyModels } from '@/utils/cardsUtil';
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    DetailsCard,
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
      investmentKey: "", //DO NOT ERASE THIS KEY
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
      cardItems: [
        {
          title: "Producto uno",
          content:
            "¿Te gustaría ganar Bs. 50.000? La Súper Makro Cuenta te permite participar de sorteos diarios y semanales. ¡Tú puedes ser el próximo ganador!",
          message: "Con opción de Makro planilla para recibir tus sueldos.",
          image: "img-card1.png",
          id: "1"
        },
        {
          title: "Producto dos",
          content:
            "¿Quieres una cuenta que te dé más? La tasa de interés más beneficiosa para tus ahorros te la da la Súper Rendimax Plus: 3.5% de interés anual que hará que tu dinero se multiplique.",
          image: "img-card2.png",
          id: "2"
        },
        {
          title: "Producto tres",
          content:
            "¿Quieres una cuenta que te dé más? La Rendimax Plus del BMSC es la cuenta de ahorros que te da mayor rendimiento, con una tasa de interés del 3% anual para maximizar tus ahorros.",
          image: "img-card3.png",
          id: "3"
        }
      ],
      nextRaffles: [
        {
          text: "50.000,00 BS",
          smallText: "12 de octubre"
        },
        {
          text: "10.000,00 BS",
          smallText: "22 de octubre"
        },
        {
          text: "10.000,00 BS",
          smallText: "28 de octubre"
        }
      ],
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
            title: "Documentación vigente (menores)",
            subTitle: `<ul class="pl-3" style="list-style-type:'- '" ><li>Cédula de identidad.</li> <li>Cédula de identidad de extranjero o documento especial de identificación (carnet diplomático, credencial, o credencial consular).</li>`,
            smallText:
              "Las personas extranjeras deben incluir además un respaldo de actividad económica como independiente o fotocopia de boleta de pago como dependiente.",
            tags: "menores de edad"
          },
          {
            title: "En moneda nacional (menores)",
            subTitle: "El monto mínimo es de Bs. 0",
            tags: "menores de edad"
          },
          {
            title: "Documentación vigente (menores)",
            subTitle: "El monto mínimo es de $us. 1.000",
            tags: "menores de edad"
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
          },
          {
            title: "Descargar PDF de requisitos (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad"
          },
          {
            title: "Bases y condiciones (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad"
          },
          {
            title: "Tarifario (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad"
          },
          {
            title: "Reglamento para cuentas de ahorro (menores)",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            tags: "menores de edad"
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
    this.investmentKey = this.$route.query.key;
    //console.log('Loading investment: ',this.investmentKey);
  },
  async mounted() {
    try {
      await this.loadInvestmentDetailsData();
    } catch (error) {
      //console.log('an error occurred when trying to get the cards information');
    }
  },
  methods: {
    investmentComparison() {
      this.$router.push({
        path: "InvestmentComparison"
      });
    },
    async loadInvestmentDetailsData() {
      await this.$store.dispatch(`investmentDetails/${UPDATE_STATE_ACTION}`,[this.investmentKey,TITLE, this]);
      await this.$store.dispatch(`investmentDetails/${UPDATE_STATE_ACTION}`,[this.investmentKey,BENEFITS, this]);
      await this.$store.dispatch(`investmentDetails/${UPDATE_STATE_ACTION}`,[this.investmentKey,INFORMATION_PANEL, this]);
      await this.$store.dispatch(`investmentDetails/${UPDATE_STATE_ACTION}`,[this.investmentKey,COMPARE, this]);
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
      data[0]['buttonLabel'] = "Abre una cuenta";
      data[0]['buttonMessage'] = "¡Te enviamos tu tarjeta GRATIS!";
      return data[0];
    },
    titleData: function () {
      let res = {
        items: this.$store.getters["investmentDetails/getList"](TITLE)
      }

      if (res.items.length > 0) {
        res.items[0].onCardClick = () => this.$router.push("/");
      }
      //console.log(TITLE, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["investmentDetails/getList"](BENEFITS);
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
        items: this.$store.getters["investmentDetails/getList"](INFORMATION_PANEL)
      }

      // needed fallback
      if (res.items.length === 0) res = this.informationConfig;

      return processInformationPanelData(res);
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["investmentDetails/getList"](COMPARE)
      }

      //console.log(COMPARE, res);
      return res;
    },
    relatedPanelMap: function () {
      switch (this.investmentKey) {
        case 'DPF-4-2-detalle':
          return [
            {
              title: "DPF Incremental",
              subTitle: "Ver productos",
              route: "/investmentDetails?key=DPF-Incremental-200-detalle"
            },
            {
              title: "DPF promo",
              subTitle: "Ver productos",
              route: "/investmentDetails?key=DPF-Promo-detalle"
            },
            {
              title: "DPF normativo",
              subTitle: "Ver productos",
              route: "/investmentDetails?key=DPF-normativo-detalle"
            },
            {
              title: "DPF",
              subTitle: "Ver productos",
              route: "/investmentDetails?key=DPF-detalle"
            }
          ];
        case 'DPF-detalle':
          return [
            {
              title: "DPF 4.60%",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-4-2-detalle"
            },
            {
              title: "DPF Incremental",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-Incremental-200-detalle"
            },
            {
              title: "DPF promo",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-Promo-detalle"
            },
            {
              title: "DPF normativo",
              subTitle: "Ver préstamos",
              route: "/investmentDetails?key=DPF-normativo-detalle"
            }
          ];
        case 'DPF-normativo-detalle':
          return [
            {
              title: "DPF",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-detalle"
            },
            {
              title: "DPF 4.60%",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-4-2-detalle"
            },
            {
              title: "DPF Incremental",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-Incremental-200-detalle"
            },
            {
              title: "DPF promo",
              subTitle: "Ver préstamos",
              route: "/investmentDetails?key=DPF-Promo-detalle"
            }
          ];
        case 'DPF-Promo-detalle':
          return [
            {
              title: "DPF normativo",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-normativo-detalle"
            },
            {
              title: "DPF",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-detalle"
            },
            {
              title: "DPF 4.60%",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-4-2-detalle"
            },
            {
              title: "DPF Incremental",
              subTitle: "Ver préstamos",
              route: "/investmentDetails?key=DPF-Incremental-200-detalle"
            }
          ];
        case 'DPF-Incremental-200-detalle':
          return [
            {
              title: "DPF promo",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-Promo-detalle"
            },
            {
              title: "DPF normativo",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-normativo-detalle"
            },
            {
              title: "DPF",
              subTitle: "Ver opciones",
              route: "/investmentDetails?key=DPF-detalle"
            },
            {
              title: "DPF 4.60%",
              subTitle: "Ver préstamos",
              route: "/investmentDetails?key=DPF-4-2-detalle"
            }
          ];
        case 'Cartas-credito-Standby-detalle':
          return [
            {
              title: "Standby y Garantías Contragarantizadas",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=contragarantizadas-detalle"
            },
            {
              title: "Venta de Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Venta-cheques-exterior-detalle"
            },
            {
              title: "Depósitos Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Depositos-cheques-exterior-detalle"
            },
            {
              title: "Cobranzas",
              subTitle: "Ver préstamos",
              route: "/InvestmentDetails?key=Cobranzas-detalle"
            }
          ];
        case 'contragarantizadas-detalle':
          return [
            {
              title: "Cartas de Crédito y Standby",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Cartas-credito-Standby-detalle"
            },
            {
              title: "Venta de Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Venta-cheques-exterior-detalle"
            },
            {
              title: "Depósitos Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Depositos-cheques-exterior-detalle"
            },
            {
              title: "Cobranzas",
              subTitle: "Ver préstamos",
              route: "/InvestmentDetails?key=Cobranzas-detalle"
            }
          ];
        case 'Venta-cheques-exterior-detalle':
          return [
            {
              title: "Cartas de Crédito y Standby",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Cartas-credito-Standby-detalle"
            },
            {
              title: "Standby y Garantías Contragarantizadas",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=contragarantizadas-detalle"
            },
            {
              title: "Depósitos Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Depositos-cheques-exterior-detalle"
            },
            {
              title: "Cobranzas",
              subTitle: "Ver préstamos",
              route: "/InvestmentDetails?key=Cobranzas-detalle"
            }
          ];
        case 'Depositos-cheques-exterior-detalle':
          return [
            {
              title: "Cartas de Crédito y Standby",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Cartas-credito-Standby-detalle"
            },
            {
              title: "Standby y Garantías Contragarantizadas",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=contragarantizadas-detalle"
            },
            {
              title: "Venta de Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Venta-cheques-exterior-detalle"
            },
            {
              title: "Cobranzas",
              subTitle: "Ver préstamos",
              route: "/InvestmentDetails?key=Cobranzas-detalle"
            }
          ];
        case 'Cobranzas-detalle':
          return [
            {
              title: "Cartas de Crédito y Standby",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Cartas-credito-Standby-detalle"
            },
            {
              title: "Standby y Garantías Contragarantizadas",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=contragarantizadas-detalle"
            },
            {
              title: "Depósitos Cheques del Exterior",
              subTitle: "Ver opciones",
              route: "/InvestmentDetails?key=Depositos-cheques-exterior-detalle"
            },
            {
              title: "Venta de Cheques del Exterior",
              subTitle: "Ver préstamos",
              route: "/InvestmentDetails?key=Venta-cheques-exterior-detalle"
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
      this.investmentKey = key;
      this.loadInvestmentDetailsData();
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
