<template>
  <div>
    <PointsCard :pointsCard="pointsCard.items[0]"/>
    <DetailsCard :detailsData="offersData.items[0]" class="my-4" v-if="offersSwitch"/>
    <Catalog
      :catalogsData="catalogsData"
      :categories="clubCategories"
      :cities="clubCities"
      @updatedFilterSelection="updateFilterSelection"
    />
    <StoreCard :storeCard="commercesList.items[0]" class="mt-12"/>
    <PointsInfo :pointsDetails="infoCard" class="mt-8"/>
    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems.items" />
    </div>
  </div>
</template>
<script>
import PointsCard from "@/components/PointsCard.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import Catalog from "@/components/Catalog.vue";
import StoreCard from "@/components/StoreCard.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import PointsInfo from "@/components/PointsInfo";
import {
  POINTS,
  DETAILS,
  COMMERCES,
  INFO
} from "~/cardListKeys/benefitClub";
import {
  REQUEST_GET_BENEFIT_CLUB_CATEGORIES,
  REQUEST_GET_BENEFIT_CLUB_CITIES,
  REQUEST_GET_BENEFIT_CLUB_COMMERCES,
  UPDATE_STATE_ACTION
} from "@/constants_actions";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    PointsCard,
    DetailsCard,
    Catalog,
    StoreCard,
    RelatedPanel,
    PointsInfo
  },
  data() {
    return {
      clubCities: [],
      clubCategories: [],
      catalogsData: {},
      // pointsCard: {
      //   items: [
      //     {
      //       title: "Club de puntos",
      //       description:
      //         "Keep track of every transaction that comes in and out of your bank account, thanks to real-time push notifications.",
      //       link: "¿Cómo canjeo y sumo puntos?",
      //       mainImageUrl: require("@/assets/images/img-card1.png")
      //     }
      //   ]
      // },
      // offersData: {
      //   items: [
      //     {
      //       title: "Ofertas día del padre",
      //       description:
      //         "Keep track of every transaction that comes in and out of your bank account, thanks to real-time push notifications.",
      //       mainImageUrl: require("@/assets/images/img-card1.png")
      //     }
      //   ]
      // },
      // catalogsData: {
      //   items: [
      //     {
      //       mainImageUrl: require("@/assets/images/lacoste.png"),
      //       secondaryImageUrl: require("@/assets/images/star.png"),
      //       brandName: "Lacoste",
      //       voucher: "200",
      //       totalPoints: "5000",
      //       storeImageUrl: require("@/assets/images/lasbris.png"),
      //       isRelevant: true
      //     },
      //     {
      //       mainImageUrl: require("@/assets/images/lacoste.png"),
      //       secondaryImageUrl: require("@/assets/images/star.png"),
      //       brandName: "Lacoste",
      //       voucher: "200",
      //       totalPoints: "5000",
      //       storeImageUrl: require("@/assets/images/lasbris.png"),
      //       isRelevant: true
      //     },
      //     {
      //       mainImageUrl: require("@/assets/images/lacoste.png"),
      //       secondaryImageUrl: require("@/assets/images/star.png"),
      //       brandName: "Lacoste",
      //       voucher: "200",
      //       totalPoints: "5000",
      //       storeImageUrl: require("@/assets/images/lasbris.png")
      //     },
      //     {
      //       mainImageUrl: require("@/assets/images/lacoste.png"),
      //       secondaryImageUrl: require("@/assets/images/star.png"),
      //       brandName: "Lacoste",
      //       voucher: "200",
      //       totalPoints: "5000",
      //       storeImageUrl: require("@/assets/images/lasbris.png")
      //     },
      //     {
      //       mainImageUrl: require("@/assets/images/lacoste.png"),
      //       secondaryImageUrl: require("@/assets/images/star.png"),
      //       brandName: "Lacoste",
      //       voucher: "200",
      //       totalPoints: "5000",
      //       storeImageUrl: require("@/assets/images/lasbris.png"),
      //       isRelevant: true
      //     }
      //   ]
      // },
      // storeCard: {
      //   items: [
      //     {
      //       title: "Estamos en el centro comercial Las Brisas",
      //       description:
      //         "Keep track of every transaction that comes in and out of your bank account, thanks to real-time push notifications.",
      //       brandIcons: [
      //         require("@/assets/images/springfield.png")
      //       ],
      //       mainImageUrl: require("@/assets/images/img-card1.png")
      //     }
      //   ]
      // },
      // pointsDetails: {
      //   items: [
      //     {
      //       title: "¿Cómo acumulo puntos?",
      //       description: "Acumulas puntos realizando acciones como:",
      //       list: [
      //         {
      //           mainText: "Comprar con tus tarjetas de débito y crédito"
      //         },
      //         {
      //           mainText: "Realizar transacciones por nuestra Banca Móvil y Banca por Internet",
      //           secondaryText: "(transferencias entre cuentas propias y a terceros, pagos de tarjetas de crédito, pago de préstamos y servicios, entre otros)"
      //         },
      //         {
      //           mainText: "Usar nuestros Cajeros Automáticos"
      //         },
      //         {
      //           mainText: "Abrir una nueva Cuenta de Ahorros o aumentar tu saldo en tu cuenta actual"
      //         },
      //         {
      //           mainText: "Recibir desembolsos de tus préstamos o pagar puntualmente tu cuota"
      //         },
      //         {
      //           mainText: "Abrir o renovar DPFs mayores a 180 días"
      //         }
      //       ],
      //       secondaryTitle: "¿Cómo canjeo mis puntos?",
      //       sacondaryDescription: "Solo tienes que comunicarte con nosotros",
      //       contactUs: "A través de nuestra Central de Consultas o visitarnos en cualquiera de nuestras agencias a nivel nacional.",
      //       contactList: [
      //         "Calculadora de puntos",
      //         "Catálogo de productos",
      //         "Reglamento"
      //       ]
      //     }
      //   ]
      // },
      relatedItems: {
        items: [
          {
            title: "Descuentos",
            subTitle: "Ver opciones",
            route: "/benefits/discounts"
          },
          {
            title: "Programas de millas",
            subTitle: "Ver opciones",
            route: "/benefits/mileageProgram"
          }
        ]
      }
    }
  },
  async mounted() {
    await this.$store.dispatch(`benefitClub/${REQUEST_GET_BENEFIT_CLUB_CITIES}`,[this]);
    await this.$store.dispatch(`benefitClub/${REQUEST_GET_BENEFIT_CLUB_CATEGORIES}`,[this]);
    await this.$store.dispatch(`benefitClub/${UPDATE_STATE_ACTION}`, [POINTS, this]);
    await this.$store.dispatch(`benefitClub/${UPDATE_STATE_ACTION}`, [DETAILS, this]);
    await this.$store.dispatch(`benefitClub/${UPDATE_STATE_ACTION}`, [COMMERCES, this]);
    await this.$store.dispatch(`benefitClub/${UPDATE_STATE_ACTION}`, [INFO, this]);
  },
  computed: {
    pointsCard: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getList"](POINTS)))
      }
      //console.log(POINTS, res);
      return res;
    },
    offersData: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getList"](DETAILS)))
      }
      //console.log(DETAILS, res);
      return res;
    },
    commercesList: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getList"](COMMERCES)))
      }
      //console.log(COMMERCES, res);
      return res;
    },
    infoCard: function () {
      let res = {
        items: JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getList"](INFO)))
      }
      //console.log(INFO, res);
      return res;
    },
    clubCitiesListRemote() {
      return JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getBenefitClubCities"]));
    },
    clubCategoriesListRemote() {
      return JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getBenefitClubCategories"]));
    },
    clubCommercesCatalogListRemote() {
      return JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getBenefitClubCommerces"]));
    },
    offersSwitch: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["benefitClub/getList"](DETAILS)));
      return sectionList.length !== 0;
    },
  },
  watch: {
    clubCitiesListRemote(value) {
      this.clubCities = value;
    },
    clubCategoriesListRemote(value) {
      this.clubCategories = value;
    },
    clubCommercesCatalogListRemote(value) {
      this.catalogsData = {
        items: value
      }
    },
  },
  methods: {
    updateFilterSelection(data) {
      this.$store.dispatch(`benefitClub/${REQUEST_GET_BENEFIT_CLUB_COMMERCES}`, [{
        search: data.search,
        ciudadesIds: data.city,
        categoriasIds: data.category.join(','),
        from: data.range.min,
        to: data.range.max
      }, this]);
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    return header;
  },
  head () {return this.headData}
}
</script>
