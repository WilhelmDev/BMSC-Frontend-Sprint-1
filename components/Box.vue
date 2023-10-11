<template>
  <v-row
    v-if="label"
    class="box text-center pa-0"
  >
    <v-col class="pa-0 col-auto">
      <v-img
        v-if="x"
        class="img"
        :src="require(x==='red'?'@/assets/images/redYellowBoxBanx.png':'@/assets/images/yellowSkyBlueBoxBanx.png')"
      />
    </v-col>
    <v-col class="pa-0 col-auto">
      <div :class="`main-box ${className}`">
        <span class="box__span" v-html="label"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Box",
  props: {
    label: String,
    className: String,
    x: String // unique values allowed are: blue and red (components/Box.vue:8)
  }
};
</script>

<style scoped></style>
