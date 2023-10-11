<template>
  <v-card class="small-card" @click="onClick">
    <h3 class="green-text" v-html="title"></h3>
    <div :class="descStyle" v-html="description"></div>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    description: String,
    descStyle: String,
    link: String,
    clickable: Boolean
  },
  methods: {
    onClick() {
      if(this.clickable) window.open(this.link, '_blank');
    }
  }
}
</script>
