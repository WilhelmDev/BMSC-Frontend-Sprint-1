<template>
  <div class="link-list">
    <ul class="list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="text-left py-4 green-md-text strong-regular-text"
        @click="onLinkClick(item)"
      >
        <span class="cursor-pointer" v-html="item['title']"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  },
  methods: {
    onLinkClick(item) {
      window.open(item.fileUrl, '_blank');
    }
  }
};
</script>
