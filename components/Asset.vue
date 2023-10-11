<template>
  <div :class="ns" @click="$router.push({ path: route})">
    <div class="pb-2">
      <img :class="`${ns}__img`" :src="img" :alt="alt"/>
    </div>
    <h6 :class="labelColor">
      <span v-html="label"></span>
    </h6>
  </div>
</template>
<script>
export default {
  name: "Asset",
  props: {
    img: String,
    label: String,
    route: String,
    labelColor: {
      default: "black-text",
      type: String
    },
    alt: String
  },
  data() {
    return {
      ns: "asset"
    };
  }
};
</script>

<style scoped></style>
