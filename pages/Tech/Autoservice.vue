<template>
  <div>
    <v-container class="text-center pb-16">
      <OptionsPanel :data="titleData.items[0]">
        <template v-slot:image>
          <v-img class="w-50 mx-auto" :src="titleData.items[0].mainImageUrl"></v-img>
        </template>
        <template v-slot:message>
          <div v-html="titleData.items[0].description" class="regular-text green-text"></div>
        </template>
        <template v-slot:bottom>
          <div class="d-flex justify-center">
            <Button
              class="button-compare"
              text="Buscar plataformas"
              color="bm-dark"
              v-bind:onClick="goToAgencies"
            />
          </div>
        </template>
      </OptionsPanel>
    </v-container>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="i%2 === 0 && true"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <Benefits2
      v-bind:benefits2Data = "benefits2Data"
    />
    <MoreInfo
      v-bind="moreInfoConfig"
      class="py-16"
    />
  </div>
</template>
<script>
import OptionsPanel from "@/components/OptionsPanel.vue";
import Programs from "@/components/Programs.vue";
import Benefits2 from "@/components/Benefits2.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import Button from "@/components/Button.vue";

import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  TECH_AUTOSERVICE_TITLE,
  TECH_AUTOSERVICE_PROGRAMS,
  TECH_AUTOSERVICE_BENEFITS_2
} from "~/cardListKeys/tech";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    OptionsPanel,
    Programs,
    Benefits2,
    MoreInfo,
    Button
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["tech/getList"](TECH_AUTOSERVICE_TITLE)
      }
      if (!res.items[0]['mainImageUrl']) {
        res.items[0]['mainImageUrl'] = require("@/assets/images/atm.svg");
      }
      //console.log(TECH_AUTOSERVICE_TITLE, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_AUTOSERVICE_PROGRAMS);
      let res = {
        items: sectionList
      }
      //console.log(TECH_AUTOSERVICE_PROGRAMS, res);
      return res;
    },
    benefits2Data: function () {
      let sectionList = this.$store.getters["tech/getList"](TECH_AUTOSERVICE_BENEFITS_2);
      if(sectionList.length === 0) {
        sectionList = generateEmptyModels(1);
      }
      let res = {
        items: sectionList
      };
      //console.log(TECH_AUTOSERVICE_BENEFITS_2, res);
      return res;
    }
  },
  data() {
    return {
      programsLinkFunctions: [
        this.goToTransferTutorial,
        this.goToPaymentTutorial
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
    }
  },
  methods: {
    goToTransferTutorial() {
      //console.log("transfer tutorial");
    },
    goToPaymentTutorial() {
      //console.log("payment tutorial");
    },
    goToAgencies() {
      this.$router.push({
        path: "/help/agencies"
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_AUTOSERVICE_TITLE);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_AUTOSERVICE_PROGRAMS);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_AUTOSERVICE_BENEFITS_2);
    return header;
  },
  head () {return this.headData}
}
</script>
