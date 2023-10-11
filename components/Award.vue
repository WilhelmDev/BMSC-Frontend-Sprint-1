<template>
  <div :class="ns">
    <v-row>
      <v-col class="d-flex justify-center pb-0" style="font-size: 35px;" v-html="medal"/>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center big-text pt-0" v-html="place"/>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center py-0">
        <Box
          :label="labelBox"
          :className="className"
          :x="'red'"
        />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col
        class="small"
        style="color: black; max-width: fit-content;">
        {{ note }}
      </v-col>
    </v-row>
  </div>
</template>

<script>

import Box from "~/components/Box";

export default {
  name: "Award",
  components: {Box},
  props: {
    medal: String,
    place: String,
    note: String,
    // box
    labelBox: String,
    className: String
  },
  data() {
    return {
      ns: "award"
    };
  }
};
</script>
