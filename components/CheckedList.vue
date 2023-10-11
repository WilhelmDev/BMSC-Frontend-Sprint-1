<template>
  <div class="checked-list">
    <ul class="list">
      <li v-for="(item, index) in items" :key="index" class="text-left py-4">
        <h6 class="black-text" v-html="item.title"></h6>
        <div class="black-text" v-html="item['subTitle']"/>
        <div class="small black-text" v-html="item['description']"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  }
};
</script>
