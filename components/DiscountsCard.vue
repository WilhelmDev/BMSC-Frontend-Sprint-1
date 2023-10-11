<template>
  <div class="d-md-flex d-block light-green-bg" v-if="discountsCard">
    <div class="mx-8 py-6 order-2">
      <h1 v-html="discountsCard.title"></h1>
      <div class="big-text" v-html="discountsCard.description"></div>
      <div
        class="strong-small-text green-md-text cursor-pointer my-4"
        @click="downloadItem(discountsCard.fileUrl, discountsCard.title)"
      >{{discountsCard.buttonName}}</div>
    </div>
    <v-img
      :src="discountsCard.mainImageUrl"
      :alt="discountsCard.imgAlt1"
    />
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    discountsCard: Object
  },
  methods: {
    downloadItem (url,title) {
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = process.env.URL_PDF_RPD_BMSC
      a.target = "_blank"
      a.download = 'Reglamento Programa Descuentos BMSC.pdf'
      a.click()
      /*let label = this.getRawValueFromCardTitle(title);
      //console.log(url);
      axios.get(url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);*/
    },
    getRawValueFromCardTitle(title) {
      //console.log(title.substring(3,title.length-4));
      if(title) return title.substring(3,title.length-4);
      return "";
    }
  }
}
</script>
