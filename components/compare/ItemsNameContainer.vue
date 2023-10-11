<template>
  <v-card class="bm-comparison-header">
    <v-row no-gutters align="center">
      <v-col v-if="productList[index-1]" style="height: 200px">
        <v-row align="center" no-gutters style="height: 50%">
          <v-col cols="12">
            <h5>{{ productList[index-1].name }}</h5>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 50%" no-gutters>
          <v-col cols="12">
            <Button v-bind:text="buttonLabel" v-bind:color="buttonColor" :onClick="goToPage"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "ComparisonHeader",
  components: {
    Button
  },
  props: {
    productList: Array,
    buttonLabel: String,
    buttonColor: String,
    index: Number,
    buttonUrl: String
  },
  data() {
    return {};
  },
  methods: {
    goToPage() {
      window.location.href = this.buttonUrl;
    }
  }
};
</script>
