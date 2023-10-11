<template>
  <div class="filter-buttons">
    <v-btn-toggle
      group
      mandatory
    >
      <v-btn
        :value="button.text"
        v-for="(button, index) in buttonsConfig"
        :key="index" @click="button.onClick && button.onClick(button)"
        :class="`color-${buttonsColor}`"
      >
        {{ button.text }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>
<script>
export default {
  props: {
    buttonsConfig: Array,
    toggleButton: String,
    buttonsColor: String
  },
  data() {
    return {
      selectedButton: this.toggleButton
    }
  }
};
</script>
