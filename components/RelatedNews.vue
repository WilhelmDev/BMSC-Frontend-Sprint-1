<template>
  <div class="related-news">
    <div class="huge-text text-no-wrap d-none d-sm-block">
      Noticias relacionadas
    </div>
    <div v-for="(news, index) in relatedNews" :key="index" class="mb-4">
      <div class="strong-small-text grey-md-text">{{news.category}}</div>
      <h6 class="black-text">{{news.title}}</h6>
      <div class="small-text">{{news.entryDate}}</div>
      <div class="read-more regular-text mb-4">
        <span>
          Leer más<v-icon right class="read-more icon-btn-arrow"/>
        </span>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    relatedNews: Array
  },
  data() {
    return {};
  }
};
</script>
