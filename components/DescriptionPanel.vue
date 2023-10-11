<template>
  <div class="bmsc-list">
    <h2 class="black-text pl-sm-5 mb-4 mb-sm-5" v-html="title"></h2>
    <ul class="pl-0 pl-sm-6">
      <li v-for="(item, i) in listItems" :key="i" class="py-3">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    listItems: Array
  },
  data() {
    return {};
  }
};
</script>
