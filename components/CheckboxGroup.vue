<template>
  <div class="checkbox-group">
    <div class="big-text"> {{title}} </div>
    <v-checkbox
      v-model="valueSelected"
      v-for="(item, index) in checkboxData"
      :key="index"
      :label="item"
      color="md-green"
      class="mt-2"
      :value="item"
      hide-details
    ></v-checkbox>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    checkboxData: Array
  },
  data() {
    return {
      valueSelected: []
    }
  }
}
</script>