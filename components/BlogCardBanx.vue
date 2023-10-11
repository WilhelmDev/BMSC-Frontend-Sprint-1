<template>
  <div :class="`${ns}`">
  <div
    :class="`${ns}__box mt-8 mb-n3 d-flex justify-center`"
    @click="goToBlog"
  >
    <Box
      :label="labelBox"
      :className="className"
      :x="'red'"
    />
  </div>
  <div :class="`${ns}__blog`">

    <v-row class="text-center">
      <v-col class="mt-8 mb-5">
        <span>
          {{text}}
        </span>
      </v-col>
    </v-row>
    <v-slide-group :show-arrows="this.$vuetify.breakpoint.sm" class="pa-sm-3 pa-0 pl-3">
      <v-slide-item
        v-for="(card, index) in cardItems"
        :key="index"
        class="mr-6 py-4"
      >
        <v-card style="background: transparent; box-shadow: none;">
          <BlogCard
            :blogType="card.blogType"
            :blogTitle="card.blogTitle"
            :blogContent="card.blogContent"
            :cardImage="card.cardImage"
            :alt="card.imgAlt1"
            :eventName="''"
          />
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
  </div>

</template>

<script>
  import BlogCard from "~/components/BlogCard";
  import Box from "~/components/Box";

  export default {
    name: "BlogCardBanx",
    components: {Box, BlogCard},
    data() {
      return {
        ns: "blog-card-banx"
      };
    },
    props: {
      // Box
      labelBox: String,
      className: String,
      //
      text: String,
      //BlogCard
      cardItems: Array
    },
    methods:{
      goToBlog(){
        this.$router.push({
          path: `client/Blog`,
          query: { isBanx: true }
        });
      }
    }
  }
</script>
