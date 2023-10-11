<template>
  <div>
    <v-container fluid class="bm-loan-comparison px-0">
      <ProductComparison
        v-bind:categories="categoriesData"
        v-bind:sectionsData="sectionsData"
        v-bind:itemsData="itemsData"
        v-bind:buttonLabel="buttonLabel"
        v-bind:buttonColor="buttonColor"
        v-bind:title="title"
        v-bind:buttonUrl="buttonUrl"
      />
    </v-container>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>
<script>
import ProductComparison from "@/components/compare/ProductComparison.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {CATEGORIES, CREDIT_CARD_COMPARATOR_KEY, ITEMS, SECTIONS} from "~/cardListKeys/comparators";
import {CYCO_URL} from "~/constants_routes";
import {getHeader} from "~/utils/seo";

export default {
  name: "LoanComparison",
  components: {
    ProductComparison,
    MoreInfo
  },
  data: () => {
    return {
      title: "Comparador de tarjetas de crédito",
      buttonColor: "bm-light",
      buttonLabel: "Pedir una tarjeta",
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      buttonUrl: CYCO_URL
    };
  },
  async mounted() {

  },
  computed: {
    categoriesData: function () {
      let res = this.$store.getters["comparators/getList"](CATEGORIES);
      //console.log(CATEGORIES, res);
      return res;
    },
    categoriesItemsData: function () {
      let res = {
        items: this.$store.getters["comparators/getList"](CATEGORIES)
      }
      //console.log(CATEGORIES, res);
      return res;
    },
    sectionsData: function () {
      let res = this.$store.getters["comparators/getList"](SECTIONS);
      //console.log(SECTIONS, res);
      return res;
    },
    itemsData: function () {
      let res = this.$store.getters["comparators/getList"](ITEMS);
      //console.log(ITEMS, res);
      return res;
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`comparators/${UPDATE_STATE_ACTION}`,CREDIT_CARD_COMPARATOR_KEY);
    return header;
  },
  head () {return this.headData}
};
</script>
