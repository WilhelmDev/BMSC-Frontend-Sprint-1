<template>
  <div class="bm-footer">
    <CotizationBar :tipotre="tipotreData"/>
    <FooterContent class="hidden-sm-and-down" />
    <FooterMobileContent class="hidden-md-and-up" />
    <FooterBar />
  </div>
</template>
<script>
import CotizationBar from "@/components/defaultComponents/footer/CotizationBar.vue";
import FooterContent from "@/components/defaultComponents/footer/FooterContent.vue";
import FooterMobileContent from "@/components/defaultComponents/footer/FooterMobileContent.vue";
import FooterBar from "@/components/defaultComponents/footer/FooterBar.vue";
import {UPDATE_STATE_ACTION, UPDATE_TIPOTRE_ACTION} from "~/constants_actions";
import {TIPOTRE} from "~/cardListKeys/footer";
export default {
  components: {
    CotizationBar,
    FooterContent,
    FooterBar,
    FooterMobileContent
  },
  async mounted() {
    await this.$store.dispatch(`footer/${UPDATE_TIPOTRE_ACTION}`,[this]);
  },
  computed: {
    tipotreData: function () {
      let res = this.$store.getters["footer/getList"](TIPOTRE);
      //console.log(TIPOTRE, res);
      return res;
    }
  }
};
</script>
