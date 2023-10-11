<template>
  <v-btn depressed :color="color" @click="onClick(data)">
    {{ text }}
    <v-icon right class="icon-btn-arrow my-auto"> </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    onClick: {
      type: Function,
      default: function() {
        return;
      }
    },
    data: Object
  }
};
</script>
