<template>
  <div>
    <DocumentList v-bind:documentsData="documentsData" class="pb-16 mt-8" />
  </div>
</template>
<script>
import DocumentList from "@/components/DocumentList.vue";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {
  TARIFFS_DOCUMENTS,
  TARIFFS_TITLE
} from "~/cardListKeys/additionalInfo";
import {generateEmptyModels, generateReportFileUrlFromId} from "~/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    DocumentList
  },
  data() {
    return {
      tariffs: {
        title: "<span class='green-text'>Tasas y tarifarios</span>",
        subtitle: "Puedes consultar la información en los siguientes documentos.",
        items: [
          {
            name: "Tarifario"
          },
          {
            name: "Tasas"
          },
          {
            name: "Información adicional de tasas"
          },
          {
            name: "Tiempos de aprobación",
          },
          {
            name: "Beneficios clientes CPOP",
          },
          {
            name: "Horarios para operación vía ACH y recepción de cheques",
          }
        ]
      }
    }
  },
  async mounted() {

  },
  computed: {
    documentsData: function () {
      let titleList = this.$store.getters["additionalInfo/getList"](TARIFFS_TITLE);
      let sectionList = this.$store.getters["additionalInfo/getList"](TARIFFS_DOCUMENTS);
      if(titleList.length === 0) titleList = generateEmptyModels(1);
      let res = {
        items: sectionList.map(card => {
          return {
            ...card,
            fileUrl: generateReportFileUrlFromId(card['description']),
          }
        }),
        title: titleList
      }
      //console.log(TARIFFS_DOCUMENTS, res);
      return res;
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,TARIFFS_TITLE);
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,TARIFFS_DOCUMENTS);
    return header;
  },
  head () {return this.headData}
}
</script>
