<template>
  <v-expansion-panels flat :disabled="disabled" class="bm-compare-feature">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div class="d-inline-flex">
          <div v-if="feature.description" class="icon-ctn shield">
            <v-icon class="icon-shield"></v-icon>
          </div>
          <div v-if="!feature.description" class="icon-ctn close">
            <v-icon class="icon-close"></v-icon>
          </div>
          <span class="feature-name strong-small-text">{{ feature['rowName'] }}</span>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content v-if="feature.description">
        <v-row justify="center" align="center">
          <v-col cols="12" class="feature-description">
            {{ feature['description'] }}
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  props: {
    feature: Object,
    disabled: Boolean
  },
  data: function() {
    return {};
  }
};
</script>
