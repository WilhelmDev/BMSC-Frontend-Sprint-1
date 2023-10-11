<template>
  <v-container :class="`${ns} mb-5`">
    <v-row>
      <v-col cols="12" sm="3" class="px-12 px-sm-0 d-flex align-center">
        <v-img :src="image" :alt="alt"/>
      </v-col>
      <v-col cols="12" sm="9" :class="`${ns}__box pl-8`">
        <Box
          class="mt-4 ml-1"
          :label="labelBox"
          :className="className"
        />
        <div class="regular-text my-5">{{textChallenge}}</div>
        <Button
          :text="'Mas informacion'"
          :color="'bm-grey'"
          :onClick="onButtonClick"
          :data="{
          id: id,
          tags: tags
        }"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import Box from "~/components/Box";
  import Button from "~/components/Button";

export default {
  name: "Challenge",
  components: {Button, Box},
  props: {
    id: String,
    onButtonClick: Function,
    image: String,
    alt: String,
    textChallenge: String,
    tags: String,
    //Box
    labelBox: String,
    className: String
  },
  data() {
    return {
      ns: "challenge"
    };
  }
};
</script>

<style scoped></style>
