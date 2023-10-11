<template>
  <div class="responsive-filter-buttons">
    <v-btn-toggle
      group
      mandatory
    >
      <v-row justify="space-between">
        <v-col
          v-for="(button, index) in buttonsConfig"
          :key="index"
        >
          <v-row justify="center">
            <v-btn
              :value="button.text"
              @click="button.onClick && button.onClick(button)"
              :class="`color-${buttonsColor}`"
            >
              {{ button.text }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
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
