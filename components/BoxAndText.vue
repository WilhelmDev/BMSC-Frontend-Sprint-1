<template>
  <div :class="ns">
    <Box
      :label="label"
      :class-name="className"
    />
    <span>
      {{ content }}
    </span>
  </div>
</template>

<script>
import Box from "@/components/Box";
export default {
  name: "BoxAndText",
  components: { Box },
  props: {
    label: String,
    className: String,
    content: String
  },
  data() {
    return {
      ns: "box-and-text"
    };
  }
};
</script>

<style scoped></style>
