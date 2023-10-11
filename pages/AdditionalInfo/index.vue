<template>
  <div>
    <h2 class="green-dark-text text-center pt-8 pb-14">
      Información
      <span class="green-md-text">adicional</span>
    </h2>
    <v-row class="justify-center">
      <v-col :key="0" class="px-4" cols="11" sm="4">
        <ImageCard v-bind:cardData="cardsData.items[0]" :onButtonClick="this.goToTariffs" :clickableImage="true"/>
      </v-col>
    </v-row>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i"
      :programTitle="program.title"
      :programContent="program.description"
      :programLink="program.buttonName"
      :onClickLink="program.buttonHref"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="i%2 === 0"
      :programImage2="program.programImage2"
    />
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
import {getHeader} from "~/utils/seo";

export default {
  components: {
    Programs,
    DocumentList,
    ImageCard
  },
  data() {
    return {
      cards: {
        items: [
          {
            subtitle: "Información adicional",
            title: "Reglamentos normativos",
            linkText: "Descargar archivo",
            image: "reglaments.png",
            onButtonClick: this.goToTariffs
          },
          {
            subtitle: "Información adicional",
            title: "Tasas y tarifarios",
            linkText: "Ver más",
            image: "tariffs.png",
            onButtonClick: this.goToTariffs
          }
        ]
      },
      programs: {
        items: [
          {
            title: "Bienes adjudicados Bienes de uso y remates",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "Ver Bienes",
            image: "properties.png",
            changeOrder: true,
            buttonHref: "/additionalInfo/estate"
          },
          {
            title: "Registro de proveedores",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "Registrar proveedor",
            image: "img-card4.png",
            background: "blurred"
          }
        ]
      },
      documentsConfig: {
        title: "<span class='green-md-text'>Licitaciones</span> públicas",
        subtitle: "Puedes consultar la información en los siguientes documentos.",
      }
    }
  },
  async mounted() {

  },
  computed: {
    cardsData: function () {
      let sectionList = this.$store.getters["additionalInfo/getList"](HOME_CARDS);
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(HOME_CARDS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["additionalInfo/getList"](HOME_PROGRAMS);
      //console.log('programs Sections list: ',sectionList);


      let res = {
        items: sectionList
      }
      //console.log(HOME_PROGRAMS, res);
      return res;
    },
    documentsData: function () {
      let sectionList = this.$store.getters["additionalInfo/getList"](HOME_DOCUMENTS);
      /*
       Category 103 - Document
       Category 82 - Title and description
     */
      function processList(list,size) {
        if(list.length === 0) return generateEmptyModels(size);
        return list;
      }
      //console.log('Documents Section list: ',sectionList);
      let res = {
        items: processList(sectionList.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 103),0).map(card => {
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
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,HOME_CARDS);
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,HOME_PROGRAMS);
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,HOME_DOCUMENTS);
    return header;
  },
  head () {return this.headData}
}
</script>
