<template>
  <v-card class="bm-comparison-bottom mt-5">
    <v-container>
      <v-row>
        <v-col>
          <v-btn depressed color="white" class="regular-text more-details disabled">
            Ver m&aacute;s detalles
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  props: {
    itemsNamesList: Array
  }
};
</script>
