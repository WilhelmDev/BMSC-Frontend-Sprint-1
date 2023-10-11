<template>
  <div :class="ns + ' '+ direction">
    <Box
      :class="`${ns}__box`"
      :label="label"
      :className="className"
      :x="xBox"
    />
    <v-img
      v-if="image"
      :src="image"
      :alt="alt"
      :max-height="isCard?'270':'auto'"
    />
  </div>
</template>

<script>
import Box from "@/components/Box";
export default {
  name: "BoxAndImage",
  components: { Box },
  props: {
    label: String,
    className: String,
    xBox: String,
    image: String,
    direction: String,
    alt: String,
    isCard: Boolean
  },
  data() {
    return {
      ns: "box-and-image"
    };
  }
};
</script>

<style scoped></style>
