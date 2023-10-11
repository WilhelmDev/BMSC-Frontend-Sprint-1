<template>
  <v-col :class="`${ns} mx-4 d-flex`" cols="12" sm="2">
    <v-row>
      <v-col cols="3" :class="`${ns}__emoji ma-auto`">
        📕
      </v-col>
      <v-col cols="9" class="d-flex align-center ma-auto">
        <a :href="link" class="strong-regular-text" v-html="regulationTitle" download/>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
  export default {
    name: "Regulation",
    props: {
      regulationTitle: String,
      link: String
    },
    data() {
      return {
        ns: "regulation"
      };
    }
  };
</script>

<style scoped></style>
