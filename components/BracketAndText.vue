<template>
  <div :class="`${ns} text-center px-3`">
    <v-row >
      <v-col>
        <BracketBanx
          :class="`${ns}__bracket`"
          :text1="text1"
          :text2="text2"
          :bracket-color="bracketColor"
          :new-line="newLine"
        />
      </v-col>
    </v-row>
    <v-row >
      <v-col>
        <div :class="`${ns}__text px-6`">
          {{text}}
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import BracketBanx from "~/components/BracketBanx";
export default {
  name: "BracketAndText",
  components: {BracketBanx},
  props: {
    text1: String,
    text2: String,
    bracketColor: String,
    newLine: Boolean,
    text: String
  },
  data() {
    return {
      ns: "bracket-and-text"
    };
  }
};
</script>
