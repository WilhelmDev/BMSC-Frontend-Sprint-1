<template>
  <div :class="`${ns}`">
    <v-row justify="center" align="center" no-gutters>
      <v-col class="px-4" cols="12" sm="6">
        <v-row>
          <v-col offset-sm="1">
            <h1 v-html="bannerData.items[0].title"></h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="big-text mb-12 mb-sm-0" offset-sm="1">
            {{bannerData.items[0].description}}
          </v-col>
        </v-row>
      </v-col>
      <v-col class="px-4" cols="12" sm="6">
        <v-row>
          <v-img :src="bannerData.items[0].mainImageUrl" :alt="bannerData.items[0].imgAlt1"/>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      ns: "banner"
    };
  },
  props: {
    bannerData: Object
  }
}
</script>
