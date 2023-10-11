<template>
  <div :class="ns">
    <v-row v-if="creditCardImage" class="justify-center">
      <v-col class="col-auto">
        <v-img :class="`${ns}__image`" :src="creditCardImage" :alt="alt"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <BracketBanx
          :text1="text1BracketBanx"
          :text2="text2BracketBanx"
          :bracket-color="bracketColor"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
      <Box
          :label="labelBox"
          :className="className"
          :x="'red'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="`d-flex justify-center`">
        <span :class="`${ns}__content`">{{content}}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import BracketBanx from "~/components/BracketBanx";
import Box from "~/components/Box";
export default {
  name: "adBanx",
  components: {Box, BracketBanx},
  props: {
    creditCardImage: String,
    content: String,
    // bracketBanx
    text1BracketBanx: String,
    text2BracketBanx: String,
    bracketColor: String,
    // box
    labelBox: String,
    className: String,
    alt: String
  },
  data() {
    return {
      ns: "ad-banx"
    };
  }
};
</script>

<style scoped></style>
