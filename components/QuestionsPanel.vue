<template>
  <v-expansion-panels flat multiple>
    <v-expansion-panel v-for="(question, index) in data" :key="index">
      <v-expansion-panel-header class="strong-big-text py-6">
        <div v-html="question.question"></div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-html="question.answer"></div>
      </v-expansion-panel-content>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import _ from "lodash";

export default {
  props: {
    data: Array
  }
}
</script>