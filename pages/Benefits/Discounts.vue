<template>
  <div>
    <DiscountsCard :discountsCard="discountsCard.items[0]"/>
    <BenefitsCatalog
      :catalogsData="catalogsData"
      :categories="discountCategories"
      :cities="discountCities"
      @updatedFilterSelection="updateFilterSelection"
    />
    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems.items" />
    </div>
  </div>
</template>
<script>
import DiscountsCard from "@/components/DiscountsCard.vue";
import BenefitsCatalog from "@/components/BenefitsCatalog.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import {
  REQUEST_GET_BENEFIT_DISCOUNT_CATEGORIES,
  REQUEST_GET_BENEFIT_DISCOUNT_CITIES,
  REQUEST_GET_BENEFIT_DISCOUNT_COMMERCES,
  UPDATE_STATE_ACTION
} from "@/constants_actions";
import { INTRO } from "@/cardListKeys/benefitDiscount";
import {getHeader} from "~/utils/seo";
export default {
  components: {
    DiscountsCard,
    BenefitsCatalog,
    RelatedPanel
  },
  data() {
    return {
      discountCities: [],
      discountCategories: [],
      catalogsData: {},
      // discountsCard: {
      //   items: [
      //     {
      //       title: "Programa de descuentos",
      //       description:
      //         "¡Compra y paga menos! Al usar tus tarjetas de débito y crédito del BMSC consigues descuentos extraordinarios en más de 40 comercios a nivel nacional.",
      //       link: "Ver reglamento de descuentos",
      //       mainImageUrl: require("@/assets/images/img-card1.png")
      //     }
      //   ]
      // },
      relatedItems: {
        items: [
          {
            title: "Club de Puntos",
            subTitle: "Ver opciones",
            route: "/benefits/club"
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
    await this.$store.dispatch(`benefitDiscount/${REQUEST_GET_BENEFIT_DISCOUNT_CITIES}`,[this]);
    await this.$store.dispatch(`benefitDiscount/${REQUEST_GET_BENEFIT_DISCOUNT_CATEGORIES}`,[this]);
    await this.$store.dispatch(`benefitDiscount/${UPDATE_STATE_ACTION}`, [INTRO, this]);
  },
  computed: {
    discountsCard() {
      let res = {
        items: this.$store.getters["benefitDiscount/getList"](INTRO)
      }
      return res;
    },
    discountCitiesListRemote() {
      return this.$store.getters["benefitDiscount/getBenefitDiscountCities"];
    },
    discountCategoriesListRemote() {
      return this.$store.getters["benefitDiscount/getBenefitDiscountCategories"];
    },
    discountCommercesCatalogListRemote() {
      return this.$store.getters["benefitDiscount/getBenefitDiscountCommerces"];
    }
  },
  watch: {
    discountCitiesListRemote(value) {
      this.discountCities = value;
    },
    discountCategoriesListRemote(value) {
      this.discountCategories = value;
    },
    discountCommercesCatalogListRemote(value) {
      this.catalogsData = {
        items: value
      }
    },
  },
  methods: {
    updateFilterSelection(data) {
      this.$store.dispatch(`benefitDiscount/${REQUEST_GET_BENEFIT_DISCOUNT_COMMERCES}`, [{
        search: data.search,
        ciudadesIds: data.city,
        categoriasIds: data.category.join(',')
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
