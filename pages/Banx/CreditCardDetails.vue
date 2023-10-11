<template>
  <div>
    <DetailsCard :detailsData="titleData.items[0]" />
    <div class="py-12">
      <BenefitsPanel
        v-bind="benefitsData"
      />
    </div>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="program.background"
      :isImageInLeft="program.changeOrder"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <Benefits2
      v-bind:benefits2Data = "benefits2Data"
    />
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
          <div class="px-3">
            <Button
              :text="'Pedir una tarjeta'"
              :color="'bm-light'"
              :onClick="goToCyco"
            />
          </div>
          <div class="px-3 pb-2">
            <Button
              :color="'bm-medium'"
              :text="compareData.items[0].buttonName"
              :onClick="goToHref"
              :data="compareData.items[0]"
            />
          </div>
        </template>
      </Compare>
    </div>
    <div class="py-sm-4 py-md-16">
      <RelatedPanel :items="relatedPanelMap" :isBanx="true"/>
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
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {BENEFITS, BENEFITS_2, INFORMATION_PANEL, PROGRAMS, TITLE, COMPARE} from "~/cardListKeys/creditCardDetails";
import { generateEmptyModels, processInformationPanelData } from "@/utils/cardsUtil"
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
    MoreInfo,
    Programs,
    Benefits2
  },
  data() {
    return {
      creditCardKey: "", // DO NOT ERASE THIS KEY
      getCardImage,
      cardItems: [
        {
          title: "Mastercard Black",
          content:
            "¿Te gustaría ganar Bs. 50.000? La Súper Makro Cuenta te permite participar de sorteos diarios y semanales. ¡Tú puedes ser el próximo ganador!",
          message: "Con opción de Makro planilla para recibir tus sueldos.",
          image: "mastercard-black.png",
          id: "1"
        },
        {
          title: "Mastercard Platinum",
          content:
            "¿Quieres una cuenta que te dé más? La tasa de interés más beneficiosa para tus ahorros te la da la Súper Rendimax Plus: 3.5% de interés anual que hará que tu dinero se multiplique.",
          image: "mastercard-platinum.png",
          id: "2"
        },
        {
          title: "Mastercard Gold",
          content:
            "¿Quieres una cuenta que te dé más? La Rendimax Plus del BMSC es la cuenta de ahorros que te da mayor rendimiento, con una tasa de interés del 3% anual para maximizar tus ahorros.",
          image: "mastercard-gold.png",
          id: "3"
        }
      ],
      titleData2: {
        items: [
          {
            title: "Mastercard Black",
            description:
              "¿Te gustaría ganar Bs. 50.000? La Súper Makro Cuenta te permite participar de sorteos diarios y semanales. ¡Tú puedes ser el próximo ganador!",
            buttonName: "Más información",
            buttonType: "bm-light",
            buttonClarification: "Te enviamos tu tarjeta GRATIS!",
            mainImageUrl: require("@/assets/images/mastercard-black.png")
          }
        ]
      },
      descriptionData: {
        title: "¿Cómo funciona el sorteo?",
        items: [
          "La Súper Makro Cuenta regala todos los viernes Bs. 50.000 y todos los días, de lunes a jueves, Bs. 10.000.",
          "Por cada $us 100 o su equivalente en bolivianos en tu Súper Makro Cuenta, tienes una posibilidad para ganar.",
          "Mientras más dinero tengas en tu cuenta el día anterior al sorteo, más posibilidades tendrás de ser un ganador."
        ]
      },
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
            title: "Plan cuotas",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Información de seguros"
          },
          {
            title: "Seguro médico en viajes",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Sección de tecnología"
          },
          {
            title: "Master Seguro de Autos",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Información de seguros"
          },
          {
            title: "Concierge",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Información de seguros"
          },
          {
            title: "Lounge Key",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Información de seguros"
          },
          {
            title: "Priceless Cities",
            subTitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            description: "Sección de tecnologías"
          }
        ]
      },
      informationConfig: {
        items: [
          {
            title: "¿La Mastercard Black es para ti?",
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
              "¿Estás listo para tu <span class='green-md-text'>Mastercard Black</span>?",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            buttonName: "Comparar tarjetas pe"
          }
        ]
      },
      programs: [
        {
          title: "Forma parte de nuestro Club de puntos",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          link: "Conoce el club",
          image: "card-hand.png",
          programImage2: "vertical-card.png",
          background: "green"
        }
      ],
      benefits2Config: {
        benefitsV2Title: "Heading two beneficio",
        benefitsV2Content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        benefitsV2Link: "Ver más"
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
      listItems: [
        {
          title: "Límite mínimo Bs. 40.000"
        },
        {
          title: "Mantenimiento anual",
          content: "según tarifario vigente"
        },
        {
          title: "Seguro de protección",
          content: "de todos los plásticos de tu Tarjeta de Crédito (titular y adicionales) por Bs. 12 al mes"
        }
      ],
      linksList: [
        "Descargar PDF de requisitos",
        "Tarifario",
        "Términos y condiciones"
      ],
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
    this.creditCardKey = this.$route.query.key;
    //console.log('Loading creditCard: ',this.creditCardKey);
  },
  async mounted() {
    try {
      await this.loadCreditCardDetailsData();
    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information.');
    }
  },
  methods: {
    accountComparison() {
      this.$router.push({
        path: "AccountComparisonBanx"
      });
    },
    async loadCreditCardDetailsData() {
      await this.$store.dispatch(`creditCardDetailsBanx/${UPDATE_STATE_ACTION}`,[this.creditCardKey,TITLE, this]);
      await this.$store.dispatch(`creditCardDetailsBanx/${UPDATE_STATE_ACTION}`,[this.creditCardKey,BENEFITS, this]);
      await this.$store.dispatch(`creditCardDetailsBanx/${UPDATE_STATE_ACTION}`,[this.creditCardKey,PROGRAMS, this]);
      await this.$store.dispatch(`creditCardDetailsBanx/${UPDATE_STATE_ACTION}`,[this.creditCardKey,BENEFITS_2, this]);
      await this.$store.dispatch(`creditCardDetailsBanx/${UPDATE_STATE_ACTION}`,[this.creditCardKey,INFORMATION_PANEL, this]);
      await this.$store.dispatch(`creditCardDetailsBanx/${UPDATE_STATE_ACTION}`,[this.creditCardKey,COMPARE, this]);
    },
    goToCyco() {
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
        items: this.$store.getters["creditCardDetailsBanx/getList"](TITLE)
      }

      if (res.items.length > 0) {
        res.items[0].onCardClick = () => this.$router.push("/")
      }
      //console.log(TITLE, res);
      return res;
    },
    benefitsData: function () {
      let sectionList = this.$store.getters["creditCardDetailsBanx/getList"](BENEFITS);
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
        items: this.$store.getters["creditCardDetailsBanx/getList"](PROGRAMS)
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["creditCardDetailsBanx/getList"](BENEFITS_2);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let benefits2Config = JSON.parse(JSON.stringify(this.benefits2Config));
      benefits2Config['title'] = sectionList[0]['title'];
      benefits2Config['subTitle'] = sectionList[0]['subTitle'];
      benefits2Config['description'] = sectionList[0]['description'];
      benefits2Config['mainImageUrl'] = sectionList[0]['mainImageUrl'];

      let res = {
        items: [benefits2Config]
      };
      //console.log(BENEFITS_2, res);
      return res;
    },
    informationPanelData: function () {
      let res = {
        items: this.$store.getters["creditCardDetailsBanx/getList"](INFORMATION_PANEL)
      }
      // needed fallback
      //if (res.items.length === 0) res = this.informationConfig;

      return processInformationPanelData(res);
    },
    compareData: function () {
      let res = {
        items: this.$store.getters["creditCardDetailsBanx/getList"](COMPARE)
      }

      //console.log(COMPARE, res);
      return res;
    },
    relatedPanelMap: function () {
      switch (this.creditCardKey) {
        case 'VISA-internacional-detalle':
          return [
            {
              title: "Visa Oro",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-detalle"
            },
            {
              title: "Visa Signature",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-detalle"
            },
            {
              title: "Visa Infinite",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Infinite-detalle"
            },
            {
              title: "Mastercard Internacional",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Internacional-detalle"
            }
          ];
        case 'VISA-Oro-detalle':
          return [
            {
              title: "Visa Oro LifeMiles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-LifeMiles-detalle"
            },
            {
              title: "Visa Signature",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-detalle"
            },
            {
              title: "Visa Signature LifemIles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-LifeMiles-detalle"
            },
            {
              title: "Visa Infinite Lifemiles",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Visa-Infinite-Lifemiles-detalle"
            }
          ];
        case 'VISA-Oro-LifeMiles-detalle':
          return [
            {
              title: "Visa Signature LifemIles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-LifeMiles-detalle"
            },
            {
              title: "Visa Infinite Lifemiles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Visa-Infinite-Lifemiles-detalle"
            },
            {
              title: "Visa Oro",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-detalle"
            },
            {
              title: "Visa Infinite",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=VISA-Infinite-detalle"
            }
          ];
        case 'VISA-Signature-LifeMiles-detalle':
          return [
            {
              title: "Visa Signature",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-detalle"
            },
            {
              title: "Visa Oro LifeMiles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-LifeMiles-detalle"
            },
            {
              title: "Visa Infinite Lifemiles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Visa-Infinite-Lifemiles-detalle"
            },
            {
              title: "Visa Infinite",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=VISA-Infinite-detalle"
            }
          ];
        case 'Visa-Infinite-Lifemiles-detalle':
          return [
            {
              title: "Visa Infinite",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Infinite-detalle"
            },
            {
              title: "Visa Signature LifemIles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-LifeMiles-detalle"
            },
            {
              title: "Visa Oro LifeMiles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-LifeMiles-detalle"
            },
            {
              title: "Visa Oro",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=VISA-Oro-detalle"
            }
          ];
        case 'VISA-Signature-detalle':
          return [
            {
              title: "Visa Infinite",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Infinite-detalle"
            },
            {
              title: "Visa Signature LifemIles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-LifeMiles-detalle"
            },
            {
              title: "Visa Oro",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-detalle"
            },
            {
              title: "Visa Internacional",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=VISA-internacional-detalle"
            }
          ];
        case 'VISA-Infinite-detalle':
          return [
            {
              title: "Visa Infinite Lifemiles",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Visa-Infinite-Lifemiles-detalle"
            },
            {
              title: "Visa Signature",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Signature-detalle"
            },
            {
              title: "Visa Oro",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=VISA-Oro-detalle"
            },
            {
              title: "Visa Internacional",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=VISA-internacional-detalle"
            }
          ];
        case 'Mastercard-Internacional-detalle':
          return [
            {
              title: "Mastercard Gold",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Gold-detalle"
            },
            {
              title: "Mastercard Platinum",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-detalle"
            },
            {
              title: "Mastercard Black",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-detalle"
            },
            {
              title: "Visa Internacional",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=VISA-internacional-detalle"
            }
          ];
        case 'Mastercard-Gold-detalle':
          return [
            {
              title: "Mastercard interacional",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Internacional-detalle"
            },
            {
              title: "Mastercard Platinum",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-detalle"
            },
            {
              title: "Mastercard Black",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-detalle"
            },
            {
              title: "Mastercard Gold Latam",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Gold-LATAM-detalle"
            }
          ];
        case 'Mastercard-Platinum-detalle':
          return [
            {
              title: "Mastercard Black",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-detalle"
            },
            {
              title: "Mastercard Gold",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Gold-detalle"
            },
            {
              title: "Mastercard interacional",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Internacional-detalle"
            },
            {
              title: "Mastercard Platinum Latam",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-LATAM-detalle"
            }
          ];
        case 'Mastercard-Black-detalle':
          return [
            {
              title: "Mastecard Black Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-LATAM-detalle"
            },
            {
              title: "Mastercard Platinum",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-detalle"
            },
            {
              title: "Mastercard Gold",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Gold-detalle"
            },
            {
              title: "Mastercard interacional",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Internacional-detalle"
            }
          ];
        case 'Mastercard-Black-LATAM-detalle':
          return [
            {
              title: "Mastercard Black",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-detalle"
            },
            {
              title: "Mastercard Gold Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Gold-LATAM-detalle"
            },
            {
              title: "Mastercard Platinum Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-LATAM-detalle"
            },
            {
              title: "Mastercard Gold",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Gold-detalle"
            }
          ];
        case 'Mastercard-Gold-LATAM-detalle':
          return [
            {
              title: "Mastecard Black Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-LATAM-detalle"
            },
            {
              title: "Mastercard Gold",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Gold-detalle"
            },
            {
              title: "Mastercard Platinum Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-LATAM-detalle"
            },
            {
              title: "Mastercard Black",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Black-detalle"
            }
          ];
        case 'Mastercard-Platinum-LATAM-detalle':
          return [
            {
              title: "Mastercard Platinum",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Platinum-detalle"
            },
            {
              title: "Mastecard Black Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Black-LATAM-detalle"
            },
            {
              title: "Mastercard Gold Latam",
              subTitle: "Ver opciones",
              route: "/client/creditCardDetails?key=Mastercard-Gold-LATAM-detalle"
            },
            {
              title: "Mastercard Black",
              subTitle: "Ver préstamos",
              route: "/client/creditCardDetails?key=Mastercard-Black-detalle"
            }
          ];
        default:
          return [];
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
