<template>
  <div class="options-panel">
    <div class="image-container mx-auto pb-6">
      <slot name="image"><v-img :src="data.items[0].mainImageUrl" :alt="data.items[0].imgAlt1"></v-img></slot>
    </div>
    <slot name="title"><h2 class="black-text px-16 pb-6" v-html="data.items[0].title"></h2></slot>
    <div class="big-text px-16 pb-6" v-html="data.items[0].subTitle"></div>
    <div class="pb-10"><slot name="message"></slot></div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  }
};
</script>
