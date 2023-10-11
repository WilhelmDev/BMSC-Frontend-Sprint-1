<template>
  <v-container fluid class="bm-help">
    <MoreInfo
      :moreInfoTitle="moreInfoConfig.moreInfoTitle"
      :cardIcon1="moreInfoConfig.cardIcon1"
      :cardLabel1="moreInfoConfig.cardLabel1"
      :cardIcon2="moreInfoConfig.cardIcon2"
      :cardLabel2="moreInfoConfig.cardLabel2"
      :cardIcon3="moreInfoConfig.cardIcon3"
      :cardLabel3="moreInfoConfig.cardLabel3"
      :onClickFn="goTo"
    />
    <v-container>
      <v-divider class="divider"></v-divider>
    </v-container>
    <v-container v-if="showClaimForm" class="mb-16">
      <h2 class="black-text pb-2" style="line-height: 0px"> <span v-html="formData.title"/> </h2>
      <div class="big-text pb-12">
        <span v-html="formData['subTitle']"/>
      </div>
      <ClaimInfoForm v-bind:formData="formData"/>
    </v-container>
    <PhoneList v-bind:phones="phones" v-bind:title="phoneListTitle" />
  </v-container>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import PhoneList from "@/components/help/PhoneList.vue";
import ClaimInfoForm from "@/components/help/ClaimInfoForm.vue";
import {UPDATE_STATE_ACTION, UPDATE_STATE_ACTION_2} from "~/constants_actions";
import {MORE_INFO_FORM} from "~/cardListKeys/additionalInfo";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {CLAIM_FORM} from "~/cardListKeys/help";
import {siteRouteMapping} from "@/utils/siteUtils";
import {getHeader} from "~/utils/seo";


export default {
  components: {
    MoreInfo,
    PhoneList,
    ClaimInfoForm
  },
  data: function() {
    return {
      showClaimForm: false,
      moreInfoConfig: {
        moreInfoTitle: "¿Cómo podemos ayudarte?",
        cardIcon1: "icon-bank",
        cardLabel1: "Agencias y cajeros",
        cardIcon2: "icon-help",
        cardLabel2: "Preguntas frecuentes",
        cardIcon3: "icon-reclamo",
        cardLabel3: "Punto de reclamo",
      },
      phoneListTitle: "Nuestro Call Center: 800-17-0777",
      phones: [
        {
         
        }
      ]
    };
  },
  created() {
    this.showClaimForm = Boolean(this.$route.query.showForm);
  },
  async mounted() {

  },
  computed: {
    formData: function () {
      let sectionList = this.$store.getters["help/getList"](CLAIM_FORM);
      if (sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = sectionList[0];
      //console.log(CLAIM_FORM, res);
      return res;
    }
  },
  methods: {
    goTo(label) {
      const route = siteRouteMapping[label];
      //console.log("outside moreInfo", route);
      if (label && label.indexOf('reclamo') !== -1) {
        this.showClaimForm = !this.showClaimForm;
      } else if (route) {
        this.$router.push({
          path: route
        });
      }
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`help/${UPDATE_STATE_ACTION_2}`,CLAIM_FORM);
    return header;
  },
  head () {return this.headData}
};
</script>
