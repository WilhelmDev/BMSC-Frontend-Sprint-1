<template>
  <div
    :class="`bm-color-card py-8 px-6 bg-${cardData.background}`"
    @click="onClickFn(cardData.id)"
  >
    <v-img
      :src="cardData.mainImageUrl"
      :alt="cardData.imgAlt1"
      class="pb-4"
      height="48"
      width="48"
    />
    <h5 class="pb-3" v-html="cardData.name"></h5>
    <div v-html="cardData.description"></div>
  </div>
</template>
<script>
export default {
  props: {
    cardData: Object,
    onClickFn: Function
  }
}
</script>
