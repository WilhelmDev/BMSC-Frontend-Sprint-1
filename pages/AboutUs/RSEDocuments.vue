<template>
  <div>
    <DocumentList v-bind:documentsData="documentsData" class="py-16 mt-8" />
  </div>
</template>
<script>
import Programs from "@/components/Programs.vue";
import DocumentList from "@/components/DocumentList.vue";
import ImageCard from "@/components/ImageCard.vue";
import {UPDATE_STATE_ACTION, UPDATE_STATE_NEWS_ACTION} from "~/constants_actions";
import {HOME_CARDS, HOME_DOCUMENTS, HOME_PROGRAMS} from "~/cardListKeys/additionalInfo";
import {generateEmptyModels, generateReportFileUrlFromId} from "~/utils/cardsUtil";
import axios from "axios";
import {DOCUMENTS} from "~/cardListKeys/rse";
import {TECH_MOBILE_BANK_DOCUMENTS} from "~/cardListKeys/tech";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    Programs,
    DocumentList,
    ImageCard
  },
  data() {
    return {

    }
  },
  async mounted() {

  },
  computed: {
    documentsData: function () {
      let sectionList = this.$store.getters["rse/getList"](DOCUMENTS);
      /*
       Category 1118 - Document
       Category 82 - Title and description
     */
      function processList(list,size) {
        if(list.length === 0) return generateEmptyModels(size);
        return list;
      }
      //console.log('Documents Section list: ',sectionList);
      let res = {
        items: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 1118),0).map(card => {
          return {
            ...card,
            fileUrl: generateReportFileUrlFromId(card['description'])
          }
        }),
        title: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 82),1),
      }
      //console.log(HOME_DOCUMENTS, res);
      return res;
    },
  },
  methods: {
    goToEstate() {
      this.$router.push({
        path: "additionalInfo/estate"
      });
    },
    goToRegistration() {
      //console.log('Register Provider');
    },
    goToRegistration2() {
      //console.log('Regulations');
    },
    goToTariffs() {
      this.$router.push({
        path: "additionalInfo/tariffs"
      });
    },
    downloadItem () {
      let label = this.getRawValueFromCardTitle(this.cardsData.items[0].subTitle);
      let url = this.cardsData.items[0].fileUrl;
      axios.get(url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);
    },
    getRawValueFromCardTitle(title) {
      if(title) return title.substring(3,title.length-4);
      return "";
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`rse/${UPDATE_STATE_ACTION}`, DOCUMENTS);
    return header;
  },
  head () {return this.headData}
}
</script>
