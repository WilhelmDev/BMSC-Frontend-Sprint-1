<template>
  <div id='tutorials' class="bm-benefits text-center py-10 mt-7 mx-auto">
    <h6><span v-html="benefitsData.items[0].title"></span></h6>
    <h2 class="black-text"><span v-html="benefitsData.items[0].subTitle"></span></h2>
    <div class="big-text">{{ benefitsData.items[0].description }}</div>
  </div>
</template>

<script>
export default {
  name: "Benefits",
  props: {
    benefitsData: Object
  }
};
</script>
