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
import {CATEGORIES, ITEMS, LOAN_COMPARATOR_KEY, SECTIONS} from "~/cardListKeys/comparators";
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
      title: "Comparador de préstamos",
      buttonColor: "bm-light",
      buttonLabel: "Solicitar crédito",
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
    featureListsByGroup: function() {
      const sets = {};
      for (let i = 0; i < this.featuresByProduct.length; i++) {
        let product = this.featuresByProduct[i];
        for (let j = 0; j < product.featureGroups.length; j++) {
          let featureGroup = product.featureGroups[j];
          for (let k = 0; k < featureGroup.features.length; k++) {
            let set = sets[featureGroup.groupName];
            let feature = featureGroup.features[k];
            if (!set) {
              sets[featureGroup.groupName] = new Set();
            }
            sets[featureGroup.groupName].add(feature.name);
          }
        }
      }
      //console.log("Feature lists by group", sets);
      return sets;
    },
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
    await context.store.dispatch(`comparators/${UPDATE_STATE_ACTION}`,LOAN_COMPARATOR_KEY);
    return header;
  },
  head () {return this.headData}
};
</script>
