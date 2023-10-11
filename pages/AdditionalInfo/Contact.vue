<template>
  <v-container class="pa-0 pa-md-3">
    <h2 class="black-text pb-2"><span v-html="formData.title"/>  </h2>
    <div class="big-text pb-8">
      <span v-html="formData['subTitle']"/>
    </div>
    <InfoForm :data="itemDetailsData" v-bind:formData="formData" class="mb-10"/>
  </v-container>
</template>
<script>
import InfoForm from "@/components/InfoForm.vue";
import _ from "lodash";
import {MORE_INFO_FORM, STATE_ITEM_DETAILS} from "~/cardListKeys/additionalInfo";
import {UPDATE_ESTATE_ITEM_DETAILS, UPDATE_STATE_ACTION} from "~/constants_actions";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    InfoForm
  },
  async mounted() {
    await this.$store.dispatch(`additionalInfo/${UPDATE_ESTATE_ITEM_DETAILS}`,[this.$route.query.estateId, this])
  },
  computed: {
    formData: function () {
      let sectionList = this.$store.getters["additionalInfo/getList"](MORE_INFO_FORM);
      console.log(sectionList)
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = sectionList[0];
      //console.log(MORE_INFO_FORM, res);
      return res;
    },
    itemDetailsData: function () {
      let res = this.$store.getters["additionalInfo/getList"](STATE_ITEM_DETAILS);
      if(res.length === 0) {
        return {
          matter: "",
          codigo: ""
        }
      }
      res['matter'] = res['nombre'] + " - " + new Intl.NumberFormat('de-DE').format(res['precioBien']) + " " + this.getCurrencySymbol(res['monedaBien']);
      //console.log(STATE_ITEM_DETAILS, res);
      return res;
    }
  },
  data() {
    return {

    };
  },
  methods: {
    async loadEstateItemDetails() {
      await this.$store.dispatch(`additionalInfo/${UPDATE_ESTATE_ITEM_DETAILS}`,this.$route.query.estateId);
    },
    getCurrencySymbol(currency) {
      return {
        "DÓLARES": "$us",
        "BOLIVIANOS": "Bs."
      }[currency]
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,MORE_INFO_FORM);
    return header;
  },
  head () {return this.headData}
}
</script>
