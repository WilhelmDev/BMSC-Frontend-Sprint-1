<template>
  <v-container class="pt-0">
    <v-row class="text-center">
      <v-col>
        <h4>Preguntas frecuentes</h4>
      </v-col>
    </v-row>
  <v-row>
    <v-col>
      <v-expansion-panels style="z-index: initial">
        <v-expansion-panel
          v-for="(item,i) in questions"
          :key="i"
        >
          <v-expansion-panel-header
            class="big-text my-3"
            style="font-weight: bold;"
          >
            <span v-html="item.title"/>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{item.description}}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
  import {getRawHTMLText} from "@/utils/cardsUtil";

  export default {
    name: "Question",
    data() {
      return {
        ns: "question"
      };
    },
    methods: {
      getText(text){
        return getRawHTMLText(text);
      }
    },
    props: {
      questions: Array
    },
  }
</script>
