<template>
  <div class="memories" v-if="memoriesData">
    <h2 v-html="memoriesData.title"></h2>
    <div>
      <v-row justify="center">
        <v-col
          v-for="(imageCard, i) in getReportsOfPage"
          :key="i"
          cols="11" sm="4"
        >
          <ImageCard
            :cardData="imageCard"
            :onButtonClick="downloadItem"
            :clickableImage="true"
            :downloadable="true"
          />
        </v-col>
      </v-row>
    </div>
    <v-row
      justify="center"
      align="center"
      no-gutters
      :class="`${ns}__pagination`"
    >
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-pagination
          v-model="page"
          :length="memoriesData.items ? Math.ceil(memoriesData.items.length/3) : 1"
          color="#296140"
          light
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ImageCard from "@/components/ImageCard.vue";
import axios from "axios";
import {generateReportFileUrlFromId, getRawValueFromCardTitle} from "~/utils/cardsUtil";
export default {
  components: {ImageCard},
  data(){
    return {
      ns: 'memories',
      page: 1,
      pageSize: 3,
      numberOfPages: 0
    }
  },
  props:{
    memoriesData: Object
  },
  computed: {
    getReportsOfPage() {
      let end = this.page * 3;
      return this.memoriesData.items.slice(end - 3, end);
    }
  },
  methods: {
    downloadItem (cardData) {
      let url = generateReportFileUrlFromId(cardData['description']);
      let title = cardData.title;
      let label = getRawValueFromCardTitle(title);
      //console.log(url);
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
  }
}
</script>
