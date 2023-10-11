<template>
    <v-col :class="`${ns}`" cols="12" sm="3">
      <BracketBanx
        :text1="text1"
        :text2="text2"
        :bracketColor="bracketColor"
        :newLine="newLine"/>
      <div class="mt-3" v-html="content"/>
    </v-col>
</template>

<script>

  import BracketBanx from "~/components/BracketBanx";

  export default {
    name: "ChallengeSteps",
    components: {BracketBanx},
    props: {
      content: String,
      // Bracket Banx
      text1: String,
      text2: String,
      bracketColor: String,
      newLine: String
    },
    data() {
      return {
        ns: "challenge-steps"
      };
    }
  };
</script>

<style scoped></style>
