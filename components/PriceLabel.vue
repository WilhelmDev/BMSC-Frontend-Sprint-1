<template>
  <v-card :class="`bm-price-label--${size} ${cls}`">
    <div class="d-flex justify-center align-center flex-column">
      <div class="label">{{ label }}</div>
      <div class="price">{{ price }}</div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    label: String,
    price: String,
    size: String,
    cls: String
  }
};
</script>
