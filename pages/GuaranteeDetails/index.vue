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
import Button from "@/components/Button.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import _ from "lodash";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {BENEFITS, INFORMATION_PANEL, TITLE} from "~/cardListKeys/guaranteeDetails";
import { processInformationPanelData } from '@/utils/cardsUtil';
import {getHeader} from "~/utils/seo";

export default {
  components: {
    DetailsCard,
    BenefitsPanel,
    InformationPanel,
    OpenAccountInfo,
    Button,
    RelatedPanel,
    MoreInfo
  },
  data() {
    return {
      guaranteeKey: "", //DO NOT ERASE THIS KEY
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
    this.guaranteeKey = this.$route.query.key;
  },
  async mounted() {
    try {
      await this.loadGuaranteeDetailsData();
    } catch (error) {
      //console.log('an error occurred when trying to get the cards information');
    }
  },
  methods: {
    async loadGuaranteeDetailsData() {
      await this.$store.dispatch(`guaranteeDetails/${UPDATE_STATE_ACTION}`,[this.guaranteeKey,TITLE, this]);
      await this.$store.dispatch(`guaranteeDetails/${UPDATE_STATE_ACTION}`,[this.guaranteeKey,BENEFITS, this]);
      await this.$store.dispatch(`guaranteeDetails/${UPDATE_STATE_ACTION}`,[this.guaranteeKey,INFORMATION_PANEL, this]);
    },
    scrollToTop: function () {
      window.scrollTo(0,0);
    }
  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["guaranteeDetails/getList"](TITLE)
      }
      return res;
    },
    benefitsData: function () {
      let res = {
        items: this.$store.getters["guaranteeDetails/getList"](BENEFITS).map(card => {
          return {
            ...card,
            icon: "icon-shield"
          }
        })
      }
      res.title = "Beneficios de tus boletas de garantia";
      res.message = "Sin importar la que elijas"
      //console.log(BENEFITS, res);
      return res;
    },
    informationPanelData: function () {
      let res = {
        items: this.$store.getters["guaranteeDetails/getList"](INFORMATION_PANEL)
      }
      return processInformationPanelData(res);
    },
    relatedPanelMap: function () {
      switch (this.guaranteeKey) {
        case 'Boletas-garantia-dia-detalle':
          return [
            {
              title: "Boletas de garantía",
              subTitle: "Ver opciones",
              route: "/GuaranteeDetails?key=Boletas-garantia-detalle"
            },
            {
              title: "Comex",
              subTitle: "Ver opciones",
              route: "/pyme/Comex"
            },
            {
              title: "Servicios para PYME",
              subTitle: "Ver opciones",
              route: "/pyme/Services"
            }
          ];
        case 'Boletas-garantia-detalle':
          return [
            {
              title: "Boletas de Garantía en el Día",
              subTitle: "Ver opciones",
              route: "/GuaranteeDetails?key=Boletas-garantia-dia-detalle"
            },
            {
              title: "Comex",
              subTitle: "Ver opciones",
              route: "/pyme/Comex"
            },
            {
              title: "Servicios para PYME",
              subTitle: "Ver opciones",
              route: "/pyme/Services"
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
      this.guaranteeKey = key;
      this.loadGuaranteeDetailsData();
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
