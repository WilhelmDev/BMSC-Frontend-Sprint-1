<template>
  <div>
    <DetailsCard :detailsData="titleData.items[0]" />
    <div class="py-12">
      <BenefitsPanel
        v-bind="benefitsData"
      />
    </div>
    <div class="py-12">
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
    </div>
    <div>
      <InformationPanel
        v-bind="informationPanelData"
      >
        <template v-slot:content="{data}">
          <!-- <v-row class="panel-overlaped"> --> <!-- uncomment if compare componente is used -->
          <OpenAccountInfo :data="data" />
        </template>
      </InformationPanel>
    </div>
    <!-- <div class="panel-overlap">
      <Compare
        v-if="compareData && compareData.items && compareData.items.length > 0"
        :compareTitle="compareData.items[0].title"
        :compareContent="compareData.items[0].description"
        :topImage="getCardImage(compareData.items[0])"
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
              :text="'Solicitar seguro'"
              :color="'bm-light'"
            />
          </div>
        </template>
      </Compare>
    </div> -->
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
import BenefitsPanel from "@/components/BenefitsPanel";
import InformationPanel from "@/components/InformationPanel";
import Compare from "@/components/Compare.vue";
import Button from "@/components/Button.vue";
import CheckedList from "@/components/CheckedList";
import LinksList from "@/components/LinksList";
import Programs from "@/components/Programs.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";

import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {BENEFITS, BENEFITS_2, INFORMATION_PANEL, PROGRAMS, TITLE, COMPARE} from "~/cardListKeys/insuranceDetails";
import { processInformationPanelData, generateEmptyModels } from "@/utils/cardsUtil";
import { getCardImage } from "@/utils/imageUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    DetailsCard,
    BenefitsPanel,
    InformationPanel,
    Compare,
    Button,
    CheckedList,
    LinksList,
    Programs,
    RelatedPanel,
    MoreInfo
  },
  data() {
    return {
      getCardImage,
      insuranceKey: '',
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
          title: "Seguro de tarjetas",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "img-card1.png",
          id: "1"
        },
        {
          title: "Seguro dos",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "img-card2.png",
          id: "2"
        },
        {
          title: "Seguro tres",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
          title: "Límite mínimo Bs. 40.000"
        },
        {
          title: "Mantenimiento anual",
          content: "según <span class='green-md-text'>tarifario</span> vigente"
        },
        {
          title: "Seguro de protección",
          content:
            "de todos los plásticos de tu Tarjeta de Crédito (titular y adicionales) por Bs. 12 al mes"
        }
      ],
      linksList: [
        "Descargar PDF de requisitos",
        "Tarifario",
        "Términos y condiciones"
      ],
      programs: [
        {
          title: "Forma parte de nuestro Club de puntos",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          link: "Conoce el club",
          image: "card-hand.png",
          background: "blurred",
          programImage2: "phone.png"
        }
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
    this.insuranceKey = this.$route.query.key;
    //console.log('Loading insurance: ',this.insuranceKey);
  },
  async mounted() {
    try {
      await this.loadInsuranceDetailsData();
    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information');
    }
  },
  methods: {
    insuranceComparison() {
      this.$router.push({
        path: "InsuranceComparison"
      });
    },
    async loadInsuranceDetailsData() {
      await this.$store.dispatch(`insuranceDetails/${UPDATE_STATE_ACTION}`,[this.insuranceKey,TITLE, this]);
      await this.$store.dispatch(`insuranceDetails/${UPDATE_STATE_ACTION}`,[this.insuranceKey,BENEFITS, this]);
      await this.$store.dispatch(`insuranceDetails/${UPDATE_STATE_ACTION}`,[this.insuranceKey,PROGRAMS, this]);
      await this.$store.dispatch(`insuranceDetails/${UPDATE_STATE_ACTION}`,[this.insuranceKey,BENEFITS_2, this]);
      await this.$store.dispatch(`insuranceDetails/${UPDATE_STATE_ACTION}`,[this.insuranceKey,INFORMATION_PANEL, this]);
      // await this.$store.dispatch(`insuranceDetails/${UPDATE_STATE_ACTION}`,[this.insuranceKey,COMPARE]); // uncomment if compare componente is used
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
    detailsData: function() {
      const accountId = this.$route.query.accountId;
      const data = _.filter(
        this.cardItems,
        item => item.id === accountId
      );
      data[0]['buttonLabel'] = "Solicitar seguro";
      return data[0];
    },
    titleData: function () {
      let res = {
        items: this.$store.getters["insuranceDetails/getList"](TITLE)
      }

      if (res.items.length > 0) {
        res.items[0].onCardClick = () => this.$router.push("/");
      }
      //console.log(TITLE, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["insuranceDetails/getList"](BENEFITS);
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
    programsData: function () {
      let res = {
        items: this.$store.getters["insuranceDetails/getList"](PROGRAMS)
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let res = {
        items: this.$store.getters["insuranceDetails/getList"](BENEFITS_2)
      }
      //console.log(BENEFITS_2, res);
      return res;
    },
    informationPanelData: function () {
      let res = {
        items: this.$store.getters["insuranceDetails/getList"](INFORMATION_PANEL)
      }

      // needed fallback
      if (res.items.length === 0) res = {items: []};

      return processInformationPanelData(res);
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["insuranceDetails/getList"](COMPARE)
      }

      //console.log(COMPARE, res);
      return res;
    },
    relatedPanelMap: function () {
      switch (this.insuranceKey) {
        case 'Tarjeta-Debito-detalle':
          return [
            {
              title: "Seguro TC",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Tarjeta-Credito-detalle"
            }
          ];
        case 'Tarjeta-Credito-detalle':
          return [
            {
              title: "Seguro TD",
              subTitle: "Ver opciones",
              route: "/insuranceDetails?key=Tarjeta-Debito-detalle"
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
          return this.relatedItems.items;
      }
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
