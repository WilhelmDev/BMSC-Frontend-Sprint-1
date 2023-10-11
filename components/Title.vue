<template>
  <div class="page-title">
    <v-img :src="pageTitle.mainImageUrl" :alt="pageTitle.imgAlt1"></v-img>
    <h1 class="mt-8" v-html="pageTitle.title"></h1>
  </div>
</template>
<script>
export default {
  props: {
    pageTitle: Object
  }
};
</script>
