<template>
  <div class="gray-bg" id="redeemAndAddPoints">
    <div class="text-center px-4 pt-4 px-md-8 pt-md-8" v-if="pointsDetails">
      <div class="points-card" v-for="(item, index) in pointsDetails.items" :key="index">
        <h2 class="black-text" v-html="item.title">  </h2>
        <div class="big-text" v-html="item.description"></div>
        <v-container class="pb-0">
          <div class="list-actions" v-html="item.subTitle"></div>
          <v-divider class="my-8"></v-divider>
        </v-container>
      </div>
    </div>
    <div class="d-sm-flex justify-center text-center pb-8">
      <div class="mx-5 pb-2 pb-sm-0">
        <span
          class="strong-regular-text green-md-text cursor-pointer"
          @click="scrollTo()"
        >Consulta de puntos</span>
      </div>
      <div class="mx-5 pb-2 pb-sm-0">
        <span
          class="strong-regular-text green-md-text cursor-pointer mx-5 pb-2 pb-sm-0"
          @click="downloadItemSC()"
        >Cat&aacute;logo de productos Santa Cruz</span>
      </div>
      <div class="mx-5 pb-2 pb-sm-0">
        <span
          class="strong-regular-text green-md-text cursor-pointer mx-5 pb-2 pb-sm-0"
          @click="downloadOtherCity()"
        >Cat&aacute;logo de productos resto del país</span>
      </div>
      <div class="mx-5 pb-2 pb-sm-0">
        <span
          class="strong-regular-text green-md-text cursor-pointer mx-5 pb-2 pb-sm-0"
          @click="downloadItemRegulation()">
          <!--@click="scrollTo('catalog')">-->
          Reglamento</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    pointsDetails: Object
  },
  methods: {
    scrollTo(elementId) {
      if (elementId) {
        const element = document.getElementById(elementId);
        element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
      } else {
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
    downloadItemSC() {
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = process.env.URL_PDF_CSC
      a.target = "_blank"
      a.download = 'Catálogo de productos Santa Cruz.pdf'
      a.click()
    },
    downloadOtherCity() {
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = process.env.URL_PDF_CN
      a.target = "_blank"
      a.download = 'Catálogo de productos resto del país.pdf'
      a.click()
    },
    downloadItemRegulation() {
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = process.env.URL_PDF_RCPT
      a.target = "_blank"
      a.download = 'Reglamento.pdf'
      a.click()
    }
  }
}
</script>
