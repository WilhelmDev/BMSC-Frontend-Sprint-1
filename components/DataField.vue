<template>
  <div class="px-2">
    <div class="strong-regular-text grey-md-text">
      {{label}}
    </div>
    <div v-if="text"> {{text}} </div>
    <div v-else> --- </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    text: String
  }
}
</script>