<template>
  <div class="document-list">
    <div class="text-center pb-8">
      <h2 class="green-dark-text pb-4">
        <span v-html="titleData.part1"/>
        <span v-html="titleData.part2" class="green-md-text"/>
      </h2>
      <div> <span v-html="documentsData.title[0]['subTitle']"/></div>
    </div>
    <div>
      <div
        v-for="(document, index) in documentsData.items"
        :key="index"
        class="document-row d-flex py-4 my-4 px-6 mx-auto cursor-pointer"
        @click="downloadItem(document.fileUrl,document.title)"
      >
        <v-icon class="icon-book green-md-text pr-6"></v-icon>
        <div class="my-auto">
          <div class="strong-regular-text green-text">
            <span v-html="document.title"/>
          </div>
          <div> <span v-html="document.subTitle"/> </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    documentsData: Object
  },
  computed: {
    titleData() {
      if(this.documentsData.title[0]['title']) {
        return {
          part1: this.documentsData.title[0]['title'].split(' ')[0],
          part2: this.documentsData.title[0]['title'].split(' ').slice(1,this.documentsData.title[0]['title'].length).join(' ')
        }
      }
      return {
        part1: "",
        part2: ""
      }
    }
  },
  methods: {
    downloadItem (url,title) {
      let label = this.getRawValueFromCardTitle(title);
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
  }
};
</script>
