<template>
  <div>
    <v-container class="bm-loans text-center">
      <OptionsPanel :data="titleData">
        <template v-slot:message>
          <div v-html="titleData.description" class="regular-text green-text"></div>
        </template>
        <template v-slot:bottom>
          <v-row justify="center" align="center" style="min-height: 200px">
            <v-col>
              <v-btn-toggle
                mandatory
                class="d-block d-md-inline-flex mb-8 mb-md-0"
              >
                <v-btn depressed class="big-text" @click="onSelectFirstOption({ tags: 'enviar' })">
                  Quiero enviar dinero
                </v-btn>
                <v-btn depressed @click="onSelectFirstOption({ tags: 'recibir' })">
                  Quiero recibir dinero
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </template>
      </OptionsPanel>
      <ResponsiveFilterButtons :buttonsConfig="filterButtonsConfig" class="pt-10"/>
    </v-container>
    <ExpandablePanel :config="selectedCards" />
    <div class="py-sm-4 py-md-16">
      <RelatedPanel :items="relatedItems.items" />
    </div>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import OptionsPanel from "@/components/OptionsPanel.vue";
import FilterButtons from "@/components/FilterButtons.vue";
import ExpandablePanel from "@/components/ExpandablePanel.vue";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {LOANS_BENEFITS, LOANS_BENEFITS_2, LOANS_CARDS, LOANS_PROGRAMS, LOANS_TITLE} from "~/cardListKeys/client";
import {TRANSFER_CARDS, TRANSFER_LINKS, TRANSFER_SUBMENU, TRANSFER_TITLE} from "~/cardListKeys/transfer";
import {generateEmptyModels, generateReportFileUrlFromId} from "~/utils/cardsUtil";
import _ from 'lodash';
import {getHeader} from "~/utils/seo";

export default {
  components: {
    MoreInfo,
    RelatedPanel,
    OptionsPanel,
    FilterButtons,
    ExpandablePanel
  },
  methods: {
    onSelectFirstOption(button) {
      this.option1 = button.tags;
      //console.log('clicked first option', button.tags);
    },
    onSelectSecondOption(button) {
      this.option2 = button.tags;
      //console.log('clicked second option', button.tags);

    },
    cardHasTags(card) {
      const o2 = this.option2.split(',');
      const pc = [];
      for (let tag of o2) {
        pc.push(`${this.option1},${tag}`);
        pc.push(`${tag},${this.option1}`);
      }
      for (let comb of pc) {
        if (comb === card.tags) {
          return true;
        }
      }
      return false;
    },
    getRawNumericValueFromHTML(field) {
      if(typeof field === "number") return parseInt(field);
      if(field) return field.substring(3,field.length-4);
      return "";
    },
  },
  data() {
    return {
      option1: 'enviar',
      option2: 'nacional,internacional',
      pageTitle: {
        mainImageUrl: require("@/assets/images/transfer.svg"),
        title: "¿Necesitas enviar y recibir dinero dentro o fuera del país?",
        subTitle: "No te preocupes, tenemos diferentes opciones para que puedas seguir conectado con las personas que más te importan, de forma ágil y segura.",
        description: "Para usar estos servicios tienes que dirigirte a una de nuestras <span class='strong-regular-text'> agencias </span>."
      },
      toggleButton: undefined,
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      relatedItems: {
        items: [
          {
            title: "Comex",
            subTitle: "Ver opciones",
            route: "/pyme/Comex"
          },
          {
            title: "Boletas de Garantia",
            subTitle: "Ver opciones",
            route: "/companies/Guarantee"
          }
        ]
      },
      filterButtonsConfig: [
        {
          text: "Todos",
          onClick: this.onSelectSecondOption,
          tags: "nacional,internacional"
        },
        {
          text: "Nacionales",
          onClick: this.onSelectSecondOption,
          tags: "nacional"
        },
        {
          text: "Internacionales",
          onClick: this.onSelectSecondOption,
          tags: "internacional"
        }
      ],
      options2: {
        items: [
          {
            mainImageUrl: require("@/assets/images/card-hand.png"),
            title: "Remesas",
            subTitle: "Aunque no seas cliente del BMSC, puedes enviar dinero a tus familiares o amigos en <span class='strong-regular-text'>cualquier parte del mundo</span>, con total seguridad y el asesoramiento personalizado.",
            gradientText: "Requisitos",
            description: "Fotocopia de Carnet de Identidad (la primera vez) o Tarjeta de Socio.",
            tags: "enviar,internacional",
            id: 101
          },
          {
            mainImageUrl: require("@/assets/images/program2.png"),
            title: "Giros nacionales",
            subTitle: "Envía dinero de forma rápida y segura, a nivel nacional, sin necesidad de ser cliente del BMSC. Tus giros llegan en cuestión de minutos a través de nuestra amplia <span class='strong-regular-text green-md-text'>red de agencias</span>. Contarás con todo nuestro asesoramiento y atención personalizada.",
            gradientText: "Requisitos para enviar",
            description: "Fotocopia de Carnet de Identidad.$Fotocopia de la papeleta de luz o agua.$El destinatario tendrá que presentar una copia de su Carnet de Identidad.",
            tags: "enviar,nacional",
            id: 102
          },
          {
            mainImageUrl: require("@/assets/images/img-card3.png"),
            title: "Transferencias internacionales",
            subTitle: "La manera más fácil de realizar tus transferencias de dinero. A través de tu cuenta del BMSC puedes enviar dinero a cualquiern parte del mundo de manera ágil y eficiente, y sin costos adicionales, a través de nuestra amplia <span class='strong-regular-text green-md-text'>red de agencias</span> a nivel nacional.",
            gradientText: "Requisitos para enviar",
            description: "Tener una cuenta del BMSC.$Contar con fondos suficientes en tu cuenta para realizar el envío.$Completar el formulario de <span class='strong-regular-text green-md-text'>Solicitud de transferencias al Exterior</span> y dirigirte a cualquiera de nuestras oficinas a nivel nacional.",
            tags: "recibir,nacional",
            id: 103
          }
        ]
      },
      subMenuData2: {
        items: [
          {
            gradientText: "Ver lista de remesadoras",
            title: "Money Gram",
            description: "Te ofrece el servicio de envío y recibo de dinero de cualquier parte del mundo de forma rápida, fiable y asequible, disponibles en 200 países en todo el mundo.",
            subTitle: 101
          },
          {
            gradientText: "Ver lista de Bancos corresponsales",
            title: "Ver lista de Bancos corresponsales",
            description: "Ver lista de Bancos corresponsales",
            subTitle: 103
          },
          {
            gradientText: "Puntos de atención en el exterior",
            title: "Puntos de atención en el exterior",
            description: "Puntos de atención en el exterior",
            subTitle: 103
          },
          {
            gradientText: "Ver lista de Bancos corresponsales",
            title: "Ver lista de Bancos corresponsales",
            description: "Ver lista de Bancos corresponsales",
            subTitle: 103
          },
          {
            gradientText: "Puntos de atención en el exterior",
            title: "Puntos de atención en el exterior",
            description: "Puntos de atención en el exterior",
            subTitle: 103
          },
          {
            gradientText: "Ver lista de Bancos corresponsales",
            title: "Ver lista de Bancos corresponsales",
            description: "Ver lista de Bancos corresponsales",
            subTitle: 103
          },
          {
            gradientText: "Puntos de atención en el exterior",
            title: "Puntos de atención en el exterior",
            description: "Puntos de atención en el exterior",
            subTitle: 103
          },
          {
            gradientText: "Ver lista de Bancos corresponsales",
            title: "Ver lista de Bancos corresponsales",
            description: "Ver lista de Bancos corresponsales",
            subTitle: 103
          },
          {
            gradientText: "Puntos de atención en el exterior",
            title: "Puntos de atención en el exterior",
            description: "Puntos de atención en el exterior",
            subTitle: 103
          },
        ]
      },
      linksData2: {
        items: [
          {
            gradientText: "Descargar tarifario",
            fileUrl: "https://www.bmsc.com.bo/institucional/Documents/Memoria%20Anual/MEMORIA%202019.pdf",
            subTitle: 103
          }
        ]
      }
    };
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let sectionList = this.$store.getters["transfer/getList"](TRANSFER_TITLE);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //if (res.items.length === 0) res = this.pageTitle; // comment this if needed
      //console.log(TRANSFER_TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["transfer/getList"](TRANSFER_CARDS)
      }
      if (res.items.length === 0) res = this.options2; // comment this if needed
      res.items.forEach(item => {
        if (_.isString(item.description)) item.description = item.description.split("$");

        const submenu = this.subMenuData.items.filter(subMenuItem => {
          if (this.getRawNumericValueFromHTML(subMenuItem.subTitle)) return true;
          return false;
        });
        const links = this.linksData.items.filter(linkDataItem => {
          if (this.getRawNumericValueFromHTML(linkDataItem.subTitle) == item.id) {
            return true;
          }
          return false;
        });

        item.expandableConfig = {
          isExpanded: false,
          items: submenu.concat(links)
        }

      });
      //console.log(TRANSFER_CARDS, res.items);
      return res;
    },
    subMenuData: function () {
      let res = {
        items: this.$store.getters["transfer/getList"](TRANSFER_SUBMENU)
      }
      //if (res.items.length === 0) res = this.subMenuData2; // comment this if needed
      res.items.forEach(item => {
        item.isExpanded = false;
      });
      //console.log(TRANSFER_SUBMENU, res.items);
      return res;
    },
    linksData: function () {
      let res = {
        items: this.$store.getters["transfer/getList"](TRANSFER_LINKS).map(card => {
          return {
            ...card,
            fileUrl: generateReportFileUrlFromId(card['description'])
          }
        })
      }
      //if (res.items.length === 0) res = this.linksData2 // comment this if needed
      res.items.forEach(item => {
        item.isDownload = true;
      });
      //console.log(TRANSFER_LINKS, res.items);
      return res;
    },
    selectedCards() {
      return this.cardsData.items.filter(card => {
        return this.cardHasTags(card);
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`transfer/${UPDATE_STATE_ACTION}`,TRANSFER_TITLE);
    await context.store.dispatch(`transfer/${UPDATE_STATE_ACTION}`,TRANSFER_CARDS);
    await context.store.dispatch(`transfer/${UPDATE_STATE_ACTION}`,TRANSFER_SUBMENU);
    await context.store.dispatch(`transfer/${UPDATE_STATE_ACTION}`,TRANSFER_LINKS);
    return header;
  },
  head () {return this.headData}
};
</script>
<style scoped></style>
