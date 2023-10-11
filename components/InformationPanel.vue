<template>
  <div v-if="header" class="information-panel pa-8 pa-md-16">
    <div class="text-center">
      <h2 class="black-text" v-html="header.title"/>
      <h2 v-if="!isBanx" v-html="header.subTitle"></h2>
      <Box
        style="margin: 15px auto 0;
            display: flex;
            justify-content: center;"
        v-else
        :label="header.gradientText"
        :className="header.gradient"
        :x="'red'"
      />
      <div v-if="isBanx" class="big-text py-0 py-md-4" v-html="header.subTitle"/>
      <div v-else class="big-text py-0 py-md-4" v-html="header.description"/>
    </div>
    <div class="text-center">
      <slot name="content" :data="data"></slot>
    </div>
  </div>
</template>
<script>
import Box from "~/components/Box";
export default {
  components: {Box},
  props: {
    header: Object,
    items: Array,
    data: Object,
    isBanx: Boolean
  }
};
</script>
