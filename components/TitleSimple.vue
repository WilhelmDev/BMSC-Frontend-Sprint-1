<template>
  <div class="light-green-bg pa-4 pa-md-12" v-if="titleData">
    <h2 class="black-text mb-4 page-title" v-html="titleData.title"></h2>
    <div class="big-text page-title" v-html="titleData.description"></div>
  </div>
</template>
<script>
export default {
  props: {
    titleData: Object
  }
}
</script>
